import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { reset_password } from '../../redux/actions/auth'

import { Navigate } from 'react-router'
import { Link } from 'react-router-dom';

const ResetPassword = ({
  reset_password,
  loading
}) => {

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
          email: ''
        }}

        validationSchema={Yup.object({
          email: Yup.string()
            .email('Introduzca una dirección de correo valida.')
            .required('Requerido.'),
        })}

        onSubmit={({ email }, { setSubmitting }) => {
          reset_password(email);
          window.scrollTo(0, 0);
          setRequestSent(true);
          setSubmitting(false);
        }}
      >
        {formik => (
          <section className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
              <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                  Recuperar contraseña
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  ¿Recordaste tu contraseña?{' '}
                  <Link to="/login" className="font-medium text-sky-600 hover:text-sky-800">
                    Inicia sesión
                  </Link>
                </p>
              </div>
              <form onSubmit={formik.handleSubmit} className="space-y-6">

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico a recuperar
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
    </Layout>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  reset_password
})(ResetPassword)