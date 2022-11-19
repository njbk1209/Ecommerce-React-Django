import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';

const Layout = (props) => {
  return (
    <>
        <Navbar/>
        <ToastContainer autoClose={5000}/>
        {props.children}
        <Footer/>
    </>
  )
}

export default Layout