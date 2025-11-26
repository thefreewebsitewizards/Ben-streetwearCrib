import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, query, limit, where } from 'firebase/firestore'

export default function Home() {
  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null)
  const directionRef = useRef(1)
  const posRef = useRef(0)
  const widthRef = useRef(0)

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
            price: data.price, // Keep raw price if needed
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
    const onDown = (e: PointerEvent) => {
      dragging = true
      startX = e.clientX
      startPos = posRef.current
      directionRef.current = 0
      container.setPointerCapture?.(e.pointerId)
      e.preventDefault()
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const delta = e.clientX - startX
      posRef.current = startPos - delta
    }
    const onUp = () => {
      dragging = false
      directionRef.current = 1
    }
    const onTouchStart = (e: TouchEvent) => {
      dragging = true
      startX = e.touches[0].clientX
      startPos = posRef.current
      directionRef.current = 0
      e.preventDefault()
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return
      const delta = e.touches[0].clientX - startX
      posRef.current = startPos - delta
      e.preventDefault()
    }
    const onMouseDown = (e: MouseEvent) => {
      dragging = true
      startX = e.clientX
      startPos = posRef.current
      directionRef.current = 0
      e.preventDefault()
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return
      const delta = e.clientX - startX
      posRef.current = startPos - delta
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
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onUp)
      
      const clones = track.querySelectorAll('.clone');
      clones.forEach(c => c.remove());
    }
  }, [loading, carouselItems])

  return (
    <main className="flex flex-col">
      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        {loading ? (
             <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 dark:text-gray-400">Loading carousel items...</p>
             </div>
        ) : (
            <div ref={carouselRef} className="relative overflow-hidden touch-pan-x cursor-grab active:cursor-grabbing select-none">
            <div className="flex items-stretch p-2 gap-6 carousel-track touch-pan-x cursor-grab active:cursor-grabbing select-none">
                {carouselItems.map((item) => (
                <div key={item.id} className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 min-w-[280px] sm:min-w-[320px] snap-center">
                    <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl flex flex-col"
                    data-alt={item.alt}
                    style={{ backgroundImage: `url("${item.imageUrl}")` }}
                    ></div>
                    <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                    <div>
                        <p className="text-base font-semibold">{item.title}</p>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{item.subtitle}</p>
                    </div>
                    <Link 
                        to={`/product/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '')}`}
                        state={{ product: item }}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight px-4 pb-6">Hot Right Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-6 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group"
            data-alt="A person wearing chunky sole sneakers walking on a city street"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZArQirr2R-Xn_6a3qmh-jCbC0P1WvOgzcMRSgRCXRmw7AvFsM__3Gxsy1aGuKzwqG3h69TelvM_iNUQQTvzewdf2VJ6hci72EybQ2O13qPj7EkzhLrH94yJyidLjS-5TJFfg4YxJIc7l7iUb3e8AzgPW4dSYxXRi4aORB9D0vg7JZTbUBG2xSAZN5BWagam6FYRixWJnYIpsJItF8BnA1FWYekxCd0VVXpWTe8eN2mdYLe2_ok1Hn86YwmTevSvfJ8fPpaeOcIG0")' }}
          >
            <p className="text-white text-xl font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-300">The Chunky Sole Edit</p>
          </div>
          <div
            className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-6 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group"
            data-alt="A pair of white minimalist high-top sneakers against a concrete wall"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNMMrcJYmeQRHnpyFiKlhpl7vk8ry8Xi9bIeItdygPtlEDifIVeWPZPdQhuL-F-a4HJjC5DRUt_l9Glt1sncoD3naKji5NR9aNRv9XX1F5TMX183Cdyrs2di0b74N9jBKzRCqMPd-_F46F4uXNBBN8lxbgEVQFBvudqH6jSi_AiXAnpV0T7hOVVTPLY7nW01HBZL8PsNNKM5ecN13X_AX1RzL6Km4g8dppWjfWNivYi0hqLGaf8IpuJS5kErWX-AGl7l-fEtZtcro")' }}
          >
            <p className="text-white text-xl font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-300">Minimalist High-Tops</p>
          </div>
          <div
            className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-6 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group"
            data-alt="Close-up on the side of a colorful retro runner sneaker"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAo4m08Q5nou8YgL0Mne7eJL0aZOZ5yXs36sBT_y47xE1YHEaU0zKHSzrDPxSbRR6qsj47hP073kJWpkFpjQjN9LK77jsGitnWGd3dPgxum5IVG7mBPSrzpJNKXj8nDWfOokEQMaKiFk7T1ZtQX9pdVs5tTXTVKsBhvSd3Eor_pyHFZ_fUYY2dyunTJSqGEkUxQr2qyjAr3ILv0Bbc2DVd5B9Tgvs8EyDvQLmJc1zumwNAlsW_ux5wIEocCrspa1DDb_JSAM34_f0")' }}
          >
            <p className="text-white text-xl font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-300">Retro Runners</p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        <div className="@container">
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden min-h-[300px] sm:min-h-[400px] rounded-xl"
            data-alt="Artistic close-up shot of a beige sneaker showing texture and material details"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 35%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuADtpo7l4d56IBJbGfFQjXJvKu4_nnJ1bC9ei8HWy5W5Hn6xiIM4V8DGMoS-hlSPbVJrNibuPheFt7LFPUutn8EwM0txUMcYw2c1cDQpL_K5a2R7EYyjDCU2vJLFvlsr8x_BZiM-l7INqbsrGMxcKjioFUfftHuajie_AqAPxP_D4BeEXvUu0kdsxevdihZzNKmn8N5scwLYlWB4qjvSXL5k3QnVs9Zir_-AIYATV8JHwNLtrOnNGl6vXFbBsldH2LB4h16yw90p5Y")' }}
          >
            <div className="flex flex-col p-6 sm:p-10 gap-4">
              <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-xl">New Collection Arriving This Fall</h3>
              <p className="text-gray-200 text-base sm:text-lg max-w-lg">Experience the next wave of design innovation. Timeless aesthetics meet cutting-edge comfort.</p>
              <div className="pt-2">
                <button className="flex min-w-[84px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white text-text-light text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 transition-colors">
                  <span className="truncate">Explore Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight px-4 pb-6">Best Selling</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellingProducts.length > 0 ? (
            bestSellingProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '')}`}
                state={{ product: product }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800/50 aspect-square">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={product.alt}
                    src={product.src}
                  />
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold text-[#111318] dark:text-white">{product.title}</h4>
                  <p className="text-text-muted-light dark:text-text-muted-dark">{product.price}</p>
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
            <p className="text-text-muted-light dark:text-text-muted-dark mt-1 text-sm">Explore hundreds of styles from exclusive collections to timeless classics.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">sell</span>
            </div>
            <h4 className="font-bold text-lg">Best Price</h4>
            <p className="text-text-muted-light dark:text-text-muted-dark mt-1 text-sm">We guarantee premium quality footwear at competitive prices.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <h4 className="font-bold text-lg">Quick Shipping</h4>
            <p className="text-text-muted-light dark:text-text-muted-dark mt-1 text-sm">Fast, reliable, and free shipping on all orders over $150.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <h4 className="font-bold text-lg">Dedicated Support</h4>
            <p className="text-text-muted-light dark:text-text-muted-dark mt-1 text-sm">Our team is here to help you with any questions, 24/7.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
