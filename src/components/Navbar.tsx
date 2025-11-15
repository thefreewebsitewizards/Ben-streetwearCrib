import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
export default function Navbar({ onLoginClick }: { onLoginClick?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
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
  return (<>
    <header className="sticky top-0 z-50 relative flex items-center justify-between whitespace-nowrap px-4 sm:px-10 lg:px-20 py-4 bg-transparent backdrop-blur-md border-b border-gray-200/40 dark:border-gray-800/40">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src="/logo-streetwear.webp" alt="streetwear" className="h-8 w-42 object-contain dark:invert dark:hue-rotate-[60deg] dark:saturate-150 dark:brightness-110" />
        </Link>
      </div>
      <nav className="hidden lg:flex flex-1 justify-center items-center gap-8">
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/products/all-sneakers">All Sneakers</Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/products/new-arrivals">New Arrivals</Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/products/new-releases">New Releases</Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/products/custom-and-unreleased">Custom &amp; Unreleased</Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/products/jordan">Jordan</Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/products/more-footwear">More Footwear</Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/admin">Admin</Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link to="/cart" aria-label="Open cart" className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-800/50 text-[#111318] dark:text-white">
          <span className="material-symbols-outlined text-xl">shopping_bag</span>
          {cartCount > 0 && <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">{cartCount}</span>}
        </Link>
        <button onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-label="Toggle navigation" className="relative lg:hidden flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-800/50 text-[#111318] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
          <span className="material-symbols-outlined text-xl">{menuOpen ? 'close' : 'menu'}</span>
        </button>
        <button onClick={onLoginClick} className="hidden lg:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
          <span className="truncate">Login</span>
        </button>
      </div>
      {menuOpen && (
        <div className="absolute inset-x-0 top-full lg:hidden bg-foreground-light dark:bg-foreground-dark border-t border-gray-200 dark:border-gray-800 px-4 sm:px-10 lg:px-20 py-4 rounded-b-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-200 ease-out max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <Link className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/all-sneakers" onClick={() => setMenuOpen(false)}><span>All Sneakers</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
            <Link className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/new-arrivals" onClick={() => setMenuOpen(false)}><span>New Arrivals</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
            <Link className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/new-releases" onClick={() => setMenuOpen(false)}><span>New Releases</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
            <Link className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/custom-and-unreleased" onClick={() => setMenuOpen(false)}><span>Custom &amp; Unreleased</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
            <Link className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/jordan" onClick={() => setMenuOpen(false)}><span>Jordan</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
            <Link className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors" to="/products/more-footwear" onClick={() => setMenuOpen(false)}><span>More Footwear</span><span className="material-symbols-outlined text-base">chevron_right</span></Link>
            <div className="pt-2">
              <button onClick={() => { onLoginClick?.(); setMenuOpen(false) }} className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">Login</button>
            </div>
          </div>
        </div>
      )}
    </header>

    </>
  )
}