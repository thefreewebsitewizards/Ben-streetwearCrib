import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, query, limit, where } from 'firebase/firestore'
import Hero from '../components/Hero'

export default function Home() {
  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null)
  const directionRef = useRef(1)
  const posRef = useRef(0)
  const widthRef = useRef(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Products for Carousel (using products collection instead of carouselItems)
        const productsRef = collection(db, 'products');
        // Fetch products specifically for the Home carousel category
        const carouselQuery = query(productsRef, where('categories', 'array-contains', 'Home carousel'), limit(8)); 
        const carouselSnapshot = await getDocs(carouselQuery);
        const fetchedItems: any[] = carouselSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name,
            subtitle: `$${data.price}`, // Show price as subtitle
            imageUrl: data.imageUrl || (data.images && data.images[0]) || 'https://placehold.co/400x400?text=No+Image',
            alt: data.name,
            // Include full product data for the Link state
            price: `$${data.price}`,
            category: data.category,
            description: data.description,
            shippingInfo: data.shippingInfo,
            materialsCare: data.materialsCare,
            sizes: data.sizes || [],
            images: data.images || [],
            colors: data.colors || [],
            color: data.color,
            rating: data.rating,
            reviewCount: data.reviewCount,
            src: data.imageUrl || (data.images && data.images[0]) // specific for product details compatibility if needed
          };
        });
        setCarouselItems(fetchedItems);

        // Fetch Best Selling Products
        const q = query(productsRef, where('categories', 'array-contains', 'Best Selling'), limit(4));
        const productSnapshot = await getDocs(q);
        const fetchedProducts = productSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.name,
                subtitle: data.description ? data.description.substring(0, 30) + '...' : 'Premium Footwear',
                price: `$${data.price}`,
                alt: data.name,
                src: data.imageUrl || (data.images && data.images[0]) || 'https://placehold.co/400x500?text=No+Image',
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
        });
        setBestSellingProducts(fetchedProducts);

      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading || carouselItems.length === 0) return;

    const container = carouselRef.current
    if (!container) return
    const track = container.querySelector('.carousel-track') as HTMLElement | null
    if (!track) return

    // Clean up any existing clones from previous renders
    const existingClones = track.querySelectorAll('.clone');
    existingClones.forEach(c => c.remove());

    const originals = Array.from(track.children);
    originals.forEach(el => {
      const clone = el.cloneNode(true) as HTMLElement
      clone.classList.add('clone');
      track.appendChild(clone)
    })
    widthRef.current = track.scrollWidth / 2
    
    let frame = 0
    const step = () => {
      posRef.current += directionRef.current * 0.8
      if (posRef.current >= widthRef.current) posRef.current -= widthRef.current
      if (posRef.current < 0) posRef.current += widthRef.current
      track.style.transform = `translate3d(${-posRef.current}px,0,0)`
      track.style.willChange = 'transform'
      frame = requestAnimationFrame(step)
    }
    
    let dragging = false
    let startX = 0
    let startPos = 0
    let isClick = true
    
    const onDown = (e: PointerEvent) => {
      dragging = true
      isClick = true
      startX = e.clientX
      startPos = posRef.current
      directionRef.current = 0
      container.setPointerCapture?.(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const delta = e.clientX - startX
      if (Math.abs(delta) > 5) isClick = false
      posRef.current = startPos - delta
    }
    const onUp = () => {
      dragging = false
      directionRef.current = 1
    }
    const onTouchStart = (e: TouchEvent) => {
      dragging = true
      isClick = true
      startX = e.touches[0].clientX
      startPos = posRef.current
      directionRef.current = 0
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return
      const delta = e.touches[0].clientX - startX
      if (Math.abs(delta) > 5) {
        isClick = false
        // Only prevent default if scrolling horizontally
        if (e.cancelable) e.preventDefault() 
      }
      posRef.current = startPos - delta
    }
    const onMouseDown = (e: MouseEvent) => {
      dragging = true
      isClick = true
      startX = e.clientX
      startPos = posRef.current
      directionRef.current = 0
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return
      const delta = e.clientX - startX
      if (Math.abs(delta) > 5) isClick = false
      posRef.current = startPos - delta
    }

    const handleClick = (e: Event) => {
        if (!isClick) {
            e.preventDefault()
            e.stopPropagation()
            return
        }

        // Find the closest element with data-product attribute
        const target = e.target as HTMLElement
        const productEl = target.closest('[data-product]') as HTMLElement
        
        if (productEl) {
            e.preventDefault()
            e.stopPropagation()
            try {
                const product = JSON.parse(productEl.dataset.product || '{}')
                if (product.title) {
                    const slug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '')
                    navigate(`/product/${slug}`, { state: { product } })
                }
            } catch (err) {
                console.error('Error parsing product data', err)
            }
        }
    }
    
    track.addEventListener('pointerdown', onDown, { passive: false })
    track.addEventListener('pointermove', onMove, { passive: false })
    track.addEventListener('pointerup', onUp)
    track.addEventListener('pointerleave', onUp)
    track.addEventListener('pointercancel', onUp)
    track.addEventListener('touchstart', onTouchStart, { passive: false })
    track.addEventListener('touchmove', onTouchMove, { passive: false })
    track.addEventListener('touchend', onUp)
    track.addEventListener('mousedown', onMouseDown)
    track.addEventListener('click', handleClick, { capture: true }) // Capture to handle before internal links
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onUp)
    
    frame = requestAnimationFrame(step)
    
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('pointerdown', onDown)
      track.removeEventListener('pointermove', onMove)
      track.removeEventListener('pointerup', onUp)
      track.removeEventListener('pointerleave', onUp)
      track.removeEventListener('pointercancel', onUp)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove', onTouchMove)
      track.removeEventListener('touchend', onUp)
      track.removeEventListener('mousedown', onMouseDown)
      track.removeEventListener('click', handleClick, { capture: true })
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onUp)
      
      const clones = track.querySelectorAll('.clone');
      clones.forEach(c => c.remove());
    }
  }, [loading, carouselItems])

  return (
    <main className="flex flex-col">
      <Hero />
      <section id="new-arrivals" className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        {loading ? (
             <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Loading carousel items...</p>
             </div>
        ) : (
            <div ref={carouselRef} className="relative overflow-hidden touch-pan-x cursor-grab active:cursor-grabbing select-none">
            <div className="flex items-stretch p-2 gap-6 carousel-track touch-pan-x cursor-grab active:cursor-grabbing select-none">
                {carouselItems.map((item) => (
                <div 
                    key={item.id} 
                    className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-foreground-light border border-gray-200 min-w-[280px] sm:min-w-[320px] snap-center"
                    data-product={JSON.stringify(item)}
                >
                    <Link 
                        to={`/product/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '')}`}
                        state={{ product: item }}
                        className="block w-full"
                    >
                        <div
                        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl flex flex-col cursor-pointer transition-opacity hover:opacity-90"
                        data-alt={item.alt}
                        style={{ backgroundImage: `url("${item.imageUrl}")` }}
                        ></div>
                    </Link>
                    <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                    <div>
                        <p className="text-base font-semibold">{item.title}</p>
                        <p className="text-sm font-bold text-primary">{item.subtitle}</p>
                    </div>
                    <Link 
                        to={`/product/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '')}`}
                        state={{ product: item }}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                        <span className="truncate">Shop Now</span>
                    </Link>
                    </div>
                </div>
                ))}
            </div>
            </div>
        )}
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight pb-4 flex items-center gap-2">
            Our Collection
          </h2>
          <p className="text-gray-500 max-w-3xl text-lg">
             Discover premium shoes, trend-driven apparel, and timeless watches, carefully selected to match your lifestyle. From streetwear to luxury, everything you need in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/products/hoodies"
            className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-6 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group"
            data-alt="The Drip Collection"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("/thedripcollection.webp")' }}
          >
            <p className="text-white text-xl font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-300 flex items-center gap-2">
              The Drip Collection <span className="material-symbols-outlined">arrow_forward</span>
            </p>
          </Link>
          <Link
            to="/products/watches"
            className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-6 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group"
            data-alt="Watches"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("/watches.webp")' }}
          >
            <p className="text-white text-xl font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-300 flex items-center gap-2">
              Watches <span className="material-symbols-outlined">arrow_forward</span>
            </p>
          </Link>
          <Link
            to="/products/all-sneakers"
            className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-6 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group"
            data-alt="Solo Drip"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("/solodrip.webp")' }}
          >
            <p className="text-white text-xl font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-300 flex items-center gap-2">
              Solo Drip <span className="material-symbols-outlined">arrow_forward</span>
            </p>
          </Link>
        </div>
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="w-full md:w-1/2 h-[500px] md:h-[600px] relative bg-gray-50 flex items-center justify-center">
            <img 
              src="/banner.jpeg" 
              alt="New Collection Arriving This Fall" 
              className="absolute inset-0 w-full h-full object-contain object-center"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-start gap-6">
            <h3 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight flex items-center gap-2">
              Step Into the Future 
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Explore our exclusive range of high-performance sneakers designed for comfort and style. Find your perfect pair today.
            </p>
            <Link 
              to="/products/all-sneakers"
              className="flex items-center justify-center px-8 py-4 bg-primary text-white text-lg font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-1"
            >
              Shop Shoes
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight px-4 pb-6 flex items-center gap-2">
          Best Selling <span className="material-symbols-outlined">arrow_forward</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellingProducts.length > 0 ? (
            bestSellingProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '')}`}
                state={{ product: product }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl bg-gray-100 aspect-square">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={product.alt}
                    src={product.src}
                  />
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold text-[#111318]">{product.title}</h4>
                  <p className="text-primary font-bold">{product.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">No products found.</div>
          )}
        </div>
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto text-center">
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <h4 className="font-bold text-lg">Huge Product Range</h4>
            <p className="text-text-muted-light mt-1 text-sm">Explore hundreds of styles from exclusive collections to timeless classics.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">sell</span>
            </div>
            <h4 className="font-bold text-lg">Best Price</h4>
            <p className="text-text-muted-light mt-1 text-sm">We guarantee premium quality footwear at competitive prices.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <h4 className="font-bold text-lg">Quick Shipping</h4>
            <p className="text-text-muted-light mt-1 text-sm">Fast, reliable, and free shipping on all orders over $150.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <h4 className="font-bold text-lg">Dedicated Support</h4>
            <p className="text-text-muted-light mt-1 text-sm">Our team is here to help you with any questions, 24/7.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
