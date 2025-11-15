import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const directionRef = useRef(1)
  const posRef = useRef(0)
  const widthRef = useRef(0)
  useEffect(() => {
    const container = carouselRef.current
    if (!container) return
    const track = container.querySelector('.carousel-track') as HTMLElement | null
    if (!track) return
    const originals = Array.from(track.children)
    originals.forEach(el => {
      const clone = el.cloneNode(true) as HTMLElement
      track.appendChild(clone)
    })
    widthRef.current = track.scrollWidth / 2
    let frame = 0
    const step = () => {
      posRef.current += directionRef.current * 0.8
      if (posRef.current >= widthRef.current) posRef.current -= widthRef.current
      if (posRef.current < 0) posRef.current += widthRef.current
      track.style.transform = `translate3d(${-posRef.current}px,0,0)`
      track.style.willChange = 'transform'
      frame = requestAnimationFrame(step)
    }
    let dragging = false
    let startX = 0
    let startPos = 0
    const onDown = (e: PointerEvent) => {
      dragging = true
      startX = e.clientX
      startPos = posRef.current
      directionRef.current = 0
      container.setPointerCapture?.(e.pointerId)
      e.preventDefault()
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const delta = e.clientX - startX
      posRef.current = startPos - delta
    }
    const onUp = () => {
      dragging = false
      directionRef.current = 1
    }
    const onTouchStart = (e: TouchEvent) => {
      dragging = true
      startX = e.touches[0].clientX
      startPos = posRef.current
      directionRef.current = 0
      e.preventDefault()
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return
      const delta = e.touches[0].clientX - startX
      posRef.current = startPos - delta
      e.preventDefault()
    }
    const onMouseDown = (e: MouseEvent) => {
      dragging = true
      startX = e.clientX
      startPos = posRef.current
      directionRef.current = 0
      e.preventDefault()
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return
      const delta = e.clientX - startX
      posRef.current = startPos - delta
    }
    track.addEventListener('pointerdown', onDown, { passive: false })
    track.addEventListener('pointermove', onMove, { passive: false })
    track.addEventListener('pointerup', onUp)
    track.addEventListener('pointerleave', onUp)
    track.addEventListener('pointercancel', onUp)
    track.addEventListener('touchstart', onTouchStart, { passive: false })
    track.addEventListener('touchmove', onTouchMove, { passive: false })
    track.addEventListener('touchend', onUp)
    track.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onUp)
    frame = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('pointerdown', onDown)
      track.removeEventListener('pointermove', onMove)
      track.removeEventListener('pointerup', onUp)
      track.removeEventListener('pointerleave', onUp)
      track.removeEventListener('pointercancel', onUp)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove', onTouchMove)
      track.removeEventListener('touchend', onUp)
      track.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])
  return (
    <main className="flex flex-col">
      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        <div ref={carouselRef} className="relative overflow-hidden touch-pan-x cursor-grab active:cursor-grabbing select-none">
          <div className="flex items-stretch p-2 gap-6 carousel-track touch-pan-x cursor-grab active:cursor-grabbing select-none">
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 min-w-[280px] sm:min-w-[320px] snap-center">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl flex flex-col"
                data-alt="A stylish white sneaker with blue accents on a minimalist background"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDObCgFQMPVhg53clAD8zGAQX_ZRnfVykOpof_pHW0oDAC1T3awIBS40Z8BowjoHcBgnLt_dAFJiefVFieamxxleTq-NYtyem8iyd5KlZoCs6psBKwt2XGxrp2gHMfHQFV9pJfD-FpwfOdumALrDKENFfkTC26gPCxglGj8n6jdGJ68MxX6-IL1TvHwbaXRYtmzyhO2LiRESMcrwebdHAwf6-CzJXoEsmRAmbwwCyWkN8nOKV1um_KHutznOzhnhGH36Vt811GArtw")' }}
              ></div>
              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                <div>
                  <p className="text-base font-semibold">The Vertex Collection</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Discover the Pinnacle of Modern Design</p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="truncate">Shop Now</span>
                </button>
              </div>
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 min-w-[280px] sm:min-w-[320px] snap-center">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl flex flex-col"
                data-alt="A pair of sleek black running shoes with white soles"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIDofSqXo7iwTcus55-Adhszsv9wo6f2fk4RgEwX--tR6IMIHLu97yxadDGq7MowNktm23hdcyBBrhp1meZ5gfdt9-zWB2CL1EKUsXZJ6f7O12HaDc6y4M1U9fauNLRjRTZLdOLzJBREr2gmrdbSOHArc3SQ0rk8vpLNx8Eqt8X945euKbGglAPOVGKKv9M6XJeNljG19xOzThpNq0sPN5Ug7ecAZsBLTDe8Cztf3_syY39qTowwVzGZT5HRLcIo7RIUsRX6vLTJY")' }}
              ></div>
              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                <div>
                  <p className="text-base font-semibold">Nova Runner Series</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Engineered for the Urban Explorer</p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="truncate">Shop Now</span>
                </button>
              </div>
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 min-w-[280px] sm:min-w-[320px] snap-center">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl flex flex-col"
                data-alt="A limited edition high-top sneaker with unique color patterns"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAU0CY6NjT4fCFKWDyXVQ8Plf_5uoETXHv7nFimmlWMmotfYJQriQN2CBmoHF7tmJ0PmAf3HmV9RH0vIrx4kYXkJuDDqpa9YSmLDo6xkP7wikgSgq4k2OBtG_e6NvzxapCqyTPrGzAI2EQTXZsgxWA_6g_tj0uldfV6aLUhfHnwqdZSi81QWrapFUMrI4RKkN1J-g9DGJG6dWap4Wr39yVNPj0fKTqD5DbUcnXQA3VJNT9N2xMxqOJrk7PB8hjyC_hlpIE184tsVPU")' }}
              ></div>
              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                <div>
                  <p className="text-base font-semibold">Ascend Limited Edition</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Exclusivity Redefined in Every Step</p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="truncate">Shop Now</span>
                </button>
              </div>
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 min-w-[280px] sm:min-w-[320px] snap-center">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl flex flex-col"
                data-alt="Classic brown leather shoe"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxxDaYnp4Av3awuwCjeN0tqQ0Rg6mAifF8NSjF5KV8_pGAcCko2IlRCzQn_vPT8AsnD6x5ZbxImvo7ljAQUMNFSjJNq7QMdlIZFuuH4b2QY-UFjXTs3uaAEsEOYtAQVJFkNLMv6y8mFP1Nje2PU97-SEYPhGBPBD1Pi5Kwh8suovqmdKEZdbo-AZG2cey7dDz-5cmxX37lNHlAHCpqOdMT5rkCx6tZW6ygbMfc8O3OtNZrU9GnTU_c07fnuF2qeUAzNcfITz2XcgM")' }}
              ></div>
              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                <div>
                  <p className="text-base font-semibold">Heritage Craft</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Timeless Style, Unmatched Quality</p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="truncate">Shop Now</span>
                </button>
              </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 min-w-[280px] sm:min-w-[320px] snap-center">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl flex flex-col" data-alt="Premium tan and white sneaker" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAj8QBvbI2UJI2AkLf16lfSG28h0YhFc3chlGML2oqEwzHXwBFypmj2LsMthfUH5YbRdEVgopK5_FytsQSDVuhzOA8PaaE5paggEdA8bofyVKjh9gmEp2OBScwZ4LizkLJ_MZ3XFa23kJzyMr-PZ-FjAtA7_6Py1YindWNB9g4MbLq20Y4-0pk9WSrlbLvn3QpyWE-UUqoLrv3m9P2yCHbsp3K5eM3VCflS30a7CABZSm6EC7NDrhyYedAHJrh-DCny2ahjQvsB-UY")' }}></div>
              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                <div>
                  <p className="text-base font-semibold">Monarch Elite</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Crafted for Daily Comfort</p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="truncate">Shop Now</span>
                </button>
              </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 min-w-[280px] sm:min-w-[320px] snap-center">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl flex flex-col" data-alt="Sleek all-black sneaker" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAw6IJaYk3imu8UBN9fjqCpCf1Yo0a3ALuMFrfB886UmHit4rdYsbvYucypxRuIPKYPSA1XXkKNiD74snGBKoYcboEGQq1ftQHvcSkii3bIIOpBwl8d44Rf2xWavd-GLOkmDnhTcqkg8CoMDMmgP7CaXQLhGk5k1KKSv4KXyjfxUKiLH6lJhKQrxFnUtOYy5P-tdc0TcwFZTF1xZzErO_ONJtdsWMpAAzC0VQZ3EKhWoVveUDKPTruGjzjdOkpVFGM9daX3ovyVs64")' }}></div>
              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                <div>
                  <p className="text-base font-semibold">Eclipse Runner Pro</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Performance Meets Style</p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="truncate">Shop Now</span>
                </button>
              </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-foreground-light dark:bg-foreground-dark border border-gray-200 dark:border-gray-800 min-w-[280px] sm:min-w-[320px] snap-center">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl flex flex-col" data-alt="Colorful athletic sneaker" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4b7jrPtANBt4N1poSHsG_fF0tEGqY9SpaAoRWcuta7Uvc9a40OaWs78-2LT-B22F_p2QLSgfsNpYMDzuYz_juDjDbbmu_wjBRYgPobM2rOoXP42guBLghWfZs71OwXN-wVIKxVHiHBnsjn9rKoHhwY7wDhbvo6y0HF-SyWd351Qn8poq4AG08dS9TXlGVuoG5-YNDn6kt9YSTSp_HIkj-hc4ntiffKm9EWb1y667irdXyn2GWpnTaVEvd2sCdX8fVBX0fdWaLf_A")' }}></div>
              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                <div>
                  <p className="text-base font-semibold">Aether High</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Elevate Your Stride</p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="truncate">Shop Now</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight px-4 pb-6">Hot Right Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-6 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group"
            data-alt="A person wearing chunky sole sneakers walking on a city street"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZArQirr2R-Xn_6a3qmh-jCbC0P1WvOgzcMRSgRCXRmw7AvFsM__3Gxsy1aGuKzwqG3h69TelvM_iNUQQTvzewdf2VJ6hci72EybQ2O13qPj7EkzhLrH94yJyidLjS-5TJFfg4YxJIc7l7iUb3e8AzgPW4dSYxXRi4aORB9D0vg7JZTbUBG2xSAZN5BWagam6FYRixWJnYIpsJItF8BnA1FWYekxCd0VVXpWTe8eN2mdYLe2_ok1Hn86YwmTevSvfJ8fPpaeOcIG0")' }}
          >
            <p className="text-white text-xl font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-300">The Chunky Sole Edit</p>
          </div>
          <div
            className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-6 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group"
            data-alt="A pair of white minimalist high-top sneakers against a concrete wall"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNMMrcJYmeQRHnpyFiKlhpl7vk8ry8Xi9bIeItdygPtlEDifIVeWPZPdQhuL-F-a4HJjC5DRUt_l9Glt1sncoD3naKji5NR9aNRv9XX1F5TMX183Cdyrs2di0b74N9jBKzRCqMPd-_F46F4uXNBBN8lxbgEVQFBvudqH6jSi_AiXAnpV0T7hOVVTPLY7nW01HBZL8PsNNKM5ecN13X_AX1RzL6Km4g8dppWjfWNivYi0hqLGaf8IpuJS5kErWX-AGl7l-fEtZtcro")' }}
          >
            <p className="text-white text-xl font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-300">Minimalist High-Tops</p>
          </div>
          <div
            className="bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-6 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group"
            data-alt="Close-up on the side of a colorful retro runner sneaker"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAo4m08Q5nou8YgL0Mne7eJL0aZOZ5yXs36sBT_y47xE1YHEaU0zKHSzrDPxSbRR6qsj47hP073kJWpkFpjQjN9LK77jsGitnWGd3dPgxum5IVG7mBPSrzpJNKXj8nDWfOokEQMaKiFk7T1ZtQX9pdVs5tTXTVKsBhvSd3Eor_pyHFZ_fUYY2dyunTJSqGEkUxQr2qyjAr3ILv0Bbc2DVd5B9Tgvs8EyDvQLmJc1zumwNAlsW_ux5wIEocCrspa1DDb_JSAM34_f0")' }}
          >
            <p className="text-white text-xl font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-300">Retro Runners</p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        <div className="@container">
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden min-h-[300px] sm:min-h-[400px] rounded-xl"
            data-alt="Artistic close-up shot of a beige sneaker showing texture and material details"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 35%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuADtpo7l4d56IBJbGfFQjXJvKu4_nnJ1bC9ei8HWy5W5Hn6xiIM4V8DGMoS-hlSPbVJrNibuPheFt7LFPUutn8EwM0txUMcYw2c1cDQpL_K5a2R7EYyjDCU2vJLFvlsr8x_BZiM-l7INqbsrGMxcKjioFUfftHuajie_AqAPxP_D4BeEXvUu0kdsxevdihZzNKmn8N5scwLYlWB4qjvSXL5k3QnVs9Zir_-AIYATV8JHwNLtrOnNGl6vXFbBsldH2LB4h16yw90p5Y")' }}
          >
            <div className="flex flex-col p-6 sm:p-10 gap-4">
              <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-xl">New Collection Arriving This Fall</h3>
              <p className="text-gray-200 text-base sm:text-lg max-w-lg">Experience the next wave of design innovation. Timeless aesthetics meet cutting-edge comfort.</p>
              <div className="pt-2">
                <button className="flex min-w-[84px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white text-text-light text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 transition-colors">
                  <span className="truncate">Explore Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight px-4 pb-6">Best Selling</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Link
            to="/product/aura-classic-low"
            state={{ product: { title: 'Aura Classic Low', price: '$180.00', alt: 'A pair of stylish tan and white sneakers', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj8QBvbI2UJI2AkLf16lfSG28h0YhFc3chlGML2oqEwzHXwBFypmj2LsMthfUH5YbRdEVgopK5_FytsQSDVuhzOA8PaaE5paggEdA8bofyVKjh9gmEp2OBScwZ4LizkLJ_MZ3XFa23kJzyMr-PZ-FjAtA7_6Py1YindWNB9g4MbLq20Y4-0pk9WSrlbLvn3QpyWE-UUqoLrv3m9P2yCHbsp3K5eM3VCflS30a7CABZSm6EC7NDrhyYedAHJrh-DCny2ahjQvsB-UY' } }}
            className="group"
          >
            <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800/50 aspect-square">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A pair of stylish tan and white sneakers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj8QBvbI2UJI2AkLf16lfSG28h0YhFc3chlGML2oqEwzHXwBFypmj2LsMthfUH5YbRdEVgopK5_FytsQSDVuhzOA8PaaE5paggEdA8bofyVKjh9gmEp2OBScwZ4LizkLJ_MZ3XFa23kJzyMr-PZ-FjAtA7_6Py1YindWNB9g4MbLq20Y4-0pk9WSrlbLvn3QpyWE-UUqoLrv3m9P2yCHbsp3K5eM3VCflS30a7CABZSm6EC7NDrhyYedAHJrh-DCny2ahjQvsB-UY" />
            </div>
            <div className="pt-4">
              <h4 className="font-semibold">Aura Classic Low</h4>
              <p className="text-text-muted-light dark:text-text-muted-dark">$180.00</p>
            </div>
          </Link>

          <Link
            to="/product/velocity-runner"
            state={{ product: { title: 'Velocity Runner', price: '$220.00', alt: 'A colorful athletic sneaker with red, white, and blue tones', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4b7jrPtANBt4N1poSHsG_fF0tEGqY9SpaAoRWcuta7Uvc9a40OaWs78-2LT-B22F_p2QLSgfsNpYMDzuYz_juDjDbbmu_wjBRYgPobM2rOoXP42guBLghWfZs71OwXN-wVIKxVHiHBnsjn9rKoHhwY7wDhbvo6y0HF-SyWd351Qn8poq4AG08dS9TXlGVuoG5-YNDn6kt9YSTSp_HIkj-hc4ntiffKm9EWb1y667irdXyn2GWpnTaVEvd2sCdX8fVBX0fdWaLf_A' } }}
            className="group"
          >
            <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800/50 aspect-square">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A colorful athletic sneaker with red, white, and blue tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4b7jrPtANBt4N1poSHsG_fF0tEGqY9SpaAoRWcuta7Uvc9a40OaWs78-2LT-B22F_p2QLSgfsNpYMDzuYz_juDjDbbmu_wjBRYgPobM2rOoXP42guBLghWfZs71OwXN-wVIKxVHiHBnsjn9rKoHhwY7wDhbvo6y0HF-SyWd351Qn8poq4AG08dS9TXlGVuoG5-YNDn6kt9YSTSp_HIkj-hc4ntiffKm9EWb1y667irdXyn2GWpnTaVEvd2sCdX8fVBX0fdWaLf_A" />
            </div>
            <div className="pt-4">
              <h4 className="font-semibold">Velocity Runner</h4>
              <p className="text-text-muted-light dark:text-text-muted-dark">$220.00</p>
            </div>
          </Link>

          <Link
            to="/product/stratus-high-top"
            state={{ product: { title: 'Stratus High-Top', price: '$250.00', alt: 'A white high-top sneaker with a clean design', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaB_2s9MYZxAjJKlvExn7j77UY6bUQJW5LaGhYKRZ7UnfcYdpL81TLyKRUpB_JgDFe35sjTPCN9Vv5FQ6l05MQq1uVIk2QXxeai9PSFuqWcRMOqIX3mBrv5jsVMRW3LJk3MA-Pz_Tug1JbT2qyIOWwwFLpGvwdfpP2hjt17QwWbYlO84GQdUefmmMXboBq7HhPzH8288rVSONgepxZUbIeSEmSrpwNc_RP8rTT8iBug1ZJMb5ZiwvADKf8s0pbtRCn1eesxE_BoSU' } }}
            className="group"
          >
            <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800/50 aspect-square">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A white high-top sneaker with a clean design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaB_2s9MYZxAjJKlvExn7j77UY6bUQJW5LaGhYKRZ7UnfcYdpL81TLyKRUpB_JgDFe35sjTPCN9Vv5FQ6l05MQq1uVIk2QXxeai9PSFuqWcRMOqIX3mBrv5jsVMRW3LJk3MA-Pz_Tug1JbT2qyIOWwwFLpGvwdfpP2hjt17QwWbYlO84GQdUefmmMXboBq7HhPzH8288rVSONgepxZUbIeSEmSrpwNc_RP8rTT8iBug1ZJMb5ZiwvADKf8s0pbtRCn1eesxE_BoSU" />
            </div>
            <div className="pt-4">
              <h4 className="font-semibold">Stratus High-Top</h4>
              <p className="text-text-muted-light dark:text-text-muted-dark">$250.00</p>
            </div>
          </Link>

          <Link
            to="/product/eclipse-midnight"
            state={{ product: { title: 'Eclipse Midnight', price: '$195.00', alt: 'A sleek all-black sneaker on a dark background', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw6IJaYk3imu8UBN9fjqCpCf1Yo0a3ALuMFrfB886UmHit4rdYsbvYucypxRuIPKYPSA1XXkKNiD74snGBKoYcboEGQq1ftQHvcSkii3bIIOpBwl8d44Rf2xWavd-GLOkmDnhTcqkg8CoMDMmgP7CaXQLhGk5k1KKSv4KXyjfxUKiLH6lJhKQrxFnUtOYy5P-tdc0TcwFZTF1xZzErO_ONJtdsWMpAAzC0VQZ3EKhWoVveUDKPTruGjzjdOkpVFGM9daX3ovyVs64' } }}
            className="group"
          >
            <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800/50 aspect-square">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A sleek all-black sneaker on a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw6IJaYk3imu8UBN9fjqCpCf1Yo0a3ALuMFrfB886UmHit4rdYsbvYucypxRuIPKYPSA1XXkKNiD74snGBKoYcboEGQq1ftQHvcSkii3bIIOpBwl8d44Rf2xWavd-GLOkmDnhTcqkg8CoMDMmgP7CaXQLhGk5k1KKSv4KXyjfxUKiLH6lJhKQrxFnUtOYy5P-tdc0TcwFZTF1xZzErO_ONJtdsWMpAAzC0VQZ3EKhWoVveUDKPTruGjzjdOkpVFGM9daX3ovyVs64" />
            </div>
            <div className="pt-4">
              <h4 className="font-semibold">Eclipse Midnight</h4>
              <p className="text-text-muted-light dark:text-text-muted-dark">$195.00</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="w-full px-4 sm:px-10 lg:px-20 py-10 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto text-center">
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <h4 className="font-bold text-lg">Huge Product Range</h4>
            <p className="text-text-muted-light dark:text-text-muted-dark mt-1 text-sm">Explore hundreds of styles from exclusive collections to timeless classics.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">sell</span>
            </div>
            <h4 className="font-bold text-lg">Best Price</h4>
            <p className="text-text-muted-light dark:text-text-muted-dark mt-1 text-sm">We guarantee premium quality footwear at competitive prices.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <h4 className="font-bold text-lg">Quick Shipping</h4>
            <p className="text-text-muted-light dark:text-text-muted-dark mt-1 text-sm">Fast, reliable, and free shipping on all orders over $150.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex items-center justify-center size-12 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <h4 className="font-bold text-lg">Dedicated Support</h4>
            <p className="text-text-muted-light dark:text-text-muted-dark mt-1 text-sm">Our team is here to help you with any questions, 24/7.</p>
          </div>
        </div>
      </section>
    </main>
  )
}