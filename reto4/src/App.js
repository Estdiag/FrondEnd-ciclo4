
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

function App() {
  return(<>
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
  </>)
}

export default App;
