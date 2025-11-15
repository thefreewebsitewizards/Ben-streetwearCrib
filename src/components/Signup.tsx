import { Link } from 'react-router-dom'
export default function Signup({ onClose, onSwitchToSignin }: { onClose?: () => void; onSwitchToSignin?: () => void }) {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="relative w-full max-w-md rounded-xl bg-white/80 shadow-2xl ring-1 ring-black/5 backdrop-blur-lg dark:bg-background-dark/80 dark:ring-white/10">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
          <main className="w-full p-6 sm:p-8">
            <div className="mb-6 text-center">
              <div className="mb-4 flex justify-center text-gray-800 dark:text-white">
                <Link to="/" className="h-10 w-10">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                  </svg>
                </Link>
              </div>
              <p className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">Create Your AURA Account</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Join us to discover exclusive collections.</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="sr-only" htmlFor="full-name">Full Name</label>
                <input id="full-name" className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white/70 p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary" placeholder="Full Name" type="text" />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">Email Address</label>
                <input id="email" className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white/70 p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary" placeholder="Email Address" type="email" />
              </div>
              <div>
                <label className="sr-only" htmlFor="password">Password</label>
                <div className="relative flex w-full items-center">
                  <input id="password" className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white/70 p-3 pr-10 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400 dark:focus;border-primary" placeholder="Password" type="password" />
                  <div className="absolute right-3 flex cursor-pointer items-center justify-center text-gray-400 dark:text-gray-400">
                    <span className="material-symbols-outlined text-2xl">visibility_off</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="confirm-password">Confirm Password</label>
                <div className="relative flex w-full items-center">
                  <input id="confirm-password" className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white/70 p-3 pr-10 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400 dark:focus;border-primary" placeholder="Confirm Password" type="password" />
                  <div className="absolute right-3 flex cursor-pointer items-center justify-center text-gray-400 dark:text-gray-400">
                    <span className="material-symbols-outlined text-2xl">visibility_off</span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:ring-offset-background-dark">Create Account</button>
              </div>
            </form>
            <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              By creating an account, you agree to our
              <a className="font-medium text-primary hover:underline" href="#">Terms of Service</a> and <a className="font-medium text-primary hover:underline" href="#">Privacy Policy</a>.
            </p>
            <footer className="mt-4 border-t border-gray-200 pt-4 text-center dark:border-white/10">
              <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account? <a className="font-semibold text-primary hover:underline" href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignin?.(); }}>Log In</a>
            </p>
            </footer>
          </main>
        </div>
      </div>
      <div className="h-screen w-full blur-sm">
        <header className="p-6">
          <h1 className="text-2xl font-bold">AURA</h1>
        </header>
        <div className="p-6">
          <h2 className="text-4xl font-bold">Discover Our Latest Collection</h2>
          <p className="mt-2 text-lg">Experience elegance and comfort with every step.</p>
        </div>
      </div>
    </div>
  );
}