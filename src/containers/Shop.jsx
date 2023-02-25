import React from 'react'
import Layout from '../hocs/Layout'
import ProductCard from "../components/cart/ProductCard"
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { FilterIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'
import { useParams } from 'react-router'

//categories and products imports
import { connect } from 'react-redux'
import { get_categories } from '../redux/actions/categories'
import { get_products, get_filtered_products, get_search_products } from '../redux/actions/products'
import { useEffect } from 'react'
import { prices } from '../helpers/fixedPrices'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Shop = ({
    get_categories,
    categories,
    get_products,
    products,
    get_filtered_products,
    searched_products,
    filtered_products,
    get_search_products,
}) => {

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [filtered, setFiltered] = useState(false)


    const params = useParams()
    const busqueda = params.busqueda

    const [formData, setFormData] = useState({
        category_id: '0',
        price_range: 'Any',
        sortBy: 'created',
        order: 'desc'
    })

    const {
        category_id,
        price_range,
        sortBy,
        order
    } = formData

    useEffect(() => {
        get_categories()
        get_products()
        get_filtered_products(null)

        window.scrollTo(0, 0)
    }, [])

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        get_filtered_products(category_id, price_range, sortBy, order);
        get_search_products(null);
        setFiltered(true);
    }

    const showProducts = () => {
        let results = []
        let display = []

        if (
            filtered_products &&
            filtered_products !== null &&
            filtered_products !== undefined &&
            filtered
        ) {
            filtered_products.map((product, index) => {
                display.push(
                    <div key={index}>
                        <ProductCard id={product.id}
                            images={`http://127.0.0.1:8000${product.images[0].image}`}
                            name={product.name}
                            price={product.price}
                            compare_price={product.compare_price}
                        />
                    </div>
                );
            });
        } else if (searched_products &&
            searched_products !== null &&
            searched_products !== undefined &&
            searched_products.length !== 0 &&
            busqueda === 's'&&
            !filtered
        ) {
            searched_products.map((product, index) => {
                display.push(
                    <div key={index}>
                        <ProductCard id={product.id}
                            images={`http://127.0.0.1:8000${product.images[0].image}`}
                            name={product.name}
                            price={product.price}
                            compare_price={product.compare_price}
                        />
                    </div>
                );
            });
        } else if (
            !searched_products &&
            !filtered_products &&
            products &&
            products !== null &&
            products !== undefined &&
            !filtered
        ) {
            products.map((product, index) => {

                return display.push(
                    <div key={product.id}>
                        <ProductCard id={product.id}
                            images={`http://127.0.0.1:8000${product.images[0].image}`}
                            name={product.name}
                            price={product.price}
                            compare_price={product.compare_price} />
                    </div>
                );
            });
        } else if (display.length === 0 ) {
            return (
                <div className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28 h-28 text-red-600 mx-auto mt-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <h1 className='text-2xl font-medium text-center'>No hay productos que coincidan con tu búsqueda.</h1>
                    <ul className='list-disc text-base py-4 px-8 lg:ml-24'>
                        <li><span className='font-semibold'>Revisa la ortografía</span> de las palabras.</li>
                        <li>Utiliza <span className='font-semibold'>palabras más genéricas</span> o menos palabras.</li>
                        <li>Navega por las categorías para encontrar un producto similar.</li>
                        <li>La categoría que seleccionaste no posee <span className='font-semibold'>productos disponibles.</span></li>
                    </ul>
                </div>
            )
        }

        for (let i = 0; i <= display.length; i += 4) {
            results.push(
                <div key={i} className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                    {display[i] ? display[i] : <div></div>}
                    {display[i + 1] ? display[i + 1] : <div className=''></div>}
                    {display[i + 2] ? display[i + 2] : <div className=''></div>}
                    {display[i + 3] ? display[i + 3] : <div className=''></div>}
                </div>
            )
        }
        return results
    }

    return (
        <Layout>
            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                                    <div className="px-4 flex items-center justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* MOBILES FILTERS*/}
                                    {/*Category Filters*/}
                                    <form onSubmit={e => onSubmit(e)} className="mt-4 border-t border-gray-200">
                                        <Disclosure as="div" className="border-b border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">Categorías</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <h3 className="sr-only">Categories</h3>
                                                        <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                                                            {
                                                                categories &&
                                                                categories !== null &&
                                                                categories !== undefined &&
                                                                categories.map(category => {
                                                                    if (category.sub_categories.length === 0) {
                                                                        return (
                                                                            <div key={category.id} className=' flex items-center h-5 my-5'>
                                                                                <input
                                                                                    name='category_id'
                                                                                    onChange={e => onChange(e)}
                                                                                    value={category.id.toString()}
                                                                                    type='radio'
                                                                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                                />
                                                                                <label className="ml-3 min-w-0 flex-1 text-gray-500 font-medium">
                                                                                    {category.name}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        let result = []
                                                                        result.push(
                                                                            <div key={category.id} className='flex items-center h-5'>
                                                                                <input
                                                                                    name='category_id'
                                                                                    onChange={e => onChange(e)}
                                                                                    value={category.id.toString()}
                                                                                    type='radio'
                                                                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                                />
                                                                                <label className="ml-3 min-w-0 flex-1 text-gray-500 font-medium" >
                                                                                    {category.name}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                        category.sub_categories.map(sub_category => {
                                                                            result.push(
                                                                                <div key={sub_category.id} className='flex items-center h-5 ml-2 my-5'>
                                                                                    <input
                                                                                        name='category_id'
                                                                                        onChange={e => onChange(e)}
                                                                                        value={sub_category.id.toString()}
                                                                                        type='radio'
                                                                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                                    />
                                                                                    <label className="ml-3 min-w-0 flex-1 text-gray-500 font-normal">
                                                                                        {sub_category.name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })

                                                                        return result
                                                                    }
                                                                })
                                                            }
                                                        </ul>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>

                                        <Disclosure as="div" className="border-b border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>

                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">Rango de precios</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {
                                                                prices && prices.map((price, index) => {
                                                                    if (price.id === 0) {
                                                                        return (
                                                                            <div key={index} className='form-check'>
                                                                                <input
                                                                                    onChange={e => onChange(e)}
                                                                                    value={price.name}
                                                                                    name='price_range'
                                                                                    type='radio'
                                                                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                                    defaultChecked
                                                                                />
                                                                                <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <div key={index} className='form-check'>
                                                                                <input
                                                                                    onChange={e => onChange(e)}
                                                                                    value={price.name}
                                                                                    name='price_range'
                                                                                    type='radio'
                                                                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                                />
                                                                                <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light'>{price.name}</label>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>

                                        <Disclosure as="div" className="border-b border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">Más filtros</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            <div className='form-group '>
                                                                <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 text-gray-500'
                                                                >Ver por</label>
                                                                <select
                                                                    className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                                    id='sortBy'
                                                                    name='sortBy'
                                                                    onChange={e => onChange(e)}
                                                                    value={sortBy}
                                                                >
                                                                    <option value='date_created'>Fecha</option>
                                                                    <option value='price'>Precio</option>
                                                                    <option value='sold'>Ventas</option>
                                                                    <option value='title'>Nombre</option>

                                                                </select>
                                                            </div>
                                                            <div className='form-group'>
                                                                <label htmlFor='order' className='mr-3 min-w-0 flex-1 text-gray-500'
                                                                >Orden</label>
                                                                <select
                                                                    className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                                    id='order'
                                                                    name='order'
                                                                    onChange={e => onChange(e)}
                                                                    value={order}
                                                                >
                                                                    <option value='asc'>A - Z</option>
                                                                    <option value='desc'>Z - A</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                        <button
                                            type="submit"
                                            className="block text-center bg-blue-600 border border-transparent rounded-md py-2 px-8 mt-1 mx-auto font-medium hover:cursor-pointer text-white hover:bg-blue-800"
                                        >
                                            Buscar
                                        </button>
                                    </form>
                                </div>
                            </Transition.Child>
                        </Dialog>
                    </Transition.Root>

                    <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative z-10 flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
                            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-gray-900">
                                {searched_products && searched_products !== null && searched_products !== undefined ? '(' + searched_products.length + ') Resultados' : 'Lista de productos'}
                            </h1>

                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FilterIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pt-2 pb-24">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                                {/* WEB FILTERS*/}
                                <form onSubmit={e => onSubmit(e)} className="hidden lg:block">

                                    <p className='text-xl font-bold border-b border-gray-200 pt-6 pb-4'>Filtrar por</p>

                                    <Disclosure as="div" className="border-b border-gray-200 py-5">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="py-3 bg-white w-11/12 mx-auto flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900 text-base">Categorías</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">

                                                    <ul role="list" className="text-sm font-medium text-gray-900 space-y-4">
                                                        {
                                                            categories &&
                                                            categories !== null &&
                                                            categories !== undefined &&
                                                            categories.map(category => {
                                                                if (category.sub_categories.length === 0) {
                                                                    return (
                                                                        <div key={category.id} className=' flex items-center h-5 my-5'>
                                                                            <input
                                                                                name='category_id'
                                                                                type='radio'
                                                                                onChange={e => onChange(e)}
                                                                                value={category.id.toString()}
                                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                            />
                                                                            <label className="ml-3 min-w-0 flex-1 text-gray-500 font-medium">
                                                                                {category.name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    let result = []
                                                                    result.push(
                                                                        <div key={category.id} className='flex items-center h-5'>
                                                                            <input
                                                                                name='category_id'
                                                                                type='radio'
                                                                                onChange={e => onChange(e)}
                                                                                value={category.id.toString()}
                                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                            />
                                                                            <label className="ml-3 min-w-0 flex-1 text-gray-500 font-medium">
                                                                                {category.name}
                                                                            </label>
                                                                        </div>
                                                                    )

                                                                    category.sub_categories.map(sub_category => {
                                                                        result.push(
                                                                            <div key={sub_category.id} className='flex items-center h-5 ml-2 my-5'>
                                                                                <input
                                                                                    name='category_id'
                                                                                    type='radio'
                                                                                    onChange={e => onChange(e)}
                                                                                    value={sub_category.id.toString()}
                                                                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                                />
                                                                                <label className="ml-3 min-w-0 flex-1 text-gray-500 font-normal">
                                                                                    {sub_category.name}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })

                                                                    return result
                                                                }
                                                            })
                                                        }
                                                    </ul>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    <Disclosure as="div" className="border-b border-gray-200 py-5">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="py-3 bg-white w-11/12 mx-auto flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900 text-base">Rango de precios</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                        {
                                                            prices && prices.map((price, index) => {
                                                                if (price.id === 0) {
                                                                    return (
                                                                        <div key={index} className='form-check'>
                                                                            <input
                                                                                onChange={e => onChange(e)}
                                                                                value={price.name}
                                                                                name='price_range'
                                                                                type='radio'
                                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                                defaultChecked
                                                                            />
                                                                            <label className='ml-3 min-w-0 flex-1 text-gray-500 font-medium font-sofiapro-light'>{price.name}</label>
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div key={index} className='form-check'>
                                                                            <input
                                                                                onChange={e => onChange(e)}
                                                                                value={price.name}
                                                                                name='price_range'
                                                                                type='radio'
                                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                            />
                                                                            <label className='ml-3 min-w-0 flex-1 text-gray-500 font-medium font-sofiapro-light'>{price.name}</label>
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    <Disclosure as="div" className="border-b border-gray-200 py-5">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="py-3 bg-white w-11/12 mx-auto flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900 text-base">Más filtros</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                        <div className='form-group '>
                                                            <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 text-gray-500'
                                                            >Ver por</label>
                                                            <select
                                                                className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                                id='sortBy'
                                                                name='sortBy'
                                                                onChange={e => onChange(e)}
                                                                value={sortBy}
                                                            >
                                                                <option value='date_created'>Fecha</option>
                                                                <option value='price'>Precio</option>
                                                                <option value='sold'>Ventas</option>
                                                                <option value='title'>Nombre</option>

                                                            </select>
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='order' className='mr-3 min-w-0 flex-1 text-gray-500'
                                                            >Orden</label>
                                                            <select
                                                                className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                                id='order'
                                                                name='order'
                                                                onChange={e => onChange(e)}
                                                                value={order}
                                                            >
                                                                <option value='asc'>A - Z</option>
                                                                <option value='desc'>Z - A</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    <button
                                        type="submit"
                                        className="block m-auto text-center bg-blue-600 border border-transparent rounded-md py-2 px-12 mt-4 font-medium hover:cursor-pointer text-white hover:bg-blue-800"
                                    >
                                        Buscar
                                    </button>
                                </form>

                                {/* Product grid */}
                                <div className="lg:col-span-3">
                                    {(products || searched_products) && showProducts()}
                                </div>
                            </div>

                        </section>
                    </main>
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    categories: state.Categories.categories,
    products: state.Products.products,
    searched_products: state.Products.search_products,
    filtered_products: state.Products.filtered_products
})

export default connect(mapStateToProps, {
    get_categories,
    get_products,
    get_filtered_products,
    get_search_products
})(Shop)