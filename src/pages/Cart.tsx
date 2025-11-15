export default function Cart() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-gray-200 relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-2/3">
            <div className="flex flex-wrap justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Shopping Bag</h1>
              <a className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary self-end" href="#">Continue Shopping</a>
            </div>
            <div className="mt-8 space-y-6">
              <div className="flex gap-4 md:gap-6 bg-transparent justify-between items-center">
                <div className="flex items-center gap-4 md:gap-6 flex-grow">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-24 h-24 sm:w-28 sm:h-28"
                    data-alt="Close-up of a brown leather loafer shoe"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCii7PPRMzGKo3XVnAXmNAVivI9hex8esd-jyYnLm0Gs8sQtwtHcsRu12CwG-U9DknYf7B8VAYqw__NE-5SUpbfeNzdaImT7M55SWPkEPS3hHNcVlPSUfqpMLwsvuay15Ez-zoZZrqL245fBz5OAgGV8LPNZjEsXOfpju0o7t6yoWQflKQR7q6uwmSSqzuQMuM8xNqFcRwES_qLrMm8QvwC_Q9a5_ehlmmW9AFzcMYGcXmwz-y8f-r47U7jEDsNOM4WnFu54zfXQMY")' }}
                  />
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-[#111318] dark:text-white text-base font-semibold leading-normal">The Classic Loafer</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Color: Walnut, Size: 9</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal mt-2 md:hidden">$450.00</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-2 text-[#111318] dark:text-white">
                    <button type="button" className="text-base font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-200/60 dark:bg-gray-800/60 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">-</button>
                    <input className="text-base font-medium w-6 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" type="number" defaultValue={1} />
                    <button type="button" className="text-base font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-200/60 dark:bg-gray-800/60 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">+</button>
                  </div>
                  <p className="text-[#111318] dark:text-white text-base font-medium leading-normal hidden md:block w-20 text-right">$450.00</p>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400" type="button" aria-label="Remove item">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
              <hr className="border-gray-200 dark:border-gray-800" />
              <div className="flex gap-4 md:gap-6 bg-transparent justify-between items-center">
                <div className="flex items-center gap-4 md:gap-6 flex-grow">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-24 h-24 sm:w-28 sm:h-28"
                    data-alt="Side profile of a sand-colored suede chelsea boot"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCT2s0nnXbT8TFphDhu1_gxqco2HhZJbeH7wbSwFtQasSZPmf6GSH4k6Rg3-3ORhzHadUgtzdTxVZftsZqqzCBcisw9z4lWYamZisN1IlNmKV8fDBBkEq889UTveIJfrGsEKeq3W94EtUmayB7B7ariMeWr0aFVi7uXa9jUrwvHWEcjPqbRm8MdHxJGaxufxnTOPiVh3yVauGmQEcbeCP_mFrLNLdXmuneFpO2s73AxxLl47mhpMqUDQIdW3BHn-T8cBNM5pNcs0nc")' }}
                  />
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-[#111318] dark:text-white text-base font-semibold leading-normal">The Suede Chelsea Boot</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Color: Sand, Size: 9.5</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal mt-2 md:hidden">$520.00</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-2 text-[#111318] dark:text-white">
                    <button type="button" className="text-base font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-200/60 dark:bg-gray-800/60 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">-</button>
                    <input className="text-base font-medium w-6 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" type="number" defaultValue={1} />
                    <button type="button" className="text-base font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-200/60 dark:bg-gray-800/60 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">+</button>
                  </div>
                  <p className="text-[#111318] dark:text-white text-base font-medium leading-normal hidden md:block w-20 text-right">$520.00</p>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:bg-red-400" type="button" aria-label="Remove item">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 bg-white dark:bg-gray-900/50 p-6 lg:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <h2 className="text-[#111318] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] pb-4 border-b border-gray-200 dark:border-gray-800">Order Summary</h2>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-[#111318] dark:text-white">$970.00</span>
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
                  <span className="text-xl font-bold text-[#111318] dark:text-white">$970.00</span>
                </div>
              </div>
              <div className="mt-8">
                <button className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary/90 transition-colors">Proceed to Checkout</button>
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
