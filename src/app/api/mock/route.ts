import { NextResponse } from 'next/server';

// Generate a more comprehensive list of smartwatch features
const allFeatures = [
  'Heart Rate Monitoring',
  'GPS Tracking',
  'Sleep Analysis',
  'Stress Management',
  'Blood Oxygen Level',
  'ECG Monitoring',
  'Waterproof',
  'Workout Modes',
  'Music Control',
  'Notifications',
  'Battery Life Tracking',
  'Temperature Sensor',
];

// Generate a more detailed product list
const generateProducts = () => {
  return Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Smartwatch Pro ${index + 1}`,
    description: `Advanced smartwatch with cutting-edge health and fitness tracking technologies`,
    price: 199.99 + index * 10,
    rating: Number((4 + Math.random() * 1).toFixed(1)),
    reviews: 100 + Math.floor(Math.random() * 150),
    features: allFeatures.sort(() => 0.5 - Math.random()).slice(0, 4),
    image: `/images/smartwatch-${(index % 3) + 1}.webp`,
    colors: ['Black', 'Silver', 'Blue', 'Rose Gold'],
    inStock: Math.random() > 0.2, // 80% in stock
    discount:
      Math.random() > 0.5
        ? {
            percentage: Math.floor(10 + Math.random() * 20),
            validUntil: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
          }
        : null,
  }));
};

export async function GET(request: Request) {
  // Parse query parameters for pagination and filtering
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 12;
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || Infinity;
  const feature = searchParams.get('feature');

  // Generate products
  let products = generateProducts();

  // Apply filters
  products = products.filter(
    (product) =>
      product.price >= minPrice &&
      product.price <= maxPrice &&
      (feature ? product.features.includes(feature) : true)
  );

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return NextResponse.json({
    products: paginatedProducts,
    total: products.length,
    page,
    totalPages: Math.ceil(products.length / limit),
  });
}

// Optional: POST route for mock product creation
export async function POST(request: Request) {
  try {
    const newProduct = await request.json();

    // Basic validation
    if (!newProduct.name || !newProduct.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // Simulate product creation
    const createdProduct = {
      ...newProduct,
      id: generateProducts().length + 1,
      rating: 0,
      reviews: 0,
    };

    return NextResponse.json(createdProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid product data' },
      { status: 400 }
    );
  }
}
