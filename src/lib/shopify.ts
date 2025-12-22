// Shopify Storefront API with Cart API (replaces deprecated Checkout API)

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'the-bottom-feeder.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';
const API_VERSION = '2024-01';

const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

// Validate configuration
if (!STOREFRONT_ACCESS_TOKEN) {
  console.warn('Warning: NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN is not set. Shopify integration will not work.');
}

// Types
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: { edges: { node: { src: string } }[] };
  variants: { edges: { node: ShopifyVariant }[] };
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
}

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      url: string;
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: { node: CartLine }[];
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

// GraphQL helper
async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('[Shopify] GraphQL Errors:', json.errors);
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }

  return json.data;
}

// Cart state (client-side)
let cartId: string | null = null;

// Get or create cart
async function getOrCreateCart(): Promise<Cart> {
  // Check localStorage for existing cart
  if (typeof window !== 'undefined' && !cartId) {
    cartId = localStorage.getItem('shopify_cart_id');
  }

  // If we have a cart ID, try to fetch it
  if (cartId) {
    try {
      const data = await shopifyFetch<{ cart: Cart | null }>(`
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            checkoutUrl
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      `, { cartId });

      if (data.cart) {
        return data.cart;
      }
    } catch {
      // Cart expired or invalid, create new one
      console.log('[Shopify] Cart not found, creating new one');
    }
  }

  // Create new cart
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(`
    mutation CreateCart {
      cartCreate {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `);

  cartId = data.cartCreate.cart.id;
  if (typeof window !== 'undefined') {
    localStorage.setItem('shopify_cart_id', cartId);
  }

  return data.cartCreate.cart;
}

// Exported type for cart items
export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  variant: {
    id: string;
    title: string;
    price: { amount: string };
    image?: { src: string };
  };
}

// Convert Cart to simplified format
function cartToItems(cart: Cart): CartItem[] {
  return cart.lines.edges.map(({ node }) => ({
    id: node.id,
    title: node.merchandise.product.title,
    quantity: node.quantity,
    variant: {
      id: node.merchandise.id,
      title: node.merchandise.title,
      price: { amount: node.merchandise.price.amount },
      image: node.merchandise.image ? { src: node.merchandise.image.url } : undefined,
    },
  }));
}

// Public API

export interface CheckoutType {
  id: string;
  webUrl: string;
  lineItems: CartItem[];
}

export async function getCheckout(): Promise<CheckoutType | null> {
  try {
    const cart = await getOrCreateCart();
    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      lineItems: cartToItems(cart),
    };
  } catch (error) {
    console.error('[Shopify] Error getting cart:', error);
    return null;
  }
}

export async function addToCart(variantId: string, quantity: number = 1): Promise<CheckoutType | null> {
  try {
    const cart = await getOrCreateCart();

    const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(`
      mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `, {
      cartId: cart.id,
      lines: [{ merchandiseId: variantId, quantity }],
    });

    const updatedCart = data.cartLinesAdd.cart;

    return {
      id: updatedCart.id,
      webUrl: updatedCart.checkoutUrl,
      lineItems: cartToItems(updatedCart),
    };
  } catch (error) {
    console.error('[Shopify] Error adding to cart:', error);
    throw error;
  }
}

export async function updateCartItem(lineItemId: string, quantity: number): Promise<CheckoutType | null> {
  try {
    const cart = await getOrCreateCart();

    const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(`
      mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `, {
      cartId: cart.id,
      lines: [{ id: lineItemId, quantity }],
    });

    return {
      id: data.cartLinesUpdate.cart.id,
      webUrl: data.cartLinesUpdate.cart.checkoutUrl,
      lineItems: cartToItems(data.cartLinesUpdate.cart),
    };
  } catch (error) {
    console.error('[Shopify] Error updating cart:', error);
    throw error;
  }
}

export async function removeFromCart(lineItemId: string): Promise<CheckoutType | null> {
  try {
    const cart = await getOrCreateCart();

    const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(`
      mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            checkoutUrl
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `, {
      cartId: cart.id,
      lineIds: [lineItemId],
    });

    return {
      id: data.cartLinesRemove.cart.id,
      webUrl: data.cartLinesRemove.cart.checkoutUrl,
      lineItems: cartToItems(data.cartLinesRemove.cart),
    };
  } catch (error) {
    console.error('[Shopify] Error removing from cart:', error);
    throw error;
  }
}

export async function getCheckoutUrl(): Promise<string | null> {
  try {
    const cart = await getOrCreateCart();
    return cart.checkoutUrl;
  } catch {
    return null;
  }
}

// Product fetching
export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(`
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          images(first: 10) {
            edges {
              node {
                src: url
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    `, { handle });

    if (!data.productByHandle) return null;

    // Transform to expected format
    const product = data.productByHandle;
    return {
      ...product,
      images: product.images.edges.map(e => ({ src: e.node.src })) as unknown as ShopifyProduct['images'],
      variants: product.variants.edges.map(e => e.node) as unknown as ShopifyProduct['variants'],
    } as unknown as ShopifyProduct;
  } catch (error) {
    console.error('[Shopify] Error fetching product:', error);
    return null;
  }
}

export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(`
      query GetAllProducts {
        products(first: 250) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    src: url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `);

    return data.products.edges.map(e => e.node);
  } catch (error) {
    console.error('[Shopify] Error fetching products:', error);
    return [];
  }
}
