import { useState, useEffect } from "react";
import Layout from '../../hocs/Layout'
import { Navigate } from 'react-router'
import { connect } from 'react-redux'
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
import {
    get_preorder_detail,
    preorder
  } from "../../redux/actions/preorders";
import { add_preorder_detail } from '../../redux/actions/preorders'
import { setAlert } from "../../redux/actions/alert";
import CartItem from '../../components/cart/CartItem';
import { Link } from 'react-router-dom';
import { ExclamationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'
import FormCheckout from "../../components/checkout/FormCheckout";
import { sucursales } from '../../helpers/sucursales'
import { tipo_pagos } from '../../helpers/pagos'


const Checkout = ({
    isAuthenticated,
    get_items,
    get_total,
    get_item_total,
    items,
    amount,
    compare_amount,
    total_items,
    remove_item,
    update_item,
    setAlert,
    add_preorder_detail,
    get_preorder_detail,
    preorder
}) => {

    const [render, setRender] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        get_items()
        get_total()
        get_item_total()
        get_preorder_detail()
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
                                <li key={index}>
                                    <CartItem
                                        item={item}
                                        count={count}
                                        update_item={update_item}
                                        remove_item={remove_item}
                                        render={render}
                                        setRender={setRender}
                                        setAlert={setAlert}
                                        checkout={true}
                                    />
                                </li>
                            );
                        }) :
                        <div className='py-8 text-center'>
                            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl pb-3">
                                No hay productos
                            </h1>
                        </div>
                }
            </div>
        )
    }

    const endBuyButton = () => {

        if (preorder && preorder !== null && preorder !== undefined && preorder.length !== 0 ){
            return(
                <p>Hay una preorden activa, debe pagarla o cancelarla para cargar una nueva preorden.</p>
            )
        }

        return (
            <div className="">
                <>
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white border border-transparent rounded-md shadow-sm py-3 px-8 text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        Cargar pedido
                    </button>
                </>

            </div>
        )
    }

    const subtotal = (amount.toFixed(2) - amount.toFixed(2) * 0.16)
    const iva = (amount.toFixed(2) * 0.16)

    if (!isAuthenticated)
        return <Navigate to='/' />;

    return (
        <Layout>
            <div className="bg-white ">
                <div className="max-w-2xl mx-auto md:mt-16 mb-24 py-0 px-4 md:p-0 lg:max-w-7xl border border-slate-100 rounded-lg">

                    <div className="lg:grid lg:grid-cols-12 ">



                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="rounded-l-lg px-1 py-0 sm:p-6 lg:py-10 md:px-4 xl:px-8 lg:mt-0 lg:col-span-6 bg-white text-slate-800"
                        >

                            <FormCheckout
                                endBuyButton={endBuyButton()}
                                sucursales={sucursales}
                                tipo_pagos={tipo_pagos}
                                add_preorder_detail = {add_preorder_detail}
                            />

                        </section>

                        <section aria-labelledby="cart-heading" className="bg-blue-900 py-16 px-4 lg:col-span-6 rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none">
                            <div className="sm:mx-8 mb-2">
                                <p className="text-slate-300 font-medium text-lg"> Total a pagar</p>
                                <h2 className="text-white font-bold text-3xl">{amount.toFixed(2)}$</h2>
                            </div>

                            <ul role="list" className="divide-y divide-gray-200">
                                {showItems()}
                            </ul>

                            <article
                                aria-labelledby="summary-heading"
                                className="w-10/12 mx-auto lg:mt-0 lg:col-span-6 text-white"
                            >
                                <dl className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm">Subtotal</dt>
                                        <dd className="text-sm font-medium ">{subtotal.toFixed(2)}$</dd>
                                    </div>
                                    <div className="pt-2 flex items-center justify-between">
                                        <dt className="flex items-center text-sm">
                                            <span>Costo de envío estimado</span>
                                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Learn more about how shipping is calculated</span>
                                                <QuestionMarkCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                            </a>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-500 font-bold">¡Gratis!</dd>
                                    </div>
                                    <div className="pt-2 flex items-center justify-between">
                                        <dt className="flex text-sm">
                                            <span>IVA (16%)</span>
                                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Learn more about how tax is calculated</span>
                                                <QuestionMarkCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                            </a>
                                        </dt>
                                        <dd className="text-sm font-medium">{iva.toFixed(2)}$</dd>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                        <dt className="text-base font-medium">Total de la orden</dt>
                                        <dd className="text-base font-medium">{amount.toFixed(2)}$</dd>
                                    </div>
                                </dl>
                            </article>
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
    total_items: state.Cart.total_items,
    preorder: state.Preorders.preorder,
})

export default connect(mapStateToProps, {
    get_items,
    get_total,
    get_item_total,
    remove_item,
    update_item,
    setAlert,
    add_preorder_detail,
    get_preorder_detail
})(Checkout)