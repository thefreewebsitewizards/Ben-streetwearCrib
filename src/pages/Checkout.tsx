import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CartItem {
  title: string;
  price: string;
  src: string;
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('cartItems');
    if (raw) {
      try {
        const items: CartItem[] = JSON.parse(raw);
        setCartItems(items);
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
      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zip: formData.zip
        },
        items: cartItems,
        total: subtotal,
        status: 'Processing',
        createdAt: serverTimestamp(),
        userId: auth.currentUser ? auth.currentUser.uid : 'guest'
      };

      await addDoc(collection(db, 'orders'), orderData);

      // Clear cart
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartCount');
      window.dispatchEvent(new Event('cartUpdated'));

      navigate('/?orderSuccess=true');
    } catch (err: any) {
      console.error("Error placing order: ", err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-background-light dark:bg-background-dark gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-xl">Your cart is empty.</p>
            <Link to="/" className="text-primary hover:underline font-medium">Return Home</Link>
        </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-gray-200 min-h-screen w-full py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#111318] dark:text-white">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input id="firstName" placeholder="First Name" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.firstName} onChange={handleInputChange} />
                  <input id="lastName" placeholder="Last Name" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.lastName} onChange={handleInputChange} />
                </div>
                <input id="email" type="email" placeholder="Email" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.email} onChange={handleInputChange} />
                <input id="address" placeholder="Address" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.address} onChange={handleInputChange} />
                <div className="grid grid-cols-2 gap-4">
                  <input id="city" placeholder="City" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.city} onChange={handleInputChange} />
                  <input id="zip" placeholder="ZIP Code" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.zip} onChange={handleInputChange} />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Payment Details</h2>
                <input id="cardName" placeholder="Name on Card" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.cardName} onChange={handleInputChange} />
                <input id="cardNumber" placeholder="Card Number" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.cardNumber} onChange={handleInputChange} />
                <div className="grid grid-cols-2 gap-4">
                  <input id="expDate" placeholder="MM/YY" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.expDate} onChange={handleInputChange} />
                  <input id="cvv" placeholder="CVV" required className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" value={formData.cvv} onChange={handleInputChange} />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay $${subtotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="flex flex-col gap-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-cover bg-center rounded-md" style={{ backgroundImage: `url('${item.src}')` }}></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
