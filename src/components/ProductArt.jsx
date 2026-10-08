export default function ProductArt({ product, className = '' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const drawings = {
    lamp: <><path d="M91 163h58M120 162l8-42" {...common}/><path d="M103 120h47l-8-29h-31z" fill="currentColor" opacity=".88"/><path d="M117 91l8-31 12 31" {...common}/></>,
    vase: <><path d="M112 77c0 14-5 18-13 28-10 13-11 45-2 57 10 12 46 12 56 0 9-12 8-44-2-57-8-10-13-14-13-28z" fill="currentColor" opacity=".83"/><path d="M111 77h28M106 132c12 5 27 5 40 0" {...common}/></>,
    throw: <><path d="M79 81l83 9-9 77-84-9z" fill="currentColor" opacity=".78"/><path d="M85 97l69 8m-71 8 68 8m-71 8 68 8m-71 8 68 8M104 84l-8 77m29-74-8 78m29-75-8 78" {...common}/></>,
    mug: <><path d="M87 94h57v51c0 13-11 23-24 23h-9c-13 0-24-10-24-23z" fill="currentColor" opacity=".84"/><path d="M144 105h10c21 0 21 30 0 30h-10M99 112c10 6 23 6 34 0" {...common}/></>,
    mirror: <><path d="M94 159V91a30 30 0 0160 0v68z" fill="currentColor" opacity=".72"/><path d="M101 152V92a23 23 0 0146 0v60z" stroke="white" strokeWidth="2" fill="none"/></>,
    board: <><path d="M85 111l49-27 36 65-49 27z" fill="currentColor" opacity=".8"/><path d="M96 113l39 36m-21-48 39 37m-55-18 38 36m-16-48 27 26" {...common}/></>,
    cushion: <><path d="M92 94q28-16 56 0 17 28 0 56-28 16-56 0-17-28 0-56z" fill="currentColor" opacity=".78"/><path d="M103 100q20-11 40 0 12 20 0 40-20 11-40 0-12-20 0-40z" {...common}/></>,
    diffuser: <><path d="M106 112h37l5 53h-47z" fill="currentColor" opacity=".78"/><path d="M113 112l-9-50m21 50 3-58m11 58 15-47" {...common}/></>,
  };
  return <div className={`product-art art-${product.tone} ${className}`} aria-hidden="true"><span className="art-sun"/><svg viewBox="0 0 240 220">{drawings[product.type] || drawings.vase}</svg><span className="art-ground"/></div>;
}
