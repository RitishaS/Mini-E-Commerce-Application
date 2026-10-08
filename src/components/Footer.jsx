import { ArrowUpRight, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="site-footer" id="story"><div className="footer-main"><div><Link to="/" className="brand footer-brand"><span className="brand-mark">c.</span><span>cedar<span className="brand-amp">&</span>co.</span></Link><p>Everyday things, made<br/>a little more considered.</p></div><div className="footer-note"><span className="eyebrow">A slower kind of living</span><p>Made in small batches, chosen to stay, and always better when shared.</p><a href="mailto:hello@cedarandco.example">Say hello <ArrowUpRight size={14}/></a></div><div className="footer-social"><span className="eyebrow">Follow along</span><a href="https://instagram.com" aria-label="Instagram"><Instagram size={17}/></a></div></div><div className="footer-bottom"><span>© 2025 Cedar & Co. Made with care in India.</span><span>Thoughtfully made, everyday loved.</span></div></footer>;
}
