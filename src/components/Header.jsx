import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../state/CartContext.jsx';

export default function Header() {
  const { itemCount } = useCart();
  return <><div className="announcement">A little something for your home <span>—</span> free shipping over ₹3,000 <ArrowUpRight size={13}/></div><header className="site-header"><Link to="/" className="brand" aria-label="Cedar and Co home"><span className="brand-mark">c.</span><span>cedar<span className="brand-amp">&</span>co.</span></Link><nav className="main-nav" aria-label="Main navigation"><NavLink to="/" end>Shop</NavLink><a href="/#story">Our story</a><a href="/#journal">Journal</a></nav><Link to="/cart" className="bag-link" aria-label={`Shopping bag, ${itemCount} items`}><span className="bag-label">Bag</span><ShoppingBag size={19} strokeWidth={1.6}/><span className="bag-count">{itemCount}</span></Link></header></>;
}
