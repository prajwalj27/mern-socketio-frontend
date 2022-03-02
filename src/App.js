import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'  
import ProductList from './components/productList/ProductList';
import EditProduct from './components/editProduct/EditProduct';
import CreateProduct from './components/createProduct/CreateProduct';
import ViewProduct from './components/viewProduct/ViewProduct';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/edit/:id' element={<EditProduct />} />
          <Route path='/create' element={<CreateProduct />} />
          <Route path='/:id' element={<ViewProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
