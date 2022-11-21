import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './containers/Home';
import Error404 from './containers/errors/Error404';

import Signup from './containers/auth/Signup';
import Login from './containers/auth/Login';
import Activate from './containers/auth/Activate';

import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404/>}/>

          <Route path='/' element={<Home/>}/>

          {/*Authetication*/}
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/activate/:uid/:token' element={<Activate/>}/>
          <Route path='/reset_password' element={<ResetPassword/>} />
          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
        </Routes>
      </Router>
    </Provider>

  );
}

export default App;
