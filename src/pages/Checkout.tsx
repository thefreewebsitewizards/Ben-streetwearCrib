import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';

interface CartItem {
  title: string;
  price: string;
  src: string;
}

interface GroupedCartItem extends CartItem {
  quantity: number;
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState<GroupedCartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('cartItems');
    if (raw) {
      try {
        const items: CartItem[] = JSON.parse(raw);
        
        // Group items for display and Stripe
        const grouped: { [key: string]: GroupedCartItem } = {};
        items.forEach(item => {
          const key = `${item.title}-${item.price}`;
          if (grouped[key]) {
            grouped[key].quantity += 1;
          } else {
            grouped[key] = { ...item, quantity: 1 };
          }
        });
        
        setCartItems(Object.values(grouped));
        
        const total = items.reduce((sum, item) => {
          const priceVal = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
          return sum + priceVal;
        }, 0);
        setSubtotal(total);
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
                const createStripeCheckoutSession = httpsCallable(functions, 'createStripeCheckoutSession');
      
      // Prepare items for the backend
      const itemsForStripe = cartItems.map(item => ({
        title: item.title,
        price: item.price,
        src: item.src,
        quantity: item.quantity
      }));

      const response = await createStripeCheckoutSession({
        items: itemsForStripe,
        returnUrl: window.location.origin, // Redirect back to home (which will handle success/cancel query params)
      });

      const { url } = response.data as { url: string };
      
      // Redirect to Stripe
      window.location.href = url;

    } catch (err: any) {
      console.error("Error initiating checkout: ", err);
      setError('Failed to initiate checkout. Please try again. ' + (err.message || ''));
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-background-light gap-4">
            <p className="text-gray-500 text-xl">Your cart is empty.</p>
            <Link to="/" className="text-primary hover:underline font-medium">Return Home</Link>
        </div>
    );
  }

  return (
    <div className="bg-background-light font-display text-[#111318] min-h-screen w-full py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#111318]">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input id="firstName" placeholder="First Name" required className="p-3 rounded-lg bg-gray-100 border border-gray-300" value={formData.firstName} onChange={handleInputChange} />
                  <input id="lastName" placeholder="Last Name" required className="p-3 rounded-lg bg-gray-100 border border-gray-300" value={formData.lastName} onChange={handleInputChange} />
                </div>
                <input id="email" type="email" placeholder="Email" required className="p-3 rounded-lg bg-gray-100 border border-gray-300" value={formData.email} onChange={handleInputChange} />
                <input id="address" placeholder="Address" required className="p-3 rounded-lg bg-gray-100 border border-gray-300" value={formData.address} onChange={handleInputChange} />
                <div className="grid grid-cols-2 gap-4">
                  <input id="city" placeholder="City" required className="p-3 rounded-lg bg-gray-100 border border-gray-300" value={formData.city} onChange={handleInputChange} />
                  <input id="zip" placeholder="ZIP Code" required className="p-3 rounded-lg bg-gray-100 border border-gray-300" value={formData.zip} onChange={handleInputChange} />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Payment Details</h2>
                <p className="text-gray-600 text-sm">You will be redirected to Stripe to complete your secure payment.</p>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Redirecting to Payment...' : `Proceed to Payment ($${subtotal.toFixed(2)})`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-xl h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="flex flex-col gap-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-cover bg-center rounded-md" style={{ backgroundImage: `url('${item.src}')` }}></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-primary font-bold text-sm">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
