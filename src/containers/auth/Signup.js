import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../../hocs/Layout';
import { connect } from 'react-redux'
import { signup } from '../../redux/actions/auth'
import { Link } from 'react-router-dom';

import Logo from '../../staticImage/Logo_Blanco_Multimax.png'

const Signup = ({
  signup
}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [accountCreated, setAccountCreated] = useState(false);



  return (
    <Layout>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          re_password: ''
        }}

        validationSchema={Yup.object({
          first_name: Yup.string()
            .max(15, 'Debe contener 15 caracteres o menos.')
            .min(1, 'Debe contener al menos un caracter.')
            .required('Requerido.'),
          last_name: Yup.string()
            .max(15, 'Debe contener 20 caracteres o menos.')
            .min(1, 'Debe contener al menos un caracter.')
            .required('Requerido.'),
          email: Yup.string()
            .email('Introduzca una dirección de correo valida.')
            .required('Requerido.'),
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

        onSubmit={({ first_name, last_name, email, password, re_password }, { setSubmitting }) => {
          signup(first_name, last_name, email, password, re_password)
          setAccountCreated(true);
          window.scrollTo(0, 0)
          setSubmitting(false);
        }}
      >
        {formik => (
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
                className="mx-auto w-7/12 bg-blue-600 py-2 px-8 rounded-md"
                src={Logo}
                alt="Workflow"
              />
              <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Nuevo usuario</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Inicia sesión
                </Link>
              </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                <form onSubmit={formik.handleSubmit} className="space-y-6">

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo electrónico
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        type="text"
                        {...formik.getFieldProps('email')}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>

                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        Primer nombre
                      </label>
                      <div className="mt-1">
                        <input
                          id="first_name"
                          type="text"
                          {...formik.getFieldProps('first_name')}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {formik.touched.first_name && formik.errors.first_name ? (
                          <div>{formik.errors.first_name}</div>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Primer apellido
                      </label>
                      <div className="mt-1">
                        <div className="mt-1">
                          <input
                            id="last_name"
                            type="text"
                            {...formik.getFieldProps('last_name')}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          {formik.touched.last_name && formik.errors.last_name ? (
                            <div>{formik.errors.last_name}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                  </div>


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


                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Registrarme
                    </button>
                  </div>
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

})

export default connect(mapStateToProps, {
  signup
})(Signup)