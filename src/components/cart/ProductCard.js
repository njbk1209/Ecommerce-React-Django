import React from 'react'
import { Link } from "react-router-dom"

const ProductCard = ({id, images, name, price, compare_price}) => {
    return (
        <div key={id} className="group relative shadow-md rounded-md px-2 py-4 shadow-gray-400 m-auto">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-3/4 lg:aspect-none">
                <img
                    src={images}
                    alt=""
                    className="h-full object-center lg:h-full"
                />
            </div>
            <div className="mt-2 flex justify-between px-2">
                <div>
                    <h3 className="font-medium text-gray-700 pt-1" style={{fontSize: "15px"}}>
                        <Link to={`/product/${id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {name}
                        </Link>
                    </h3>

                </div>
                <div className='pl-1'>
                    <p className="text-base font-medium text-blue-500 pt-1 ">${price}</p>
                    <p style={{fontSize: "13px"}} className="line-through font-medium text-rose-700">${compare_price}</p>
                </div>

            </div>
        </div>
    )
}

export default ProductCard