import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Signin({ onClose, onSwitchToSignup }: { onClose?: () => void; onSwitchToSignup?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose?.();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        <div className="relative rounded-xl bg-background-light/80 backdrop-blur-2xl border border-gray-200/20 shadow-2xl shadow-black/20">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center mb-4">
              <Link to="/">
                <img src="/reds-logo.png" alt="Red's" className="h-20 object-contain" />
              </Link>
            </div>
            <h1 className="text-gray-900 tracking-light text-[28px] font-bold leading-tight text-center">Welcome Back</h1>
            <p className="text-gray-600 text-base font-normal leading-normal pb-6 pt-1 text-center">Sign in to continue</p>
            
            {error && (
              <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <label className="flex flex-col w-full">
                <p className="text-gray-800 text-sm font-medium leading-normal pb-2">Email</p>
                <input 
                  className="form-input block w-full h-12 rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white/70 focus:border-primary placeholder:text-gray-400 px-4 text-base font-normal leading-normal transition-all" 
                  placeholder="Enter your email address" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col w-full">
                <p className="text-gray-800 text-sm font-medium leading-normal pb-2">Password</p>
                <div className="flex w-full flex-1 items-stretch rounded-lg">
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white/70 focus:border-primary h-12 placeholder:text-gray-400 px-4 pr-2 text-base font-normal leading-normal transition-all" 
                    placeholder="Enter your password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="text-gray-400 flex border border-l-0 border-gray-300 bg-white/70 items-center justify-center px-3 rounded-r-lg hover:text-gray-600 transition-colors" 
                    type="button" 
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </label>
            
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="form-checkbox h-4 w-4 rounded bg-gray-200 border-gray-300 text-primary focus:ring-primary/50" type="checkbox" />
                  <span className="text-sm text-gray-700">Remember Me</span>
                </label>
                <a className="text-sm text-primary hover:underline" href="#">Forgot Password?</a>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center justify-center w-full h-12 px-6 mt-4 rounded-lg bg-primary text-white text-base font-medium leading-normal transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>

            <p className="text-gray-600 text-sm text-center mt-8">
              Don't have an account? <a className="font-medium text-primary hover:underline" href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup?.(); }}>Create one</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
