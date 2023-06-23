import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  get_items,
  get_total,
  get_item_total
} from "../redux/actions/cart";

import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { get_preorder, delete_preorder } from '../redux/actions/preorders';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';

import { connect } from 'react-redux';
import SearchBox from '../components/navigation/SearchBox';
import ClockPreorder from '../components/navigation/ClockPreorder';

const Layout = ({ isAuthenticated, refresh, check_authenticated, load_user, get_items, get_total, get_item_total, get_preorder, preorder, children }) => {

  useEffect(() => {
    refresh()
    check_authenticated()
    load_user()
    get_items()
    get_total()
    get_item_total()
    get_preorder()
    delete_preorder()
  }, []);

  return (
    <>
      <header className='bg-blue-600'>
        {preorder && isAuthenticated && (
          <ClockPreorder preorder={preorder} delete_preorder={delete_preorder} />
        )}
        <SearchBox />
        <Navbar />
      </header>
      <ToastContainer autoClose={5000} />
      {children}
      <Footer />
    </>
  )
}

const mapStateToProps = state => ({
  preorder: state.Preorders.preorder,
  isAuthenticated: state.Auth.isAuthenticated,
})

export default connect(mapStateToProps, {
  check_authenticated,
  load_user,
  refresh,
  get_items,
  get_total,
  get_item_total,
  get_preorder,
  delete_preorder
})(Layout)