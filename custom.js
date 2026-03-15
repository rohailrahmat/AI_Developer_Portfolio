// ─── NEURAL NETWORK BACKGROUND ───
(function(){
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  const AC = '#14a800';
  const NODE_COUNT = 70;
  const CONNECTION_DIST = 160;
  const PULSE_SPEED = 0.012;

  let W, H, nodes = [], pulses = [], mouse = {x: -999, y: -999};

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  // Node class
  function Node(x, y){
    this.x = x; this.y = y;
    this.ox = x; this.oy = y;
    this.vx = (Math.random()-0.5)*0.4;
    this.vy = (Math.random()-0.5)*0.4;
    this.r = Math.random()*1.8 + 0.8;
    this.baseAlpha = Math.random()*0.35 + 0.15;
    this.alpha = this.baseAlpha;
    this.pulsePhase = Math.random()*Math.PI*2;
    this.active = false;
    this.layer = Math.floor(Math.random()*4); // 0-3 "layers" like a neural net
  }

  Node.prototype.update = function(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x < 0 || this.x > W) this.vx *= -1;
    if(this.y < 0 || this.y > H) this.vy *= -1;
    // Subtle mouse repulsion
    const dx = this.x - mouse.x, dy = this.y - mouse.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if(dist < 120){
      this.x += dx/dist * 0.8;
      this.y += dy/dist * 0.8;
    }
    // Breathing alpha
    this.pulsePhase += 0.018;
    this.alpha = this.baseAlpha + Math.sin(this.pulsePhase)*0.08;
    this.active = false;
  };

  // Pulse class — travels along an edge
  function Pulse(n1, n2){
    this.n1 = n1; this.n2 = n2;
    this.t = 0;
    this.speed = PULSE_SPEED + Math.random()*0.008;
    this.dead = false;
    this.size = Math.random()*2.5 + 1.5;
  }

  Pulse.prototype.update = function(){
    this.t += this.speed;
    if(this.t >= 1){ this.dead = true; return; }
    const x = this.n1.x + (this.n2.x - this.n1.x)*this.t;
    const y = this.n1.y + (this.n2.y - this.n1.y)*this.t;
    // Draw glowing dot
    const alpha = Math.sin(this.t * Math.PI) * 0.9;
    ctx.save();
    ctx.shadowColor = AC;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(20,168,0,'+alpha+')';
    ctx.fill();
    ctx.restore();
    // Activate nodes near pulse
    this.n1.active = true;
    this.n2.active = true;
  };

  // Init nodes
  for(let i=0; i<NODE_COUNT; i++){
    nodes.push(new Node(Math.random()*window.innerWidth, Math.random()*window.innerHeight));
  }

  // Spawn pulses periodically
  let lastPulse = 0;
  function spawnPulse(){
    // pick random connected pair
    for(let attempt=0; attempt<20; attempt++){
      const a = nodes[Math.floor(Math.random()*nodes.length)];
      const b = nodes[Math.floor(Math.random()*nodes.length)];
      if(a===b) continue;
      const dx=a.x-b.x, dy=a.y-b.y;
      if(Math.sqrt(dx*dx+dy*dy) < CONNECTION_DIST){
        pulses.push(new Pulse(a,b));
        break;
      }
    }
  }

  function draw(ts){
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,W,H);

    // Update nodes
    nodes.forEach(n => n.update());

    // Draw edges
    for(let i=0; i<nodes.length; i++){
      for(let j=i+1; j<nodes.length; j++){
        const a=nodes[i], b=nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist < CONNECTION_DIST){
          const t = 1 - dist/CONNECTION_DIST;
          const isActive = a.active || b.active;
          const edgeAlpha = isActive ? t*0.22 : t*0.09;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = 'rgba(20,168,0,'+edgeAlpha+')';
          ctx.lineWidth = isActive ? 0.7 : 0.4;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const glow = n.active ? 14 : 0;
      if(glow > 0){
        ctx.save();
        ctx.shadowColor = AC;
        ctx.shadowBlur = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r*1.8, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(20,168,0,'+(n.alpha*0.6)+')';
        ctx.fill();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(20,168,0,'+n.alpha+')';
      ctx.fill();
    });

    // Update + draw pulses
    if(ts - lastPulse > 320){
      spawnPulse();
      if(Math.random()>0.5) spawnPulse();
      lastPulse = ts;
    }
    pulses = pulses.filter(p => { p.update(); return !p.dead; });

    // Mouse proximity highlight
    nodes.forEach(n => {
      const dx=n.x-mouse.x, dy=n.y-mouse.y;
      if(Math.sqrt(dx*dx+dy*dy) < 100){
        ctx.save();
        ctx.shadowColor = AC;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(n.x,n.y,n.r*2.5,0,Math.PI*2);
        ctx.fillStyle='rgba(20,168,0,0.5)';
        ctx.fill();
        ctx.restore();
      }
    });
  }
  requestAnimationFrame(draw);
})();

// ─── SCROLL PROGRESS ───
const sb=document.getElementById('sbar');
window.addEventListener('scroll',()=>{sb.style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%'},{passive:true});

// ─── CURSOR ───
const cdot=document.getElementById('cdot'),cring=document.getElementById('cring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cdot.style.left=mx+'px';cdot.style.top=my+'px';});
(function ar(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;cring.style.left=rx+'px';cring.style.top=ry+'px';requestAnimationFrame(ar);})();
document.querySelectorAll('a,button,.tag').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('chov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('chov'));
});

// ─── NAVBAR ───
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('sc',window.scrollY>26),{passive:true});

// ─── HAMBURGER ───
let mopen=false;
document.getElementById('hbg').addEventListener('click',()=>{
  mopen=!mopen;
  document.getElementById('mmenu').classList.toggle('open',mopen);
  document.body.style.overflow=mopen?'hidden':'';
});
function closeMenu(){mopen=false;document.getElementById('mmenu').classList.remove('open');document.body.style.overflow='';}

// ─── TYPEWRITER ───
const words=['AI Developer','Chatbot Developer','AI Automation Expert','Micro SaaS Builder','Prompt Engineer','Full-Stack Developer'];
let wi=0,ci=0,del=false;
const twEl=document.getElementById('tw');
function typeIt(){
  const w=words[wi];
  if(!del){ci++;twEl.textContent=w.slice(0,ci);if(ci===w.length){setTimeout(()=>{del=true;typeIt();},2400);return;}}
  else{ci--;twEl.textContent=w.slice(0,ci);if(ci===0){del=false;wi=(wi+1)%words.length;}}
  setTimeout(typeIt,del?50:88);
}
setTimeout(typeIt,1000);

// ─── TERMINAL ───
const tlines=[
  {h:'<span class="tp">import</span> <span class="tb">google.generativeai</span> <span class="tp">as</span> <span class="tw">genai</span>',d:0},
  {h:'<span class="tp">from</span> <span class="tb">flask</span> <span class="tp">import</span> <span class="tw">Flask, request, jsonify</span>',d:260},
  {h:'',d:440},
  {h:'<span class="tw">app</span> <span class="to">=</span> <span class="tb">Flask</span><span class="tw">(__name__)</span>',d:610},
  {h:'<span class="tw">genai</span><span class="to">.</span><span class="tb">configure</span><span class="tw">(api_key=GEMINI_KEY)</span>',d:790},
  {h:'',d:960},
  {h:'<span class="tg">@app.route</span><span class="tw">(<span class="to">"/generate"</span>, methods=[<span class="to">"POST"</span>])</span>',d:1130},
  {h:'<span class="tp">def</span> <span class="tb">generate_cover_letter</span><span class="tw">():</span>',d:1300},
  {h:'  <span class="tw">data</span> <span class="to">=</span> <span class="tw">request.json</span>',d:1440},
  {h:'  <span class="tw">model</span> <span class="to">=</span> <span class="tw">genai</span><span class="to">.</span><span class="tb">GenerativeModel</span><span class="tw">(<span class="to">"gemini-pro"</span>)</span>',d:1610},
  {h:'  <span class="tw">result</span> <span class="to">=</span> <span class="tw">model</span><span class="to">.</span><span class="tb">generate_content</span><span class="tw">(</span>',d:1780},
  {h:'    <span class="tb">build_prompt</span><span class="tw">(data[<span class="to">"job_desc"</span>], data[<span class="to">"experience"</span>]))</span>',d:1900},
  {h:'  <span class="ts"># Ready in ~10 seconds. No sign-up.</span>',d:2110},
  {h:'  <span class="tp">return</span> <span class="tb">jsonify</span><span class="tw">({"letter": result.text, "ok": <span class="tp">True</span>})</span>',d:2280},
];
const tout=document.getElementById('tout');
tlines.forEach(({h,d})=>{
  setTimeout(()=>{
    const el=document.createElement('div');
    el.innerHTML=h||'&nbsp;';
    el.style.cssText='opacity:0;transform:translateY(3px);transition:opacity .22s,transform .22s;';
    tout.appendChild(el);
    requestAnimationFrame(()=>setTimeout(()=>{el.style.opacity='1';el.style.transform='none';},20));
  },d+850);
});

// ─── SCROLL REVEAL ───
const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:0.08,rootMargin:'0px 0px -28px 0px'});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});closeMenu();}
  });
});