// Business Information
export const BUSINESS_INFO = {
  name: "The Bottom Feeder",
  legalName: "The Bottom Feeder",
  tagline: "Cordless Battery Powered Pool Vacuums - No hoses, no cords, no hassle",
  phone: "(833) 433-7665",
  email: "info@thebottomfeeder.com",
  address: "6672 Boulder Hwy, Ste. 6, Las Vegas, NV 89122",
  hours: "Monday-Friday, 9am-3pm",
  freeShipping: "Free shipping on orders $500+",
  shopifyDomain: "the-bottom-feeder.myshopify.com",
} as const;

// Navigation Links
export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Vacuums", href: "/products/vacuums" },
  { name: "Parts & Accessories", href: "/products/parts" },
  { name: "Support", href: "/support" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

// Product Categories
export const CATEGORIES = [
  {
    name: "Vacuums",
    slug: "vacuums",
    description: "Cordless battery-powered pool cleaning units",
    icon: "Waves"
  },
  {
    name: "Batteries",
    slug: "batteries",
    description: "Power packs, chargers, and battery accessories",
    icon: "Battery"
  },
  {
    name: "Debris Bags & Filters",
    slug: "filters",
    description: "Filtration and debris collection systems",
    icon: "Filter"
  },
  {
    name: "Replacement Parts",
    slug: "parts",
    description: "Maintenance and repair components",
    icon: "Wrench"
  },
] as const;

// Key Features for homepage
export const KEY_FEATURES = [
  {
    title: "Cordless Freedom",
    description: "No hoses, no long cords, no carts - just grab and go pool cleaning",
    icon: "Zap"
  },
  {
    title: "1.5 Hour Runtime",
    description: "LiFePO4 rechargeable battery provides extended cleaning sessions",
    icon: "Clock"
  },
  {
    title: "Ultra Lightweight",
    description: "Only 18 lbs - easy to carry and maneuver in any pool",
    icon: "Feather"
  },
  {
    title: "Works in 3\" of Water",
    description: "Clean shallow areas, steps, and ledges other vacuums can't reach",
    icon: "Droplets"
  },
  {
    title: "High-Torque Motor",
    description: "Powerful suction picks up debris of all sizes with ease",
    icon: "Settings"
  },
  {
    title: "Free Shipping",
    description: "Orders over $500 ship free to the contiguous US",
    icon: "Truck"
  },
] as const;

// FAQ Items for support page
export const FAQ_ITEMS = [
  {
    question: "How long does the battery last?",
    answer: "The LiFePO4 battery provides up to 1.5 hours of continuous runtime on a full charge. Battery life may vary based on debris load and water conditions."
  },
  {
    question: "What's included with The Bottom Feeder vacuum?",
    answer: "Each unit includes the vacuum head, battery pack, portability kit, 5A charger, spare cable, and debris bags - everything you need to start cleaning."
  },
  {
    question: "Can it work in shallow water?",
    answer: "Yes! The Bottom Feeder can operate in as little as 3 inches of water, making it perfect for steps, sun ledges, and shallow areas."
  },
  {
    question: "How do I charge the battery?",
    answer: "Simply connect the included 5A charger to the battery pack. A full charge typically takes 2-3 hours depending on the battery's current level."
  },
  {
    question: "What size debris bag do I need?",
    answer: "We offer three sizes: Small (20\"), Medium (30\"), and Large (40\"). Choose based on your pool size and typical debris load. We also offer 100 micron bags for fine particles and 57 micron bags for ultra-fine debris."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently we ship to the contiguous United States. Orders over $500 qualify for free shipping. Standard processing time is 1-5 business days."
  },
] as const;

// Social links
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/thebottomfeeder",
  instagram: "https://www.instagram.com/thebottomfeeder",
  youtube: "https://www.youtube.com/thebottomfeeder",
} as const;
