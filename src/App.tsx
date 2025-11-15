import { Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import CategoryTicker from './components/CategoryTicker'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/Product-details'
import Signin from './components/Signin'
import Signup from './components/Signup'
import AdminPage from './pages/AdminPage'
import Cart from './pages/Cart'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const [modal, setModal] = useState<'signin' | 'signup' | null>(null)
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
      {!isAdmin && <CategoryTicker />}
      {!isAdmin && <Navbar onLoginClick={() => setModal('signin')} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!isAdmin && modal === 'signin' && (
        <Signin onClose={() => setModal(null)} onSwitchToSignup={() => setModal('signup')} />
      )}
      {!isAdmin && modal === 'signup' && (
        <Signup onClose={() => setModal(null)} onSwitchToSignin={() => setModal('signin')} />
      )}
      {!isAdmin && <Footer />}
    </div>
  )
}

export default App
