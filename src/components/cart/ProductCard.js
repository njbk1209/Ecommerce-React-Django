import React from 'react'
import { Link } from "react-router-dom"

const ProductCard = ({ id, images, name, brand, price, compare_price, }) => {

    return (
        <Link to={`/product/${id}`}>
            <div key={id} className="group relative shadow-md rounded-md px-1 py-3 shadow-gray-400 m-auto cursor-pointer">
                <div className="w-full px-4 min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-3/4 lg:aspect-none">
                    <img
                        src={images}
                        alt=""
                        className="h-full object-center lg:h-full"
                    />
                </div>
                <div className='text-xl md:text-sm text-center font-medium'>

                    <h3 className=" text-gray-700">
                        {name} 
                    </h3>

                    <p className="text-sm text-xl">${price}</p>
                    {
                        compare_price === price ?
                            <p className="text-xs">Precio full</p> :
                            <p className="text-xs line-through">${compare_price}</p>
                    }
                </div>
            </div>
        </Link>

    )
}

export default ProductCard