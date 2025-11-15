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
    <div className="w-full overflow-hidden text-blue-600 border-b border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark">
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