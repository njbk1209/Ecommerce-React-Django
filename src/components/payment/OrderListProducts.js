import React from 'react'
import CartItem from '../cart/CartItem';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'

const OrderListProducts = ({ preorder }) => {
    return (
        <article className='bg-blue-900 rounded-lg  py-4 sm:py-6 lg:p-8 lg:mt-0 text-slate-700'>
            <h1 className="mb-2 text-lg font-medium text-white">Datos del Cliente</h1>
            <div className='mb-2 rounded py-3 bg-white px-4 ml-2'>
                <p className='font-medium py-1'>Nombre completo: <span className='font-normal text-sm'>{preorder && preorder.full_name}</span></p>
                <p className='font-medium py-1'>Dirección: <span className='font-normal text-sm'>{preorder && preorder.address_line}</span></p>
                <p className='font-medium py-1'>Identificación: <span className='font-normal text-sm'>{preorder && preorder.identification_types}-{preorder && preorder.identification}</span></p>
                <p className='font-medium py-1'>Telefonos: <span className='font-normal text-sm'>{preorder && preorder.telephone_number} / {preorder && preorder.whatsapp_number}</span></p>
            </div>
            <h1 className="text-lg font-medium mt-4 mb-2 text-white">Productos a pagar</h1>
            <article  className='py-3 px-4 ml-2 rounded bg-white'>
                <div className='grid grid-cols-6 mb-2 pb-0.5 border-b-2 border-slate-300 '>
                    <div className='font-medium col-span-3 '>
                        Descripcion
                    </div>
                    <div className='font-medium text-center'>
                        Cantidad
                    </div>
                    <div className='font-medium text-center'>
                        Precio
                    </div>
                    <div className='font-medium text-center'>
                        Total
                    </div>
                </div>
                {
                    preorder &&
                        preorder.pre_order_items &&
                        preorder.pre_order_items !== null &&
                        preorder.pre_order_items !== undefined &&
                        preorder.pre_order_items !== 0 ?
                        preorder.pre_order_items.map((item, index) => {
                            let count = item.count;
                            return (
                                    <div key={index} className='grid grid-cols-6 text-sm mb-2'>
                                        <div className='col-span-3 '>
                                            {item.name}
                                        </div>
                                        <div className='text-center'>
                                            {count}
                                        </div>
                                        <div className='text-center'>
                                            {item.price} c/u
                                        </div>
                                        <div className='text-center'>
                                            {(item.price * count).toFixed(2)}$
                                        </div>
                                    </div>
                                
                            );
                        }) :
                        <article className='py-8 text-center'>
                            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl pb-3">
                                No hay productos
                            </h1>
                        </article>
                }
            </article>
            <article
                aria-labelledby="summary-heading"
                className="p-4 bg-blue-900 text-white rounded-lg mt-6"
            >
                <h1 className="text-lg font-medium mb-4">Total a pagar</h1>
                <dl className="space-y-4 px-4">
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium ">{preorder && ((preorder.amount) - (preorder.amount * 0.16)).toFixed(2)}$</dd>
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
                        <dd className="text-sm font-medium">{(preorder && (preorder.amount * 0.16).toFixed(2))}$</dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                        <dt className="text-base font-medium">Total de la orden</dt>
                        <dd className="text-base font-medium">{preorder && (preorder.amount).toFixed(2)}$</dd>
                    </div>
                </dl>
            </article>
        </article>
    )
}

export default OrderListProducts