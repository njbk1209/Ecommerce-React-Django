import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  get_items,
  get_total,
  get_item_total
} from "../redux/actions/cart";

import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';

import { connect } from 'react-redux';
import SearchBox from '../components/navigation/SearchBox';

const Layout = (props) => {

  useEffect(() => {
    props.refresh()
    props.check_authenticated()
    props.load_user()
    props.get_items()
    props.get_total()
    props.get_item_total()
  }, []);

  return (
    <>
      <SearchBox />
      <Navbar />
      <ToastContainer autoClose={5000} />
      {props.children}
      <Footer />
    </>
  )
}

export default connect(null, {
  check_authenticated,
  load_user,
  refresh,
  get_items,
  get_total,
  get_item_total,
})(Layout)