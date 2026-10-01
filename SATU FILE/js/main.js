const dynamicTechVisuals = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=800&auto=format&fit=crop'
];
const engineeringTags = [
  "ESP32-S3", "ROS 2 JAZZY", "PID CONTROL", "KICAD PCB", "STM32 CORTEX",
  "QUADRATURE ENCODER", "BTS7960", "MICRO-ROS", "LADDER LOGIC", "PLC AUTOMATION",
  "CLOSED-LOOP", "UART / I2C", "PZEM-004T", "DUAL AXIS", "ROBOTICS ODOMETRY"
];
function loadStoredOverrides(){
  try{
    const sk=localStorage.getItem('ferdy_skills_v2');
    if(sk){ const arr=JSON.parse(sk); if(Array.isArray(arr)&&arr.length) window.skillsList=arr; }
    const pj=localStorage.getItem('ferdy_projects_v2');
    if(pj){ const arr=JSON.parse(pj); if(Array.isArray(arr)&&arr.length) window.projectsData=arr; }
    const jj=localStorage.getItem('ferdy_journal_v2');
    if(jj){ const arr=JSON.parse(jj); if(Array.isArray(arr)&&arr.length) window.journalData=arr; if(typeof logbookData!=='undefined') window.logbookData=arr; }
  }catch(e){}
}
function getDailyPhotos(){
  try{
    const s=localStorage.getItem('ferdy_daily_photos');
    if(s){ const a=JSON.parse(s); if(Array.isArray(a)&&a.length) return a; }
  }catch(e){}
  const about=localStorage.getItem('ferdy_about_photo');
  const saved=localStorage.getItem('ferdy_profile_photo');
  const base=about||saved||'assets/profile.jpg';
  return [
    {src: base, title: 'Ferdy Fernando — Daily', tag:'Photo #1'},
    {src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', title:'Lab Session', tag:'Photo #2'},
    {src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80', title:'Embedded Work', tag:'Photo #3'}
  ];
}
function initAboutPhoto(){
  const img=document.getElementById('aboutPhoto');
  const hero=document.getElementById('portraitImg');
  const heroFallback=document.getElementById('fallbackPortrait');
  const saved=localStorage.getItem('ferdy_about_photo')||localStorage.getItem('ferdy_profile_photo');
  if(saved){
    if(img) img.src=saved;
    if(hero){ hero.src=saved; hero.classList.remove('hidden'); if(heroFallback) heroFallback.classList.add('hidden'); }
  }
  if(img){
    img.addEventListener('click',()=>{ const inp=document.getElementById('aboutPhotoInput'); if(inp) inp.click(); });
    img.style.cursor='pointer';
    img.title='Klik untuk ganti foto (atau via Admin HP)';
  }
}
let dailyPhotos=[], dailyIdx=0, dailyTimer=null;
function initDailyRoutine(){
  dailyPhotos=getDailyPhotos();
  dailyIdx=0;
  renderDailyRoutine();
  if(dailyTimer) clearInterval(dailyTimer);
  dailyTimer=setInterval(()=>nextDailyRoutine(),4000);
}
function renderDailyRoutine(){
  const img=document.getElementById('dailyRoutineImg');
  const title=document.getElementById('dailyRoutineTitle');
  const tag=document.getElementById('dailyRoutineTag');
  const dots=document.getElementById('dailyRoutineDots');
  if(!img) return;
  const cur=dailyPhotos[dailyIdx]||dailyPhotos[0];
  img.src=cur.src;
  img.alt=cur.title;
  if(title) title.textContent=cur.title;
  if(tag) tag.textContent=cur.tag||('Photo #'+(dailyIdx+1));
  if(dots){
    dots.innerHTML=dailyPhotos.map((_,i)=>'<button onclick="goDailyRoutine('+i+')" class="w-2 h-2 rounded-full transition-all '+(i===dailyIdx?'bg-white w-5':'bg-white/30')+'"></button>').join('');
  }
}
function nextDailyRoutine(){ dailyIdx=(dailyIdx+1)%dailyPhotos.length; renderDailyRoutine(); resetDailyTimer(); }
function prevDailyRoutine(){ dailyIdx=(dailyIdx-1+dailyPhotos.length)%dailyPhotos.length; renderDailyRoutine(); resetDailyTimer(); }
function goDailyRoutine(i){ dailyIdx=i; renderDailyRoutine(); resetDailyTimer(); }
function resetDailyTimer(){ if(dailyTimer) clearInterval(dailyTimer); dailyTimer=setInterval(()=>nextDailyRoutine(),4000); }
function initLoader(){
  const container=document.getElementById('loader-container');
  const bar=document.getElementById('loaderBar');
  const pct=document.getElementById('loaderPercent');
  const step=document.getElementById('loaderStep');
  if(!container||!bar) return;
  const milestones=[
    {p:24, label:'Initializing'},
    {p:52, label:'Loading Assets'},
    {p:81, label:'Compiling Data'},
    {p:100, label:'Ready'}
  ];
  let cur=0;
  function runStep(){
    if(cur>=milestones.length){
      setTimeout(()=>{ container.classList.add('fade-out'); document.body.style.overflow=''; },450);
      return;
    }
    const target=milestones[cur];
    if(step) step.textContent=target.label;
    if(bar) bar.style.width=target.p+'%';
    if(pct) pct.textContent=target.p+'%';
    cur++;
    setTimeout(runStep, 480);
  }
  document.body.style.overflow='hidden';
  setTimeout(runStep, 250);
}
function initLightning(){
  const c=document.getElementById('lightningCanvas');
  if(!c) return;
  const ctx=c.getContext('2d');
  let w,h,dots=[];
  function resize(){
    w=c.width=window.innerWidth;
    h=c.height=window.innerHeight;
    dots=Array.from({length:220},()=>({
      x:Math.random()*w,
      y:Math.random()*h,
      r:Math.random()*1.6+0.3,
      o:Math.random()*0.6+0.2,
      vx:(Math.random()-0.5)*0.35,
      vy:Math.random()*0.7+0.15
    }));
  }
  resize(); window.addEventListener('resize',resize);
  (function loop(){
    ctx.clearRect(0,0,w,h);
    const g=ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,'#050505');
    g.addColorStop(1,'#101010');
    ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(255,255,255,0.07)';
    ctx.lineWidth=1;
    dots.forEach((d,i)=>{
      d.x+=d.vx; d.y+=d.vy;
      if(d.x<0||d.x>w) d.vx*=-1;
      if(d.y>h){ d.y=0; d.x=Math.random()*w; }
      ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,'+d.o+')'; ctx.fill();
      dots.slice(i+1).forEach(o=>{
        const dx=d.x-o.x, dy=d.y-o.y, dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<110){
          ctx.globalAlpha=(1-dist/110)*0.12;
          ctx.beginPath(); ctx.moveTo(d.x,d.y); ctx.lineTo(o.x,o.y); ctx.stroke();
          ctx.globalAlpha=1;
        }
      });
    });
    const loader=document.getElementById('loader-container');
    if(loader && !loader.classList.contains('fade-out')) requestAnimationFrame(loop);
  })();
}
function initMarquee(){
  const r1=document.getElementById('marqueeRow1');
  const r2=document.getElementById('marqueeRow2');
  const sec=document.getElementById('marquee');
  if(!r1||!r2||!sec) return;
  const row1Items = [...engineeringTags, ...engineeringTags];
  const row2Items = [...dynamicTechVisuals, ...dynamicTechVisuals];
  r1.innerHTML = row1Items.map(t => '<div class="group px-8 py-4 rounded-2xl bg-[#121614] border border-[#D7E2EA]/20 font-mono text-sm tracking-widest text-[#D7E2EA] shrink-0 flex items-center gap-3 cursor-pointer hover:text-black hover:bg-white hover:border-white transition-all duration-200"><span class="w-2 h-2 rounded-full bg-[#D7E2EA] opacity-80 group-hover:bg-black transition-colors"></span><span>' + t + '</span></div>').join('');
  r2.innerHTML = row2Items.map(u => '<img src="' + u + '" loading="lazy" class="w-[360px] h-[220px] rounded-2xl object-cover shrink-0 filter grayscale hover:grayscale-0 hover:border-[#D7E2EA] transition-all duration-300 border border-[#D7E2EA]/20 cursor-pointer" alt="Engineering Hardware">').join('');
  window.addEventListener('scroll', ()=>{
    const offset = (window.scrollY - sec.offsetTop + window.innerHeight) * 0.25;
    r1.style.transform = 'translateX(' + (offset - 150) + 'px)';
    r2.style.transform = 'translateX(-' + (offset - 150) + 'px)';
  }, {passive:true});
}
const skillsList=[
  {name:"Arduino", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg"},
  {name:"ESP32", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg"},
  {name:"C / C++", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"},
  {name:"Python", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},
  {name:"KiCad", icon:"https://cdn.simpleicons.org/kicad/314CB0"},
  {name:"PLC Ladder", icon:"https://cdn-icons-png.flaticon.com/512/1087/1087815.png"},
  {name:"EasyEDA", icon:"https://cdn-icons-png.flaticon.com/512/2103/2103633.png"},
  {name:"Proteus", icon:"https://cdn-icons-png.flaticon.com/512/2721/2721626.png"},
  {name:"MATLAB", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg"}
];
function renderSkills(){
  const el=document.getElementById('skillsList');
  if(!el) return;
  el.innerHTML=skillsList.map(s=>`
    <div class="group bg-[#151515] border border-white/10 rounded-[22px] p-6 flex flex-col items-center justify-center gap-4 hover:-translate-y-1.5 hover:bg-white hover:border-white transition-all duration-300 cursor-pointer">
      <img src="${s.icon}" alt="${s.name}" class="w-12 h-12 object-contain group-hover:scale-110 transition-transform" loading="lazy">
      <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-white group-hover:text-black text-center">${s.name}</p>
    </div>
  `).join('');
}
function renderJournalPreview(){
  const jd=(typeof journalData!=='undefined')?journalData:(typeof logbookData!=='undefined'?logbookData:[]);
  const el=document.getElementById('journalPreview');
  if(!el || !jd.length) return;
  const items=jd.slice(0,3);
  el.innerHTML=items.map((j,i)=>`
    <button onclick="openJournal(${i})" class="group text-left w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-6 px-6 -mx-6 rounded-3xl hover:bg-black/[0.06] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 active:scale-95">
      <div class="font-black text-[clamp(3rem,10vw,120px)] leading-none text-[#0C0C0C] group-hover:scale-110 group-hover:tracking-tighter transition-all duration-300 origin-left">${String(i+1).padStart(2,'0')}</div>
      <div class="flex flex-col gap-1 max-w-2xl group-hover:translate-x-3 transition-transform duration-300">
        <span class="font-medium text-xs uppercase tracking-widest text-[#0C0C0C]/60">${j.week} — ${j.date}</span>
        <h3 class="font-medium uppercase text-[clamp(1rem,2vw,1.6rem)] text-[#0C0C0C] leading-tight group-hover:tracking-wide transition-all duration-300">${j.title}</h3>
        <p class="font-light leading-relaxed text-[clamp(0.85rem,1.4vw,1rem)] opacity-60 group-hover:opacity-100 text-[#0C0C0C] line-clamp-2 transition-opacity duration-300">${j.summary}</p>
        <span class="font-medium text-sm text-[#0C0C0C] underline underline-offset-4 mt-1 group-hover:tracking-widest transition-all duration-300">Lihat Detail →</span>
      </div>
    </button>
  `).join('');
}
function renderProjectsPreview(){
  const el=document.getElementById('projectsPreview');
  if(!el || typeof projectsData==='undefined') return;
  const items=projectsData.slice(0,3);
  el.innerHTML=items.map((p,idx)=>`
    <button onclick="openProject('${p.id}')" class="group text-left w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-6 px-6 -mx-6 rounded-3xl hover:bg-black/[0.06] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 active:scale-95">
      <div class="font-black text-[clamp(3rem,10vw,120px)] leading-none text-[#0C0C0C] group-hover:scale-110 transition-all origin-left">${p.num}</div>
      <div class="flex flex-col gap-2 max-w-2xl group-hover:translate-x-2 transition-transform">
        <span class="font-medium text-xs uppercase tracking-widest text-[#0C0C0C]/60">${p.category} ${p.status?'· '+p.status:''}</span>
        <h3 class="font-medium uppercase text-[clamp(1rem,2vw,1.6rem)] text-[#0C0C0C] leading-tight">${p.title}</h3>
        <p class="font-light leading-relaxed text-[clamp(0.85rem,1.4vw,1rem)] opacity-60 group-hover:opacity-100 text-[#0C0C0C] line-clamp-2">${p.desc}</p>
        <div class="flex flex-wrap gap-1.5 mt-1">${(p.technologies||p.tech||[]).slice(0,4).map(t=>`<span class="text-[10px] px-2.5 py-1 rounded-full border border-black/15 text-black/60">${t}</span>`).join('')}</div>
        <span class="font-medium text-sm text-[#0C0C0C] underline underline-offset-4 mt-1">Lihat Detail →</span>
      </div>
    </button>
  `).join('');
}
function renderFullJournal(){
  const jd=(typeof journalData!=='undefined'?journalData:(typeof logbookData!=='undefined'?logbookData:[]));
  const el=document.getElementById('journalFull');
  if(!el || !jd.length) return;
  el.innerHTML=jd.map((j,i)=>`
    <button onclick="openJournal(${i})" class="group text-left w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-6 px-6 -mx-6 rounded-3xl hover:bg-black/[0.04] transition-all duration-300">
      <div class="font-black text-[clamp(3rem,10vw,120px)] leading-none text-[#0C0C0C] group-hover:scale-105 group-hover:tracking-tighter transition-all duration-300 origin-left">${String(i+1).padStart(2,'0')}</div>
      <div class="flex flex-col gap-1 max-w-2xl group-hover:translate-x-2 transition-transform duration-300">
        <span class="font-medium text-xs uppercase tracking-widest text-[#0C0C0C]/60">${j.week} — ${j.date}</span>
        <h3 class="font-medium uppercase text-[clamp(1rem,2vw,1.6rem)] text-[#0C0C0C] leading-tight group-hover:tracking-wide transition-all duration-300">${j.title}</h3>
        <p class="font-light leading-relaxed text-[clamp(0.85rem,1.4vw,1rem)] opacity-60 group-hover:opacity-100 text-[#0C0C0C] transition-opacity duration-300">${j.summary}</p>
        <span class="font-medium text-sm text-[#0C0C0C] underline underline-offset-4 mt-1 group-hover:tracking-widest transition-all duration-300">Lihat Detail →</span>
      </div>
    </button>
  `).join('');
}
function renderFullProjects(){
  const el=document.getElementById('projectsFull');
  if(!el || typeof projectsData==='undefined') return;
  el.innerHTML=projectsData.map(p=>`
    <div class="group w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col overflow-hidden hover:border-white transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div class="flex items-center gap-4">
          <span class="hero-heading font-black text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300 origin-left">${p.num}</span>
          <div><p class="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60 group-hover:opacity-100 transition-opacity">${p.category}</p><h3 class="text-lg sm:text-xl font-bold uppercase text-[#D7E2EA] leading-tight">${p.title}</h3></div>
        </div>
        <div class="flex gap-2">
          ${p.googleDrive && p.googleDrive!=='MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI' ? `<a href="${p.googleDrive}" target="_blank" class="rounded-full border-2 border-[#D7E2EA]/40 px-4 py-2 text-xs font-medium text-[#D7E2EA]/60 uppercase tracking-widest hover:bg-[#D7E2EA]/10">Drive ↗</a>` : ''}
          <button onclick="openProject('${p.id}')" class="rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs font-medium text-[#D7E2EA] uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors shrink-0">Lihat Detail →</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div class="md:col-span-5 flex flex-col gap-4">
          <img src="${p.images[0]}" alt="${p.title}" class="w-full object-cover rounded-[24px] sm:rounded-[32px] h-[180px] border border-[#D7E2EA]/20 group-hover:brightness-110 transition-all duration-300" loading="lazy">
          <div class="flex gap-2">${p.images.slice(1,3).map(u=>`<img src="${u}" alt="" class="w-1/2 object-cover rounded-2xl h-[120px] border border-[#D7E2EA]/20 group-hover:brightness-110 transition-all duration-300" loading="lazy">`).join('')}</div>
        </div>
        <div class="md:col-span-7 flex flex-col gap-3 justify-center">
          <p class="text-sm text-[#D7E2EA]/70 leading-relaxed">${p.desc}</p>
          <div class="flex flex-wrap gap-1.5">${(p.technologies||p.tech||[]).map(t=>`<span class="text-[11px] px-2.5 py-1 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]/70 group-hover:border-[#D7E2EA] group-hover:text-[#D7E2EA] transition-colors">${t}</span>`).join('')}</div>
        </div>
      </div>
    </div>
  `).join('');
}
function openJournal(idx){
  const jd=(typeof journalData!=='undefined'?journalData:(typeof logbookData!=='undefined'?logbookData:[]));
  const j=jd[idx]; if(!j) return;
  const imgs=(j.images||[]).map(u=>`<img src="${u}" alt="${j.title}" class="w-full h-[220px] object-cover rounded-2xl border border-[#D7E2EA]/20" loading="lazy">`).join('');
  const drive=j.googleDrive && j.googleDrive!=='MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI'
    ? `<a href="${j.googleDrive}" target="_blank" class="rounded-full px-6 py-3 text-xs font-medium text-white uppercase tracking-widest inline-block text-center mt-4 bg-blue-600">Dokumentasi Google Drive ↗</a>`
    : `<p class="font-medium text-xs text-[#D7E2EA]/40 mt-4">Google Drive: MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI</p>`;
  document.getElementById('modalContent').innerHTML=`
    <span class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">${j.week} — ${j.date}</span>
    <h2 class="hero-heading font-black uppercase text-2xl sm:text-3xl leading-none mt-2">${j.title}</h2>
    <p class="text-sm text-[#D7E2EA]/60 mt-2">${j.summary}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">${imgs}</div>
    <div class="space-y-4 mt-6 text-sm text-[#D7E2EA]/80">
      <div><h4 class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] mb-1">Progres</h4><p>${j.progress}</p></div>
      <div><h4 class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] mb-1">Tantangan</h4><p>${j.challenges||j.challenge||'-'}</p></div>
      <div><h4 class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] mb-1">Hasil</h4><p>${j.result}</p></div>
      <div><h4 class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] mb-1">Pembelajaran</h4><p>${j.learning}</p></div>
    </div>
    ${drive}
  `;
  const m=document.getElementById('detailModal'); if(m){m.classList.remove('hidden'); m.classList.add('flex'); document.body.style.overflow='hidden';}
}
function openProject(id){
  const p=projectsData.find(x=>x.id===id); if(!p) return;
  const techs=(p.technologies||p.tech||[]).map(t=>`<span class="text-xs px-3 py-1 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]">${t}</span>`).join('');
  const hw=Array.isArray(p.hardware)?`<ul class="list-disc pl-5 space-y-1">${p.hardware.map(h=>`<li>${h}</li>`).join('')}</ul>`:`<p>${p.hardware||'-'}</p>`;
  const imgs=(p.images||[]).map(u=>`<img src="${u}" alt="${p.title}" class="w-full h-[200px] object-cover rounded-2xl border border-[#D7E2EA]/20" loading="lazy">`).join('');
  const drive=p.googleDrive && p.googleDrive!=='MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI'
    ? `<a href="${p.googleDrive}" target="_blank" class="rounded-full px-6 py-3 text-xs font-medium text-white uppercase tracking-widest inline-block text-center bg-blue-600">Dokumentasi Google Drive ↗</a>`
    : `<p class="font-medium text-xs text-[#D7E2EA]/40">Google Drive: MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI</p>`;
  const linkExtra=p.projectLink?`<a href="${p.projectLink}" target="_blank" class="rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-medium text-[#D7E2EA] uppercase tracking-widest hover:bg-[#D7E2EA]/10 ml-2">Live Project ↗</a>`:'';
  document.getElementById('modalContent').innerHTML=`
    <span class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">${p.num} — ${p.category} ${p.status?'· '+p.status:''}</span>
    <h2 class="hero-heading font-black uppercase text-2xl sm:text-3xl leading-none mt-2">${p.title}</h2>
    <div class="flex flex-wrap gap-2 mt-4">${techs}</div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">${imgs}</div>
    <p class="text-sm text-[#D7E2EA]/70 mt-6 leading-relaxed">${p.desc}</p>
    <div class="space-y-4 mt-6 text-sm text-[#D7E2EA]/80">
      <div><h4 class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] mb-1">Masalah</h4><p>${p.problem||'-'}</p></div>
      <div><h4 class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] mb-1">Tujuan</h4><p>${p.objective||'-'}</p></div>
      <div><h4 class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] mb-1">Desain Sistem</h4><p>${p.systemDesign||'-'}</p></div>
      <div><h4 class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] mb-1">Hardware / Komponen</h4>${hw}</div>
      <div><h4 class="font-medium text-xs uppercase tracking-widest text-[#D7E2EA] mb-1">Hasil</h4><p class="text-[#D7E2EA] font-medium">${p.result||'-'}</p></div>
    </div>
    <div class="mt-6 flex flex-wrap gap-2">${drive}${linkExtra}</div>
  `;
  const m=document.getElementById('detailModal'); if(m){m.classList.remove('hidden'); m.classList.add('flex'); document.body.style.overflow='hidden';}
}
function closeModal(){
  const m=document.getElementById('detailModal');
  if(m){m.classList.add('hidden'); m.classList.remove('flex');}
  document.body.style.overflow='';
}
function updateCounts(){
  try{
    const pLen = (typeof projectsData!=='undefined' && Array.isArray(projectsData)) ? projectsData.length : (JSON.parse(localStorage.getItem('ferdy_projects_v2')||'null')||[]).length || 6;
    const jLen = (typeof journalData!=='undefined' && Array.isArray(journalData)) ? journalData.length : (JSON.parse(localStorage.getItem('ferdy_journal_v2')||'null')||[]).length || 6;
    const sLen = (typeof skillsList!=='undefined' && Array.isArray(skillsList)) ? skillsList.length : (JSON.parse(localStorage.getItem('ferdy_skills_v2')||'null')||[]).length || 9;
    const elP=document.getElementById('countProyek'); if(elP) elP.textContent = (pLen>=6? pLen+'+': pLen);
    const elJ=document.getElementById('countJurnal'); if(elJ) elJ.textContent = String(jLen);
    const elS=document.getElementById('countSkills'); if(elS) elS.textContent = String(sLen);
  }catch(e){}
}
function initHeroEffect(){
  const ids=['heroCanvas','marqueeCanvas','aboutCanvas','skillsCanvas','jurnalCanvas','projectsCanvas','contactCanvas'];
  const isLightIds = new Set(['jurnalCanvas','projectsCanvas']);
  ids.forEach(id=>{
    const c=document.getElementById(id);
    if(!c) return;
    const ctx=c.getContext('2d');
    const isLight = isLightIds.has(id);
    let w,h,dots=[];
    function resize(){ w=c.width=c.parentElement.clientWidth; h=c.height=c.parentElement.clientHeight; dots=Array.from({length: isLight?70:90},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+0.3,o:Math.random()*0.5+0.15,vx:(Math.random()-0.5)*0.3,vy:Math.random()*0.5+0.1})); }
    resize(); window.addEventListener('resize',resize);
    (function loop(){
      ctx.clearRect(0,0,w,h);
      ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)';
      ctx.lineWidth=1;
      dots.forEach((d,i)=>{
        d.x+=d.vx; d.y+=d.vy;
        if(d.x<0||d.x>w) d.vx*=-1;
        if(d.y>h){ d.y=0; d.x=Math.random()*w; }
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fillStyle = isLight ? 'rgba(0,0,0,'+d.o+')' : 'rgba(255,255,255,'+d.o+')';
        ctx.fill();
        dots.slice(i+1).forEach(o=>{
          const dx=d.x-o.x, dy=d.y-o.y, dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<90){ ctx.globalAlpha=(1-dist/90)*0.11; ctx.beginPath(); ctx.moveTo(d.x,d.y); ctx.lineTo(o.x,o.y); ctx.stroke(); ctx.globalAlpha=1; }
        });
      });
      requestAnimationFrame(loop);
    })();
  });
}
window.addEventListener('storage',()=>{ loadStoredOverrides(); renderSkills(); renderJournalPreview(); renderProjectsPreview(); renderFullJournal(); renderFullProjects(); updateCounts(); });
document.addEventListener('DOMContentLoaded',()=>{
  loadStoredOverrides();
  initLoader(); initLightning(); initHeroEffect();
  initMarquee(); initAboutPhoto(); initDailyRoutine();
  updateCounts();
  renderSkills(); renderJournalPreview(); renderProjectsPreview();
  renderFullJournal(); renderFullProjects(); updateCounts();
  const aboutInp=document.getElementById('aboutPhotoInput');
  if(aboutInp){
    aboutInp.addEventListener('change', async (e)=>{
      const f=e.target.files&&e.target.files[0]; if(!f) return;
      const fr=new FileReader();
      fr.onload=(ev)=>{
        const data=ev.target.result;
        try{
          localStorage.setItem('ferdy_about_photo', data);
          localStorage.setItem('ferdy_profile_photo', data);
          let arr=[]; try{ arr=JSON.parse(localStorage.getItem('ferdy_daily_photos')||'[]'); }catch(_){}
          if(!arr.length) arr=getDailyPhotos();
          arr[0]={src:data,title:'Foto Utama — About Me',tag:'Photo #1'};
          localStorage.setItem('ferdy_daily_photos', JSON.stringify(arr));
        }catch(_){}
        const aimg=document.getElementById('aboutPhoto'); if(aimg) aimg.src=data;
        const himg=document.getElementById('portraitImg'); if(himg){ himg.src=data; himg.classList.remove('hidden'); const fb=document.getElementById('fallbackPortrait'); if(fb) fb.classList.add('hidden'); }
        dailyPhotos=getDailyPhotos(); renderDailyRoutine();
      };
      fr.readAsDataURL(f);
    });
  }
  const modal=document.getElementById('detailModal');
  if(modal) modal.addEventListener('click',(e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closeModal(); });
});
