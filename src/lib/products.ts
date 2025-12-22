export type ProductCategory = 'vacuums' | 'batteries' | 'filters' | 'parts';

export interface ProductVariant {
  name: string;
  price: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  sku: string;
  category: ProductCategory;
  description: string;
  features: string[];
  image: string;
  shopifyHandle: string;
  variants?: ProductVariant[];
  inStock?: boolean;
  rating?: number;
}

// All products from thebottomfeeder.com
export const PRODUCTS: Product[] = [
  // ============ VACUUMS ============
  {
    id: "tbf-vacuum-1",
    name: "The Bottom Feeder Cordless Battery Powered Pool Vacuum",
    slug: "the-bottom-feeder",
    price: 1535.00,
    sku: "TBF-AM001",
    category: "vacuums",
    description: "The original cordless battery-powered pool vacuum. Features a 1.5-hour LiFePO4 rechargeable battery, weighs only 18 lbs, and can operate in as little as 3 inches of water.",
    features: [
      "1.5-hour LiFePO4 rechargeable battery",
      "Only 18 lbs - ultra lightweight",
      "Works in as little as 3 inches of water",
      "High-torque motor for powerful suction",
      "No hoses, long cords, or carts needed",
      "Includes vacuum head, battery pack, portability kit, 5A charger, spare cable, and debris bags"
    ],
    image: "/images/products/bottom-feeder-vacuum.jpg",
    shopifyHandle: "the-bottom-feeder",
    rating: 4.9,
    inStock: true
  },
  {
    id: "tbf-vacuum-2",
    name: "The Bottom Feeder w/ Extra Battery Kit",
    slug: "the-bottom-feeder-extra-battery",
    price: 2124.00,
    salePrice: 1924.00,
    sku: "TBF-AM003",
    category: "vacuums",
    description: "The complete package - our flagship vacuum bundled with an extra battery kit for extended runtime. Perfect for larger pools or commercial use.",
    features: [
      "Everything in the standard Bottom Feeder kit",
      "Extra battery pack included",
      "Extra charger and cable",
      "Up to 3 hours of total runtime",
      "Save $200 vs buying separately"
    ],
    image: "/images/products/bottom-feeder-extra-battery.jpg",
    shopifyHandle: "the-bottom-feeder-cordless-battery-powered-pool-vacuum-w-extra-battery-kit",
    rating: 4.9,
    inStock: true
  },
  {
    id: "tbf-vacuum-3",
    name: "The Shrimp KIT",
    slug: "the-shrimp",
    price: 1199.00,
    sku: "TBF-AM006",
    category: "vacuums",
    description: "A more compact, budget-friendly option for smaller pools and spas. Same cordless convenience in a lighter package.",
    features: [
      "Compact design for smaller pools and spas",
      "Cordless battery-powered operation",
      "Lightweight and easy to maneuver",
      "Perfect for quick cleanups"
    ],
    image: "/images/products/shrimp-kit.jpg",
    shopifyHandle: "the-shrimp",
    inStock: true
  },

  // ============ BATTERIES ============
  {
    id: "tbf-battery-1",
    name: "3-Battery Pack w/Chargers & Cables",
    slug: "3-battery-pack",
    price: 1767.00,
    salePrice: 1567.00,
    sku: "TBF-BAT003",
    category: "batteries",
    description: "Stock up and save! Three complete battery kits with chargers and cables for uninterrupted pool cleaning.",
    features: [
      "3 LiFePO4 battery packs",
      "3 chargers included",
      "3 battery cables",
      "Up to 4.5 hours total runtime",
      "Save $200 vs buying individually"
    ],
    image: "/images/products/3-battery-pack.jpg",
    shopifyHandle: "3-pack-battery-w-chargers-cables",
    inStock: true
  },
  {
    id: "tbf-battery-2",
    name: "Battery Pack w/Charger & Cable",
    slug: "battery-pack",
    price: 589.00,
    sku: "TBF-BAT001",
    category: "batteries",
    description: "Complete battery replacement kit including charger and cable. Extend your cleaning time with an extra battery on hand.",
    features: [
      "LiFePO4 rechargeable battery",
      "5A charger included",
      "Battery cable included",
      "1.5 hours runtime per charge"
    ],
    image: "/images/products/battery-pack.jpg",
    shopifyHandle: "battery-pack-w-charger",
    inStock: true
  },
  {
    id: "tbf-battery-3",
    name: "Battery Cable",
    slug: "battery-cable",
    price: 70.00,
    sku: "TBF-CAB001",
    category: "batteries",
    description: "Replacement battery cable for connecting your battery pack to the vacuum unit.",
    features: [
      "High-quality connection cable",
      "Durable construction",
      "Easy to install"
    ],
    image: "/images/products/battery-cable.jpg",
    shopifyHandle: "battery-cable",
    inStock: true
  },
  {
    id: "tbf-battery-4",
    name: "Battery Connector Flap",
    slug: "battery-connector-flap",
    price: 32.00,
    sku: "TBF-CON001",
    category: "batteries",
    description: "Replacement connector flap for the battery compartment. Keeps water and debris out of the connection.",
    features: [
      "Protective seal for battery connection",
      "Water-resistant design",
      "Easy snap-on installation"
    ],
    image: "/images/products/battery-connector-flap.jpg",
    shopifyHandle: "battery-connector-flap",
    inStock: true
  },
  {
    id: "tbf-battery-5",
    name: "Battery Connector Twist Lock",
    slug: "battery-connector-twist-lock",
    price: 26.00,
    sku: "TBF-CON002",
    category: "batteries",
    description: "Replacement twist lock mechanism for secure battery connection.",
    features: [
      "Secure locking mechanism",
      "Durable construction",
      "Easy installation"
    ],
    image: "/images/products/battery-connector-twist-lock.jpg",
    shopifyHandle: "battery-connector-twist-lock",
    inStock: true
  },

  // ============ DEBRIS BAGS & FILTERS ============
  {
    id: "tbf-filter-1",
    name: "Filter & Assembly",
    slug: "filter-assembly",
    price: 269.00,
    sku: "TBF-FLT001",
    category: "filters",
    description: "Complete filter assembly unit. Replace your entire filter system for optimal suction and debris collection.",
    features: [
      "Complete filter assembly",
      "High-efficiency filtration",
      "Easy to install",
      "Maintains optimal suction"
    ],
    image: "/images/products/filter-assembly.jpg",
    shopifyHandle: "filter-assembly",
    inStock: true
  },
  {
    id: "tbf-filter-2",
    name: "Filter Replacement",
    slug: "replacement-filter",
    price: 75.00,
    sku: "TBF-FLT002",
    category: "filters",
    description: "Replacement filter element for your Bottom Feeder vacuum. Regular replacement ensures optimal performance.",
    features: [
      "High-quality filter media",
      "Maintains suction power",
      "Easy to replace"
    ],
    image: "/images/products/filter-replacement.jpg",
    shopifyHandle: "replacement-filter",
    inStock: true
  },
  {
    id: "tbf-bag-1",
    name: "Debris Bag 100 Micron",
    slug: "debris-bag-100-micron",
    price: 39.00,
    sku: "TBF-BAG100",
    category: "filters",
    description: "Standard 100 micron debris bag by VacBagz. Great for leaves, twigs, and larger debris.",
    features: [
      "100 micron filtration",
      "Durable mesh construction",
      "Easy to empty and clean",
      "Made by VacBagz"
    ],
    image: "/images/products/debris-bag-100.jpg",
    shopifyHandle: "debris-bag-100-micron",
    variants: [
      { name: "Small (20\")", price: 39.00 },
      { name: "Medium (30\")", price: 45.00 },
      { name: "Large (40\")", price: 52.00 }
    ],
    inStock: true
  },
  {
    id: "tbf-bag-2",
    name: "Debris Bag 57 Micron",
    slug: "debris-bag-57-micron",
    price: 42.00,
    sku: "TBF-BAG057",
    category: "filters",
    description: "Fine 57 micron debris bag by VacBagz. Perfect for sand, fine sediment, and smaller particles.",
    features: [
      "57 micron fine filtration",
      "Captures sand and fine debris",
      "Durable construction",
      "Made by VacBagz"
    ],
    image: "/images/products/debris-bag-57.jpg",
    shopifyHandle: "debris-bag-57-micron",
    variants: [
      { name: "Small (20\")", price: 42.00 },
      { name: "Medium (30\")", price: 48.00 },
      { name: "Large (40\")", price: 55.00 }
    ],
    inStock: true
  },

  // ============ REPLACEMENT PARTS ============
  {
    id: "tbf-part-1",
    name: "Portability Kit",
    slug: "portability-kit",
    price: 220.00,
    sku: "TBF-PORT001",
    category: "parts",
    description: "Complete portability kit including handle, pole extension, and switch cord. Everything needed for easy transport and operation.",
    features: [
      "Handle included",
      "Pole extension included",
      "Switch cord included",
      "Makes transport effortless"
    ],
    image: "/images/products/portability-kit.jpg",
    shopifyHandle: "portability-kit",
    inStock: true
  },
  {
    id: "tbf-part-2",
    name: "Portability Handle",
    slug: "portability-handle",
    price: 22.00,
    sku: "TBF-PORT002",
    category: "parts",
    description: "Replacement portability handle for easy carrying and transport.",
    features: [
      "Ergonomic grip",
      "Durable construction",
      "Easy installation"
    ],
    image: "/images/products/portability-handle.jpg",
    shopifyHandle: "portability-handle",
    inStock: true
  },
  {
    id: "tbf-part-3",
    name: "Portability Pole Extension",
    slug: "pole-extension",
    price: 62.00,
    sku: "TBF-PORT003",
    category: "parts",
    description: "Extends your reach for cleaning deeper areas and larger pools.",
    features: [
      "Extends cleaning reach",
      "Lightweight aluminum",
      "Secure connection"
    ],
    image: "/images/products/pole-extension.jpg",
    shopifyHandle: "pole-extension",
    inStock: true
  },
  {
    id: "tbf-part-4",
    name: "Portability Switch Cord",
    slug: "portability-cord",
    price: 155.00,
    sku: "TBF-PORT004",
    category: "parts",
    description: "Replacement switch cord for the portability system. Controls vacuum operation from the handle.",
    features: [
      "On/off switch control",
      "Durable wiring",
      "Easy installation"
    ],
    image: "/images/products/switch-cord.jpg",
    shopifyHandle: "portability-cord",
    inStock: true
  },
  {
    id: "tbf-part-5",
    name: "Soft Case Carry Bag",
    slug: "carry-bag",
    price: 149.95,
    salePrice: 124.95,
    sku: "TBF-BAG001",
    category: "parts",
    description: "Protective carrying case for storing and transporting your Bottom Feeder vacuum.",
    features: [
      "Padded protection",
      "Multiple compartments",
      "Shoulder strap included",
      "Fits complete vacuum kit"
    ],
    image: "/images/products/soft-case-bag.jpg",
    shopifyHandle: "the-bottom-feeder®-soft-case-carry-bag",
    inStock: true
  },
  {
    id: "tbf-part-6",
    name: "Bumper Flaps Kit (6 pcs.)",
    slug: "bumper-flaps",
    price: 33.00,
    sku: "TBF-BMP001",
    category: "parts",
    description: "Set of 6 replacement bumper flaps. Protects pool surfaces and improves vacuum seal.",
    features: [
      "6 pieces included",
      "Soft rubber construction",
      "Protects pool surfaces",
      "Improves suction seal"
    ],
    image: "/images/products/bumper-flaps.jpg",
    shopifyHandle: "bumper-flaps",
    inStock: true
  },
  {
    id: "tbf-part-7",
    name: "Halo Guard",
    slug: "halo-guard",
    price: 19.00,
    sku: "TBF-HAL001",
    category: "parts",
    description: "Protective halo guard for the vacuum head. Prevents damage to pool surfaces.",
    features: [
      "Surface protection",
      "Durable plastic",
      "Easy to replace"
    ],
    image: "/images/products/halo-guard.jpg",
    shopifyHandle: "halo-guard",
    inStock: true
  },
  {
    id: "tbf-part-8",
    name: "Halo Replacement Kit",
    slug: "halo-replacement-kit",
    price: 30.00,
    sku: "TBF-HAL002",
    category: "parts",
    description: "Complete halo replacement kit including guard and mounting hardware.",
    features: [
      "Complete kit",
      "Includes mounting hardware",
      "Easy installation"
    ],
    image: "/images/products/halo-replacement.jpg",
    shopifyHandle: "halo-replacement-kit",
    inStock: true
  },
  {
    id: "tbf-part-9",
    name: "Propeller Kit",
    slug: "propeller-kit",
    price: 31.00,
    sku: "TBF-PROP001",
    category: "parts",
    description: "Replacement propeller kit with pin and nut. Maintains optimal water flow and suction.",
    features: [
      "Propeller included",
      "Pin and nut included",
      "Restores suction power"
    ],
    image: "/images/products/propeller-kit.jpg",
    shopifyHandle: "prop-w-pin-and-nut",
    inStock: true
  },
  {
    id: "tbf-part-10",
    name: "Swivel Handle",
    slug: "swivel-handle",
    price: 42.00,
    sku: "TBF-SWV001",
    category: "parts",
    description: "Replacement swivel handle for improved maneuverability.",
    features: [
      "360-degree rotation",
      "Ergonomic grip",
      "Reduces wrist strain"
    ],
    image: "/images/products/swivel-handle.jpg",
    shopifyHandle: "swivel-handle",
    inStock: true
  },
  {
    id: "tbf-part-11",
    name: "Stainless Steel Handle Base Plate",
    slug: "handle-base-plate",
    price: 31.00,
    sku: "TBF-HBP001",
    category: "parts",
    description: "Stainless steel base plate for the handle connection. Corrosion-resistant for long life.",
    features: [
      "Stainless steel construction",
      "Corrosion resistant",
      "Durable connection point"
    ],
    image: "/images/products/handle-base-plate.jpg",
    shopifyHandle: "stainless-steel-handle-base-plate",
    inStock: true
  },
  {
    id: "tbf-part-12",
    name: "Thruster Ring",
    slug: "thruster-ring",
    price: 17.00,
    sku: "TBF-THR001",
    category: "parts",
    description: "Replacement thruster ring for optimal water propulsion.",
    features: [
      "Improves water flow",
      "Durable material",
      "Easy to install"
    ],
    image: "/images/products/thruster-ring.jpg",
    shopifyHandle: "thruster-ring",
    inStock: true
  },
  {
    id: "tbf-part-13",
    name: "Wheels (7 Pack)",
    slug: "wheels",
    price: 14.00,
    sku: "TBF-WHL001",
    category: "parts",
    description: "Set of 7 replacement wheels for smooth pool surface movement.",
    features: [
      "7 wheels included",
      "Smooth rolling action",
      "Protects pool surface"
    ],
    image: "/images/products/wheels.jpg",
    shopifyHandle: "wheels",
    inStock: true
  },
  {
    id: "tbf-part-14",
    name: "Wheel Axle Bolts (7 Pack)",
    slug: "wheel-axle-bolts",
    price: 28.00,
    sku: "TBF-WHL002",
    category: "parts",
    description: "Set of 7 replacement wheel axle bolts.",
    features: [
      "7 bolts included",
      "Stainless steel",
      "Corrosion resistant"
    ],
    image: "/images/products/wheel-axle-bolts.jpg",
    shopifyHandle: "motor-assembly",
    inStock: true
  },
  {
    id: "tbf-part-15",
    name: "V Clips (Stainless Steel)",
    slug: "v-clips",
    price: 5.00,
    sku: "TBF-VCL001",
    category: "parts",
    description: "Stainless steel V clips for secure component attachment.",
    features: [
      "Stainless steel",
      "Secure hold",
      "Easy to install"
    ],
    image: "/images/products/v-clips.jpg",
    shopifyHandle: "v-clips-stainless-steel",
    inStock: true
  },
  {
    id: "tbf-part-16",
    name: "Weld Repair Kit",
    slug: "weld-repair-kit",
    price: 11.00,
    sku: "TBF-WLD001",
    category: "parts",
    description: "Repair kit for fixing minor cracks and damage to the vacuum body.",
    features: [
      "Easy application",
      "Waterproof seal",
      "Quick drying"
    ],
    image: "/images/products/weld-repair-kit.jpg",
    shopifyHandle: "weld-repair-kit",
    inStock: true
  },
  {
    id: "tbf-part-17",
    name: "Rubber Band",
    slug: "rubber-band",
    price: 2.00,
    sku: "TBF-RUB001",
    category: "parts",
    description: "Replacement rubber band for debris bag attachment.",
    features: [
      "Elastic material",
      "Secure bag attachment",
      "Easy to replace"
    ],
    image: "/images/products/rubber-band.jpg",
    shopifyHandle: "rubber-band",
    inStock: true
  }
];

// Helper functions
export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter(product => product.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(product => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(product => product.category === 'vacuums');
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(product => product.id === id);
}

// Category display info
export const CATEGORY_INFO: Record<ProductCategory, { name: string; description: string }> = {
  vacuums: {
    name: "Pool Vacuums",
    description: "Cordless battery-powered pool cleaning units for effortless pool maintenance"
  },
  batteries: {
    name: "Batteries & Power",
    description: "Battery packs, chargers, and power accessories to keep you cleaning"
  },
  filters: {
    name: "Debris Bags & Filters",
    description: "Filtration systems and debris collection bags for optimal performance"
  },
  parts: {
    name: "Replacement Parts",
    description: "Maintenance and repair components to keep your vacuum running like new"
  }
};
