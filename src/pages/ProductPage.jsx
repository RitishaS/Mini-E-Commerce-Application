import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Heart, Minus, Plus, ShieldCheck, Star, Truck } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductArt from '../components/ProductArt.jsx';
import { useCart } from '../state/CartContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

const money = new Intl.NumberFormat('en-IN');
export default function ProductPage() {
  const { productId } = useParams();
  const [catalog, setCatalog] = useState([]);
  const [catalogStatus, setCatalogStatus] = useState('loading');
  const { add } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const loadCatalog = useCallback(async () => {
    setCatalogStatus('loading');
    try {
      const { default: data } = await import('../data/products.json');
      setCatalog(data);
      setCatalogStatus('ready');
    } catch {
      setCatalogStatus('error');
    }
  }, []);
  useEffect(() => { setAdded(false); setQuantity(1); loadCatalog(); }, [loadCatalog, productId]);
  const product = catalog.find((item) => item.id === productId);
  if (catalogStatus === 'loading') return <div className="product-page section-wrap"><div className="product-loading" aria-label="Loading product"><div/><section><span/><i/><b/></section></div></div>;
  if (catalogStatus === 'error') return <div className="page-empty"><div className="empty-state"><span className="empty-icon"><Star size={19}/></span><h2>This piece is taking a moment</h2><p>We couldn't load the product details. Please try once more.</p><button className="text-link" onClick={loadCatalog}>Try again <ArrowRight size={15}/></button></div></div>;
  if (!product) return <div className="page-empty"><EmptyState title="This piece has wandered off" message="We couldn't find that product. Have a look at the rest of the collection." action="Back to the collection"/></div>;
  const related = catalog.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  function handleAdd() { for (let index = 0; index < quantity; index += 1) add(product); setAdded(true); window.setTimeout(() => setAdded(false), 1800); }
  return <div className="product-page section-wrap"><div className="breadcrumbs"><Link to="/">Shop</Link><span>/</span><Link to={`/?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><span>/</span><span>{product.name}</span></div><div className="product-detail"><div className="detail-gallery"><div className="detail-main-art"><ProductArt product={product}/><span className="product-badge">{product.badge}</span><span className="gallery-index">01 <span>/</span> 01</span></div><div className="gallery-caption"><span>A closer look at the little things.</span><span>Hand-finished, always.</span></div></div><div className="detail-info"><span className="eyebrow">{product.category} / Cedar collection</span><h1>{product.name}</h1><div className="detail-rating"><span><Star size={14} fill="currentColor"/>{product.rating}</span><a href="#reviews">{product.reviews} thoughtful reviews</a></div><div className="detail-price">₹{money.format(product.price)} <span>Inclusive of all taxes</span></div><div className="detail-divider"/><p className="detail-description">{product.description}</p><div className="detail-points">{product.details.map((line) => <span key={line}><Check size={14}/>{line}</span>)}</div><div className="purchase-row"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={14}/></button><span aria-live="polite">{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus size={14}/></button></div><button className={`button button-dark add-button ${added ? 'added' : ''}`} onClick={handleAdd}>{added ? <><Check size={16}/> Added to your bag</> : <>Add to bag <ArrowRight size={16}/></>}</button><button className="wishlist-button" aria-label="Save to wishlist" onClick={(event) => event.currentTarget.classList.toggle('saved')}><Heart size={19}/></button></div><Link to="/cart" className="view-bag-link">View your bag <ArrowRight size={14}/></Link><div className="service-notes"><div><Truck size={17}/><span><strong>Free shipping</strong><small>On orders over ₹3,000</small></span></div><div><ShieldCheck size={17}/><span><strong>Made with care</strong><small>Thoughtful materials, always</small></span></div></div><div className="detail-disclosure"><details><summary>Care & materials <span>+</span></summary><p>{product.details.join(' · ')}. For any questions, we're happy to help.</p></details><details><summary>Shipping & returns <span>+</span></summary><p>We pack every piece with care. Orders typically leave our studio in 2–4 working days. Easy returns within 7 days of delivery.</p></details></div></div></div>{related.length > 0 && <section className="related-section"><div className="related-heading"><div><span className="eyebrow">Goes well with</span><h2>More to <em>love.</em></h2></div><Link to="/" className="text-link">Shop all <ArrowRight size={15}/></Link></div><div className="product-grid related-grid">{related.map((item, index) => <ProductCard key={item.id} product={item} index={index}/>)}</div></section>}<button className="back-link" onClick={() => navigate(-1)}><ArrowLeft size={15}/> Back</button></div>;
}
