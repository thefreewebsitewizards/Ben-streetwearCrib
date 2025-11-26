import { useParams, useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, query, limit, where } from 'firebase/firestore'

interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  alt: string;
  src: string;
  category?: string;
  description?: string;
  shippingInfo?: string;
  materialsCare?: string;
  sizes?: string[];
  images?: string[];
  color?: string;
  colors?: string[];
  rating?: number;
  reviewCount?: number;
}

export default function ProductDetails() {
  const { state } = useLocation() as { state?: { product?: Product } }
  const { slug } = useParams()
  
  const [product, setProduct] = useState<Product | null>(state?.product || null)
  const [loading, setLoading] = useState(!state?.product)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState<string>('')

  const fromSlug = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : undefined
  const productTitle = product?.title || fromSlug || 'Product Details'
  const price = product?.price || ''
  
  const safeColors = Array.isArray(product?.colors) ? product.colors : [];
  const safeRating = typeof product?.rating === 'string' ? parseFloat(product.rating) : (product?.rating || 0);
  const safeReviewCount = typeof product?.reviewCount === 'string' ? parseInt(product.reviewCount) : (product?.reviewCount || 0);
  const safeSizes = Array.isArray(product?.sizes) ? product.sizes : [];

  useEffect(() => {
    if (product) {
        setActiveImage(product.src || (product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/600x600?text=No+Image'));
        if (safeColors.length > 0) {
            setSelectedColor(safeColors[0]);
        } else if (product.color) {
            setSelectedColor(product.color);
        }
    }
  }, [product]);

  // Fetch product if not in state (direct link access)
  useEffect(() => {
    if (state?.product) {
        setProduct(state.product);
        setLoading(false);
        return;
    }

    const fetchProductBySlug = async () => {
        if (!slug) return;
        setLoading(true);
        try {
            // Since we don't have a slug field, we fetch all and match (fallback)
            // Ideally, we should have a slug field in Firestore.
            const querySnapshot = await getDocs(collection(db, 'products'));
            const foundDoc = querySnapshot.docs.find(doc => {
                const data = doc.data();
                const generatedSlug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '');
                return generatedSlug === slug;
            });

            if (foundDoc) {
                const data = foundDoc.data();
                setProduct({
                    id: foundDoc.id,
                    title: data.name,
                    subtitle: data.description ? data.description.substring(0, 30) + '...' : 'Premium Footwear',
                    price: `$${data.price}`,
                    alt: data.name,
                    src: data.imageUrl || (data.images && data.images.length > 0 ? data.images[0] : 'https://placehold.co/600x600?text=No+Image'),
                    category: data.category,
                    description: data.description,
                    shippingInfo: data.shippingInfo,
                    materialsCare: data.materialsCare,
                    sizes: data.sizes || [],
                    images: data.images || [],
                    colors: data.colors || [],
                    rating: data.rating,
                    reviewCount: data.reviewCount,
                    color: data.color // Keep for backward compatibility or default
                });
            } else {
                setProduct(null);
            }
        } catch (error) {
            console.error("Error fetching product: ", error);
        } finally {
            setLoading(false);
        }
    };

    fetchProductBySlug();
  }, [slug, state]);

  // Fetch related products
  useEffect(() => {
    const fetchRelated = async () => {
        try {
            const productsRef = collection(db, 'products');
            // Filter by "Best Selling" category as requested
            const q = query(
                productsRef, 
                where('categories', 'array-contains', 'Best Selling'),
                limit(10) 
            );
            const querySnapshot = await getDocs(q);
            
            const mapProduct = (doc: any) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.name,
                    subtitle: data.description ? data.description.substring(0, 30) + '...' : 'Premium Footwear',
                    price: `$${data.price}`,
                    alt: data.name,
                    src: data.imageUrl || 'https://placehold.co/400x500?text=No+Image',
                    category: data.category,
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
            };

            let related = querySnapshot.docs
                .map(mapProduct)
                .filter(p => p.id !== product?.id);

            // Fallback: If we don't have 4 Best Selling products (excluding current), fetch generic ones
            if (related.length < 4) {
                const q2 = query(productsRef, limit(10));
                const snap2 = await getDocs(q2);
                const generic = snap2.docs
                    .map(mapProduct)
                    .filter(p => p.id !== product?.id && !related.find(r => r.id === p.id));
                
                related = [...related, ...generic];
            }

            setRelatedProducts(related.slice(0, 4));
        } catch (error) {
            console.error("Error fetching related products: ", error);
        }
    };

    fetchRelated();
  }, [product?.id]);

  const [quantity, setQuantity] = useState(1)
  const handleAddToCart = () => {
    try {
      const raw = localStorage.getItem('cartItems')
      const items = raw ? JSON.parse(raw) : []
      const toAdd = Array.from({ length: Math.max(1, quantity) }, () => ({ title: productTitle, price, src: activeImage }))
      const next = Array.isArray(items) ? items.concat(toAdd) : toAdd
      localStorage.setItem('cartItems', JSON.stringify(next))
    } catch {
      const count = Number(localStorage.getItem('cartCount')) || 0
      localStorage.setItem('cartCount', String(count + Math.max(1, quantity)))
    }
    window.dispatchEvent(new Event('cartUpdated'))
  }

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-background-light dark:bg-background-dark">
            <p className="text-gray-500 dark:text-gray-400">Loading product details...</p>
        </div>
    );
  }

  if (!product) {
      return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-background-light dark:bg-background-dark gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-xl">Product not found.</p>
            <Link to="/products/all-sneakers" className="text-primary hover:underline">Browse all sneakers</Link>
        </div>
      );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1">
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  <Link to="/" className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">Home</Link>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">/</span>
                  <Link to="/products/all-sneakers" className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">Shoes</Link>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">/</span>
                  <span className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">{productTitle}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
                <div className="flex flex-col gap-4">
                  <div className="w-full aspect-square bg-white dark:bg-slate-800/50 rounded-xl shadow-sm overflow-hidden">
                    <img alt={product?.alt || productTitle} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" src={activeImage} />
                  </div>
                  {product?.images && product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setActiveImage(img)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
                            >
                                <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap justify-between gap-3"><p className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">{productTitle}</p></div>
                  <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-normal pb-3 pt-1">{product.subtitle}</p>
                  <div className="flex items-center gap-2 my-2">
                    <div className="flex text-primary">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const rating = safeRating;
                        if (rating >= star) {
                          return <span key={star} className="material-symbols-outlined text-xl">star</span>;
                        } else if (rating >= star - 0.5) {
                          return <span key={star} className="material-symbols-outlined text-xl">star_half</span>;
                        } else {
                          return <span key={star} className="material-symbols-outlined text-xl text-slate-300 dark:text-slate-600">star</span>;
                        }
                      })}
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {safeRating ? `${safeRating} stars` : 'No ratings yet'} 
                        {safeReviewCount ? ` (${safeReviewCount} reviews)` : ''}
                    </span>
                  </div>
                  <h1 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-left pb-3 pt-5">{price}</h1>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Color: <span className="font-normal">{selectedColor || product.color || 'Not specified'}</span></h3>
                    <div className="flex items-center gap-3">
                        {safeColors.length > 0 ? (
                            safeColors.map((c, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => setSelectedColor(c)}
                                    className={`w-8 h-8 rounded-full cursor-pointer ring-2 ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark border border-slate-200 dark:border-slate-700 ${selectedColor === c ? 'ring-primary' : 'ring-transparent'}`}
                                    style={{ backgroundColor: c.toLowerCase() }}
                                    title={c}
                                ></div>
                            ))
                        ) : product.color ? (
                            <div 
                                className="w-8 h-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark border border-slate-200 dark:border-slate-700"
                                style={{ backgroundColor: product.color.toLowerCase() }}
                                title={product.color}
                            ></div>
                        ) : null}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Size</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {safeSizes.length > 0 ? (
                        safeSizes.map((size) => (
                          <button 
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`p-3 border rounded-lg text-center text-sm font-medium transition-colors ${
                              selectedSize === size 
                              ? 'border-primary dark:border-primary bg-primary/10 dark:bg-primary/20 text-primary dark:text-white' 
                              : 'border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {size}
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-slate-500 col-span-4">No sizes available.</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg">
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary"><span className="material-symbols-outlined text-base">remove</span></button>
                      <span className="px-4 font-semibold text-slate-800 dark:text-slate-200">{quantity}</span>
                      <button onClick={() => setQuantity(q => q + 1)} className="p-3 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary"><span className="material-symbols-outlined text-base">add</span></button>
                    </div>
                    <button onClick={handleAddToCart} className="flex-1 text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 font-semibold rounded-lg text-base px-6 py-3.5 text-center dark:focus:ring-primary/80 transition-colors">Add to Cart</button>
                  </div>
                  <button className="mt-4 w-full text-primary dark:text-white bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 font-semibold rounded-lg text-base px-6 py-3.5 text-center transition-colors">Buy Now</button>
                  <div className="mt-8 space-y-4">
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Product Description</h4>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{product.description || 'No description available.'}</p>
                    </div>
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Materials &amp; Care</h4>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{product.materialsCare || 'No materials information available.'}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Shipping &amp; Returns</h4>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{product.shippingInfo || 'No shipping information available.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 bg-white dark:bg-slate-900/50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">You Might Also Like</h2>
              <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-stretch p-4 gap-6">
                  {relatedProducts.map((r) => (
                    <Link to={`/product/${r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '')}`} state={{ product: r }} key={r.id} className="flex flex-col gap-2 rounded-lg min-w-72 group cursor-pointer">
                      <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-xl flex flex-col transition-transform duration-300 group-hover:scale-105" data-alt={r.alt} style={{ backgroundImage: `url("${r.src}")` }}></div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mt-2">{r.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400">{r.price}</p>
                    </Link>
                  ))}
                  {relatedProducts.length === 0 && (
                      <p className="text-gray-500">No related products found.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
