import { useParams, useLocation } from 'react-router-dom'
import { useState } from 'react'
export default function ProductDetails() {
  const mainImage = {
    alt: 'Red and black Aura Stride sneaker viewed from the side.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLmeWPP6so5jqW5RaCXrnXnBvyG4pWMjlnIY2P9RcS90uOuaM16xZiG0lZkNOL0-rwP8rn_0UJKx7C8HbqD259oRhguGXfoH6I2fL_19uBvXAEx9yJu1vWWvm0S9tTI5RgwvLeSwQD_49bePvW_NknexUS7YVhkPyfgHNNEgjS9e5ooMqvdm3KhgrfcNBMWBSY17ktrwFOfgxztXqit9CwAMa9jCA1_EQUslbbi5wKBmClVmx_I9T3zamn82S3vLtXZu2S8fZ0Zzc'
  }
  const thumbs = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCW2leQAY9moXbBEckyx9_uonxtZyvJ8MZp_B3mRkf2bLcsbNflZt71BqtX-N181_wd1OizJN0FE5zTb_bVRSD8onVGF3COAEXON0IBfnCjUMbaDRfrRJDSgrHNCre6jisC7OuCD4qFoNV8HoF_FeIrx6NupWmijxnaEe_Ip4lJv-nQ_QSMzJ3yR9Qto3rtXZfzLNgZoqZbnSn9mXnbTKhxMsmzBo7veYjc2glsuMuCppqj3UwO7mhZAzNPapzHb84xC48PWRpGYKQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCIlH4ASPhmlWxYV6PMxYFWRw3fuQI3QxfWK0DENnCNOdqyAMIZJpg5jtvF_HfGmTIUYpCPWqPlBUGbPARjUOUi3BCh8z_GdeF5I0rCeX3D5cmcA7k6ebu_9G_sjyYLZjvXTWH-3pcLoXotvkETF7G6xYU3bMIwvN3WgEWobUQXqL6t4xU7VA3oCTfe0h-OHUi_0ySJg2HJ2ZKSTB6or8XQnY5Gw5J50nphQ4SYXcMqZz3sI1r-95P4I2ipYPKHdx6lS0CWQY458fQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBv6bJVsYXG81iW3DycDHGO4EjNQFZMRzn13DaeaBHpQluS0pCQ1LKc6WSbFJ9Iy3yVAC_KCahYpnJNLb3tRD9vljaZc8lsRfxKC0pK01RphZjUyxq8cMAFPMYcjepvQQXcm6Lk_GVYZcYdsP36mVh0k0og20_zLiu2o4DWNKIYrVSNQk31GzBiWpA1dpN7pYXiAuUtXKgZv66wmxJJOPdq-3-BZi720SsjO_Vm3dIFTwbFIoaGllAb0XtvWEvw127A5wx-nlF0ILI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBUP_oT8BJHCIfifKAJOA2rPa1LQQLCjJhv4Jbq1F-nd95Zyf8mFyFSem45L2MQ-6TZ6u2sbXnOQ1PjSHT-BqfXZqGVt78xXwHG1ndZPnhgFY8VY1wcWmLraVTE11OqrssBLjT2bYJuKBjiueDwxQ2c0zZVXoeiSSwNNLFYZF8bjetC6fY5MzGAblTR0AFOEnzhJ8r5JkPLT6ahRyNpXVLIGp6jVIe7re04H3ai0dcfENlrUeSKl7FtNqC8CYxsq7rkiB9CxDCwTUQ'
  ]
  const related = [
    { title: 'Urban Voyager', price: '$199.00', alt: 'A pair of stylish white and blue sneakers.', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcuGUQrhZdcpP98clFOJqgb0zPyiPGlgH6ndy7d908ZHZnbZ0IH0ReJ9o_AFCX5vmta5lV8Ol7OtUc33NTWaf-aFyixTrONJo26DWFn0980fBJUEqKpPc4V-GXWBbZyRwkIhWJ9WSdQXP71TPh5M81JH7Nj2n7AQDWVVZoEUoCSjNulNS8srsXoFYrq_nnQ6Y9bK0xk8KtmHtYsv9EePGeRltZhpGT9cuZz0iYWIowgWjeAulMMr3ZfmUboHQQbYaVNPc7tITf71Y' },
    { title: 'Metro Classic', price: '$219.00', alt: 'A minimalist black leather shoe.', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvrxm6ijkaN7jXvk4TdO7DUUVbhms5oKBuFDBKnI86F-YMFhqgbEKQ_W3PSU652tbE9HX564peHlbxMRLKhamhMX_SbzKWGwVt5msIQbAj45gCdt63J1wimN5s7FDKA4lPQD8RPMKRP9mDiK-4AyaqjsX3mQ3H098znE1Rt9PJcG3n0W02K7f-cHhIqLwiR1zvy4xQDgLY5DPfHkLCUgC9C2v11-S0t_Z-I0H2tJPLkeaxuunfWcxL1PlbRvhg3RqaVwn2Y-J5Qmo' },
    { title: 'Apex High-Top', price: '$279.00', alt: 'A high-top sneaker in a tan color.', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQr7hX0z9H_PwzE3eLWQNgH6s52vFVxg-VIta_KaNs1314ZSa9FVZ_ZrUAJbxFOOQYA-3F1G042bNBZqz11ctMABydcq1E5odxZbVJLrCZeGb302IDTxqqU1ElZD5S0tsaBTYrCzKsOHWUJX_848CZEadkcoIX3fvUhbDxbg3wd057b0O9nIJdgEBuGTx5W4cB81YrJfHWB91GRqxwULGnWo61Wdbmy-kaWBeOoAvdErDipZjnij-1Q_QhuobBkQIflMMuKQjVQNI' },
    { title: 'Nimbus Cloud', price: '$189.00', alt: 'A sleek, all-white running shoe.', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuN4A-4e64_7j8PywuxM8Qi0kykzO9pOVTVEK8j-0NnIga5IjyuAY7tkrTv4j730MtWHa7elUxn620q47wgcbkSUWnSTzixiNxI7N0hPCNn50HvTTuSByw-Ud9cifgosjaeS9z18l9PX0sxGlGwq7Ilt7LrtOO-zy2CqS0fgSPFr3aP5BIUTf79oVMKyiv3bIBVzUOWGjN-G1QkMDW8zkSshi1RjaKl7FSHOyBUJ21C6_4gpKVGYMLU6wDUYOs5ZpEotjWKS_9yTA' }
  ]

  const { state } = useLocation() as { state?: { product?: { title?: string; price?: string; alt?: string; src?: string } } }
  const { slug } = useParams()
  const fromSlug = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : undefined
  const productTitle = state?.product?.title || fromSlug || 'Aura Stride'
  const price = state?.product?.price || '$249.00'
  const dynamicMain = {
    alt: state?.product?.alt || mainImage.alt,
    src: state?.product?.src || mainImage.src,
  }
  const [quantity, setQuantity] = useState(1)
  const handleAddToCart = () => {
    try {
      const raw = localStorage.getItem('cartItems')
      const items = raw ? JSON.parse(raw) : []
      const toAdd = Array.from({ length: Math.max(1, quantity) }, () => ({ title: productTitle, price, src: dynamicMain.src }))
      const next = Array.isArray(items) ? items.concat(toAdd) : toAdd
      localStorage.setItem('cartItems', JSON.stringify(next))
    } catch {
      const count = Number(localStorage.getItem('cartCount')) || 0
      localStorage.setItem('cartCount', String(count + Math.max(1, quantity)))
    }
    window.dispatchEvent(new Event('cartUpdated'))
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1">
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal" href="#">Home</a>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">/</span>
                  <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal" href="#">Shoes</a>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">/</span>
                  <span className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">{productTitle}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
                <div className="flex flex-col gap-4">
                  <div className="w-full aspect-square bg-white dark:bg-slate-800/50 rounded-xl shadow-sm overflow-hidden">
                    <img alt={dynamicMain.alt} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" src={dynamicMain.src} />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {thumbs.map((src, i) => (
                      <div key={i} className={i === 0 ? 'aspect-square bg-white dark:bg-slate-800/50 rounded-lg overflow-hidden border-2 border-primary cursor-pointer' : 'aspect-square bg-white dark:bg-slate-800/50 rounded-lg overflow-hidden opacity-70 hover:opacity-100 transition-opacity cursor-pointer'}>
                        <img className="w-full h-full object-cover" alt="" src={src} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap justify-between gap-3"><p className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">{productTitle}</p></div>
                  <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-normal pb-3 pt-1">Elegant leather sneaker with a modern silhouette.</p>
                  <div className="flex items-center gap-2 my-2">
                    <div className="flex text-primary">
                      <span className="material-symbols-outlined text-xl">star</span>
                      <span className="material-symbols-outlined text-xl">star</span>
                      <span className="material-symbols-outlined text-xl">star</span>
                      <span className="material-symbols-outlined text-xl">star</span>
                      <span className="material-symbols-outlined text-xl text-slate-300 dark:text-slate-600">star_half</span>
                    </div>
                    <a className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary" href="#">4.8 stars | 32 Reviews</a>
                  </div>
                  <h1 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-left pb-3 pt-5">{price}</h1>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Color: <span className="font-normal">Crimson Black</span></h3>
                    <div className="flex items-center gap-3">
                      <button aria-label="Crimson Black" className="w-8 h-8 rounded-full bg-red-600 ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark"></button>
                      <button aria-label="Ocean Blue" className="w-8 h-8 rounded-full bg-blue-800 hover:ring-2 hover:ring-primary/50"></button>
                      <button aria-label="Arctic White" className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 hover:ring-2 hover:ring-primary/50"></button>
                      <button aria-label="Graphite Gray" className="w-8 h-8 rounded-full bg-slate-700 hover:ring-2 hover:ring-primary/50"></button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Size</h3>
                      <a className="text-sm font-medium text-primary hover:underline" href="#">Size Guide</a>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <button className="p-3 border rounded-lg text-center text-sm font-medium border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary">7</button>
                      <button className="p-3 border rounded-lg text-center text-sm font-medium border-primary dark:border-primary bg-primary/10 dark:bg-primary/20 text-primary dark:text-white">8</button>
                      <button className="p-3 border rounded-lg text-center text-sm font-medium border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary">9</button>
                      <button className="p-3 border rounded-lg text-center text-sm font-medium border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed">10</button>
                      <button className="p-3 border rounded-lg text-center text-sm font-medium border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary">11</button>
                      <button className="p-3 border rounded-lg text-center text-sm font-medium border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary">12</button>
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
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">The Aura Stride redefines modern footwear with its sleek design and unparalleled comfort. Crafted from premium, ethically sourced leather, this sneaker is built to last while providing a lightweight feel for all-day wear. Perfect for both casual outings and sophisticated ensembles.</p>
                    </div>
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Materials &amp; Care</h4>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Upper: 100% Full-Grain Leather. Sole: Natural Rubber. To clean, wipe gently with a damp cloth. Avoid prolonged exposure to direct sunlight.</p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Shipping &amp; Returns</h4>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Free standard shipping on all orders. Expedited shipping options available at checkout. We offer a 30-day return policy for unworn items.</p>
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
                  {related.map((r) => (
                    <div key={r.title} className="flex flex-col gap-2 rounded-lg min-w-72">
                      <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-xl flex flex-col" data-alt={r.alt} style={{ backgroundImage: `url("${r.bg}")` }}></div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mt-2">{r.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400">{r.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}