import React, { useState, useEffect } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {
    get_preorder,
    preorder
} from "../../redux/actions/preorders";

import { QuestionMarkCircleIcon, SortAscendingIcon, UsersIcon } from '@heroicons/react/solid'

function Datos({ dato, valor, border, border2 }) {
    return (
        <div className='grid grid-cols-8 items-start'>
            <div className='col-span-3'>
                <p className={`bg-blue-900 ${border} text-sm text-white font-semibold p-2 pl-3`}>{dato}</p>
            </div>
            <div className='col-span-5'>
                <p className={`font-medium text-sm bg-white text-gray-700 p-2 pl-2 ${border2}`}>{valor}</p>
            </div>
        </div>
    )
}

function Monto({ dato, valor, expresion }) {
    return (
        <div className='grid grid-cols-12 items-start mt-1.5 bg-white rounded-md shadow-sm'>
            <div className='col-span-8'>
                <p className='font-medium text-sm text-gray-700 p-1 ml-2 '>{dato}</p>
            </div>
            <div className='col-span-4'>
                <p className='bg-green-700 text-sm text-center text-white font-semibold rounded-r-lg p-1'>{valor}{expresion}</p>
            </div>
        </div>
    )
}

const endBuyButton = () => {
    return (
        <div className="">
            <>
                <button
                    type="submit"
                    className="block w-8/12 mx-auto mt-6 bg-blue-900 text-white border border-transparent rounded-md shadow-sm py-3 px-8 text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
                >
                    Pagar orden
                </button>
            </>

        </div>
    )
}

const FormPayment =({
    preorder,
  }) => {

    return (
        <section aria-labelledby="summary-heading"
            className="bg-gray-100 rounded-lg  px-4 py-4 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
            <article>
                <div className='flex justify-between'>
                    <h2 id="summary-heading" className="text-lg font-medium mb-4">
                        Cuenta a transferir
                    </h2>
                    <h2 id="summary-heading" className="text-lg font-medium mb-4">
                        Preorden #{preorder && preorder.id}
                    </h2>
                </div>
                
                <div className='shadow-sm rounded-lg'>
                    <Datos
                        dato='Banco:'
                        valor='Banesco'
                        border='rounded-tl-lg'
                        border2='rounded-tr-lg'
                    />

                    <Datos
                        dato='Beneficiario:'
                        valor='MULTIMAX STORE ONLINE, C.A.'
                    />

                    <Datos
                        dato='RIF:'
                        valor='J-50058410-5'
                    />

                    <Datos
                        dato='Número de cuenta:'
                        valor='01341089530001007636'
                        border='rounded-bl-lg'
                        border2='rounded-br-lg'
                    />
                </div>

                <div className='mt-4'>
                    <Monto
                        dato='Total a pagar en (Bolívares):'
                        valor={preorder && (preorder.amount*22.98).toFixed(2)}
                        expresion='bs'
                    />

                    <Monto
                        dato='Total a pagar en (Dolares):'
                        valor={preorder && preorder.amount}
                        expresion='$'
                    />
                </div>
            </article>
            <>
                <h2 id="summary-heading" className="text-lg font-medium mt-6">
                    Formulario de pago
                </h2>
                <Formik
                    initialValues={{
                        identification_types: 'V',
                        identification: '',
                        rif_types: 'V',
                        rif: '',
                        full_name: '',
                        address_line: '',
                        state_province_region: '',
                        city: '',
                        telephone_number: '',
                        whatsapp_number: '',
                        postal_zip_code: '',
                        shipping_branch: '',
                        transaction_type: '',
                        account_holder: '',
                        reference: '',
                        payment_support: ''
                    }}

                    onSubmit={({ identification_types, identification, rif_types, rif, full_name, address_line, state_province_region, city, telephone_number, whatsapp_number, postal_zip_code, shipping_branch, transaction_type }, { setSubmitting }) => {
                        //add_preorder_detail(identification_types, identification, rif_types, rif, full_name, address_line, state_province_region, city, telephone_number, whatsapp_number, postal_zip_code, shipping_branch, transaction_type)
                        window.scrollTo(0, 0);
                        //alert(identification_types + identification + rif_types + rif + full_name + address_line + state_province_region + city + telephone_number + whatsapp_number + postal_zip_code + shipping_branch + transaction_type )
                        //navigate(`payorder/${identification}`);
                    }}
                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>

                            <div className="lg:gap-4 lg:border-gray-200 pt-2">
                                <div className="mt-1 sm:mt-0">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Nombre del titular de la cuenta
                                    </label>
                                    <div className="max-w-lg flex rounded-md shadow-sm">
                                        <input
                                            type='text'
                                            name='full_name'
                                            id='full_name'
                                            {...formik.getFieldProps('full_name')}
                                            autoComplete="off"
                                            className="block p-1 w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                        />
                                    </div>
                                    {formik.touched.full_name && formik.errors.full_name ? (
                                        <div className='text-xs font-medium text-red-600'>{formik.errors.full_name}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 items-start border-gray-200">
                                <div className="mt-1 sm:mt-0">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Documento del titular <Link to="#" className='relative'><QuestionMarkCircleIcon className="inline h-5 w-5 text-slate-700 absolute ml-1" aria-hidden="true" /></Link>
                                    </label>

                                    <div className="relative flex items-stretch mt-1 flex-grow focus-within:z-10 bg-white rounded-md shadow-sm border-gray-300">
                                        <div className="">
                                            <select
                                                id='identification_types'
                                                name='identification_types'
                                                {...formik.getFieldProps('identification_types')}
                                                className='rounded-sm h-full px-1 text-slate-600 outline-slate-400 outline-1'
                                            >
                                                <option value={"V"}>V</option>
                                                <option value={"E"}>E</option>
                                                <option value={"P"}>P</option>
                                            </select>
                                        </div>
                                        <input
                                            type='text'
                                            name='identification'
                                            id='identification'
                                            {...formik.getFieldProps('identification')}
                                            autoComplete="off"
                                            className="block p-1 pl-4 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                        />
                                    </div>
                                    {formik.touched.identification_types && formik.errors.identification_types ? (
                                        <div className='text-xs font-medium text-red-600'>{formik.errors.identification_types}</div>
                                    ) : null}
                                    {formik.touched.identification && formik.errors.identification ? (
                                        <div className='text-xs font-medium text-red-600'>{formik.errors.identification}</div>
                                    ) : null}
                                </div>

                                <div className="mt-1 sm:mt-0">
                                    <label htmlFor="postal_zip_code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Referencia del comprobante
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <div className="max-w-lg flex rounded-md shadow-sm">
                                            <input
                                                type='text'
                                                name='postal_zip_code'
                                                id='postal_zip_code'
                                                {...formik.getFieldProps('postal_zip_code')}
                                                autoComplete="off"
                                                className="block p-1 w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                            />
                                        </div>
                                    </div>
                                    {formik.touched.postal_zip_code && formik.errors.postal_zip_code ? (
                                        <div className='text-xs font-medium text-red-600'>{formik.errors.postal_zip_code}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="lg:gap-4 lg:border-gray-200 pt-2">
                                <div className="mt-1 sm:mt-0">
                                    <label htmlFor="postal_zip_code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Comprobante de pago (capture) <Link to="#" className='relative'><QuestionMarkCircleIcon className="inline h-5 w-5 text-slate-700 absolute ml-1" aria-hidden="true" /></Link>
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <div className="max-w-lg flex bg-white mt-1 py-1 rounded-md shadow-sm">
                                            <input
                                                type='file'
                                                name='postal_zip_code'
                                                id='postal_zip_code'
                                                {...formik.getFieldProps('postal_zip_code')}
                                                autoComplete="off"
                                                className="block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    {formik.touched.postal_zip_code && formik.errors.postal_zip_code ? (
                                        <div className='text-xs font-medium text-red-600'>{formik.errors.postal_zip_code}</div>
                                    ) : null}
                                </div>
                            </div>

                            {endBuyButton()}

                        </form>
                    )}
                </Formik>
            </>
        </section>
    )
}

const mapStateToProps = state => ({
    preorder: state.Preorders.preorder
  })
  
export default connect(mapStateToProps, {
    get_preorder
})(FormPayment)
