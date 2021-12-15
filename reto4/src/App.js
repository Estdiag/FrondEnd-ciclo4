import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import {Route} from 'react-router-dom';
import Home from './components/Home';


import SignUp from './components/SignUp';
import Users from './components/Users';
import Pedidos from './components/Orders';
import Laptops from './components/Laptops';
import FormUser from './components/FormUser';
import FormOrder from './components/FormOrder';
import FormLaptop from './components/FormLaptop';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const alertOptions = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
};

function App() {
  return(<>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <NavBar/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Home}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/laptops" component={Laptops}/>
      <Route exact path="/users" component={Users} />
      <Route exact path="/orders" component={Pedidos}/>
      <Route exact path="/FormUser" component={FormUser}/>
      <Route exact path="/FormOrder" component={FormOrder} />
      <Route exact path="/FormLaptop" component={FormLaptop} />
    </AlertProvider>
  </>)
}

export default App;
