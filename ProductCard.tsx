import Link from 'next/link'

interface Product {
  id: number
  name: string
  image: string
  price: number
  description: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white dark:bg-gray-900"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{product.description}</p>
        <p className="mt-2 font-bold text-blue-600">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}
