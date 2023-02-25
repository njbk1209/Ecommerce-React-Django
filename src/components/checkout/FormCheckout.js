import React from 'react'
import { QuestionMarkCircleIcon, SortAscendingIcon, UsersIcon } from '@heroicons/react/solid'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const FormCheckout = ({ endBuyButton, sucursales, add_preorder_detail, tipo_pagos}) => {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const navigate = useNavigate();


    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-100 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:pt-6 lg:mt-0 lg:col-span-5"
        >
            <h2 id="summary-heading" className="text-lg font-medium ">
                Completa el formulario para generar pedido
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
                    transaction_type: ''
                }}

                validationSchema={Yup.object({
                    identification_types: Yup.string()
                        .required('Requerido.'),
                    identification: Yup.string()
                        .max(15, 'Debe contener 15 caracteres o menos.')
                        .min(1, 'Debe contener al menos un caracter.')
                        .required('Requerido.'),
                    rif_types: Yup.string()
                        .required('Requerido.'),
                    rif: Yup.string()
                        .max(15, 'Debe contener 15 caracteres o menos.')
                        .min(1, 'Debe contener al menos un caracter.')
                        .required('Requerido.'),
                    full_name: Yup.string()
                        .max(255, 'Debe contener 255 caracteres o menos.')
                        .min(5, 'Debe contener al menos 5 caracter.')
                        .required('Requerido'),
                    address_line: Yup.string()
                        .max(255, 'Debe contener 255 caracteres o menos.')
                        .min(10, 'Debe contener al menos 10 caracter.')
                        .required('Requerido'),
                    state_province_region: Yup.string()
                        .max(25, 'Debe contener 25 caracteres o menos.')
                        .min(2, 'Debe contener al menos 2 caracter.')
                        .required('Requerido'),
                    city: Yup.string()
                        .max(25, 'Debe contener 255 caracteres o menos.')
                        .min(2, 'Debe contener al menos 2 caracter.')
                        .required('Requerido'),
                    telephone_number: Yup.string().matches(phoneRegExp, 'El número de telefono no es valido'),
                    whatsapp_number: Yup.string().matches(phoneRegExp, 'El número de Whatsapp no es valido'),
                    postal_zip_code: Yup.number().positive().integer()
                        .lessThan(999999, 'Debe contener 6 caracteres o menos.')
                        .min(1, 'Debe contener al menos un caracter.')
                        .required('Requerido.'),
                    shipping_branch: Yup.string()
                        .required('Requerido.'),
                    transaction_type: Yup.string()
                        .required('Requerido.'),
                })}

                onSubmit={({ identification_types, identification, rif_types, rif, full_name, address_line, state_province_region, city, telephone_number, whatsapp_number, postal_zip_code, shipping_branch, transaction_type }, { setSubmitting }) => {
                    add_preorder_detail(identification_types, identification, rif_types, rif, full_name, address_line, state_province_region, city, telephone_number, whatsapp_number, postal_zip_code, shipping_branch, transaction_type)
                    window.scrollTo(0, 0);
                    //alert(identification_types + identification + rif_types + rif + full_name + address_line + state_province_region + city + telephone_number + whatsapp_number + postal_zip_code + shipping_branch + transaction_type )
                    navigate(`/payorder/${identification}`);
                }}

            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>

                        <div className="grid grid-cols-2 gap-4 items-start border-gray-200 pt-5">
                            <div className="mt-1 sm:mt-0">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Cédula de identidad <Link to="#" className='relative'><QuestionMarkCircleIcon className="inline h-5 w-5 text-slate-700 absolute ml-1" aria-hidden="true" /></Link>
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

                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    RIF <Link to="#" className='relative'><QuestionMarkCircleIcon className="inline h-5 w-5 text-slate-700 absolute ml-1" aria-hidden="true" /></Link>
                                </label>
                                <div className="relative flex items-stretch mt-1 flex-grow focus-within:z-10 bg-white rounded-md shadow-sm border-gray-300">
                                    <div className="">
                                        <select
                                            id='rif_types'
                                            name='rif_types'
                                            {...formik.getFieldProps('rif_types')}
                                            className='rounded-sm h-full px-1 text-slate-600 outline-slate-400 outline-1'
                                        >
                                            <option value={"V"}>V</option>
                                            <option value={"J"}>J</option>
                                            <option value={"G"}>G</option>
                                            <option value={"E"}>E</option>
                                            <option value={"P"}>P</option>

                                        </select>
                                    </div>
                                    <input
                                        type='text'
                                        name='rif'
                                        id='rif'
                                        {...formik.getFieldProps('rif')}
                                        autoComplete="off"
                                        className="block p-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                    />
                                </div>
                                {formik.touched.rif_types && formik.errors.rif_types ? (
                                    <div className='text-xs font-medium text-red-600'>{formik.errors.rif_types}</div>
                                ) : null}
                                {formik.touched.rif && formik.errors.rif ? (
                                    <div className='text-xs font-medium text-red-600'>{formik.errors.rif}</div>
                                ) : null}
                            </div>
                        </div>



                        <div className="lg:gap-4 lg:border-gray-200 pt-2">

                            <div className="mt-1 sm:mt-0">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Nombre completo
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

                            <div className="pt-2">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Dirección de residencia
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg flex rounded-md shadow-sm">
                                        <input
                                            type='text'
                                            name='address_line'
                                            id='address_line'
                                            {...formik.getFieldProps('address_line')}
                                            autoComplete="off"
                                            className="block p-1 w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                        />
                                    </div>
                                </div>
                                {formik.touched.address_line && formik.errors.address_line ? (
                                    <div className='text-xs font-medium text-red-600'>{formik.errors.address_line}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-start border-gray-200 pt-2">

                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Estado de residencia
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg flex rounded-md shadow-sm">
                                        <input
                                            type='text'
                                            name='state_province_region'
                                            id='state_province_region'
                                            {...formik.getFieldProps('state_province_region')}
                                            autoComplete="off"
                                            className="block p-1 w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                        />
                                    </div>
                                </div>
                                {formik.touched.state_province_region && formik.errors.state_province_region ? (
                                    <div className='text-xs font-medium text-red-600'>{formik.errors.state_province_region}</div>
                                ) : null}
                            </div>

                            <div className="sm:mt-0">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Ciudad de residencia
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg flex rounded-md shadow-sm">
                                        <input
                                            type='text'
                                            name='city'
                                            id='city'
                                            {...formik.getFieldProps('city')}
                                            autoComplete="off"
                                            className="block p-1 w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                        />
                                    </div>
                                </div>
                                {formik.touched.city && formik.errors.city ? (
                                    <div className='text-xs font-medium text-red-600'>{formik.errors.city}</div>
                                ) : null}
                            </div>


                        </div>

                        <div className="grid grid-cols-2 gap-4 items-start border-gray-200 pt-2">
                            <div className="mt-1 sm:mt-0">
                                <label htmlFor="telephone_number" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Teléfono de casa
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg flex rounded-md shadow-sm">
                                        <input
                                            type='tel'
                                            name='telephone_number'
                                            id='telephone_number'
                                            {...formik.getFieldProps('telephone_number')}
                                            autoComplete="off"
                                            className="block p-1 w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                        />
                                    </div>
                                </div>
                                {formik.touched.telephone_number && formik.errors.telephone_number ? (
                                    <div className='text-xs font-medium text-red-600'>{formik.errors.telephone_number}</div>
                                ) : null}
                            </div>
                            <div className="mt-1 sm:mt-0">
                                <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Teléfono de Whatsapp
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg flex rounded-md shadow-sm">
                                        <input
                                            type='tel'
                                            name='whatsapp_number'
                                            id='whatsapp_number'
                                            {...formik.getFieldProps('whatsapp_number')}
                                            autoComplete="off"
                                            className="block p-1 w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                        />
                                    </div>
                                </div>
                                {formik.touched.whatsapp_number && formik.errors.whatsapp_number ? (
                                    <div className='text-xs font-medium text-red-600'>{formik.errors.whatsapp_number}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-2">

                            <div className="mt-1 sm:mt-0">
                                <label htmlFor="postal_zip_code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Código postal
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

                            <div className="mt-1 sm:mt-0">
                                <label htmlFor="shipping_branch" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Sucursal para retirar productos <Link to="#" className='relative'><QuestionMarkCircleIcon className="inline h-5 w-5 text-slate-700 absolute ml-1" aria-hidden="true" /></Link>
                                </label>

                                <div className="">
                                    <div className="">
                                        <select
                                            id='shipping_branch'
                                            name='shipping_branch'
                                            {...formik.getFieldProps('shipping_branch')}
                                            className="block p-1 w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            {
                                                sucursales &&
                                                sucursales !== null &&
                                                sucursales !== undefined &&
                                                sucursales.map((sucursal, index) => (
                                                    <option key={index} value={sucursal.name}>
                                                        {sucursal.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {formik.touched.shipping_branch && formik.errors.shipping_branch ? (
                                        <div className='text-xs font-medium text-red-600'>{formik.errors.shipping_branch}</div>
                                    ) : null}
                                </div>
                            </div>

                        </div>

                        <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-2 mb-6">
                            <div className="mt-1 sm:mt-0">
                                <label htmlFor="transaction_type" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Tipo de pago <Link to="#" className='relative'><QuestionMarkCircleIcon className="inline h-5 w-5 text-slate-700 absolute ml-1" aria-hidden="true" /></Link>
                                </label>

                                <div className="">
                                    <div className="">
                                        <select
                                            id='transaction_type'
                                            name='transaction_type'
                                            {...formik.getFieldProps('transaction_type')}
                                            className="block p-1 w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            {
                                                tipo_pagos &&
                                                tipo_pagos !== null &&
                                                tipo_pagos !== undefined &&
                                                tipo_pagos.map((pago, index) => (
                                                    <option key={index} value={pago.name}>
                                                        {pago.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {formik.touched.transaction_type && formik.errors.transaction_type ? (
                                        <div className='text-xs font-medium text-red-600'>{formik.errors.transaction_type}</div>
                                    ) : null}
                                </div>
                            </div>

                        </div>



                        {endBuyButton}

                    </form>
                )}
            </Formik>
        </section>
    )
}

export default FormCheckout