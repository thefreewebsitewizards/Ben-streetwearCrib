import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default function Signup({ onClose, onSwitchToSignin }: { onClose?: () => void; onSwitchToSignin?: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      onClose?.();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-display bg-background-light text-gray-800">
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="relative w-full max-w-md rounded-xl bg-white/80 shadow-2xl ring-1 ring-black/5 backdrop-blur-lg">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
          <main className="w-full p-6 sm:p-8">
            <div className="mb-6 text-center">
              <div className="mb-2 flex justify-center text-gray-800">
                <Link to="/">
                  <img src="/reds-logo.png" alt="Red's" className="h-20 object-contain" />
                </Link>
              </div>
              <p className="text-2xl font-bold leading-tight tracking-tight text-gray-900">Create Your Red's Account</p>
              <p className="mt-1 text-sm text-gray-600">Join us to discover exclusive collections.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="sr-only" htmlFor="full-name">Full Name</label>
                <input 
                  id="full-name" 
                  className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white/70 p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30" 
                  placeholder="Full Name" 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">Email Address</label>
                <input 
                  id="email" 
                  className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white/70 p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30" 
                  placeholder="Email Address" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="password">Password</label>
                <div className="relative flex w-full items-center">
                  <input 
                    id="password" 
                    className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white/70 p-3 pr-10 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30" 
                    placeholder="Password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div 
                    className="absolute right-3 flex cursor-pointer items-center justify-center text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-2xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="confirm-password">Confirm Password</label>
                <div className="relative flex w-full items-center">
                  <input 
                    id="confirm-password" 
                    className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white/70 p-3 pr-10 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/30" 
                    placeholder="Confirm Password" 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div 
                    className="absolute right-3 flex cursor-pointer items-center justify-center text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <span className="material-symbols-outlined text-2xl">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-xs text-gray-500">
              By creating an account, you agree to our
              <a className="font-medium text-primary hover:underline" href="#">Terms of Service</a> and <a className="font-medium text-primary hover:underline" href="#">Privacy Policy</a>.
            </p>
            <footer className="mt-4 border-t border-gray-200 pt-4 text-center">
              <p className="text-sm text-gray-600">
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
