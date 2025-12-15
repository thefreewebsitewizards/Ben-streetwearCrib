import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

interface Product {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    alt: string;
    src: string;
    category?: string;
    categories?: string[];
    description?: string;
    shippingInfo?: string;
    materialsCare?: string;
    sizes?: string[];
    images?: string[];
    colors?: string[];
    color?: string;
    rating?: number;
    reviewCount?: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>()
  
  const displayNameBySlug: Record<string, string> = {
    'all-products': 'All Products',
    'new-releases': 'New Releases',
    'jordan': 'Jordan',
    'nike': 'Nike',
    'adidas': 'Adidas',
    'puma': 'Puma',
    'pre-owned': 'Pre-owned',
    'other-styles': 'Other Styles',
    'reviews': 'Reviews',
    'hats': 'Hats',
    'watches': 'Watches',
    'shirts': 'Shirts',
    'hoodies': 'Hoodies',
    'all-sneakers': 'Shoes',
  }
  const heading = (slug && displayNameBySlug[slug]) || 'All Products'

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const productsRef = collection(db, 'products');
            let q = query(productsRef);

            if (slug === 'all-sneakers') {
                q = query(productsRef, where('categories', 'array-contains-any', ['Shoes', 'Sneakers', 'Jordan', 'Nike', 'Adidas', 'Puma', 'Pre-owned', 'Other Styles']));
            } else if (slug && slug !== 'all-products' && displayNameBySlug[slug]) {
                // Use array-contains to check if the category is in the categories array
                q = query(productsRef, where('categories', 'array-contains', displayNameBySlug[slug]));
            }

            const querySnapshot = await getDocs(q);
            const fetchedProducts: Product[] = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.name,
                    subtitle: data.description ? data.description.substring(0, 30) + '...' : 'Premium Footwear',
                    price: `$${data.price}`,
                    alt: data.name,
                    src: data.imageUrl || 'https://placehold.co/400x500?text=No+Image',
                    category: data.category,
                    categories: data.categories || (data.category ? [data.category] : []),
                    description: data.description,
                    shippingInfo: data.shippingInfo,
                    materialsCare: data.materialsCare,
                    sizes: data.sizes || [],
                    images: data.images || [],
                    colors: data.colors || [],
                    color: data.color,
                    rating: data.rating,
                    reviewCount: data.reviewCount
                };
            });
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products: ", error);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
  }, [slug]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <main className="flex-1">
              <div className="px-4 py-12 md:py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900">{heading}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-base text-primary">Discover our curated collection of luxury footwear, crafted for the modern individual.</p>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-20">
                    <p className="text-gray-500">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="flex justify-center items-center py-20">
                    <p className="text-gray-500">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 p-4">
                    {products.map((p) => (
                    <Link
                        key={p.id}
                        to={`/product/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '')}`}
                        state={{ product: p }}
                        className="flex flex-col gap-3 group"
                    >
                        <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl overflow-hidden bg-gray-100">
                        <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={p.alt} src={p.src} />
                        </div>
                        <div>
                        <p className="text-base font-medium text-gray-900">{p.title}</p>
                        <p className="text-sm text-gray-500">{p.subtitle}</p>
                        <p className="mt-1 text-sm font-bold text-primary">{p.price}</p>
                        </div>
                    </Link>
                    ))}
                </div>
              )}

              <div className="flex items-center justify-center py-10 md:py-16">
                <a className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-gray-900" href="#">
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold bg-primary text-white" href="#">1</a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100" href="#">2</a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100" href="#">3</a>
                <span className="flex h-10 w-10 items-center justify-center text-sm text-gray-600">...</span>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100" href="#">9</a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100" href="#">10</a>
                <a className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-gray-900" href="#">
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}