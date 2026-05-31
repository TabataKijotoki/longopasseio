// Longo Passeio — Responsive site app
// Relies on globals: CAFES_DATA, ROTEIROS, CAFE_PHOTOS, isRecentlyUpdated, RecentBadge,
// RecentDetailPill, HomeIcon, MapIcon, RouteIcon, HeartIcon.

const BAIRRO_COLORS = {
  "Santa Cecília":  { bg:"#c8d8b0", fg:"#4a6a30", tint:"#e8f0dc", border:"#c8d8b0" },
  "Vila Buarque":   { bg:"#f2c4c4", fg:"#8a3a3a", tint:"#fce8e8", border:"#f2c4c4" },
  "Higienópolis":   { bg:"#b8d4c8", fg:"#2a5a48", tint:"#dceee8", border:"#b8d4c8" },
  "República":      { bg:"#e8d8b0", fg:"#7a5a20", tint:"#f4eddc", border:"#e8d8b0" },
  "Barra Funda":    { bg:"#b8d4b8", fg:"#2a5a30", tint:"#dceedd", border:"#b8d4b8" },
  "Campos Elíseos": { bg:"#d0c4e8", fg:"#5a4a8a", tint:"#ece8f8", border:"#d0c4e8" },
};
const BAIRROS = Object.keys(BAIRRO_COLORS);
const TAGS = ["trabalhar","encontro","leitura","especialidade"];

const CITIES = [
  { id:"sp-centro", city:"São Paulo", region:"Centro", pillLabel:"centro", available:true, cafeCount:19 },
  { id:"rj",        city:"Rio de Janeiro", region:null, pillLabel:"rio",      available:false },
  { id:"bh",        city:"Belo Horizonte", region:null, pillLabel:"bh",       available:false },
  { id:"cwb",       city:"Curitiba",       region:null, pillLabel:"curitiba", available:false },
  { id:"poa",       city:"Porto Alegre",   region:null, pillLabel:"poa",      available:false },
];

const RECENT_VARIANT = "estrela";

// ───────────────────────── hooks ─────────────────────────
function useFavorites(){
  const [favs,setFavs]=React.useState(()=>{try{return JSON.parse(localStorage.getItem("lp_favoritos")||"[]")}catch{return[]}});
  const toggle=(id)=>setFavs(prev=>{const next=prev.includes(id)?prev.filter(f=>f!==id):[...prev,id];
    try{localStorage.setItem("lp_favoritos",JSON.stringify(next))}catch{} return next;});
  return [favs,toggle];
}

// ───────────────────────── header ─────────────────────────
function Header({view,onNav,favCount,activeCity,onOpenCity}){
  const links=[["home","Início"],["explorar","Explorar"],["roteiros","Roteiros"],["favoritos","Favoritos"]];
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand" href="#home" onClick={(e)=>{e.preventDefault();onNav("home")}}>
          <span className="curad">curadoria por Tabata Kijotoki</span>
          <span className="name">Longo <em>Passeio</em></span>
        </a>
        <nav className="nav">
          {links.map(([id,label])=>(
            <a key={id} href={"#"+id} className={view===id?"active":""}
               onClick={(e)=>{e.preventDefault();onNav(id)}}>
              {label}
              {id==="favoritos"&&favCount>0&&<span className="navbadge">{favCount}</span>}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="city-pill" onClick={onOpenCity}
            aria-label={`Cidade atual: ${activeCity.city}${activeCity.region?" · "+activeCity.region:""}. Trocar.`}>
            <span>{activeCity.pillLabel}</span><span className="chev">▾</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function TabBar({view,onNav,favCount}){
  const tabs=[["home","Início",HomeIcon],["explorar","Explorar",MapIcon],["roteiros","Roteiros",RouteIcon],["favoritos","Favoritos",HeartIcon]];
  return (
    <nav className="tabbar">
      {tabs.map(([id,label,Icon])=>(
        <button key={id} className={view===id?"active":""} onClick={()=>onNav(id)}>
          <Icon active={view===id}/>
          <span className="tl">{label}{id==="favoritos"&&favCount>0&&<span className="tbadge">{favCount}</span>}</span>
        </button>
      ))}
    </nav>
  );
}

// ───────────────────────── city menu ─────────────────────────
function CityMenu({activeId,onSelect,onClose}){
  return (
    <React.Fragment>
      <div className="scrim-bare" onClick={onClose}></div>
      <div className="city-menu" role="dialog" aria-label="Escolha sua cidade">
        <div className="city-menu-head">
          <p className="e">onde explorar</p>
          <h3>escolha sua cidade</h3>
        </div>
        {CITIES.filter(c=>c.available).map(c=>(
          <button key={c.id} className="city-row" onClick={()=>onSelect(c.id)}>
            <span>
              <span className="cn">{c.city}{c.region&&<em> · {c.region}</em>}</span>
              <span className="cs" style={{display:"block"}}>{c.region?`${c.region} · ${c.cafeCount} cafés curados`:`${c.cafeCount} cafés curados`}</span>
            </span>
            {c.id===activeId&&<span className="cur">atual</span>}
          </button>
        ))}
        <div className="city-menu-head" style={{paddingBottom:0}}><p className="e">em breve</p></div>
        {CITIES.filter(c=>!c.available).map(c=>(
          <button key={c.id} className="city-row" disabled>
            <span><span className="cn">{c.city}</span><span className="cs" style={{display:"block"}}>em breve</span></span>
          </button>
        ))}
        <div className="city-menu-foot">
          <p>em SP exploramos por bairro; fora dele, cidade por cidade.</p>
        </div>
      </div>
    </React.Fragment>
  );
}

// ───────────────────────── home ─────────────────────────
function Home({onNav,onOpenCafe}){
  const featured=ROTEIROS[1]||ROTEIROS[0];
  const recents=CAFES_DATA.filter(c=>isRecentlyUpdated(c.updatedAt)).slice(0,3);
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="hero-strips">
            {Object.values(BAIRRO_COLORS).map((b,i)=><div key={i} style={{background:b.bg}}></div>)}
          </div>
          <h1><em>...o mundo além</em><br/>do seu quintal</h1>
          <p className="lede">cafés que valem a pausa, no centro de São Paulo. 19 endereços curados em 6 bairros — o centro que nem todo mundo vê.</p>
          <div className="cta-row">
            <button className="btn btn-primary" onClick={()=>onNav("explorar")}>explorar cafés <span>→</span></button>
            <button className="btn btn-ghost" onClick={()=>onNav("roteiros")}>ver roteiros</button>
            <span className="hero-meta">19 cafés · 6 bairros</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>bairros</h2>
            <a className="link" href="#explorar" onClick={(e)=>{e.preventDefault();onNav("explorar")}}>ver todos →</a></div>
          <div className="chip-row">
            {BAIRROS.map(b=>{const c=BAIRRO_COLORS[b];return(
              <button key={b} className="bairro-chip" style={{background:c.bg,color:c.fg}}
                onClick={()=>onNav("explorar",{bairro:b})}>{b}</button>
            )})}
          </div>
        </div>
      </section>

      {recents.length>0&&(
        <section className="section" style={{paddingTop:0}}>
          <div className="wrap">
            <div className="section-head"><h2>atualizados recentemente</h2>
              <a className="link" href="#explorar" onClick={(e)=>{e.preventDefault();onNav("explorar")}}>ver tudo →</a></div>
            <div className="cafe-grid">
              {recents.map(c=><CafeCard key={c.id} cafe={c} onOpen={onOpenCafe}/>)}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>hoje a gente sugere</h2>
            <a className="link" href="#roteiros" onClick={(e)=>{e.preventDefault();onNav("roteiros")}}>ver roteiros →</a></div>
          <div className="roteiro-grid">
            <RoteiroCard r={featured} onOpen={()=>onNav("roteiros",{open:featured.id})}/>
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="dica">
            <span className="star">★</span>
            <p><strong>dica de ouro:</strong> vá sem pressa, peça um bom café e se perca (só um pouquinho).</p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ───────────────────────── café card ─────────────────────────
function CafeCard({cafe,onOpen}){
  const [err,setErr]=React.useState(false);
  const c=BAIRRO_COLORS[cafe.bairro]||{bg:"#eee",fg:"#555"};
  const photo=(typeof CAFE_PHOTOS!=="undefined"&&CAFE_PHOTOS[cafe.id])||null;
  return (
    <button className="cafe-card" onClick={()=>onOpen(cafe)}>
      {photo&&!err
        ? <img className="cafe-photo" src={photo} alt={cafe.name} loading="lazy" onError={()=>setErr(true)}/>
        : <div className="cafe-photo-fallback" style={{background:`linear-gradient(135deg,${c.bg},${c.tint||"#faf7f2"})`}}>☕</div>}
      <div className="cafe-card-body">
        <div className="cafe-card-top">
          <span className="cafe-titles">
            <span className="cafe-name">{cafe.name}</span>
            <span className="cafe-addr">{cafe.address}</span>
          </span>
          <span className="cafe-bairro-tag" style={{background:c.bg,color:c.fg}}>{cafe.bairro}</span>
        </div>
        <div className="cafe-tags">
          {isRecentlyUpdated(cafe.updatedAt)&&<RecentBadge updatedAt={cafe.updatedAt} variant={RECENT_VARIANT} compact/>}
          {cafe.tags.map(t=><span key={t} className="cafe-tag">{t}</span>)}
          {cafe.petFriendly&&<span className="cafe-tag">pet friendly</span>}
        </div>
        <span className="cafe-vibe">"{cafe.vibe}"</span>
      </div>
    </button>
  );
}

// ───────────────────────── explorar ─────────────────────────
function Explorar({onOpenCafe,initialBairro}){
  const [bairro,setBairro]=React.useState(initialBairro||null);
  const [tags,setTags]=React.useState([]);
  const [q,setQ]=React.useState("");
  const [onlyNew,setOnlyNew]=React.useState(false);
  React.useEffect(()=>{ if(initialBairro) setBairro(initialBairro); },[initialBairro]);

  const list=CAFES_DATA.filter(c=>{
    if(bairro&&c.bairro!==bairro)return false;
    if(tags.length&&!tags.some(t=>c.tags.includes(t)))return false;
    if(q&&!c.name.toLowerCase().includes(q.toLowerCase()))return false;
    if(onlyNew&&!isRecentlyUpdated(c.updatedAt))return false;
    return true;
  });
  const toggleTag=t=>setTags(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]);
  const has=bairro||tags.length||q||onlyNew;
  const recentCount=CAFES_DATA.filter(c=>isRecentlyUpdated(c.updatedAt)).length;

  return (
    <main>
      <div className="toolbar">
        <div className="wrap">
          <div className="search">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.5" stroke="#bbb" strokeWidth="1.8"/><path d="M13 13l3.5 3.5" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round"/></svg>
            <input placeholder="buscar café…" value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
          <div className="filters">
            <button className={"fchip"+(bairro===null&&!onlyNew?" on":"")} onClick={()=>{setBairro(null)}}>todos</button>
            {BAIRROS.map(b=>{const c=BAIRRO_COLORS[b];const on=bairro===b;
              return <button key={b} className={"fchip"+(on?" on on-bairro":"")}
                style={on?{background:c.bg,color:c.fg,borderColor:c.bg}:undefined}
                onClick={()=>setBairro(on?null:b)}>{b}</button>})}
          </div>
          <div className="filters">
            {TAGS.map(t=><button key={t} className={"fchip"+(tags.includes(t)?" on":"")} onClick={()=>toggleTag(t)}>{t}</button>)}
            <button className={"fchip"+(onlyNew?" on":"")} onClick={()=>setOnlyNew(v=>!v)}>
              ✦ novidades{recentCount?` (${recentCount})`:""}
            </button>
            <div className="filter-meta">
              <span>{list.length} {list.length===1?"café":"cafés"}</span>
              {has&&<button className="clear-link" onClick={()=>{setBairro(null);setTags([]);setQ("");setOnlyNew(false)}}>limpar</button>}
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="cafe-grid">
            {list.length===0
              ? <div className="empty"><h3>nenhum café encontrado.</h3><p>tente outros filtros.</p></div>
              : list.map(c=><CafeCard key={c.id} cafe={c} onOpen={onOpenCafe}/>)}
          </div>
        </div>
      </section>
    </main>
  );
}

// ───────────────────────── roteiros ─────────────────────────
const PERIODO_COLOR={manhã:{bg:"#fef3dc",fg:"#9a6820",border:"#e8d8b0"},tarde:{bg:"#fce8e8",fg:"#8a3a3a",border:"#f2c4c4"}};
function RoteiroCard({r,onOpen}){
  const pc=PERIODO_COLOR[r.periodo]||PERIODO_COLOR["manhã"];
  return (
    <button className="roteiro-card" style={{background:pc.bg,borderColor:pc.border}} onClick={onOpen}>
      <div className="roteiro-top">
        <span className="roteiro-emoji">{r.emoji}</span>
        <div className="roteiro-meta"><span className="roteiro-periodo" style={{color:pc.fg}}>{r.periodo}</span><span className="roteiro-dur">{r.duracao}</span></div>
      </div>
      <h3>{r.title}</h3>
      <p className="sub">{r.subtitle}</p>
      <div className="roteiro-cafes">
        {r.paradas.map((p,i)=>{const cafe=CAFES_DATA.find(c=>c.id===p.cafeId);return(
          <React.Fragment key={i}><span>{cafe?.name}</span>{i<r.paradas.length-1&&<span className="arrow">→</span>}</React.Fragment>
        )})}
      </div>
    </button>
  );
}
function Roteiros({onOpenCafe,openId,onOpenId}){
  const active=openId?ROTEIROS.find(r=>r.id===openId):null;
  if(active){
    const pc=PERIODO_COLOR[active.periodo]||PERIODO_COLOR["manhã"];
    return (
      <main><section className="section"><div className="wrap" style={{maxWidth:760}}>
        <button className="clear-link" style={{marginBottom:14,fontSize:14}} onClick={()=>onOpenId(null)}>← roteiros</button>
        <div style={{background:pc.bg,border:`1.5px solid ${pc.border}`,borderRadius:18,padding:"22px 24px",marginBottom:24,display:"flex",gap:16,alignItems:"flex-start"}}>
          <span style={{fontSize:40}}>{active.emoji}</span>
          <div>
            <span className="roteiro-periodo" style={{color:pc.fg}}>{active.periodo} · {active.duracao}</span>
            <h2 className="serif" style={{fontSize:30,color:"#2a1f14",margin:"4px 0 3px"}}>{active.title}</h2>
            <p style={{fontStyle:"italic",color:"#9a8878",fontSize:14}}>{active.subtitle}</p>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {active.paradas.map((p,i)=>{const cafe=CAFES_DATA.find(c=>c.id===p.cafeId);const c=BAIRRO_COLORS[cafe.bairro];const last=i===active.paradas.length-1;
            return (
              <div key={i} style={{display:"flex",gap:14,alignItems:"stretch"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:32,flexShrink:0}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:c.bg,border:`2px solid ${c.fg}`,color:c.fg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{i+1}</div>
                  {!last&&<div style={{flex:1,width:2,background:"#ece8e0",margin:"4px 0"}}></div>}
                </div>
                <button className="cafe-card" style={{flexDirection:"row",alignItems:"center",gap:14,padding:"14px 16px",marginBottom:14,flex:1}} onClick={()=>onOpenCafe(cafe)}>
                  <div style={{flex:1,textAlign:"left"}}>
                    <span style={{fontSize:10,color:"#bbb",textTransform:"uppercase",letterSpacing:".06em"}}>{p.hora}</span>
                    <div className="cafe-name" style={{fontSize:18}}>{cafe.name}</div>
                    <p style={{fontSize:13,color:"#9a8878",fontStyle:"italic",margin:"4px 0 0"}}>{p.motivo}</p>
                  </div>
                  <span style={{fontSize:22,color:"#ddd"}}>›</span>
                </button>
              </div>
            )})}
        </div>
        <div className="dica" style={{marginTop:10}}><span className="star">★</span><p>{active.dica}</p></div>
      </div></section></main>
    );
  }
  return (
    <main><section className="section"><div className="wrap">
      <div className="section-head"><h2>Roteiros</h2><span className="link" style={{fontStyle:"italic"}}>lugares pra ir sem pressa</span></div>
      <div className="roteiro-grid">
        {ROTEIROS.map(r=><RoteiroCard key={r.id} r={r} onOpen={()=>onOpenId(r.id)}/>)}
      </div>
    </div></section></main>
  );
}

// ───────────────────────── favoritos ─────────────────────────
function Favoritos({favorites,onOpenCafe,onToggle}){
  const favCafes=CAFES_DATA.filter(c=>favorites.includes(c.id));
  if(favCafes.length===0)return (
    <main><section className="section"><div className="wrap">
      <div className="section-head"><h2>Favoritos</h2></div>
      <div className="fav-empty"><div className="ic">♡</div><h3>ainda sem favoritos</h3>
        <p>explore os cafés e salve os que<br/>chamarem sua atenção.</p></div>
    </div></section></main>
  );
  const grouped={};favCafes.forEach(c=>{(grouped[c.bairro]=grouped[c.bairro]||[]).push(c)});
  return (
    <main><section className="section"><div className="wrap">
      <div className="section-head"><h2>Favoritos</h2><span className="link">{favCafes.length} {favCafes.length===1?"café salvo":"cafés salvos"}</span></div>
      {Object.entries(grouped).map(([bairro,cafes])=>{const c=BAIRRO_COLORS[bairro]||{bg:"#eee",fg:"#555"};return(
        <div className="fav-group" key={bairro}>
          <div className="fav-group-head" style={{background:c.bg}}>
            <span className="t" style={{color:c.fg}}>{bairro}</span>
            <span className="t" style={{color:c.fg,fontWeight:500}}>{cafes.length} {cafes.length===1?"café":"cafés"}</span>
          </div>
          <div className="fav-items">
            {cafes.map(cafe=>(
              <button key={cafe.id} className="fav-item" onClick={()=>onOpenCafe(cafe)}>
                <span className="fav-num" style={{background:c.bg,color:c.fg}}>{cafe.id}</span>
                <span style={{flex:1,textAlign:"left"}}>
                  <span className="cafe-name" style={{fontSize:15,display:"block"}}>{cafe.name}</span>
                  <span className="cafe-addr">{cafe.address}</span>
                </span>
                <span onClick={(e)=>{e.stopPropagation();onToggle(cafe.id)}} style={{color:"#e05a5a",fontSize:18,padding:"4px 8px"}}>♥</span>
              </button>
            ))}
          </div>
        </div>
      )})}
    </div></section></main>
  );
}

// ───────────────────────── café modal ─────────────────────────
function CafeModal({cafe,onClose,onToggle,isFav}){
  const [err,setErr]=React.useState(false);
  React.useEffect(()=>{const h=e=>{if(e.key==="Escape")onClose()};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h)},[onClose]);
  if(!cafe)return null;
  const c=BAIRRO_COLORS[cafe.bairro]||{bg:"#eee",fg:"#555",border:"#ddd"};
  const photo=(typeof CAFE_PHOTOS!=="undefined"&&CAFE_PHOTOS[cafe.id])||null;
  const query=encodeURIComponent(`${cafe.name}, ${cafe.address}, São Paulo`);
  const mapsUrl=`https://www.google.com/maps/search/?api=1&query=${query}`;
  const embed=`https://maps.google.com/maps?q=${query}&z=16&output=embed&hl=pt-BR`;
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} role="dialog" aria-label={cafe.name}>
        <div className="modal-hero">
          {photo&&!err?<img src={photo} alt={cafe.name} onError={()=>setErr(true)}/>
            :<div style={{width:"100%",height:"100%",background:`linear-gradient(135deg,${c.border},${c.bg})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,opacity:.4}}>☕</div>}
          <div className="grad"></div>
          <button className="close-btn" onClick={onClose} aria-label="fechar">×</button>
          <button className="fav-btn" style={{color:isFav?"#e05a5a":"rgba(255,255,255,.85)"}} onClick={()=>onToggle(cafe.id)}>{isFav?"♥":"♡"}</button>
          <div className="htext">
            <span className="tag" style={{background:c.border+"cc",color:c.fg}}>{cafe.bairro}</span>
            <h2>{cafe.name}</h2>
            <p className="addr">{cafe.address}, São Paulo</p>
          </div>
        </div>
        <div className="modal-body">
          <p className="vibe">"{cafe.vibe}"</p>
          {isRecentlyUpdated(cafe.updatedAt)&&<div style={{marginBottom:10}}><RecentDetailPill updatedAt={cafe.updatedAt} variant={RECENT_VARIANT}/></div>}
          <p className="desc">{cafe.description}</p>
          <div className="info-row"><span className="l">horário</span><span className="v">{cafe.horario}</span></div>
          <div className="map-label"><span className="l">como chegar</span><a href={mapsUrl} target="_blank" rel="noopener noreferrer">abrir no Maps →</a></div>
          <div className="map-frame"><iframe src={embed} loading="lazy" title={`Mapa — ${cafe.name}`} sandbox="allow-scripts allow-same-origin allow-popups"></iframe></div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── app ─────────────────────────
const ROUTES=["home","explorar","roteiros","favoritos"];
function App(){
  const [view,setView]=React.useState(()=>{const h=location.hash.replace("#","");return ROUTES.includes(h)?h:"home"});
  const [params,setParams]=React.useState({});
  const [openCafe,setOpenCafe]=React.useState(null);
  const [roteiroOpen,setRoteiroOpen]=React.useState(null);
  const [cityId,setCityId]=React.useState("sp-centro");
  const [cityMenu,setCityMenu]=React.useState(false);
  const [favorites,toggleFav]=useFavorites();
  const activeCity=CITIES.find(c=>c.id===cityId)||CITIES[0];

  const nav=(v,p={})=>{
    setView(v);setParams(p);setOpenCafe(null);
    if(v==="roteiros") setRoteiroOpen(p.open||null);
    history.replaceState(null,"",("#"+v));
    window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"});
  };
  React.useEffect(()=>{const h=()=>{const x=location.hash.replace("#","");if(ROUTES.includes(x))setView(x)};
    window.addEventListener("hashchange",h);return()=>window.removeEventListener("hashchange",h)},[]);

  return (
    <React.Fragment>
      <Header view={view} onNav={nav} favCount={favorites.length} activeCity={activeCity} onOpenCity={()=>setCityMenu(true)}/>
      {cityMenu&&<CityMenu activeId={cityId} onSelect={(id)=>{setCityId(id);setCityMenu(false)}} onClose={()=>setCityMenu(false)}/>}

      {view==="home"&&<Home onNav={nav} onOpenCafe={setOpenCafe}/>}
      {view==="explorar"&&<Explorar onOpenCafe={setOpenCafe} initialBairro={params.bairro||null}/>}
      {view==="roteiros"&&<Roteiros onOpenCafe={setOpenCafe} openId={roteiroOpen} onOpenId={setRoteiroOpen}/>}
      {view==="favoritos"&&<Favoritos favorites={favorites} onOpenCafe={setOpenCafe} onToggle={toggleFav}/>}

      {openCafe&&<CafeModal cafe={openCafe} onClose={()=>setOpenCafe(null)} onToggle={toggleFav} isFav={favorites.includes(openCafe.id)}/>}

      <footer className="site-footer"><div className="wrap">
        <span className="fbrand">Longo <em>Passeio</em></span>
        <span>o centro que nem todo mundo vê — explore <em className="italic">sem pressa</em>.</span>
      </div></footer>

      <TabBar view={view} onNav={nav} favCount={favorites.length}/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
