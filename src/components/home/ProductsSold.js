import { Link } from "react-router-dom"
import ProductCard from "../cart/ProductCard"
export default function ProductsSold({ data }) {
    return (
        <div className="bg-white">
            <div className="max-w-2xl px-8 py-4 mx-auto sm:max-w-xl sm:p-6 lg:max-w-6xl">
                <h2 className="text-4xl lg:text-2xl font-extrabold tracking-tight text-gray-900 pb-2">Más vendidos</h2>

                <div className="mt-6 px-6 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-2xl lg:max-w-7xl lg:grid-cols-4 xl:gap-x-4">
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
                                key={product.id}
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