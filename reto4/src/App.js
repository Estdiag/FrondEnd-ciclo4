
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import {Route} from 'react-router-dom';
import Home from './components/Home';
import FormLaptop from './components/FormLaptop'

import SignUp from './components/SignUp';
import Users from './components/Users';

function App() {
  return(<>
   <NavBar/>
   <Route exact path="/" component={Home}/>
   <Route exact path="/laptops" component={FormLaptop}/>
   <Route exact path="/users" component={Users}/>
   <Route exact path="/orders" />
   <Route exact path="/login" component={Home}/>
   <Route exact path="/signup" component={SignUp}/>

  </>)
}

export default App;
