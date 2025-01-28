import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link, Outlet, NavLink} from 'react-router-dom';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">

      <div>
        <nav>
          <ul>
            <li>
             <NavLink to="/Product" style={({isActive}) => {
              return isActive ? {color: "red"} : {}
             }}>ProductList</NavLink>
            </li>
            <li>
             <NavLink to="/Contact" style={({isActive}) => {
              return isActive ? {color: "red"} : {}
             }}>Contact</NavLink>
            </li>
            <li>
             <NavLink to="/" style={({isActive}) => {
              return isActive ? {color: "red"} : {}
             }}>Home</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/Contact" element= {<Contact/>} />

        <Route path="/Product" element={<div><h1>Product main menu</h1><Outlet context= {{ name: "Ionut"}}/></div>}> 
          <Route index element = {<Product/>} />
          <Route path=":id" element = {<EditProduct/>} />
          <Route path="new" element = {<NewProduct/>} />
        </Route>

        {/* <Route path="/Product" element= {<Product/>} />
        <Route path="/Product/:id" element= {<EditProduct/>} />
        <Route path="/Product/new" element= {<NewProduct/>} /> */}
        <Route path="*" element= {<NotFound/>} />
      </Routes>
      
    </div>
  );
}

export default App;
