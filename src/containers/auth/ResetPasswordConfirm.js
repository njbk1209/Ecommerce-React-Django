import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { reset_password_confirm } from '../../redux/actions/auth'

import { Navigate, useParams } from 'react-router'

const ResetPasswordConfirm = ({
    reset_password_confirm,
    loading
}) => {

    const params = useParams()
    const [showHidePassword, changeShowHidePassword] = useState(false);

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
                    <section className="py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                            <h2 className="mt-6 mb-4 text-center text-3xl font-extrabold text-gray-900">Establece tu nueva contraseña</h2>
                            <form onSubmit={formik.handleSubmit} className="space-y-3">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Contraseña
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            type={showHidePassword ? 'text' : 'password'}
                                            {...formik.getFieldProps('password')}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <p className='text-xs text-red-600 pt-1'>{formik.errors.password}</p>
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
                                            type={showHidePassword ? 'text' : 'password'}
                                            {...formik.getFieldProps('re_password')}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
                                        />
                                        {formik.touched.re_password && formik.errors.re_password ? (
                                            <p className='text-xs text-red-600 pt-1'>{formik.errors.re_password}</p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                        onChange={() => changeShowHidePassword(!showHidePassword)}
                                    />
                                    Mostrar contraseña
                                </div>

                                {loading ?

                                    <button
                                        type="submit"
                                        className="w-full mt-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                    >
                                        Loading...
                                    </button>
                                    :
                                    <button
                                        type="submit"
                                        className="w-full mt-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                    >
                                        Actualizar mi contraseña
                                    </button>
                                }
                            </form>


                        </div>
                    </section>
                )}
            </Formik>
        </Layout >
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading
})

export default connect(mapStateToProps, {
    reset_password_confirm
})(ResetPasswordConfirm)