import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './containers/Home';
import Error404 from './containers/errors/Error404';

import ProductDetail from './containers/pages/ProductDetail';

import Signup from './containers/auth/Signup';
import Login from './containers/auth/Login';
import Activate from './containers/auth/Activate';

import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Shop from './containers/Shop';
import Cart from './containers/pages/Cart';
import Checkout from './containers/pages/Checkout';
import Payorder from './containers/pages/Payorder';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404/>}/>

          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/payorder' element={<Payorder/>}/>

          {/*Authetication*/}
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/activate/:uid/:token' element={<Activate/>}/>
          <Route path='/reset_password' element={<ResetPassword/>} />
          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />

          {/*Pages */}
          <Route exact path='/product/:productId' element={<ProductDetail/>}/>
          <Route exact path='/shop/' element={<Shop/>}/>
        </Routes>
      </Router>
    </Provider>

  );
}

export default App;
