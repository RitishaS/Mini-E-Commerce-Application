import { ArrowUpRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductArt from './ProductArt.jsx';

const money = new Intl.NumberFormat('en-IN');
export default function ProductCard({ product, index = 0 }) {
  return <article className="product-card" style={{ '--card-delay': `${index * 55}ms` }}><Link to={`/product/${product.id}`} className="product-visual-link" aria-label={`View ${product.name}`}><ProductArt product={product}/><span className="product-badge">{product.badge}</span><span className="quick-view"><ArrowUpRight size={17}/></span></Link><div className="product-meta"><div><span className="product-category">{product.category}</span><h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3></div><strong>₹{money.format(product.price)}</strong></div><div className="product-rating"><Star size={12} fill="currentColor"/> {product.rating} <span>({product.reviews} reviews)</span></div></article>;
}
