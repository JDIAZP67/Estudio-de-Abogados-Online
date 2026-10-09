(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var ESTADO={data:null,auth:null,logueado:false,sucio:false,pestana:'login'};
  function cargarCSS(){ if($('#cfg-css')) return; var l=document.createElement('link'); l.id='cfg-css'; l.rel='stylesheet'; l.href='css/config-admin.css'; document.head.appendChild(l); }
  function inyectarBoton(){
    if($('#btn-config')) return;
    var nav=$('#nav-principal'); var btn=document.createElement('button');
    btn.id='btn-config'; btn.className='cfg-btn'; btn.type='button'; btn.title='Configuración'; btn.setAttribute('aria-label','Configuración'); btn.textContent='⚙️';
    if(nav){ nav.appendChild(btn); } else { document.body.appendChild(btn); }
    btn.addEventListener('click',abrir);
  }
  function inyectarModal(){
    if($('#modal-config')) return;
    var d=document.createElement('div'); d.id='modal-config'; d.className='modal cfg-modal'; d.innerHTML='<div class="modal-contenido"><div class="modal-cabecera"><div><h3 id="cfg-h">Configuración</h3><p id="cfg-sub">Panel del encargado</p></div><button class="cerrar" type="button" aria-label="Cerrar">×</button></div><div class="cfg-cuerpo"></div></div></div>';
    document.body.appendChild(d);
    d.querySelector('.cerrar').addEventListener('click',cerrar);
    d.addEventListener('click',function(e){ if(e.target===d) cerrar(); });
    renderCuerpo();
  }
  function abrir(){ $('#modal-config').classList.add('abierto'); document.body.style.overflow='hidden'; }
  function cerrar(){ $('#modal-config').classList.remove('abierto'); document.body.style.overflow=''; }
  function renderCuerpo(){
    var c=$('#modal-config .cfg-cuerpo');
    if(!ESTADO.logueado){
      c.innerHTML='<div class="cfg-card"><h4>Acceso</h4><div class="cfg-grid"><div class="cfg-field"><label>Clave</label><input id="cfg-clave" type="password" placeholder="Ingresa tu clave"></div></div><div style="margin-top:12px;display:flex;gap:10px;align-items:center"><button class="btn btn-oro" id="cfg-btn-login">Entrar</button><button class="btn btn-blanco" id="cfg-btn-crear">Crear clave</button><span class="cfg-msg" id="cfg-msg"></span></div></div>';
      $('#cfg-btn-login').addEventListener('click',login);
      $('#cfg-btn-crear').addEventListener('click',crearClave);
      return;
    }
    var tabs=['General','Servicios','Staff','Cursos','Eventos','Galería','Documentos','Ayuda'];
    var html='<div class="cfg-tabs">';
    tabs.forEach(function(t){ var id=t.toLowerCase(); html+='<button data-p="'+id+'" '+(ESTADO.pestana===id?'class="activo"':'')+'>'+t+'</button>'; });
    html+='</div><div id="cfg-panel"></div>';
    c.innerHTML=html;
    $$('.cfg-tabs button').forEach(function(b){ b.addEventListener('click',function(){ ESTADO.pestana=this.dataset.p; renderCuerpo(); }); });
    renderPanel();
  }
  function renderPanel(){}
  async function cargarAuth(){ try{ var r=await fetch('data/auth.json',{cache:'no-store'}); if(r.ok) ESTADO.auth=await r.json(); else ESTADO.auth={creado:null}; }catch(e){ ESTADO.auth={creado:null}; } }
  async function cargarContenido(){ try{ var r=await fetch('data/contenido.json',{cache:'no-store'}); if(r.ok) ESTADO.data=await r.json(); }catch(e){ ESTADO.data=window.LEX||{}; } }
  async function sha256Hex(s){ var enc=new TextEncoder().encode(s); var buf=await crypto.subtle.digest('SHA-256',enc); var arr=new Uint8Array(buf); return Array.from(arr).map(x=>x.toString(16).padStart(2,'0')).join(''); }
  async function crearClave(){ var k=$('#cfg-clave').value.trim(); var m=$('#cfg-msg'); if(k.length<4){ m.textContent='Mínimo 4 caracteres'; m.className='cfg-msg cfg-err'; return; }
    m.textContent='Guardando...'; var salt='s'+Date.now(); var h=await sha256Hex(salt+k); var a={version:1,algo:'SHA-256',salt:salt,hash:h,creado:new Date().toISOString()};
    try{ if(window.LexGitHub){ await window.LexGitHub.escribir('data/auth.json',a,'admin: auth'); } m.textContent='Creada'; m.className='cfg-msg cfg-ok'; ESTADO.auth=a; setTimeout(function(){ ESTADO.logueado=true; renderCuerpo(); },300); }catch(e){ m.textContent='Requiere PAT'; m.className='cfg-msg cfg-err'; }
  }
  async function login(){ var k=$('#cfg-clave').value.trim(); var m=$('#cfg-msg'); if(!ESTADO.auth||!ESTADO.auth.hash){ m.textContent='Crear clave primero'; return; } var h=await sha256Hex(ESTADO.auth.salt+k); if(h===ESTADO.auth.hash){ sessionStorage.setItem('lex_admin_exp',String(Date.now()+8*3600*1000)); ESTADO.logueado=true; renderCuerpo(); } else { m.textContent='Clave incorrecta'; m.className='cfg-msg cfg-err'; }
  }
  function init(){
    cargarCSS(); inyectarBoton(); inyectarModal();
    var pend=['js/github-api.js','js/media-utils.js'].map(function(src){ return new Promise(function(r){ var s=document.createElement('script'); s.src=src; s.async=false; s.onload=s.onerror=r; document.body.appendChild(s); }); });
    Promise.all(pend).then(async function(){ await cargarAuth(); await cargarContenido(); if(parseInt(sessionStorage.getItem('lex_admin_exp')||'0')>Date.now()){ ESTADO.logueado=true; } renderCuerpo(); parchearStaff(); window.addEventListener('lex:ready',function(){ parchearStaff(); }); });
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',init); } else { init(); }
  function parchearStaff(){
    try{ var grid=$('#staff-grid'); if(!grid||!ESTADO.data||!ESTADO.data.staff) return;
      $$('#staff-grid .miembro').forEach(function(el,i){
        var s=ESTADO.data.staff[i]; if(!s) return;
        if(s.foto){ var av=el.querySelector('.avatar'); if(av&&av.tagName!=='IMG'){ var im=document.createElement('img'); im.className='avatar cfg-foto'; im.src=s.foto; av.replaceWith(im); }}
        if(s.cv){ var btn=document.createElement('a'); btn.className='btn btn-azul'; btn.href=s.cv; btn.target='_blank'; btn.rel='noopener'; btn.textContent='Ver CV'; var act=el.querySelector('.acciones')||el; act.appendChild(btn); }
      });
    }catch(e){}
  }
})();
