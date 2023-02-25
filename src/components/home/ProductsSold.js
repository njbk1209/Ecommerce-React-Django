import { Link } from "react-router-dom"
import ProductCard from "../cart/ProductCard"
export default function ProductsSold({ data }) {
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-4 px-4 sm:py-12 sm:px-6 lg:max-w-6xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Más vendidos</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data &&
                        data !== null &&
                        data !== undefined &&
                        data.map((product) => (
                            <ProductCard
                                id={product.id}
                                images={`http://127.0.0.1:8000${product.images[0].image}`}
                                name={product.name}
                                price={product.price}
                                compare_price={product.compare_price}
                            />
                        ))}
                </div>

                <div className="mt-6 sm:hidden">
                    <Link to="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                        Ver mas productos<span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}