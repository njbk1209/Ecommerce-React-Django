import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { reset_password_confirm } from '../../redux/actions/auth'

import {Navigate, useParams} from 'react-router'

const ResetPasswordConfirm = ({
    reset_password_confirm,
    loading
}) => {

    const params = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [requestSent, setRequestSent] = useState(false);

    if (requestSent && !loading)
        return <Navigate to='/' />;

    return (
        <Layout>
            <Formik
                initialValues={{
                    password: '',
                    re_password: ''
                }}

                validationSchema={Yup.object({
                    password: Yup.string()
                        .required('Campo obligatorio.')
                        .matches(
                            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                            "Debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y al menos un caracter especial"
                        ),
                    re_password: Yup.string()
                        .required('Campo obligatorio.')
                        .oneOf([Yup.ref('password'), null], 'La contraseña no coincide.')
                })}

                onSubmit={({ password, re_password }, { setSubmitting }) => {
                    const uid = params.uid
                    const token = params.token
                    console.log(uid)
                    console.log(token)
                    console.log(password)
                    console.log(re_password)

                   reset_password_confirm(uid, token, password, re_password)

                    if (password === re_password)
                        setRequestSent(true);

                    window.scrollTo(0, 0);
                    setSubmitting(false);
                }}
            >
                {formik => (
                    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Indica la nueva contraseña</h2>
                        </div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                                <form onSubmit={formik.handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Contraseña
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                type="password"
                                                {...formik.getFieldProps('password')}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {formik.touched.password && formik.errors.password ? (
                                                <div>{formik.errors.password}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="re_password" className="block text-sm font-medium text-gray-700">
                                            Repite la contraseña
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="re_password"
                                                type="password"
                                                {...formik.getFieldProps('re_password')}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {formik.touched.re_password && formik.errors.re_password ? (
                                                <div>{formik.errors.re_password}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {loading ?

                                        <button
                                            type="submit"
                                            className="w-full mt-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Loading...
                                        </button>
                                        :
                                        <button
                                            type="submit"
                                            className="w-full mt-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Actualizar mi contraseña
                                        </button>
                                    }
                                </form>

                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </Layout>
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading
})

export default connect(mapStateToProps, {
    reset_password_confirm
})(ResetPasswordConfirm)