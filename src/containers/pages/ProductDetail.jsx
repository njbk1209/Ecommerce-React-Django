import { useEffect, useState, Fragment } from "react";
import Layout from '../../hocs/Layout'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition } from '@headlessui/react'
import {
  get_product,
  get_related_products
} from "../../redux/actions/products";

import {
  get_items,
  add_item,
  get_total,
  get_item_total
} from "../../redux/actions/cart";

import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import RelatedProducts from "../../components/shop/RelatedProducts";



const ProductDetail = ({
  get_product,
  get_related_products,
  product,
  related_products,
  get_items,
  add_item,
  get_total,
  get_item_total,
}) => {


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addToCart = async () => {
    if (product && product !== null && product !== undefined && product.quantity > 0) {
      setLoading(true)
      await add_item(product);
      await get_items();
      await get_total();
      await get_item_total();
      setLoading(false)
      navigate('/cart')
    }
  }

  const params = useParams()
  const productId = params.productId

  useEffect(() => {
    window.scrollTo(0, 0)
    get_product(productId)
    get_related_products(productId)
  }, [])

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl w-11/12 mx-auto pt-16 px-4 sm:pt-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery*/}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product && product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                    >
                      {({ selected }) =>

                      (
                        <>
                          <span className="sr-only">{image.id}</span>
                          <span className="absolute inset-0 rounded-md overflow-hidden">
                            <img src={`http://127.0.0.1:8000${image.image}`} alt="" className="w-full h-full object-center object-cover" />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>



              <Tab.Panels className="">
                {product && product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={`http://127.0.0.1:8000${image.image}`}
                      alt={image.alt}
                      className="w-9/12 m-auto sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>


            </Tab.Group>


            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product && product.name}</h1>

              <div className="mt-3">
                <p className="inline-block text-2xl text-white rounded-md bg-green-500 p-1 mb-2">{product && product.price}$</p>
                <p className="text-base line-through text-rose-700">{product && product.compare_price}$</p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product && product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product && product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product && product.description }}
                />
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-700"><span className="font-medium">MARCA:</span> {product && product.brand}</p>
              </div>

              <div className="mt-2">
                <p className="text-sm text-gray-700"><span className="font-medium">SKU:</span> {product && product.code}</p>
              </div>

              <div className="mt-5">

                <p className="">
                  {
                    product &&
                      product !== null &&
                      product !== undefined &&
                      product.quantity > 0 ? (
                      <span className='text-green-500 font-bold text-lg'>
                        ¡Disponible!
                      </span>
                    ) : (
                      <></>
                    )
                  }
                </p>


                <div className="mt-5 flex sm:flex-col1">
                  {
                    product &&
                      product !== null &&
                      product !== undefined &&
                      product.quantity > 0 ? (
                      <button
                        onClick={addToCart}
                        className="max-w-xs flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                      >
                        {loading ? 'Cargando...' : 'Agregar al carrito'}
                      </button>
                    ) : (
                      <span className='text-red-500 py-3 font-bold text-xl'>
                        ¡Agotado!
                      </span>
                    )
                  }
                  <button
                    type="button"
                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Agregar a favoritos</span>
                  </button>
                </div>
              </div>

              <section aria-labelledby="details-heading" className="mt-12 border border-slate-300 rounded-md">
                <h2 id="details-heading" className="sr-only">
                  Características
                </h2>
                {/* Caracteristicas */}
                <>
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative w-full py-4 px-4 flex justify-between items-center text-left">
                            <span
                              className={classNames(open ? 'text-blue-600' : 'text-gray-900', 'text-lg font-medium')}
                            >
                              Características
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Disclosure.Panel as="div" className="p-6 px-12 pt-0 prose prose-sm ">
                            <ul role="list" className="list-disc">
                              {product && product.characteristics && Object.entries(product.characteristics).map(([key, value]) => (
                                <li key={key} className="pb-2">
                                  <span className="font-medium">{value.name}: </span>
                                  {value.value}
                                </li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>

                </>

              </section>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto py-8 px-4 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <RelatedProducts data={related_products} />
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  product: state.Products.product,
  related_products: state.Products.related_products
})

export default connect(mapStateToProps, {
  get_product,
  get_related_products,
  get_items,
  add_item,
  get_total,
  get_item_total,
})(ProductDetail)