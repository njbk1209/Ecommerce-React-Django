import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../../hocs/Layout';
import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'
import { Navigate } from 'react-router'
import { Link } from 'react-router-dom';


const Login = ({
  login,
  loading
}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [activated, setActivated] = useState(false);
  const [showHidePassword, changeShowHidePassword] = useState(false);

  if (activated)
    return <Navigate to='/' />;

  return (
    <Layout>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}

        validationSchema={Yup.object({
          email: Yup.string()
            .email('Introduzca una dirección de correo valida.')
            .required('Requerido.'),
          password: Yup.string()
            .required('Requerido.'),
        })}

        onSubmit={({ email, password }, { setSubmitting }) => {
          login(email, password)
          setActivated(true);
          window.scrollTo(0, 0);
          setSubmitting(false);
        }}
      >
        {formik => (
          <section className="py-24 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md p-8 shadow-md shadow-gray-400 sm:rounded-lg sm:px-10">
              <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  ¿No estas registrado?{' '}
                  <Link to="/signup" className="font-medium text-sky-600 hover:text-sky-800">
                    Registrarse
                  </Link>
                </p>
              </div>
              <form onSubmit={formik.handleSubmit} className="space-y-3">

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="text"
                      {...formik.getFieldProps('email')}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className='text-xs text-red-600 pt-1'>{formik.errors.email}</p>
                    ) : null}
                  </div>
                </div>

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
                  <div className="flex items-center text-sm pt-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                      onChange={() => changeShowHidePassword(!showHidePassword)}
                    />
                    Mostrar contraseña
                  </div>
                </div>

                <p className="text-sm">
                  <Link to="/reset_password" className="font-medium text-sky-600 hover:text-sky-800">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </p>

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
                    Iniciar sesión
                  </button>

                }
              </form>

            </div>

          </section>
        )}
      </Formik>
    </Layout>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  login,
})(Login)