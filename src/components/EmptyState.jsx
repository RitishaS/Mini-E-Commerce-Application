import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function EmptyState({ title, message, action }) {
  return <div className="empty-state"><span className="empty-icon"><Search size={21}/></span><h2>{title}</h2><p>{message}</p>{action && <Link className="text-link" to="/">{action}<ArrowRight size={15}/></Link>}</div>;
}
