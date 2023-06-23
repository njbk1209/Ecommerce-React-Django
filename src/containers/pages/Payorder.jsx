import { useEffect } from "react";
import Layout from '../../hocs/Layout'
import { Navigate } from 'react-router'
import { connect } from 'react-redux';
import {
  get_preorder,
  preorder
} from "../../redux/actions/preorders";
import {
  isAuthenticated
} from "../../redux/actions/auth";

import FormPayment from "../../components/payment/FormPayment";
import OrderListProducts from "../../components/payment/OrderListProducts";


const Payorder = ({
  isAuthenticated,
  get_preorder,
  preorder
}) => {
  

  useEffect(() => {
    window.scrollTo(0, 0)
    get_preorder()
  }, [])

  if (isAuthenticated === false)
    return <Navigate to='/' />;

  return (
    <Layout>
      <section className="bg-white mx-auto max-w-7xl mt-2 ">
        <div className="lg:grid lg:grid-cols-12 gap-4 px-4">
          <section
            className="rounded-l-lg sm:py-6 lg:py-10 md:py-4 xl:py-8 lg:mt-0 lg:col-span-6 bg-white text-slate-800"
          >
            <FormPayment
              preorder={preorder}
            />
          </section>
          <section
            className="rounded-l-lg sm:py-6 lg:py-10 md:py-4 xl:py-8 lg:mt-0 lg:col-span-6 bg-white text-slate-800"
          >
            <OrderListProducts
              preorder={preorder}
            />
          </section>
        </div>

      </section>
    </Layout>
  )
}

const mapStateToProps = state => ({
  preorder: state.Preorders.preorder,
  isAuthenticated: state.Auth.isAuthenticated,
})

export default connect(mapStateToProps, {
  get_preorder
})(Payorder)



