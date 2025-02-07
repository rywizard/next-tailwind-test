import { NextResponse } from 'next/server';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  image: string;
  colors: string[];
  inStock: boolean;
  discount: {
    percentage: number;
    validUntil: string;
  } | null;
}

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

const generateProducts = (count = 50): Product[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Smartwatch Pro ${index + 1}`,
    description: `Advanced smartwatch with cutting-edge health and fitness tracking technologies`,
    price: 199.99 + index * 10,
    rating: Number((4 + Math.random()).toFixed(1)),
    reviews: 100 + Math.floor(Math.random() * 150),
    features: allFeatures.sort(() => 0.5 - Math.random()).slice(0, 4),
    image: `/images/product.webp`,
    colors: ['Black', 'Silver', 'Blue', 'Rose Gold'],
    inStock: Math.random() > 0.2,
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
  const { searchParams } = new URL(request.url);

  const productId = Number(searchParams.get('id'));

  if (productId && !isNaN(Number(productId))) {
    const products = generateProducts();
    const product = products.find((p) => p.id === Number(productId));

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  }

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 12;
  const search = searchParams.get('search')?.toLowerCase();
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || Infinity;
  const feature = searchParams.get('feature');
  const inStock = searchParams.get('inStock');
  const sortBy = searchParams.get('sortBy') || 'price';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  let products = generateProducts();

  products = products.filter((product) => {
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);
    const matchesPrice =
      product.price >= minPrice &&
      (maxPrice === Infinity || product.price <= maxPrice);
    const matchesFeature = !feature || product.features.includes(feature);
    const matchesStock =
      inStock === null || product.inStock === (inStock === 'true');

    return matchesSearch && matchesPrice && matchesFeature && matchesStock;
  });

  products.sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'reviews':
        comparison = a.reviews - b.reviews;
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const total = products.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return NextResponse.json({
    products: paginatedProducts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: Request) {
  try {
    const product = await request.json();

    if (!product.name || !product.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const newProduct = {
      id: generateProducts().length + 1,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      rating: 0,
      reviews: 0,
      features: product.features || [],
      colors: product.colors || ['Black'],
      inStock: product.inStock ?? true,
      discount: null,
      image: product.image || '/images/product-default.webp',
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const id = Number(request.url.split('/').pop());
    const updates = await request.json();
    const products = generateProducts();
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updatedProduct = {
      ...products[productIndex],
      ...updates,
    };

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const id = Number(request.url.split('/').pop());
    const products = generateProducts();
    const productExists = products.some((p) => p.id === id);

    if (!productExists) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
