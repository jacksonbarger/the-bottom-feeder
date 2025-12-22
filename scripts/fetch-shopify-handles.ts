/**
 * Script to fetch all product handles from Shopify Storefront API
 * Run with: npx tsx scripts/fetch-shopify-handles.ts
 */

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'the-bottom-feeder.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';
const API_VERSION = '2024-01';

const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

interface ShopifyProductNode {
  id: string;
  title: string;
  handle: string;
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: { amount: string };
      };
    }[];
  };
}

async function fetchAllProducts(): Promise<void> {
  if (!STOREFRONT_ACCESS_TOKEN) {
    console.error('Error: NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN is not set');
    console.error('Make sure .env.local exists and contains the token');
    process.exit(1);
  }

  console.log('\n=== Fetching Shopify Products ===\n');
  console.log(`Domain: ${SHOPIFY_DOMAIN}`);
  console.log(`API Version: ${API_VERSION}\n`);

  const query = `
    query GetAllProducts {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      process.exit(1);
    }

    const products: ShopifyProductNode[] = json.data.products.edges.map(
      (e: { node: ShopifyProductNode }) => e.node
    );

    console.log(`Found ${products.length} products:\n`);
    console.log('='.repeat(80));

    for (const product of products) {
      console.log(`\nTitle: ${product.title}`);
      console.log(`Handle: ${product.handle}`);
      console.log(`ID: ${product.id}`);

      if (product.variants.edges.length > 0) {
        console.log('Variants:');
        for (const variant of product.variants.edges) {
          console.log(`  - ${variant.node.title}: $${variant.node.price.amount} (ID: ${variant.node.id})`);
        }
      }
      console.log('-'.repeat(80));
    }

    // Output as JSON for easy copy-paste
    console.log('\n\n=== Handle Mapping (JSON) ===\n');
    const handleMap = products.map(p => ({
      title: p.title,
      handle: p.handle,
    }));
    console.log(JSON.stringify(handleMap, null, 2));

  } catch (error) {
    console.error('Failed to fetch products:', error);
    process.exit(1);
  }
}

fetchAllProducts();
