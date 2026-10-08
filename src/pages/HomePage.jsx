import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import ProductArt from '../components/ProductArt.jsx';

const categories = ['All pieces', 'Lighting', 'Decor', 'Textiles', 'Kitchen', 'Wellness'];
const heroProducts = [{ type: 'lamp', tone: 'ochre' }, { type: 'vase', tone: 'rose' }, { type: 'cushion', tone: 'lavender' }, { type: 'throw', tone: 'sage' }];
export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] = useState(() => categories.includes(searchParams.get('category')) ? searchParams.get('category') : 'All pieces');
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const loadCatalog = useCallback(async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      const { default: data } = await import('../data/products.json');
      setCatalog(data);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => { loadCatalog(); }, [loadCatalog]);
  const visibleProducts = useMemo(() => {
    let result = catalog.filter((product) => (category === 'All pieces' || product.category === category) && `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(deferredQuery.trim().toLowerCase()));
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [catalog, category, deferredQuery, sort]);
  return <>
    <section className="hero"><div className="hero-copy"><span className="eyebrow hero-kicker"><span className="eyebrow-dot"/>Objects for the everyday</span><h1>Make room<br/>for <em>good things.</em></h1><p>Thoughtful objects for the corners you love, the rituals you keep, and all the ordinary days in between.</p><a className="button button-dark" href="#collection">Explore the collection <ArrowDown size={16}/></a><span className="hero-footnote">Small batch · Thoughtfully made · Made to stay</span></div><div className="hero-art"><div className="hero-circle"/><div className="hero-arch"><ProductArt product={heroProducts[0]} className="hero-lamp"/><ProductArt product={heroProducts[1]} className="hero-vase"/><ProductArt product={heroProducts[2]} className="hero-cushion"/></div><span className="hero-side-note">THE SLOW HOME EDITION <span>— 01 / 25</span></span><span className="hero-stamp">GOOD<br/>THINGS<br/><i>take time.</i></span><span className="hero-art-caption">A softer start to the day.</span></div></section>
    <section className="values-strip"><div><span className="value-number">01</span><span>Made in small batches</span></div><div><span className="value-number">02</span><span>Chosen to last</span></div><div><span className="value-number">03</span><span>Free shipping over ₹3,000</span></div><span className="values-hand">Good things take time <span>↗</span></span></section>
    <section className="collection section-wrap" id="collection"><div className="section-heading"><div><span className="eyebrow">The good things edit</span><h2>Find your <em>favourite.</em></h2></div><p>Little pieces that make a place<br/>feel a little more like yours.</p></div>
      <div className="filter-bar"><div className="category-tabs" role="tablist" aria-label="Filter by category">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="filter-actions"><button className="mobile-filter" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}><SlidersHorizontal size={15}/> Filters</button><label className="search-box"><Search size={15}/><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find something..."/></label><label className="sort-select"><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div></div>
      {showFilters && <div className="mobile-category-list">{categories.map((item) => <button key={item} onClick={() => { setCategory(item); setShowFilters(false); }}>{item}</button>)}</div>}
      <div className="results-line"><span>{isLoading ? 'Finding the good things…' : `${visibleProducts.length} thoughtful ${visibleProducts.length === 1 ? 'piece' : 'pieces'}`}</span><span>{!isLoading && !loadError && visibleProducts.length > 0 ? `01 — ${String(visibleProducts.length).padStart(2, '0')}` : ''}</span></div>
      {loadError ? <div className="load-error"><h3>We couldn't load the collection.</h3><p>Please give it another try.</p><button className="button button-dark" onClick={loadCatalog}>Try again</button></div> : isLoading ? <div className="product-grid" aria-label="Loading products">{Array.from({ length: 4 }, (_, index) => <div className="product-skeleton" key={index}><div/><span/><i/></div>)}</div> : visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index}/>)}</div> : <div className="no-results"><span className="empty-search"><Search size={22}/></span><h3>No pieces found</h3><p>Try a different search or browse all of our good things.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All pieces'); }}>Clear filters <ArrowRight size={15}/></button></div>}
    </section>
    <section className="story-band" id="journal"><div className="story-visual"><ProductArt product={heroProducts[3]}/><span>MADE SLOWLY, LOVED DAILY</span></div><div className="story-copy"><span className="eyebrow">A note from us</span><h2>Less, but a little <em>more lovely.</em></h2><p>We think the things around us should earn their place. So we look for good materials, thoughtful makers, and the small details that turn an object into a favourite.</p><a className="text-link" href="mailto:hello@cedarandco.example">A little more about us <ArrowRight size={15}/></a></div></section>
  </>;
}
