import { Link } from 'react-router-dom'
function RecentOrdersSection() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-white text-2xl font-bold leading-tight tracking-tight">Recent Orders</h2>
      <div className="rounded-xl border border-gray-800/60 bg-foreground-dark overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="border-b border-gray-800/60 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3" scope="col">Order ID</th>
                <th className="px-6 py-3" scope="col">Customer</th>
                <th className="px-6 py-3" scope="col">Date</th>
                <th className="px-6 py-3" scope="col">Total</th>
                <th className="px-6 py-3" scope="col">Status</th>
                <th className="px-6 py-3 text-right" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/60 hover:bg-background-dark/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-white">#LK-84623</td>
                <td className="px-6 py-4 font-medium text-white">Olivia Chen</td>
                <td className="px-6 py-4">2024-05-21</td>
                <td className="px-6 py-4 font-medium text-white">$360.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300">Fulfilled</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a className="font-medium text-primary hover:underline" href="#">View Details</a>
                </td>
              </tr>
              <tr className="border-b border-gray-800/60 border-border-dark hover:bg-background-dark/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-white">#LK-84622</td>
                <td className="px-6 py-4 font-medium text-white">Benjamin Carter</td>
                <td className="px-6 py-4">2024-05-20</td>
                <td className="px-6 py-4 font-medium text-white">$190.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/60 text-yellow-300">Processing</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a className="font-medium text-primary hover:underline" href="#">View Details</a>
                </td>
              </tr>
              <tr className="hover:bg-background-dark/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-white">#LK-84621</td>
                <td className="px-6 py-4 font-medium text-white">Sophia Rodriguez</td>
                <td className="px-6 py-4">2024-05-19</td>
                <td className="px-6 py-4 font-medium text-white">$185.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/50 text-red-300">Cancelled</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a className="font-medium text-primary hover:underline" href="#">View Details</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function AddProductSection() {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
  <div className="flex flex-col gap-12 max-w-7xl mx-auto">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-white text-3xl font-bold leading-tight tracking-tight">Add New Product</p>
          <Link to="/" className="flex items-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
            Back to Website
            <span className="material-symbols-outlined text-base">arrow_outward</span>
          </Link>
        </div>
        <p className="text-gray-400 text-base font-normal leading-normal">Fill in the details below to add a new product to your store.</p>
      </div>
      <div className="rounded-xl p-6 lg:p-8 border border-gray-800/60 bg-foreground-dark shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-name">Product Name</label>
              <input className="h-12 w-full px-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary" id="product-name" placeholder="e.g. Air Jordan 1 Retro High" type="text" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-description">Description</label>
              <textarea className="w-full min-h-40 p-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary" id="product-description" placeholder="Enter a detailed description of the product..." rows={6}></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-price">Price</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input className="h-12 w-full pl-7 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary" id="product-price" placeholder="170.00" type="text" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="stock-quantity">Stock Quantity</label>
                <input className="h-12 w-full px-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary" id="stock-quantity" placeholder="120" type="number" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-category">Category</label>
                <select className="h-12 w-full px-3 bg-background-dark border border-gray-800/60 rounded-lg text-white focus:ring-primary focus:border-primary" id="product-category">
                  <option>All Sneakers</option>
                  <option>New Arrivals</option>
                  <option>New Releases</option>
                  <option>Custom &amp; Unreleased</option>
                  <option>Jordan</option>
                  <option>More Footwear</option>
                </select>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-images">Product Images</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-800/60 border-dashed rounded-lg cursor-pointer bg-background-dark hover:bg-opacity-80 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="material-symbols-outlined text-gray-400 text-5xl"> cloud_upload </span>
                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input className="hidden" id="dropzone-file" multiple type="file" />
                </label>
              </div>
            </div>
            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 gap-2 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors mt-auto">
              <span className="material-symbols-outlined text-base"> add </span>
              <span className="truncate">Upload Product</span>
            </button>
          </div>
        </form>
      </div>
      <RecentOrdersSection />
    </div>
  </div>
  </main>
  )
}
export default function AdminPage() {
  return (
    <div className='bg-background-dark font-display text-gray-300'>
      <div className='relative flex min-h-screen w-full'>
        <aside className='sticky top-0 h-screen w-64 flex-shrink-0 bg-[#111318] p-4 flex flex-col justify-between'>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-3 px-3'>
              <img src="/logo-streetwear.webp" alt="Streetwear Crib" className="h-8 w-42 object-contain dark:invert dark:hue-rotate-[60deg] dark:saturate-150 dark:brightness-110" />
            </div>
            <div className='flex flex-col gap-2'>
              <a className='flex items-center gap-3 px-3 py-2 rounded-lg bg-card-dark text-white' href='#'>
                <span className='material-symbols-outlined'> inventory_2 </span>
                <p className='text-sm font-medium leading-normal'>Products</p>
              </a>
              <a className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-card-dark hover:text-white transition-colors duration-200' href='#'>
                <span className='material-symbols-outlined'> receipt_long </span>
                <p className='text-sm font-medium leading-normal'>Orders</p>
              </a>
              <a className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-card-dark hover:text-white transition-colors duration-200' href='#'>
                <span className='material-symbols-outlined'> group </span>
                <p className='text-sm font-medium leading-normal'>Customers</p>
              </a>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <a className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-card-dark hover:text-white transition-colors duration-200' href='#'>
              <span className='material-symbols-outlined'> settings </span>
              <p className='text-sm font-medium leading-normal'>Settings</p>
            </a>
            <div className='border-t border-gray-800/60 my-2'></div>
            <div className='flex gap-3 items-center px-3 py-2'>
              <div
                className='bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10'
                data-alt='Admin user avatar'
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPKCdGJkxPlXaRchnP8l3RG1WACtf9kmdYrieg5GZRw8neOJJ74fyivMYxALNEFM0RBuvFxGTSbP2Y1SGCLJJ3iBwv_03qjdnbEDMG-FjNUcv71EfCls0l0nG5N_zfgogJ-VUaFtnc06s0i95Me1p_XZLjy9iJurnu2dcP4xVnlFM9pIYQTcIoi3t8LWMM1Exwfh3Ze_0-eChvulG7v4qRhSaxF51F2Q0K6QqzNfwAmK71HtWe2jRvVsgSHhGvOqT9tD1ClyqZfMo')` }}
              ></div>
              <div className='flex flex-col'>
                <h1 className='text-white text-sm font-medium leading-normal'>Alex Turner</h1>
                <p className='text-gray-400 text-xs font-normal leading-normal'>Administrator</p>
              </div>
            </div>
          </div>
        </aside>
        <AddProductSection />
      </div>
    </div>
  );
}