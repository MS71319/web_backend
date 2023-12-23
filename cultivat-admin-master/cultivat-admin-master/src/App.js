import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainLayout from './components/MainLayout';
import Dashboard from "./pages/Dashboard";
import Login  from "./pages/Login"
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Products from './pages/Products';
import Canceled from './pages/Canceled';
import Confirmed from './pages/Confirmed';
import Pending from './pages/Pending';
import OutForDelivery from './pages/OutForDelivery';
import Delivered from './pages/Delivered';
import AllOrders from './pages/AllOrders';
import ProductList from './pages/ProductList';
import NewProducts from './pages/NewProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<Products />} />
          <Route path='new-products' element={<NewProducts />} />
          <Route path='products-lists' element={<ProductList />} />
          <Route path='all-orders' element={<AllOrders />} />
          <Route path='pending' element={<Pending />} />
          <Route path='out-for-delivery' element={<OutForDelivery />} />
          <Route path='canceled' element={<Canceled />} />
          <Route path='confirmed' element={<Confirmed />} />
          <Route path='delivered' element={<Delivered />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
