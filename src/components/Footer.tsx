export default function Footer() {
  return (
    <footer className="bg-foreground-light dark:bg-foreground-dark border-t border-gray-200 dark:border-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 pb-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-4">
            <h4 className="font-bold text-lg mb-4">ABOUT US</h4>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Streetwear Crib is the intersection of luxury, design, and culture. We are committed to crafting footwear that stands the test of time, both in style and quality.
            </p>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-4">Contact: placeholder@streetwear.com</p>
            <div className="flex justify-center gap-6 mt-12">
              <a className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.316 1.363.364 2.427.048 1.067.06 1.407.06 3.808s-.012 2.74-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.316-2.427.364-1.067.048-1.407.06-3.808.06s-2.74-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.316-1.363-.364-2.427C2.013 14.74 2 14.4 2 12s.013-2.74.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.48 3.682c.636-.247 1.363-.316 2.427-.364C8.94 3.273 9.284 3.26 11.685 3.26h.63zM12 1.884c-2.462 0-2.8.01-3.778.058-.975.045-1.504.207-1.857.344-.467.182-.86.399-1.242.782a3.495 3.495 0 00-.782 1.242c-.137.353-.3.882-.344 1.857-.048.977-.058 1.316-.058 3.778s.01 2.8.058 3.778c.045.975.207 1.504.344 1.857.182.466.399.86.782 1.242.381.382.775.599 1.242.782.353.137.882.3 1.857.344.977.048 1.316.058 3.778.058s2.8-.01 3.778-.058c.975-.045 1.504-.207 1.857-.344.466-.182.86-.399 1.242-.782.382-.381.599-.775.782-1.242.137-.353.3-.882.344-1.857.048-.977.058-1.316.058-3.778s-.01-2.8-.058-3.778c-.045-.975-.207-1.504-.344-1.857a3.495 3.495 0 00-.782-1.242 3.495 3.495 0 00-1.242-.782c-.353-.137-.882-.3-1.857-.344C14.8 1.894 14.462 1.884 12 1.884z" fillRule="evenodd"></path><path d="M12 6.167a5.833 5.833 0 100 11.666 5.833 5.833 0 000-11.666zM12 16a4 4 0 110-8 4 4 0 010 8z"></path><circle cx="16.942" cy="7.058" r="1.306"></circle></svg>
              </a>
              <a className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
              </a>
              <a className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg>
              </a>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold text-lg mb-4">INFORMATION</h4>
            <ul className="space-y-3">
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">FAQs</a></li>
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">Shipping Policy</a></li>
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold text-lg mb-4">CUSTOMER SERVICE</h4>
            <ul className="space-y-3">
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">Contact Us</a></li>
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">Track Your Order</a></li>
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">Exchanges &amp; Returns</a></li>
              <li><a className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" href="#">Referral Program</a></li>
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-4 bg-background-light dark:bg-background-dark p-6 rounded-xl">
            <h4 className="font-bold text-lg">7% Welcome Discount</h4>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1 mb-4">Subscribe to our newsletter and get a special discount.</p>
            <form className="space-y-4">
              <input className="w-full h-10 px-3 text-sm border-gray-300 dark:border-gray-700 bg-foreground-light dark:bg-foreground-dark rounded-md focus:ring-primary focus:border-primary" placeholder="Enter your email address" type="email" />
              <input className="w-full h-10 px-3 text-sm border-gray-300 dark:border-gray-700 bg-foreground-light dark:bg-foreground-dark rounded-md focus:ring-primary focus:border-primary" placeholder="Phone number (optional)" type="tel" />
              <div className="flex items-start">
                <input className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-0.5" id="sms-consent" type="checkbox" />
                <label className="ml-2 text-xs text-text-muted-light dark:text-text-muted-dark" htmlFor="sms-consent">I consent to receive marketing SMS messages.</label>
              </div>
              <button className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em] hover:bg-primary/90 transition-colors">
                <span className="truncate">Get Your Gift</span>
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-xs text-text-muted-light dark:text-text-muted-dark mt-16 border-t border-gray-200 dark:border-gray-800 pt-8">
          © 2024 Streetwear Crib. All Rights Reserved. A luxury footwear experience.
        </div>
      </div>
    </footer>
  )
}