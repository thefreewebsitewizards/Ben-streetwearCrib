import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function Products() {
  const products = [
    {
      title: 'Aura-Glide Pro',
      subtitle: 'Lifestyle Sneaker',
      price: '$320',
      alt: 'Red and black sports sneaker on a reflective surface',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByVcqSMAHPecLm4eQS9AdpE1R6VcNNr6QwiujgdD6zobfThfeuMBxGkDhh5c3SBvMMhIhBvqwTp4fzAMYU3Cq3rfTmVwuSrvvy4CQRk3N2sJEGV4puhhgiM297o2TyM52aqlV11kqk6ynQcHekhAFaMOXeVHQaxMDyMxeEuVAOxgrfRCtE0LbmQskctT8YUpcocw5dsF2rWvbdpZwg-xbiTwc_M0uQ1J5RuS10_xEh8312-K_ccJBjt99ARlJohddfGQA8YmIbWXY'
    },
    {
      title: 'Zenith Runner',
      subtitle: 'Performance Runner',
      price: '$280',
      alt: 'Pastel colored sneaker with chunky sole',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMQBi95xKZZB84IxCa0u0bc-CW-DEqltvFkOGt7GV1frjIYtC-2-_-R4DHMkDAPPk52kcKLOl0VbAahjjhHmX5cRCbO2mEfT_Y4_IAIZ9HZV45LNcK3bY_Uj1i_l1ZFDN2oiMt-0hmXzgj-60bW-RKaUzge82DEpKc3SXEK_i7CH0nhsrtQf4_Y7O2UeU5x3A6Xx4gJLAxtPE7mRTbxcHqaRtM5YomrmKVkn98ilcrUxn5pC0d0eMXFawQ9jbR3jTsz9Z1QseWWvo'
    },
    {
      title: 'Apex Strider',
      subtitle: 'Urban Explorer',
      price: '$350',
      alt: 'Classic black and white checkered sneaker',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEuvwO__Q6zav41qGwB-Hqn-5PPQ4OA0BLi3fAmbGO6EqMZU3bLn176s5zGT5tCx62oQfGyGQ-WMHNbS-8idKTsYbWqeTYeCYnLxEtER1SLfidQE5d9pmPglP2Z-EIpZt3UVe4yBzOwb1EGGukxzA34BrWMVsmKrhJRSfdYSMGpGQiho1uap1BMHUC6sO7t6IhHNPCCtwnH874OIEZbYYOHkuWy6jcEfmmgQtiZbYuCkgbn1KXfOE557tl9d1NkJz04_DEZgcJI'
    },
    {
      title: 'Celeste Low-Top',
      subtitle: 'Classic Court',
      price: '$290',
      alt: 'Pair of stylish white leather sneakers',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQZ3nqRkzCNko6UcmeC6vLpyyADVyhRqCU1UY6T79OnJ7nuBWMtOEUWHXaMyRNSEKTRUjz1FGKkW3ko7iQr51OZE5kB-Imaq5tKzrTuFxe51Id8xBpjT3ioxrw28XusY5iFoTmZaOizfzmdpK-gzFWELJMc9go11jNyAevkD7JeTusZgws0xpmuNUR0_KiP1izphdx_Yl28q7XP2gK7-KO7tpJB5hCCLvrY09jzf59ox7MrBM31DlcWRkfgwEZlNnrtFcYrjWtDbA'
    },
    {
      title: 'Nova-X Trainer',
      subtitle: 'Cross-Training',
      price: '$310',
      alt: 'Colorful high-top basketball sneaker',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjz-g0U6jVVu8LE1MV8ojrzk5jl6SqgcWaCtF2kJCKAIxP8yUigmGmlMNYn0M-YWyWp0rak8150APV_RCpcpqAD5CE1rgNDrouOpvehJOZ1w4K86uILq2Ln8lJSPYOeMwYlTuG-pLDjPPR6S_19arEfU68MA-gh-LPjZToJHy3PSjVM5JdjyH9XCbYWyxSyIKAms0SZww0ooODSnI7SB5XQ78Uz1mzIXb2kmuRyTW-5GgtFUpEwHq32vP_aRYq7XwVmPWd73TzpUQ'
    },
    {
      title: 'Orion High-Top',
      subtitle: 'Fashion High-Top',
      price: '$380',
      alt: 'White and red retro high-top sneaker',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdy2toPkSQI6iYI6CIdtlFZhQ-yNgkAaJSEAzWU0XrpHWw-2r3GDbWglpqZLz00EBQG3pfoPNbV-UITus2Ueb8KL1b0IQP-iJO8RPOfn4bdMf0HF6RMUGMEHZhQOSonTOCVESfAumSVJUWpPRcwCv1KY5jSt5aKUOnj9izIVP8v5A7QB9u49nM9Y2Lqs3toYQimIFuUoyXqYqr_yAIM7ZIJzSVdH73sQOkORYw9gXxojYAF6vULtAGuzrvw9LOfCncpXZoTJs6HQw'
    },
    {
      title: 'Vortex Fusion',
      subtitle: 'Hybrid Sneaker',
      price: '$330',
      alt: 'Sleek black sneaker with white sole',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSznv8zFe8Fy76QDrSXCCRA1kDqQKQCzCt_bo66G8TYxOoXta4QTd5SPKHKZrDpBJMAl1KcoW2fnAp7bUgpOQbVXp13U5brnJ87Q5YEc6rHjHc5AS1I1hyXdj15PU0FaUjFHyKcdVmmESQ2vQ8ZBDAO2tsjhQXiCHkLyZqS25_jQayVTiE80fm3IBdXE_SHyFaFR6xNM7TAwuSn9pJLH9Qm40E6Jn3psk5OkYlSVpXSDjL9bQa_aBAKtAKkQKfiDCxtQmzCr-A118'
    },
    {
      title: 'Solstice Sneaker',
      subtitle: 'Summer Edition',
      price: '$275',
      alt: 'White and blue running shoe',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKrpeD2bH5ldsXQas2d9VDk3fbXz8OkFHR4N-EUHLSsLWxuFuFOeDLNoOX0F5ZXrpi-_eAuVEt-w5KyZh8r7P_2UlYnd2o43a0uuIIxcHl5WoJgl5wTw8t9lYxL1BSG7p8p4PFzdD9QuYNz8PXQ4pQKYx1OT5woiVW63Hqw8Ce2B6j-2wLvLakDt9ko5PX_Z-MK7FueLEYeuatriUW-D0MJsz6zQQCy1WjvRV9TBZHrDR3ccDMY4Jw-0qn-084fJL6cMUWInTFlH8'
    }
  ];

  const { slug } = useParams<{ slug: string }>()
  const displayNameBySlug: Record<string, string> = {
    'all-sneakers': 'All Sneakers',
    'new-arrivals': 'New Arrivals',
    'new-releases': 'New Releases',
    'custom-and-unreleased': 'Custom & Unreleased',
    'jordan': 'Jordan',
    'more-footwear': 'More Footwear',
    'reviews': 'Reviews',
  }
  const heading = (slug && displayNameBySlug[slug]) || 'All Sneakers'

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <main className="flex-1">
              <div className="px-4 py-12 md:py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white">{heading}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400">Discover our curated collection of luxury footwear, crafted for the modern individual.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 p-4">
                {products.map((p, idx) => (
                  <Link
                    key={idx}
                    to={`/product/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|/g, '')}`}
                    state={{ product: p }}
                    className="flex flex-col gap-3 group"
                  >
                    <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5">
                      <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={p.alt} src={p.src} />
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{p.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{p.subtitle}</p>
                      <p className="mt-1 text-sm font-semibold text-gray-700 dark:text-gray-300">{p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-center py-10 md:py-16">
                <a className="flex h-10 w-10 items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" href="#">
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold bg-primary text-white" href="#">1</a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10" href="#">2</a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10" href="#">3</a>
                <span className="flex h-10 w-10 items-center justify-center text-sm text-gray-600 dark:text-gray-300">...</span>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10" href="#">9</a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10" href="#">10</a>
                <a className="flex h-10 w-10 items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" href="#">
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}