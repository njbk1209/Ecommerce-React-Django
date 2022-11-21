import React from 'react'
import Layout from '../../hocs/Layout'
import { useParams } from 'react-router'
import { useState } from 'react'
import { connect } from 'react-redux'
import { activate } from '../../redux/actions/auth'
import { Navigate } from 'react-router'
import '../../styles/index.css';

const Activate = ({
  activate,
  loading
}) => {
  const params = useParams()
  const [activated, setActivated] = useState(false);

  const activate_account = () => {
    const uid = params.uid
    const token = params.token
    activate(uid, token);
    setActivated(true);
  }

  if (activated && !loading)
    return <Navigate to='/' />;

  return (
    <Layout>

      <div className="max-w-2xl mx-auto m-36 py-12 shadow shadow-slate-400 rounded-lg">

        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          ¡Gracias por registrarte!
        </h1>
        <h2 className="mt-4 text-center text-xl font-semibold text-gray-500">
          Para activar tu cuenta oprime el boton de activar cuenta
        </h2>
        {loading ?
          <button
            className="block mt-12 m-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Espere...
          </button> :
            <>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="rgb(14 165 233)" className='block mt-6 m-auto animate-bounce '>
              <path d="M24 44 10 30l2.1-2.1 10.4 10.4V4h3v34.3l10.4-10.4L38 30Z"/>
            </svg>
            <button
              onClick={activate_account}
              className="block mt-2 m-auto px-8 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            >
              Activar cuenta
            </button>
            </>

        }

      </div>

    </Layout>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  activate
})(Activate)