import React from 'react'
import Layout from '../../hocs/Layout'

import { useState, useEffect } from "react";
import { connect } from "react-redux"
import {
  get_items,
  get_total,
  get_item_total,
  isAuthenticated,
  items,
  amount,
  compare_amount,
  total_items,
  remove_item,
  update_item,
} from "../../redux/actions/cart";
import { setAlert } from "../../redux/actions/alert";
import CartItem from '../../components/cart/CartItem';
import { Link } from 'react-router-dom';

import { QuestionMarkCircleIcon } from '@heroicons/react/solid'

const AddCart = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-red-700">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  )

}

const Cart = ({
  get_items,
  get_total,
  get_item_total,
  isAuthenticated,
  items,
  amount,
  compare_amount,
  total_items,
  remove_item,
  update_item,
  setAlert,
}) => {

  const [render, setRender] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    get_items()
    get_total()
    get_item_total()
  }, [render])

  const showItems = () => {
    return (
      <div>
        {
          items &&
            items !== null &&
            items !== undefined &&
            items.length !== 0 ?
            items.map((item, index) => {
              let count = item.count;
              return (
                <div key={index}>
                  <CartItem
                    item={item}
                    count={count}
                    update_item={update_item}
                    remove_item={remove_item}
                    render={render}
                    setRender={setRender}
                    setAlert={setAlert}
                  />
                </div>
              );
            }) :
            <div className='py-8 text-center'>
              <h1 className="w-full border border-transparent py-3 px-4 text-lg font-medium text-slate-700">
                <AddCart />
                Carrito vacio. <Link to='/shop/s' className='underline text-blue-600'>Ir a la tienda</Link>
              </h1>
              
            </div>
        }
      </div>
    )
  }

  const checkoutButton = () => {
    if (total_items < 1) {
      return (
        <>
          <Link
            to='/shop/s'
          >
            <button
              className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700"
            >
              Ir a la Tienda
            </button>
          </Link>
        </>
      )
    } else if (!isAuthenticated) {
      return (<>
        <Link
          to='/login'
        >
          <button
            className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700"
          >
            Login
          </button>
        </Link>
      </>)

    } else {
      return (
        <>
          <Link
            to='/checkout'>
            <button
              className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700"
            >
              Procesar compra
            </button>
          </Link>
        </>
      )

    }
  }

  const subtotal = (amount.toFixed(2) - amount.toFixed(2) * 0.16)
  const iva = (amount.toFixed(2) * 0.16)

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Carrito de compra</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {showItems()}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Orden de compra
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">{subtotal.toFixed(2)}$</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Costo de envío estimado</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how shipping is calculated</span>
                      <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-green-500 font-bold">¡Gratis!</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex text-sm text-gray-600">
                    <span>IVA (16%)</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how tax is calculated</span>
                      <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">{iva.toFixed(2)}$</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Total de la orden</dt>
                  <dd className="text-base font-medium text-gray-900">{amount.toFixed(2)}$</dd>
                </div>
              </dl>

              <div className="mt-6">
                {checkoutButton()}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  items: state.Cart.items,
  amount: state.Cart.amount,
  compare_amount: state.Cart.compare_amount,
  total_items: state.Cart.total_items
})

export default connect(mapStateToProps, {
  get_items,
  get_total,
  get_item_total,
  remove_item,
  update_item,
  setAlert,
})(Cart)