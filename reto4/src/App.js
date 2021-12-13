
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar/NavBar";
import {Route} from 'react-router-dom';
import Home from './components/Home/Home';
import FormLaptop from './components/Laptop/FormLaptop'
import FormUser from './components/User/FormUser'

function App() {
  return(<>
   <NavBar/>
   <Route exact path="/" component={Home}/>
   <Route exact path="/laptops" component={FormLaptop}/>
   <Route exact path="/users" component={FormUser}/>
   <Route exact path="/orders" component={FormLaptop}/>
   <Route exact path="/login" component={FormLaptop}/>
   <Route exact path="/signup" component={FormLaptop}/>

  </>)
}

export default App;
