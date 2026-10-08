import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return <><Header/><main><Routes><Route path="/" element={<HomePage/>}/><Route path="/product/:productId" element={<ProductPage/>}/><Route path="/cart" element={<CartPage/>}/><Route path="*" element={<HomePage/>}/></Routes></main><Footer/></>;
}
