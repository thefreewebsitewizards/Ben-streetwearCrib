import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CartItem {
  title: string;
  price: string;
  src: string;
}

interface GroupedCartItem extends CartItem {
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<GroupedCartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const loadCart = () => {
      const raw = localStorage.getItem('cartItems');
      if (!raw) {
        setCartItems([]);
        setSubtotal(0);
        return;
      }

      try {
        const items: CartItem[] = JSON.parse(raw);
        
        // Group items by title (and src/price to be safe)
        const grouped: { [key: string]: GroupedCartItem } = {};
        
        items.forEach(item => {
          const key = `${item.title}-${item.price}`;
          if (grouped[key]) {
            grouped[key].quantity += 1;
          } else {
            grouped[key] = { ...item, quantity: 1 };
          }
        });

        const groupedArray = Object.values(grouped);
        setCartItems(groupedArray);

        // Calculate subtotal
        const total = items.reduce((sum, item) => {
            // Remove '$' and ',' if present
            const priceVal = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
            return sum + priceVal;
        }, 0);
        setSubtotal(total);

      } catch (e) {
        console.error("Failed to parse cart items", e);
        setCartItems([]);
      }
    };

    loadCart();

    // Listen for cart updates from other components
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const updateLocalStorage = (newItems: GroupedCartItem[]) => {
    // Flatten back to array for storage
    const flatItems: CartItem[] = [];
    newItems.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
            flatItems.push({ title: item.title, price: item.price, src: item.src });
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(flatItems));
    localStorage.setItem('cartCount', String(flatItems.length));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleQuantityChange = (item: GroupedCartItem, change: number) => {
    const newItems = cartItems.map(i => {
        if (i.title === item.title && i.price === item.price) {
            return { ...i, quantity: Math.max(1, i.quantity + change) };
        }
        return i;
    });
    setCartItems(newItems);
    updateLocalStorage(newItems);
  };

  const handleRemoveItem = (itemToRemove: GroupedCartItem) => {
    const newItems = cartItems.filter(i => !(i.title === itemToRemove.title && i.price === itemToRemove.price));
    setCartItems(newItems);
    updateLocalStorage(newItems);
  };

  const shipping = 0; // Calculated at next step usually
  const taxes = 0; // Calculated at next step usually
  const estimatedTotal = subtotal + shipping + taxes;

  if (cartItems.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-background-light dark:bg-background-dark gap-4">
            <span className="material-symbols-outlined text-6xl text-gray-300">shopping_bag</span>
            <p className="text-gray-500 dark:text-gray-400 text-xl">Your cart is empty.</p>
            <Link to="/products/all-sneakers" className="text-primary hover:underline font-medium">Start Shopping</Link>
        </div>
      );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-gray-200 relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-2/3">
            <div className="flex flex-wrap justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Shopping Bag</h1>
              <Link to="/products/all-sneakers" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary self-end">Continue Shopping</Link>
            </div>
            <div className="mt-8 space-y-6">
              {cartItems.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="flex gap-4 md:gap-6 bg-transparent justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
                    <div className="flex items-center gap-4 md:gap-6 flex-grow">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-24 h-24 sm:w-28 sm:h-28"
                        style={{ backgroundImage: `url("${item.src}")` }}
                      />
                      <div className="flex flex-1 flex-col justify-center">
                        <p className="text-[#111318] dark:text-white text-base font-semibold leading-normal">{item.title}</p>
                        {/* Note: Size and Color are not yet captured in ProductDetails, so omitting for now or using defaults */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Standard Size</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal mt-2 md:hidden">{item.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-8">
                      <div className="flex items-center gap-2 text-[#111318] dark:text-white">
                        <button 
                            type="button" 
                            onClick={() => handleQuantityChange(item, -1)}
                            disabled={item.quantity <= 1}
                            className="text-base font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-200/60 dark:bg-gray-800/60 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >-</button>
                        <input 
                            className="text-base font-medium w-6 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
                            type="number" 
                            value={item.quantity} 
                            readOnly
                        />
                        <button 
                            type="button" 
                            onClick={() => handleQuantityChange(item, 1)}
                            className="text-base font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-200/60 dark:bg-gray-800/60 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                        >+</button>
                      </div>
                      <p className="text-[#111318] dark:text-white text-base font-medium leading-normal hidden md:block w-20 text-right">{item.price}</p>
                      <button 
                        onClick={() => handleRemoveItem(item)}
                        className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400" 
                        type="button" 
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 bg-white dark:bg-gray-900/50 p-6 lg:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <h2 className="text-[#111318] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] pb-4 border-b border-gray-200 dark:border-gray-800">Order Summary</h2>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-[#111318] dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Calculated at next step</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Taxes</span>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Calculated at next step</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-bold text-[#111318] dark:text-white">Estimated Total</span>
                  <span className="text-xl font-bold text-[#111318] dark:text-white">${estimatedTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/checkout" className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary/90 transition-colors">Proceed to Checkout</Link>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                  <input className="flex-grow bg-transparent text-sm p-2 border-0 focus:ring-0" placeholder="Enter promo code" type="text" />
                  <button className="px-4 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 text-sm font-semibold text-[#111318] dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
