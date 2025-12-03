export default function CategoryTicker() {
  const messages = [
    '7% Welcome Discount',
    'Free Shipping over $150',
    'Fall Collection: Explore Now',
    '24/7 Support',
    'Easy Returns & Exchanges',
    '100% Satisfaction Guarantee',
  ]
  return (
    <div className="hidden md:block w-full overflow-hidden text-primary border-b border-gray-200 bg-background-light">
      <div className="flex gap-8 whitespace-nowrap animate-[marquee-reverse_20s_linear_infinite] px-4 sm:px-10 lg:px-20 py-3">
        {messages.concat(messages).map((text, idx) => (
          <span key={idx} className="text-sm font-medium">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}