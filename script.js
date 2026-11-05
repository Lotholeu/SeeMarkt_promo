const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],clamp=n=>Math.max(0,Math.min(1,n)),range=(p,a,b)=>{const x=clamp((p-a)/(b-a));return x*x*(3-2*x)},reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero=$('.hero'),bookPosition=$('.book-position'),book=$('.book'),cover=$('.cover'),leaves=$$('.leaf');
const progress=e=>clamp(-e.getBoundingClientRect().top/Math.max(1,e.offsetHeight-innerHeight));
const alpha=(el,a)=>{el.style.opacity=a;el.style.visibility=a>.001?'visible':'hidden'};
window.renderCinema4=()=>{const p=progress(hero),b=clamp(p/.82),opening=range(b,.28,.48),departure=range(b,.86,1),approach=range(b,0,.26);alpha($('.hero-copy'),reduced?1:1-range(p,.03,.18));$('.hero-copy').style.transform=`translateY(${-range(p,0,.2)*70}px)`;const scale=Math.min(1+approach*.55,(innerWidth-55)/(bookPosition.offsetWidth*(1+opening)),innerHeight*.62/bookPosition.offsetHeight);bookPosition.style.top=`${75-25*approach}%`;bookPosition.style.transform=`translate(${-50+50*opening}%,-50%) translateY(${-departure*100}px) scale(${scale*(1-departure*.15)})`;alpha(bookPosition,1-departure);book.style.transform=`rotateX(${10-approach*8}deg) rotateY(${-32*(1-approach)}deg) rotateZ(${-9*(1-approach)}deg)`;window.renderPaperBook?.(b,opening);alpha($('.book-outro'),range(p,.80,.94));alpha($('.intro-hint'),1-range(p,0,.05));};
const steps={entdecken:[['Dein nächstes Kapitel.','Entdecke, was gerade zu dir passt.'],['Finden, was du brauchst.','Suche nach Titel, ISBN, Autor oder Fach.'],['Deinen Fund merken.','Ein Herz. Und der Artikel bleibt in deinen Favoriten.']],anzeige:[['Anzeige öffnen.','Zustand, Preis und Verkäufer im Blick.'],['Details ansehen.','Prüfe, ob der Artikel zu dir passt.'],['Kaufanfrage senden.','Deine Anfrage geht zuerst an den Verkäufer.'],['Auf die Annahme warten.','Der Verkäufer entscheidet über deine Anfrage.'],['Kaufanfrage angenommen.','Jetzt wird euer Chat freigeschaltet.']],chat:[['Euer Chat ist frei.','Die Kaufanfrage wurde angenommen.'],['Direkt miteinander schreiben.','Klärt eure Fragen im persönlichen Chat.'],['Einen Termin vorschlagen.','Datum, Uhrzeit und Treffpunkt zusammen festlegen.'],['Alles vereinbart.','Persönlich an der Schule übergeben.']]};
function drawStories(){for(const section of $$('.product-story')){const p=reduced?1:progress(section),frame=section.querySelector('.ui-frame'),entry=range(p,0,.09);frame.style.transform=`rotateY(${(1-entry)*-9+Math.sin(p*Math.PI*2)*2}deg) rotateX(${(1-entry)*4-1}deg) translateY(${(1-entry)*24}px) scale(${.96+entry*.04})`;const list=steps[section.id],i=Math.min(list.length-1,Math.floor(p*list.length));section.querySelector('.story-step>span').textContent=String(i+1).padStart(2,'0');section.querySelector('.story-step strong').textContent=list[i][0];section.querySelector('.story-step p').textContent=list[i][1];section.querySelector('.story-meter i').style.width=p*100+'%';if(section.id==='entdecken'){const search=section.querySelector('.ref-search'),typed=p>.31;search.querySelector('span').style.display=typed?'none':'';search.querySelector('b').style.display=typed?'block':'none';search.querySelector('b').textContent='Mathematik'.slice(0,Math.ceil(range(p,.31,.44)*10));section.querySelectorAll('.heart').forEach((h,n)=>{if(n===0){h.textContent=p>.69?'♥':'♡';h.setAttribute('aria-pressed',String(p>.69))}});alpha(section.querySelector('.saved-note'),range(p,.70,.78)*(1-range(p,.92,1)))}if(section.id==='anzeige'){const state=p<.42?0:p<.62?1:p<.82?2:3;section.querySelector('.request-status>span').textContent=['01','02','03','04'][state];section.querySelector('.request-status strong').textContent=['Anzeige geöffnet.','Kaufanfrage senden.','Anfrage gesendet.','Anfrage angenommen.'][state];section.querySelector('.request-status p').textContent=['Alles auf einen Blick. Du entscheidest.','Du möchtest dem Buch ein neues Kapitel geben.','Der Verkäufer prüft deine Kaufanfrage.','Dein Chat ist jetzt freigeschaltet.'][state];section.querySelector('.request-cta').textContent=['Kaufanfrage senden ↗','Kaufanfrage senden ↗','◷ Anfrage gesendet','✓ Kaufanfrage angenommen'][state];section.querySelector('.request-signal span').textContent=state===3?'Weiter geht’s im Chat.':'Deine Anfrage geht an den Verkäufer.'}if(section.id==='chat'){const nodes=[...section.querySelectorAll('[data-message]')],view=section.querySelector('.chat-transcript');let bottom=0;nodes.forEach((n,j)=>{const a=reduced?1:range(p,.05+j*.20,.16+j*.20);alpha(n,a);n.style.transform=`translateY(${(1-a)*15}px)`;bottom+=(n.offsetTop+n.offsetHeight-bottom)*a});const shift=Math.max(0,bottom-view.clientHeight+6);nodes.forEach(n=>n.style.translate=`0 ${-shift}px`);const complete=p>.80;section.querySelector('.trade-progress>p').textContent=complete?'Euer Termin wurde angenommen.':p>.45?'Ein Terminvorschlag wartet auf eine Antwort.':'Kaufanfrage angenommen. Ihr könnt jetzt schreiben.';section.querySelector('.appointment>p').textContent=complete?'✓ Termin angenommen. Bis morgen am Schulhof.':'Wartet auf Annahme durch dein Gegenüber.'}}}
const home=$('.home-story');
function drawHome(){const p=reduced?1:progress(home),phase=p<.12?0:p<.31?1:p<.46?2:p<.61?3:p<.76?4:p<.87?5:6;const titles=['In Safari öffnen.','Teilen. Und hinzufügen.','Auf dem Home-Bildschirm.','Als Web-App öffnen.','Mitteilungen erlauben.','Eine Mitteilung erhalten.','Auch auf dem Sperrbildschirm.'];const copies=['seemarkt.me auf deinem iPhone aufrufen.','„Teilen“ → „Zum Home-Bildschirm“.','Mit „Hinzufügen“ bestätigen.','Tippe auf dein neues SeeMarkt-Symbol.','Aktivieren, sofern auf deinem Gerät verfügbar.','Eine angenommene Kaufanfrage als Beispiel.','Nach deinen Mitteilungseinstellungen.'];home.querySelector('.home-step>span').textContent=String(phase+1).padStart(2,'0');home.querySelector('.home-step strong').textContent=titles[phase];home.querySelector('.home-step p').textContent=copies[phase];alpha($('.phone-site'),1-range(p,.43,.47));let a=range(p,.10,.15)*(1-range(p,.29,.33));alpha($('.phone-sheet'),a);$('.phone-sheet').style.transform=`translateY(${(1-a)*55}px)`;alpha($('.phone-add'),range(p,.30,.34)*(1-range(p,.43,.47)));alpha($('.phone-home'),range(p,.44,.48)*(1-range(p,.86,.90)));alpha($('.phone-permission'),range(p,.61,.65)*(1-range(p,.73,.77)));const locked=range(p,.86,.90);alpha($('.phone-lock'),locked);alpha($('.phone-notification'),range(p,.77,.81));$('.phone-notification').style.top=($('.phone-device').clientHeight*(.11+locked*.30))+'px';$('.home-seemarkt b').style.opacity=range(p,.77,.81);$('.phone-device').style.rotate=`y ${-5+range(p,0,.3)*7}deg`;$('.home-progress i').style.width=p*100+'%'}
function drawSignature(){const section=$('.signature-story'),raw=reduced?1:progress(section),distance=raw*2.1,p=reduced?1:distance<=.45?distance:.45+(distance-.45)/3,preview=$('.signature-preview'),finale=$('.signature-finale'),leave=range(p,.28,.57),enter=range(p,.45,.73);alpha(preview,reduced?0:1-leave);preview.style.transform=`translate(-50%,-50%) translateY(${leave*innerHeight*.28}px) rotateX(${leave*9}deg) scale(${.91+range(p,0,.25)*.09-leave*.09})`;alpha(finale,enter);finale.style.transform=`translateY(${(1-enter)*50}px) scale(${.78+enter*.22})`;finale.style.setProperty('--ray-turn',`${-8+p*16}deg`);$('.book-outro').style.setProperty('--ray-turn',`${-8+progress(hero)*16}deg`);alpha($('.signature-hint'),1-range(p,.22,.48));
const atmosphere=finale.querySelector('.signature-atmosphere'),reveal=reduced?1:range(p,.44,.77),pulse=reduced?1:range(p,.48,.88);
atmosphere.style.setProperty('--reveal',String(reveal));atmosphere.style.setProperty('--orbit-turn',`${-24+reveal*48+(p-.77)*24}deg`);atmosphere.style.setProperty('--dust-turn',`${-18+p*34}deg`);atmosphere.style.setProperty('--dust-scale',String(.62+reveal*.38));atmosphere.style.setProperty('--pulse-scale',String(.18+pulse*1.6));atmosphere.style.setProperty('--pulse-alpha',String(reduced?0:Math.sin(pulse*Math.PI)*.65));
}
function render(){window.renderCinema4();drawStories();drawHome();drawSignature()}let queued=false;const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;render()})};addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
$$('.heart').forEach(b=>b.addEventListener('click',()=>{const saved=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(saved));b.textContent=saved?'♥':'♡'}));
$$('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('details').filter(o=>o!==d).forEach(o=>o.open=false)}));
for(const node of $$('.phone-screen,.phone-sheet,.phone-add,.phone-permission,.phone-notification')){const label=document.createElement('span');label.className='example-phone';label.textContent='Beispiel Ansicht';node.append(label)}
// A local illustration of the request. No request is sent to the real marketplace.
$('.request-cta').addEventListener('click',()=>{const p=progress($('#anzeige'));if(p<.82){$('.request-cta').textContent='✓ Beispielanfrage gesendet';$('.request-signal span').textContent='Beispiel: Der Verkäufer entscheidet als Nächstes.'}});
const canvas=$('#stars'),ctx=canvas.getContext('2d');let stars=[],w,h,last=0;function resize(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);let seed=47;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};stars=Array.from({length:Math.round(w*h/9000)},()=>({x:random()*w,y:random()*h,r:.3+random()*.7,a:.12+random()*.42,phase:random()*6}));draw(0)}function draw(t){ctx.clearRect(0,0,w,h);for(const s of stars){ctx.fillStyle=`rgba(156,207,224,${s.a*(.8+.2*Math.sin(t*.00025+s.phase))})`;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}}function tick(t){if(t-last>80){draw(t);last=t}if(!reduced)requestAnimationFrame(tick)}addEventListener('resize',resize);resize();if(!reduced)requestAnimationFrame(tick);render();
addEventListener('load',()=>{for(const page of $$('.paper-print,.cover-front')){const label=document.createElement('span');label.className='paper-example-label';label.textContent='Beispiel Ansicht';page.append(label)}render()});


// Curved opaque paper: each leaf is a continuous six-strip surface, printed on both sides.
const paperSegments=6;
const paperGraph='<svg viewBox="0 0 150 100" aria-hidden="true"><path class="graph-grid" d="M15 15v70h122M15 35h122M15 55h122M15 75h122M40 15v70M65 15v70M90 15v70M115 15v70"/><path d="M16 73Q45 66 65 28T135 40"/><circle cx="65" cy="28" r="3"/></svg>';
const paperHeart='<svg viewBox="0 0 150 100" aria-hidden="true"><path d="M75 85 26 42C-3 13 43-12 75 20c32-32 78-7 49 22Z"/><path class="graph-grid" d="M18 94h114"/></svg>';
const paperNetwork='<svg viewBox="0 0 150 100" aria-hidden="true"><path d="m20 50 55-30 56 30-56 30-55-30ZM75 20v60M20 50h111"/><circle cx="20" cy="50" r="7"/><circle cx="75" cy="20" r="7"/><circle cx="131" cy="50" r="7"/><circle cx="75" cy="80" r="7"/><circle cx="75" cy="50" r="11"/></svg>';
const paperBookIcon='<svg viewBox="0 0 150 100" aria-hidden="true"><path d="M15 15q30-7 60 9v65q-30-16-60-9V15Zm120 0q-30-7-60 9v65q30-16 60-9V15ZM25 31q18-3 38 5M25 46q18-3 38 5M88 36q20-8 37-5M88 51q20-8 37-5"/></svg>';
const paperPrints=[
 ['01 / Weiterdenken','Wissen hat<br>keinen Schluss.','Was du heute lernst, kann morgen jemand anderen weiterbringen.',paperGraph],
 ['02 / Was bleibt','Eine Idee.<br>Viele Wege.','Ein Buch ist mehr als Papier. Es steckt voller neuer Möglichkeiten.','<div class="paper-quote">„Gute Gedanken<br>gehen weiter.“</div>'],
 ['03 / Mathematik','Neue Wege.<br>Klare Lösungen.','Manchmal beginnt ein guter Fund mit einer ganz einfachen Gleichung.',paperGraph],
 ['04 / Entdecken','Ein guter Fund.<br>Ein neuer Anfang.','Du brauchst es nicht mehr? Für jemand anderen passt es genau.',paperBookIcon],
 ['05 / Zusammenfinden','Miteinander.<br>Ganz direkt.','Kaufanfrage. Annahme. Dann ein Chat und ein Treffpunkt.','<div class="paper-dialog"><span>Danke fürs Annehmen!</span><span>Gerne. Bis morgen!</span></div>'],
 ['06 / Weitergeben','Platz für<br>neue Ideen.','Weniger im Regal. Mehr in Bewegung. Das nächste Kapitel wartet.','<div class="paper-bars"><i></i><i></i><i></i><i></i></div>'],
 ['07 / Merken','Ein Herz für<br>gute Dinge.','Manche Funde möchtest du behalten. Manche erst einmal im Blick.',paperHeart],
 ['08 / Deine Schule','Deine Schule.<br>Dein Netzwerk.','Vertraute Wege. Neue Kontakte. Gute Dinge bleiben in eurer Nähe.',paperNetwork],
 ['09 / Ein neues Kapitel','Bereit für<br>deinen Anfang.','Ein Foto. Ein paar Worte. Und dein altes Buch wird neu entdeckt.','<div class="paper-numeral">09<span>NEUNTE KLASSE / NEUE WEGE</span></div>'],
 ['10 / Was weitergeht','Gute Dinge<br>bleiben.','Nur die Geschichte geht weiter. Von dir. Für andere.',paperBookIcon]
];
function paperPage(data,index){return `<div class="paper-print"><div class="paper-running">SEEMARKT <span>WEITERDENKEN</span></div><p class="paper-kicker">${data[0]}</p><h3>${data[1]}</h3><div class="paper-illustration">${data[3]}</div><p class="paper-copy">${data[2]}</p><div class="paper-folio"><span>DEIN NÄCHSTES KAPITEL.</span><b>${String(index+1).padStart(2,'0')}</b></div></div>`}
const paperLeaves=leaves.map((leaf,index)=>{
 leaf.innerHTML='';leaf.classList.add('curved-leaf');
 const strips=Array.from({length:paperSegments},(_,j)=>{
  const strip=document.createElement('div');strip.className='paper-strip';strip.style.setProperty('--slice',String(j));
  strip.innerHTML=`<div class="paper-surface paper-front"><div class="paper-slice-print">${paperPage(paperPrints[index*2],index*2)}</div></div><div class="paper-surface paper-back"><div class="paper-slice-print">${paperPage(paperPrints[index*2+1],index*2+1)}</div></div>`;
  leaf.append(strip);return strip;
 });
 return{leaf,strips};
});
const paperGroundLeft=document.createElement('div');paperGroundLeft.className='book-ground-shadow left';
const paperGroundRight=document.createElement('div');paperGroundRight.className='book-ground-shadow right';
$('.cover-inside').append(paperGroundLeft);$('.page-stack').append(paperGroundRight);
let lastPaperProgress=-1,lastPaperWidth=-1;
window.renderPaperBook=function(progress,opening){
 // Once open, the cover lies below the accumulated leaves instead of covering their printing.
 cover.style.transform=`translateZ(${12-18*opening}px) rotateY(${-179.8*opening}deg)`;
 const width=bookPosition.offsetWidth;
 if(Math.abs(progress-lastPaperProgress)<.000001&&width===lastPaperWidth)return;lastPaperProgress=progress;lastPaperWidth=width;
 const stripWidth=width/paperSegments;
 let castLeft=0,castRight=0;
 paperLeaves.forEach(({leaf,strips},index)=>{
  const t=range(progress,.55+index*.052,.615+index*.052),lift=Math.sin(t*Math.PI),baseDepth=(8-index*1.2)*(1-t)+(index*1.5+1)*t;
  leaf.style.transform=`translateZ(${baseDepth+lift*2}px) rotateY(${-179.7*t}deg)`;
  leaf.style.setProperty('--paper-width',`${width}px`);
  let x=0,z=0;
  strips.forEach((strip,j)=>{
   // A gentle C-shaped bow travels through the sheet; the hinge remains attached to the spine.
   const bend=lift*(32+index*.8)*Math.sin(((j+.5)/paperSegments)*Math.PI),angle=bend*Math.PI/180;
   strip.style.width=`${stripWidth+.65}px`;
   strip.style.transform=`translate3d(${x}px,0,${z}px) rotateY(${bend}deg)`;
   strip.style.setProperty('--front-offset',`${-j*stripWidth}px`);strip.style.setProperty('--back-offset',`${-(paperSegments-1-j)*stripWidth}px`);
   const frontShade=clamp(lift*(.08+.12*j/paperSegments)+Math.sin(angle)*.08,0,.3),backShade=clamp(lift*(.15-.08*j/paperSegments),0,.25);
   strip.style.setProperty('--front-shade',String(frontShade));strip.style.setProperty('--back-shade',String(backShade));strip.style.setProperty('--edge-light',String(.14+lift*.2));
   x+=stripWidth*Math.cos(angle);z-=stripWidth*Math.sin(angle);
  });
  if(t>0&&t<1){castRight=Math.max(castRight,lift*(1-t));castLeft=Math.max(castLeft,lift*t)}
 });
 paperGroundRight.style.opacity=String(castRight*.42);paperGroundRight.style.transform=`scaleX(${.25+castRight*1.1})`;
 paperGroundLeft.style.opacity=String(castLeft*.35);paperGroundLeft.style.transform=`scaleX(${.25+castLeft*1.1})`;
 book.style.setProperty('--spine-shadow',String(.2+castLeft*.18+castRight*.18));
};
window.renderCinema4();
