import { useState } from "react";
import { Link } from "react-router-dom";
import { XIcon, CheckCircleIcon, ClockIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useEffect } from "react";



const CartItem = ({
    item,
    count,
    update_item,
    remove_item,
    render,
    setRender,
    setAlert,
    checkout
}) => {
    const [formData, setFormData] = useState({
        item_count: 1
    });

    const { item_count } = formData;

    useEffect(() => {
        if (count)
            setFormData({ ...formData, item_count: count });
    }, [count]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()
        const fetchData = async () => {
            try {
                /*if (item.producto.promo){
                    setAlert(`Solo se puede vender 1 articulo por persona en promo.`, 'red');
                } else*/
                if (item.product.quantity >= item_count) {
                    await update_item(item, item_count);
                    setAlert(`La cantidad del producto ${item.product.name} se actualizó exitosamente`, 'green');
                    window.scrollTo(0, 0)
                } else {
                    setAlert(`La cantidad ingresada del producto ${item.product.name}, es mayor que la disponible`, 'red');
                }
                setRender(!render);
            } catch (err) {

            }
        };

        fetchData();
    }

    const removeItemHandler = async () => {
        await remove_item(item);
        setRender(!render);
    };

    if (checkout) {
        return (
            <div className="flex py-2 sm:py-4 sm:mx-8 border-b border-gray-400">
                <div className="flex-shrink-0">
                    <img
                        src={`http://127.0.0.1:8000${item.product.images[0].image}`}
                        alt=""
                        className="w-24 h-24 mt-4 md:mt-0 rounded-md object-center object-cover sm:w-24 sm:h-24"
                    />
                </div>

                <div className="ml-2 flex-1 flex flex-col justify-between sm:ml-4">
                    <div className="relative pr-9 xl:grid xl:grid-cols-5 xl:gap-x-4 xl:pr-0">
                        <div className="col-span-3">
                            <div className="flex justify-between">
                                <h3 className="text-sm pr-12">
                                    <Link to={`/product/${item.product.id}`} className="text-md font-medium text-white hover:text-gray-300">
                                        {item.product.name}
                                    </Link>
                                </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                                <p className="text-gray-200">Cantidad: {count}</p>
                            </div>
                            <div className="mt-1 flex text-sm">
                                <p className="text-gray-200">SKU: {item.product.code}</p>
                            </div>


                        </div>

                        <div className="mt-4 col-span-3 sm:mt-0 sm:pr-9">
                            <div className="absolute top-0 right-0">
                                <p className=" text-sm font-medium text-gray-200">c/u: {item.product.price} $</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-start">
                        <button
                            onClick={removeItemHandler}
                            >
                            <TrashIcon className="w-6 h-6 mr-4 text-red-600 "/>
                        </button>
                        <Link to='/cart'>

                            <PencilIcon className="w-6 h-6  text-yellow-400" />

                        </Link>
                    </div>



                </div>
            </div>
        )
    } else {
        return (
            <div className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                    <img
                        src={`http://127.0.0.1:8000${item.product.images[0].image}`}
                        alt=""
                        className="w-36 h-36 mt-4 md:mt-0 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 xl:grid xl:grid-cols-2 xl:gap-x-4 xl:pr-0">
                        <div>
                            <div className="flex justify-between">
                                <h3 className="text-sm">
                                    <Link to={`/product/${item.product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                        {item.product.name}
                                    </Link>
                                </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                                <p className="text-gray-500">SKU: {item.product.code}</p>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">{item.product.price} $</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                            <form onSubmit={e => onSubmit(e)}>
                                <select
                                    name='item_count'
                                    onChange={(e) => onChange(e)}
                                    value={item_count}
                                    className="max-w-full rounded-md border border-gray-300 p-1 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>

                                </select>
                                <button
                                    type="submit"
                                    className="ml-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                                    <span className="text-sm">Actualizar cantidad</span>
                                </button>
                            </form>

                            <div className="absolute top-0 right-0">
                                <button
                                    onClick={removeItemHandler}
                                    className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Remove</span>
                                    <XIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        {
                            item.product &&
                                item.product !== null &&
                                item.product !== undefined &&
                                item.product.quantity > 0 ?
                                (
                                    <>
                                        <CheckCircleIcon className=" h-5 w-5 text-green-500" aria-hidden="true" />
                                        <span className='text-green-500 font-semibold'>

                                            ¡Disponible!
                                        </span>
                                    </>
                                )
                                : (
                                    <>
                                        <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300 text-red-500 " aria-hidden="true" />
                                        <span className='text-red-500 font-bold'>
                                            Agotado, proximamente...
                                        </span>
                                    </>
                                )}
                    </p>
                </div>
            </div>
        )
    }


}
export default CartItem