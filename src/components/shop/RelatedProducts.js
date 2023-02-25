import React from 'react'
import ProductCard from "../cart/ProductCard"

const RelatedProducts = ({ data }) => {
    console.log(data)

    if (data === null) {
        return (
            <>
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 pb-2">No hay productos relacionados</h2>
            </>
        )
    }

    if (data) {
        return (
            <>
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 pb-2">Productos Relacionados</h2>
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
            </>
        )
    }

}

export default RelatedProducts