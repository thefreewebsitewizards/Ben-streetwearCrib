import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'

export default function Navbar({ onLoginClick }: { onLoginClick?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    console.log('Navbar mounted, auth object:', auth);
    if (!auth) {
        console.error('Auth object is missing!');
        return;
    }
    try {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('Auth state changed:', currentUser);
            setUser(currentUser)
        })
        return () => unsubscribe()
    } catch (error) {
        console.error('Error in onAuthStateChanged:', error);
    }
  }, [])

  const handleAuthAction = async () => {
    if (user) {
      try {
        await signOut(auth)
      } catch (error) {
        console.error('Error signing out:', error)
      }
    } else {
      onLoginClick?.()
    }
  }

  useEffect(() => {
    const readCount = () => {
      try {
        const raw = localStorage.getItem('cartItems')
        const items = raw ? JSON.parse(raw) : []
        const n = Array.isArray(items) ? items.length : Number(localStorage.getItem('cartCount')) || 0
        setCartCount(Number.isFinite(n) ? n : 0)
      } catch {
        const n = Number(localStorage.getItem('cartCount')) || 0
        setCartCount(Number.isFinite(n) ? n : 0)
      }
    }
    const onStorage = (_e: StorageEvent) => readCount()
    const onCartUpdated = (_e: Event) => readCount()
    readCount()
    window.addEventListener('storage', onStorage)
    window.addEventListener('cartUpdated', onCartUpdated)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('cartUpdated', onCartUpdated)
    }
  }, [])
  const ADMIN_UID = "bvBxlNqOpcTQF623WSMkmCInMY53";

  return (<>
    <header className="sticky top-0 z-[1000] relative flex items-center justify-between whitespace-nowrap px-4 sm:px-10 lg:px-20 py-4 bg-transparent backdrop-blur-md border-b border-gray-200/40 dark:border-gray-800/40">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src="/logo-streetwear.webp" alt="streetwear" className="h-8 w-42 object-contain dark:invert dark:hue-rotate-[60deg] dark:saturate-150 dark:brightness-110" />
        </Link>
      </div>
      <nav className="hidden lg:flex flex-1 justify-center items-center gap-8">
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/products/all-products">All Products</Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/products/new-arrivals">New Arrivals</Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/products/new-releases">New Releases</Link>
        
        {/* Shoes Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors py-2">
            Shoes
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px]">
            <div className="bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-2 flex flex-col gap-1">
              <Link to="/products/jordan" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors block">Jordan</Link>
              <Link to="/products/nike" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors block">Nike</Link>
              <Link to="/products/adidas" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors block">Adidas</Link>
            </div>
          </div>
        </div>
        
        {/* Gear Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors py-2">
            Gear
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px]">
            <div className="bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-2 flex flex-col gap-1">
              <Link to="/products/hats" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors block">Hats</Link>
              <Link to="/products/watches" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors block">Watches</Link>
              <Link to="/products/shirts" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors block">Shirts</Link>
              <Link to="/products/hoodies" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors block">Hoodies</Link>
            </div>
          </div>
        </div>

        {user?.uid === ADMIN_UID && (
          <Link className="text-sm font-medium hover:text-primary transition-colors" to="/admin">Admin</Link>
        )}
      </nav>
      <div className="flex items-center gap-4">
        <Link to="/cart" aria-label="Open cart" className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-800/50 text-[#111318] dark:text-white">
          <span className="material-symbols-outlined text-xl">shopping_bag</span>
          {cartCount > 0 && <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">{cartCount}</span>}
        </Link>
        <button onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-label="Toggle navigation" className="relative lg:hidden flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-800/50 text-[#111318] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
          <span className="material-symbols-outlined text-xl">{menuOpen ? 'close' : 'menu'}</span>
        </button>
        <button onClick={handleAuthAction} className="hidden lg:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
          <span className="truncate">{user ? 'Sign Out' : 'Login'}</span>
        </button>
      </div>
    </header>
    {menuOpen && (
      <div className="fixed inset-x-0 top-[75px] bottom-0 lg:hidden z-[999] bg-foreground-light dark:bg-foreground-dark border-t border-gray-200 dark:border-gray-800 px-4 sm:px-10 lg:px-20 pt-8 pb-4 transition-all duration-200 ease-out overflow-y-auto">
        <div className="flex flex-col gap-0.5">
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/all-products" onClick={() => setMenuOpen(false)}><span>All Products</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/new-arrivals" onClick={() => setMenuOpen(false)}><span>New Arrivals</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/new-releases" onClick={() => setMenuOpen(false)}><span>New Releases</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>
          <p className="px-3 py-1 text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Shoes</p>
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/jordan" onClick={() => setMenuOpen(false)}><span>Jordan</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/nike" onClick={() => setMenuOpen(false)}><span>Nike</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/adidas" onClick={() => setMenuOpen(false)}><span>Adidas</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>
          <p className="px-3 py-1 text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Gear</p>
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/hats" onClick={() => setMenuOpen(false)}><span>Hats</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/watches" onClick={() => setMenuOpen(false)}><span>Watches</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/shirts" onClick={() => setMenuOpen(false)}><span>Shirts</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/hoodies" onClick={() => setMenuOpen(false)}><span>Hoodies</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
          <div className="pt-2">
            <button onClick={() => { handleAuthAction(); setMenuOpen(false) }} className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">{user ? 'Sign Out' : 'Login'}</button>
          </div>
        </div>
      </div>
    )}

    </>
  )
}