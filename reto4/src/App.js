import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import {Route} from 'react-router-dom';
import Home from './components/Home';
import FormLaptop from './components/FormLaptop'

import SignUp from './components/SignUp';
import Users from './components/Users';
import Perfiles from './components/tablaUsuarios';
import Pedidos from './components/pedidos';
import Productos from './components/Productos';
import FormOrders from './components/FormOrder';
import Formuser from './components/FormUser';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import FormUser from './components/FormUser';

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
      <Route exact path="/laptops" component={FormLaptop}/>
      <Route exact path="/users" component={Users}/>
      <Route exact path="/orders" component={FormOrders} />
      <Route exact path="/login" component={Home}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/Perfiles" component={Perfiles} />
      <Route exact path="/Pedidos" component={Pedidos}/>
      <Route exact path="/Productos" component={Productos}/>
      <Route exact path="/FormUser" component={FormUser}/>
    </AlertProvider>
  </>)
}

export default App;
