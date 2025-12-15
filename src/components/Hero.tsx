import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#111318]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="relative flex flex-col md:flex-row items-center justify-between px-4 sm:px-10 lg:px-20 py-20 md:py-20 gap-10 md:gap-16 max-w-[1440px] mx-auto z-10">
        
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
             <span className="text-sm font-bold text-white tracking-wide uppercase">Premium Streetwear</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">Red’s</span>, <br className="hidden lg:block" />
            where style is <br className="hidden lg:block" />
            a way of life
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed">
            Discover the latest trends in footwear and apparel. Elevate your wardrobe with our exclusive collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products/new-releases" className="group relative px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:bg-red-600 hover:shadow-primary/40 transition-all transform hover:-translate-y-1 overflow-hidden">
                 <span className="relative z-10 flex items-center gap-2">
                   Shop Latest
                  <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>
             </Link>
             <Link to="/products/all-products" className="px-8 py-4 bg-white/5 text-white backdrop-blur-sm border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all">
                View Collections
             </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center md:justify-end w-full relative">
            {/* Main Image Container */}
            <div className="relative w-full max-w-lg aspect-square">
                {/* Glowing ring effect behind image */}
                <div className="absolute inset-0 border-2 border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                
                {/* Logo Image */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                     <img 
                        src="/reds-logo2.png" 
                        alt="Red's Logo" 
                        className="w-full h-full object-contain drop-shadow-2xl animate-fade-in-up"
                     />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
