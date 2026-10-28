// Coreus Games · web (inicio + juego.html?g=<id>)
'use strict';
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { /* nada */ } } };
const NAMES = { es: 'Español', en: 'English' };
let lang = store.get('cg-lang') || ((navigator.language || 'es').slice(0, 2) === 'en' ? 'en' : 'es');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const TT = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#25F4EE" d="M33.6 6h-6.1v24.4a5.6 5.6 0 1 1-4-5.4v-6.3A11.9 11.9 0 1 0 33.6 30V17.3a14.6 14.6 0 0 0 8.4 2.7v-6.1A8.4 8.4 0 0 1 33.6 6z" transform="translate(-1.2 -1)"/><path fill="#FE2C55" d="M33.6 6h-6.1v24.4a5.6 5.6 0 1 1-4-5.4v-6.3A11.9 11.9 0 1 0 33.6 30V17.3a14.6 14.6 0 0 0 8.4 2.7v-6.1A8.4 8.4 0 0 1 33.6 6z" transform="translate(1.2 1)"/><path fill="#fff" d="M33.6 6h-6.1v24.4a5.6 5.6 0 1 1-4-5.4v-6.3A11.9 11.9 0 1 0 33.6 30V17.3a14.6 14.6 0 0 0 8.4 2.7v-6.1A8.4 8.4 0 0 1 33.6 6z"/></svg>';
const DISCORD_IC = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.3 18.3 0 0 0-5.5 0L8.7 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.2 13.6.2 18.1a19.9 19.9 0 0 0 6 3l1.3-2.1a13 13 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.1 0l.5.4a13 13 0 0 1-2 1l1.3 2.1a19.9 19.9 0 0 0 6-3c.5-5.2-.9-9.7-3.6-13.7zM8 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z"/></svg>';

const gameId = new URLSearchParams(location.search).get('g');
const GAME = gameId ? GAMES.find((g) => g.id === gameId) : null;

// ---------- inicio ----------
function renderHome(T) {
  $('#gameCards').innerHTML = GAMES.map((g) => {
    const L = g[lang];
    return `<article class="game reveal in">
      <div class="pv ${g.tall ? 'tall' : ''}" data-rot>${g.shots.map((s, i) => `<img src="${s}" alt="${esc(g.name)}" loading="lazy" class="${i ? '' : 'on'}">`).join('')}<span class="kind">${esc(g.kind[lang])}</span></div>
      <div class="body">
        <div class="head"><img src="${g.logo}" alt=""><div><h3>${esc(g.name)}</h3><div class="tag">${esc(L.tag)}</div></div></div>
        <p>${esc(L.short)}</p>
        <div class="chips">${L.gifts.slice(0, 3).map(([e, n]) => `<span class="chip">${e} ${esc(n)}</span>`).join('')}</div>
        <div class="actions">
          <a class="btn btn-primary btn-block jelly" href="${g.download}">${T.download}</a>
          <a class="btn btn-ghost btn-block jelly" href="juego.html?g=${g.id}">${T.moreInfo}</a>
        </div>
      </div></article>`;
  }).join('');
  $('#giftCards').innerHTML = ['g1', 'g2', 'g3', 'g4'].map((k) => {
    const [e, n, d] = T[k];
    return `<div class="gift reveal in"><div class="e">${e}</div><b>${esc(n)}</b><span>${esc(d)}</span></div>`;
  }).join('');
}

// ---------- página de un juego ----------
function renderGame(T) {
  if (!GAME) { $('#game').innerHTML = `<section class="wrap center"><h2>${T.notFound}</h2><a class="btn btn-primary jelly" href="./">${T.back}</a></section>`; return; }
  const g = GAME, L = g[lang];
  document.title = `${g.name} · Coreus Games`;
  $$('[data-dl]').forEach((a) => { a.href = g.download; });
  const extra = (g.play ? `<a class="btn btn-ghost btn-lg jelly" href="${g.play}" target="_blank" rel="noopener">${T.playRoblox}</a>` : '')
    + (g.site ? `<a class="btn btn-ghost btn-lg jelly" href="${g.site}" target="_blank" rel="noopener">${T.website}</a>` : '');
  $('#game').innerHTML = `
  <header class="wrap ghero">
    <div class="reveal in">
      <a class="back" href="./#games">${T.back}</a>
      <img class="logo" src="${g.logo}" alt="">
      <h1>${esc(g.name)}</h1>
      <div class="tt-badge"><span class="tt">${TT}</span><span>${esc(L.tag)}</span></div>
      <p class="lead" style="margin-top:18px">${esc(L.lead)}</p>
      <div class="cta" style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px">
        <a class="btn btn-primary btn-lg jelly" href="${g.download}">${T.download}</a>${extra}
      </div>
    </div>
    <div class="reveal in gallery">
      <div class="main ${g.tall ? 'tall' : ''}"><img id="big" src="${g.shots[0]}" alt="${esc(g.name)}"></div>
      <div class="thumbs">${g.shots.map((s, i) => `<button data-shot="${s}" class="${i ? '' : 'on'}"><img src="${s}" alt="" loading="lazy"></button>`).join('')}</div>
    </div>
  </header>
  <section class="wrap" id="steps">
    <div class="center"><h2>${T.gStepsTitle}</h2></div>
    <div class="steps">${L.steps.map(([t, p], i) => `<div class="step reveal in"><div class="num">${i + 1}</div><h3>${esc(t)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </section>
  <section class="wrap" id="gfeats">
    <div class="center"><h2>${T.gFeatsTitle}</h2></div>
    <div class="feats">${L.feats.map(([e, t, p]) => `<div class="feat reveal in"><span class="ic">${e}</span><h3>${esc(t)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </section>
  <section class="wrap" id="ggifts">
    <div class="center"><h2>${T.gGiftsTitle}</h2></div>
    <div class="giftrows">${L.gifts.map(([e, n, d]) => `<div class="giftrow"><span class="e">${e}</span><b>${esc(n)}</b><span>${esc(d)}</span></div>`).join('')}</div>
  </section>
  <section class="wrap">
    <div class="download">
      <img src="${g.logo}" alt="">
      <h2>${T.gGetTitle}: ${esc(g.name)}</h2>
      <p class="lead" style="margin:0 auto">${T.gGetLead} · <span id="ver"></span></p>
      <div class="cta"><a class="btn btn-primary btn-lg jelly" href="${g.download}">${T.download}</a>
        <a class="btn btn-discord btn-lg jelly" href="${DISCORD}" target="_blank" rel="noopener">${DISCORD_IC}${T.joinDiscord}</a></div>
      <p class="note" style="margin-top:16px">${T.smartscreen}</p>
    </div>
  </section>`;
  $('.thumbs').onclick = (e) => {
    const b = e.target.closest('[data-shot]'); if (!b) return;
    $('#big').src = b.dataset.shot;
    $$('.thumbs button').forEach((x) => x.classList.toggle('on', x === b));
  };
  if (g.latest) fetch(g.latest).then((r) => r.json()).then((d) => { $('#ver').textContent = `${T.latest} v${d.version}`; }).catch(() => {});
}

function applyLang() {
  const T = WEB_T[lang];
  document.documentElement.lang = lang;
  $$('[data-t]').forEach((el) => { if (typeof T[el.dataset.t] === 'string') el.textContent = T[el.dataset.t]; });
  $$('[data-t-html]').forEach((el) => { el.innerHTML = T[el.dataset.tHtml]; });
  if ($('#gameCards')) renderHome(T);
  if ($('#game')) renderGame(T);
  $$('[data-tt]').forEach((el) => { el.innerHTML = TT; });
  $$('[data-discord]').forEach((a) => { a.href = DISCORD; });
  $$('[data-discord-ic]').forEach((el) => { el.outerHTML = DISCORD_IC; });
}
$('#lang').innerHTML = Object.entries(NAMES).map(([k, n]) => `<option value="${k}">${n}</option>`).join('');
$('#lang').value = lang;
$('#lang').onchange = (e) => { lang = e.target.value; store.set('cg-lang', lang); applyLang(); };
applyLang();

// las vistas previas de las tarjetas van cambiando de imagen
setInterval(() => {
  $$('[data-rot]').forEach((pv) => {
    const imgs = [...pv.querySelectorAll('img')], i = imgs.findIndex((x) => x.classList.contains('on'));
    imgs[i].classList.remove('on');
    imgs[(i + 1) % imgs.length].classList.add('on');
  });
}, 3500);

// botones gelatinosos y aparición al hacer scroll
document.addEventListener('click', (e) => {
  const b = e.target.closest('.btn'); if (!b) return;
  b.classList.remove('wobble'); void b.offsetWidth; b.classList.add('wobble');
  const r = b.getBoundingClientRect(), g = document.createElement('span');
  g.className = 'goo'; g.style.left = (e.clientX - r.left) + 'px'; g.style.top = (e.clientY - r.top) + 'px';
  b.append(g); setTimeout(() => g.remove(), 700);
});
const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: 0.12 });
$$('.reveal').forEach((el) => io.observe(el));
