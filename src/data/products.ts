export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: string;
  image: string;
  description: string;
  specs: {
    material: string;
    finish: string;
    warranty: string;
    installation: string;
  };
}

export const categories = [
  { name: 'Stainless steel napkin holder', slug: 'stainless-steel-napkin-holder' },
  { name: 'Bathroom shelf', slug: 'bathroom-shelf' },
  { name: 'Stainless steel towel rack', slug: 'stainless-steel-towel-rack' },
  { name: 'Stainless steel soap dish', slug: 'stainless-steel-soap-dish' },
  { name: 'Stainless steel tumbler', slug: 'stainless-steel-tumbler' },
  { name: 'Stainless steel toilet paper holder', slug: 'stainless-steel-toilet-paper-holder' },
  { name: 'Liquid dispenser', slug: 'liquid-dispenser' },
  { name: 'ABS mirror cabinet', slug: 'abs-mirror-cabinet' },
];

export const products: Product[] = [
  // Napkin Holders
  {
    id: 'n1',
    name: 'Wave Premium Napkin Holder',
    category: 'Stainless steel napkin holder',
    categorySlug: 'stainless-steel-napkin-holder',
    price: '₹899',
    image: '/images/products/napkin-holder.jpeg',
    description: 'A stylish and durable napkin holder with a modern wave pattern. Ideal for both home and commercial use.',
    specs: { material: '304 Grade SS', finish: 'Mirror Chrome', warranty: '1 Year', installation: 'Table Top' }
  },
  {
    id: 'n2',
    name: 'Square Classic Napkin Stand',
    category: 'Stainless steel napkin holder',
    categorySlug: 'stainless-steel-napkin-holder',
    price: '₹649',
    image: '/images/products/napkin-holder (2).jpeg',
    description: 'Timeless square design that complements any dining decor. Rust-resistant and easy to clean.',
    specs: { material: '202 Grade SS', finish: 'Silver Silk', warranty: '6 Months', installation: 'Table Top' }
  },
  {
    id: 'n3',
    name: 'Elegant Curve Napkin Holder',
    category: 'Stainless steel napkin holder',
    categorySlug: 'stainless-steel-napkin-holder',
    price: '₹749',
    image: '/images/products/napkin-holder (3).png',
    description: 'Premium curved design for a sophisticated table setting.',
    specs: { material: '304 Grade SS', finish: 'Mirror Finish', warranty: '1 Year', installation: 'Table Top' }
  },
  {
    id: 'n4',
    name: 'Modern Minimalist Napkin Stand',
    category: 'Stainless steel napkin holder',
    categorySlug: 'stainless-steel-napkin-holder',
    price: '₹599',
    image: '/images/products/napkin-holder (4).jpeg',
    description: 'Sleek and modern minimalist design for contemporary homes.',
    specs: { material: 'SS 202', finish: 'Chrome', warranty: '6 Months', installation: 'Table Top' }
  },

  // Bathroom Shelves
  {
    id: 'b1',
    name: 'Double Layer Luxury Shelf',
    category: 'Bathroom shelf',
    categorySlug: 'bathroom-shelf',
    price: '₹2,499',
    image: '/images/products/bathroom-shelf.jpeg',
    description: 'Maximize your bathroom space with this elegant two-tier shelf. Perfect for towels and toiletries.',
    specs: { material: '304 Grade SS', finish: 'Mirror Polish', warranty: '2 Years', installation: 'Wall Mounted' }
  },
  {
    id: 'b2',
    name: 'Acrylic Corner Shelf',
    category: 'Bathroom shelf',
    categorySlug: 'bathroom-shelf',
    price: '₹1,299',
    image: '/images/products/bathroom-shelf (2).jpeg',
    description: 'Transparent high-quality acrylic corner shelf for a minimalist look.',
    specs: { material: 'High-Grade Acrylic', finish: 'Clear', warranty: '1 Year', installation: 'Wall Mounted' }
  },
  {
    id: 'b3',
    name: 'Premium Glass & SS Shelf',
    category: 'Bathroom shelf',
    categorySlug: 'bathroom-shelf',
    price: '₹1,899',
    image: '/images/products/bathroom-shelf (3).jpeg',
    description: 'Combination of tempered glass and stainless steel for a premium feel.',
    specs: { material: 'Glass & SS 304', finish: 'Chrome', warranty: '1 Year', installation: 'Wall Mounted' }
  },
  {
    id: 'b4',
    name: 'Compact Multi-utility Shelf',
    category: 'Bathroom shelf',
    categorySlug: 'bathroom-shelf',
    price: '₹999',
    image: '/images/products/bathroom-shelf (4).jpeg',
    description: 'Compact design perfect for small bathrooms or powder rooms.',
    specs: { material: 'SS 202', finish: 'Mirror Finish', warranty: '1 Year', installation: 'Wall Mounted' }
  },

  // Towel Racks
  {
    id: 't1',
    name: 'Swivel 4-Bar Towel Rack',
    category: 'Stainless steel towel rack',
    categorySlug: 'stainless-steel-towel-rack',
    price: '₹3,799',
    image: '/images/products/towel-rack.jpeg',
    description: 'Four independent rotating arms for maximum efficiency and quick drying of towels.',
    specs: { material: '304 Grade SS', finish: 'Chrome', warranty: '2 Years', installation: 'Wall Mounted' }
  },
  {
    id: 't2',
    name: 'Classic Multi-bar Towel Rack',
    category: 'Stainless steel towel rack',
    categorySlug: 'stainless-steel-towel-rack',
    price: '₹2,999',
    image: '/images/products/towel-rack (2).png',
    description: 'Heavy-duty multi-bar rack for family-sized towel storage.',
    specs: { material: '304 Grade SS', finish: 'Mirror Finish', warranty: '2 Years', installation: 'Wall Mounted' }
  },

  // Soap Dishes
  {
    id: 's1',
    name: 'Wall Mount Soap Holder',
    category: 'Stainless steel soap dish',
    categorySlug: 'stainless-steel-soap-dish',
    price: '₹499',
    image: '/images/products/soap-dish.jpeg',
    description: 'Simple, effective wall-mounted soap dish with drainage holes to keep soap dry.',
    specs: { material: 'SS 202', finish: 'Mirror', warranty: '1 Year', installation: 'Wall Mounted' }
  },
  {
    id: 's2',
    name: 'Dual-tier Soap Stand',
    category: 'Stainless steel soap dish',
    categorySlug: 'stainless-steel-soap-dish',
    price: '₹899',
    image: '/images/products/soap-dish (2).jpeg',
    description: 'Two-tier soap dish for storing multiple bars or a sponge.',
    specs: { material: '304 Grade SS', finish: 'Chrome', warranty: '1 Year', installation: 'Wall Mounted' }
  },
  {
    id: 's3',
    name: 'Designer Oval Soap Dish',
    category: 'Stainless steel soap dish',
    categorySlug: 'stainless-steel-soap-dish',
    price: '₹599',
    image: '/images/products/soap-dish (3).jpeg',
    description: 'Elegant oval design with premium finish.',
    specs: { material: 'SS 304', finish: 'Satin Silk', warranty: '1 Year', installation: 'Wall Mounted' }
  },

  // Tumblers
  {
    id: 'tu1',
    name: 'Premium Tumbler with Holder',
    category: 'Stainless steel tumbler',
    categorySlug: 'stainless-steel-tumbler',
    price: '₹849',
    image: '/images/products/stainless-steel-tumbler.jpeg',
    description: 'Sleek tumbler holder set including a high-quality glass tumbler and SS ring.',
    specs: { material: '304 Grade SS', finish: 'Polished', warranty: '1 Year', installation: 'Wall Mounted' }
  },
  {
    id: 'tu2',
    name: 'Dual Tumbler Holder Set',
    category: 'Stainless steel tumbler',
    categorySlug: 'stainless-steel-tumbler',
    price: '₹1,499',
    image: '/images/products/stainless-steel-tumbler (2).jpeg',
    description: 'Double tumbler holder for his and hers bathroom setup.',
    specs: { material: '304 Grade SS', finish: 'Chrome', warranty: '1 Year', installation: 'Wall Mounted' }
  },

  // Toilet Paper Holders
  {
    id: 'tp1',
    name: 'Covered Paper Holder',
    category: 'Stainless steel toilet paper holder',
    categorySlug: 'stainless-steel-toilet-paper-holder',
    price: '₹1,199',
    image: '/images/products/toilet-paper-holder.jpeg',
    description: 'Hygienic covered toilet paper holder to protect rolls from water splashes.',
    specs: { material: 'SS 304', finish: 'Mirror Chrome', warranty: '1 Year', installation: 'Wall Mounted' }
  },

  // Liquid Dispensers
  {
    id: 'ld1',
    name: 'Smart Soap Dispenser',
    category: 'Liquid dispenser',
    categorySlug: 'liquid-dispenser',
    price: '₹2,699',
    image: '/images/products/liquid-dispenser.jpeg',
    description: 'Press-style liquid soap dispenser with a large capacity and anti-clogging nozzle.',
    specs: { material: 'ABS & SS', finish: 'Silver/White', warranty: '1 Year', installation: 'Wall Mounted' }
  },
  {
    id: 'ld2',
    name: 'Premium Glass Dispenser',
    category: 'Liquid dispenser',
    categorySlug: 'liquid-dispenser',
    price: '₹1,899',
    image: '/images/products/liquid-dispenser (2).jpeg',
    description: 'Elegant glass dispenser with stainless steel pump.',
    specs: { material: 'Glass & SS', finish: 'Clear/Chrome', warranty: '1 Year', installation: 'Wall Mounted' }
  },

  // Mirror Cabinets
  {
    id: 'mc1',
    name: 'Vishwa Series Mirror Cabinet',
    category: 'ABS mirror cabinet',
    categorySlug: 'abs-mirror-cabinet',
    price: '₹4,299',
    image: '/images/products/abs-mirror-cabinet.jpg',
    description: 'High-quality ABS polymer cabinet with a premium mirror finish.',
    specs: { material: 'High-Strength ABS', finish: 'White Glossy', warranty: '2 Years', installation: 'Wall Mounted' }
  },
  {
    id: 'mc2',
    name: 'Elite Mirror Cabinet Plus',
    category: 'ABS mirror cabinet',
    categorySlug: 'abs-mirror-cabinet',
    price: '₹5,499',
    image: '/images/products/abs-mirror-cabinet (2).jpg',
    description: 'Extra large mirror cabinet with adjustable shelves.',
    specs: { material: 'High-Strength ABS', finish: 'Silver Glossy', warranty: '2 Years', installation: 'Wall Mounted' }
  },
];
