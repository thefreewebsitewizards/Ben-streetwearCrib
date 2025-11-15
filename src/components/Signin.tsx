import { Link } from 'react-router-dom'
export default function Signin({ onClose, onSwitchToSignup }: { onClose?: () => void; onSwitchToSignup?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        <div className="relative rounded-xl bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-2xl border border-gray-200/20 dark:border-gray-800/40 shadow-2xl shadow-black/20">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center mb-8">
              <Link to="/" className="font-serif text-3xl font-bold text-gray-800 dark:text-gray-100">Aethel</Link>
            </div>
            <h1 className="text-gray-900 dark:text-white tracking-light text-[28px] font-bold leading-tight text-center">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal pb-6 pt-1 text-center">Sign in to continue</p>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col w-full">
                <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal pb-2">Email</p>
                <input className="form-input block w-full h-12 rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-all" placeholder="Enter your email address" type="email" />
              </label>
              <label className="flex flex-col w-full">
                <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal pb-2">Password</p>
                <div className="flex w-full flex-1 items-stretch rounded-lg">
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 pr-2 text-base font-normal leading-normal transition-all" placeholder="Enter your password" type="password" />
                  <button className="text-gray-400 dark:text-gray-500 flex border border-l-0 border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 items-center justify-center px-3 rounded-r-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors" type="button" aria-label="Toggle password visibility">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </label>
            </div>
            <div className="flex items-center justify-between mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input className="form-checkbox h-4 w-4 rounded bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/50" type="checkbox" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Remember Me</span>
              </label>
              <a className="text-sm text-primary hover:underline" href="#">Forgot Password?</a>
            </div>
            <button className="flex items-center justify-center w-full h-12 px-6 mt-8 rounded-lg bg-primary text-white text-base font-medium leading-normal transition-all hover:opacity-90 active:scale-[0.98]">Login</button>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center mt-8">
              Don't have an account? <a className="font-medium text-primary hover:underline" href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup?.(); }}>Create one</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}