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
    if (!auth) {
        console.error('Auth object is missing!');
        return;
    }
    try {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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

  return (
    <div className="sticky top-0 z-[1000] w-full">
      <header className="relative flex items-center justify-between px-6 sm:px-12 lg:px-40 h-26 bg-primary text-white shadow-lg">
        
        {/* Left Side (Desktop) / Cart (Mobile) */}
        <div className="flex items-center flex-1 justify-start gap-10">
            {/* Mobile Cart Button */}
            <Link to="/cart" aria-label="Open cart" className="lg:hidden relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors">
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                {cartCount > 0 && <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-primary text-[10px] font-bold">{cartCount}</span>}
            </Link>

            {/* Desktop Left Links */}
            <div className="hidden lg:flex items-center gap-10">
                {user?.uid === ADMIN_UID && (
                    <Link className="text-sm font-bold uppercase tracking-wider hover:text-red-100 transition-colors" to="/admin">Admin</Link>
                )}
                <Link className="text-sm font-bold uppercase tracking-wider hover:text-red-100 transition-colors" to="/products/all-products">All Products</Link>
                <Link className="text-sm font-bold uppercase tracking-wider hover:text-red-100 transition-colors" to="/products/new-releases">New Releases</Link>
            </div>
        </div>

        {/* Center Logo - Fits inside navbar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] flex justify-center pointer-events-none">
             {/* pointer-events-auto wrapper for the link to ensure it's clickable */}
            <Link to="/" className="pointer-events-auto relative block h-26 flex items-center justify-center">
                <img 
                    src="/reds-logo2.png" 
                    alt="Redslogo" 
                    className="h-full max-w-none rounded-lg object-contain drop-shadow-sm" 
                />
            </Link>
        </div>

        {/* Right Side (Desktop) / Hamburger (Mobile) */}
        <div className="flex items-center flex-1 justify-end gap-10">
             {/* Desktop Right Links */}
             <div className="hidden lg:flex items-center gap-10">
                 {/* Shoes Dropdown */}
                <div className="relative group">
                    <button className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider hover:text-red-100 transition-colors py-2">
                        Shoes <span className="material-symbols-outlined text-lg">expand_more</span>
                    </button>
                    <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px]">
                        <div className="bg-white text-gray-800 border border-gray-100 rounded-xl shadow-lg p-2 flex flex-col gap-1">
                            <Link to="/products/jordan" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Jordan</Link>
                            <Link to="/products/nike" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Nike</Link>
                            <Link to="/products/adidas" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Adidas</Link>
                            <Link to="/products/puma" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Puma</Link>
                            <Link to="/products/pre-owned" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Pre-owned</Link>
                            <Link to="/products/other-styles" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Other Styles</Link>
                        </div>
                    </div>
                </div>

                {/* Gear Dropdown */}
                <div className="relative group">
                    <button className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider hover:text-red-100 transition-colors py-2">
                        Gear <span className="material-symbols-outlined text-lg">expand_more</span>
                    </button>
                    <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px]">
                        <div className="bg-white text-gray-800 border border-gray-100 rounded-xl shadow-lg p-2 flex flex-col gap-1">
                            <Link to="/products/hats" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Hats</Link>
                            <Link to="/products/watches" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Watches</Link>
                            <Link to="/products/shirts" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Shirts</Link>
                            <Link to="/products/hoodies" className="px-3 py-2 hover:bg-red-50 hover:text-primary rounded-lg text-sm font-medium transition-colors block">Hoodies</Link>
                        </div>
                    </div>
                </div>
             </div>

             {/* Cart & Login */}
             <div className="flex items-center gap-4">
                <Link to="/cart" aria-label="Open cart" className="hidden lg:flex relative h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">shopping_bag</span>
                    {cartCount > 0 && <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-primary text-[10px] font-bold">{cartCount}</span>}
                </Link>
                <button onClick={handleAuthAction} className="hidden lg:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-white text-primary text-sm font-bold leading-normal hover:bg-gray-100 transition-colors shadow-sm">
                    <span className="truncate">{user ? 'Sign Out' : 'Login'}</span>
                </button>
                 {/* Mobile Menu Button */}
                <button onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-label="Toggle navigation" className="lg:hidden relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">{menuOpen ? 'close' : 'menu'}</span>
                </button>
             </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-x-0 top-[80px] bottom-0 lg:hidden z-[999] bg-foreground-light border-t border-gray-200 px-4 sm:px-10 lg:px-20 pt-8 pb-4 transition-all duration-200 ease-out overflow-y-auto">
            <div className="flex flex-col gap-0.5">
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/all-products" onClick={() => setMenuOpen(false)}><span>All Products</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/new-arrivals" onClick={() => setMenuOpen(false)}><span>New Arrivals</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/new-releases" onClick={() => setMenuOpen(false)}><span>New Releases</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <div className="border-t border-gray-200 my-1"></div>
              <p className="px-3 py-1 text-xs font-bold text-text-muted-light uppercase tracking-wider">Shoes</p>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/jordan" onClick={() => setMenuOpen(false)}><span>Jordan</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/nike" onClick={() => setMenuOpen(false)}><span>Nike</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/adidas" onClick={() => setMenuOpen(false)}><span>Adidas</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/puma" onClick={() => setMenuOpen(false)}><span>Puma</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/pre-owned" onClick={() => setMenuOpen(false)}><span>Pre-owned</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/other-styles" onClick={() => setMenuOpen(false)}><span>Other Styles</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <div className="border-t border-gray-200 my-1"></div>
              <p className="px-3 py-1 text-xs font-bold text-text-muted-light uppercase tracking-wider">Gear</p>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/hats" onClick={() => setMenuOpen(false)}><span>Hats</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/watches" onClick={() => setMenuOpen(false)}><span>Watches</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/shirts" onClick={() => setMenuOpen(false)}><span>Shirts</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <Link className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-gray-100 text-sm font-medium transition-colors" to="/products/hoodies" onClick={() => setMenuOpen(false)}><span>Hoodies</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
              <div className="pt-2">
                <button onClick={() => { handleAuthAction(); setMenuOpen(false) }} className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">{user ? 'Sign Out' : 'Login'}</button>
              </div>
            </div>
        </div>
      )}
    </div>
  )
}