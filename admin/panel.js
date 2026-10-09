let DATA={config:{},especialidades:[],abogados:[],cursos:[],eventos:[],galeria:[],documentos:[],testimonios:[],auth:{}};
async function loadAll(){
  const keys=['config','especialidades','abogados','cursos','eventos','galeria','documentos','testimonios','auth'];
  for(const k of keys){
    try{
      const j=await apiRead('/data/'+k+'.json');
      if(j) DATA[k]=j;
    }catch(e){}
  }
  fillConfig();
  renderLists();
}
function tabs(){
  document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(s=>s.classList.add('hidden'));
    b.classList.add('active');
    document.getElementById(b.dataset.tab).classList.remove('hidden');
  }));
}
function fillConfig(){
  const c=DATA.config;
  document.getElementById('cfg-nombre').value=c.marca?.nombreVisible||'V&V Consultores';
  document.getElementById('cfg-dominio').value=c.marca?.dominio||'v-v-consultores.com';
  document.getElementById('cfg-wsp').value=c.contacto?.whatsapp||'';
  document.getElementById('cfg-correo').value=c.contacto?.correo||'';
  document.getElementById('cfg-tel').value=c.contacto?.telefono||'';
  document.getElementById('cfg-dir').value=c.contacto?.direccion||'';
  document.getElementById('cfg-fb').value=c.redes?.facebook||'';
  document.getElementById('cfg-li').value=c.redes?.linkedin||'';
  document.getElementById('cfg-ig').value=c.redes?.instagram||'';
  document.getElementById('cfg-desc').value=c.seo?.descripcion||'';
  document.getElementById('cfg-kw').value=c.seo?.keywords||'';
  document.getElementById('cfg-htitulo').value=c.hero?.titulo||'';
  document.getElementById('cfg-hsub').value=c.hero?.subtitulo||'';
  document.getElementById('cfg-cta1').value=c.hero?.cta1Texto||'';
  document.getElementById('cfg-cta2').value=c.hero?.cta2Texto||'';
  document.getElementById('cfg-mostrar').value=c.hero?.mostrarEventoDestacado?'true':'false';
}
document.getElementById('btnCfgGuardar').addEventListener('click',async()=>{
  DATA.config={marca:{nombreVisible:cfg('nombre'),dominio:cfg('dominio'),logo:DATA.config.marca?.logo||'/img/logo.jpg',favicon:DATA.config.marca?.favicon||'/img/logo.jpg',ogImage:DATA.config.marca?.ogImage||'/img/flyer.jpg'},contacto:{whatsapp:cfg('wsp'),correo:cfg('correo'),telefono:cfg('tel'),direccion:cfg('dir')},redes:{facebook:cfg('fb'),linkedin:cfg('li'),instagram:cfg('ig')},seo:{descripcion:cfg('desc'),keywords:cfg('kw')},hero:{titulo:cfg('htitulo'),subtitulo:cfg('hsub'),cta1Texto:cfg('cta1'),cta2Texto:cfg('cta2'),mostrarEventoDestacado:document.getElementById('cfg-mostrar').value==='true'},colores:DATA.config.colores||{primario:'#0B2A5B',secundario:'#C9A227'},secciones:DATA.config.secciones||{inicio:true,servicios:true,abogados:true,cursos:true,eventos:true,galeria:true,documentos:true,contacto:true,pagos:true}};
  await apiSave('/data/config.json',DATA.config); document.getElementById('cfgMsg').textContent='Guardado';
});
function cfg(id){return document.getElementById('cfg-'+id).value}
document.getElementById('btnClave').addEventListener('click',async()=>{
  const n1=document.getElementById('newClave').value.trim(),n2=document.getElementById('newClave2').value.trim();
  if(n1.length<4||n1!==n2){document.getElementById('claveMsg').textContent='Claves no coinciden o corta';return}
  DATA.auth={clave:n1,creado:true,ts:Date.now()}; await apiSave('/data/auth.json',DATA.auth); document.getElementById('claveMsg').textContent='Clave actualizada';
});
function renderLists(){
  render('serList',DATA.especialidades,e=>`<div class="item"><div><strong>${e.nombre||''}</strong><div class="muted">${e.descripcion||''}</div></div><button class="danger" onclick="delItem('especialidades',${DATA.especialidades.indexOf(e)})">Eliminar</button></div>`);
  render('aboList',DATA.abogados,e=>`<div class="item"><div class="col"><strong>${e.nombre||''}</strong><div class="muted">${e.especialidad||''} · Orden ${e.orden||1}</div>${e.foto?'<img class=thumb src='+e.foto+'>':''}</div><button class="danger" onclick="delItem('abogados',${DATA.abogados.indexOf(e)})">Eliminar</button></div>`);
  render('curList',DATA.cursos,e=>`<div class="item"><div><strong>${e.titulo||''}</strong><div class="muted">${e.docente||''} · ${e.precio||''}</div></div><button class="danger" onclick="delItem('cursos',${DATA.cursos.indexOf(e)})">Eliminar</button></div>`);
  render('evList',DATA.eventos,e=>`<div class="item"><div><strong>${e.titulo||''}</strong><div class="muted">${e.fecha||''} · Destacado:${e.destacado?'SI':'NO'}</div>${e.fotoPrincipal?'<img class=thumb src='+e.fotoPrincipal+'>':''}</div><button class="danger" onclick="delItem('eventos',${DATA.eventos.indexOf(e)})">Eliminar</button></div>`);
  render('galList',DATA.galeria,e=>`<div class="item"><div><strong>${e.src||''}</strong></div><button class="danger" onclick="delItem('galeria',${DATA.galeria.indexOf(e)})">Eliminar</button></div>`);
  render('docList',DATA.documentos,e=>`<div class="item"><div><strong>${e.titulo||''}</strong><div class="muted">${e.archivo||''}</div></div><button class="danger" onclick="delItem('documentos',${DATA.documentos.indexOf(e)})">Eliminar</button></div>`);
  render('tesList',DATA.testimonios,e=>`<div class="item"><div><strong>${e.nombre||''}</strong><div class="muted">${e.texto||''}</div></div><button class="danger" onclick="delItem('testimonios',${DATA.testimonios.indexOf(e)})">Eliminar</button></div>`);
}
function render(id,arr,fn){document.getElementById(id).innerHTML=arr.map(fn).join('')||'<div class=muted>Vacío</div>'}
document.getElementById('btnSerAdd').addEventListener('click',async()=>{DATA.especialidades.push({nombre:val('ser-nombre'),descripcion:val('ser-desc')});clear('ser');renderLists();});
document.getElementById('btnAboAdd').addEventListener('click',async()=>{DATA.abogados.push({nombre:val('abo-nombre'),especialidad:val('abo-esp'),foto:val('abo-foto'),link:val('abo-link'),orden:+val('abo-orden'),bio:val('abo-bio')});clear('abo');renderLists();});
document.getElementById('btnCurAdd').addEventListener('click',async()=>{DATA.cursos.push({titulo:val('cur-titulo'),portada:val('cur-portada'),docente:val('cur-docente'),precio:val('cur-precio'),orden:+val('cur-orden'),descripcion:val('cur-desc')});clear('cur');renderLists();});
document.getElementById('btnEvAdd').addEventListener('click',async()=>{if(document.getElementById('ev-dest').value==='true'){DATA.eventos.forEach(x=>x.destacado=false)}DATA.eventos.push({id:'ev-'+Date.now(),titulo:val('ev-titulo'),fecha:val('ev-fecha'),lugar:val('ev-lugar'),link:val('ev-link'),fotoPrincipal:val('ev-foto'),destacado:document.getElementById('ev-dest').value==='true',orden:+val('ev-orden'),descripcion:val('ev-desc')});clear('ev');renderLists();});
document.getElementById('btnDocAdd').addEventListener('click',async()=>{DATA.documentos.push({titulo:val('doc-titulo'),categoria:val('doc-cat'),archivo:val('doc-ruta')});clear('doc');renderLists();});
document.getElementById('btnTesAdd').addEventListener('click',async()=>{DATA.testimonios.push({nombre:val('tes-nombre'),cargo:val('tes-cargo'),texto:val('tes-texto')});clear('tes');renderLists();});
document.getElementById('gal-file').addEventListener('change',async(e)=>{
  const f=e.target.files[0]; if(!f) return;
  const reader=new FileReader();
  reader.onloadend=async()=>{
    const base64=reader.result.split(',')[1];
    const nombre=document.getElementById('gal-nombre').value.trim()||f.name.replace(/[^a-z0-9\.\-_]/gi,'_');
    const ruta=(document.getElementById('gal-ruta').value.trim()||'/uploads/galeria/')+nombre;
    await apiUpload(ruta,base64);
    DATA.galeria.push({src:ruta,alt:nombre});
    renderLists();
  };
  reader.readAsDataURL(f);
});
document.getElementById('doc-file').addEventListener('change',async(e)=>{
  const f=e.target.files[0]; if(!f) return;
  const reader=new FileReader();
  reader.onloadend=async()=>{
    const base64=reader.result.split(',')[1];
    const titulo=document.getElementById('doc-titulo').value.trim()||f.name;
    const ruta=(document.getElementById('doc-ruta').value.trim().replace(/[^\/]+$/,'')||'/uploads/documentos/')+f.name.replace(/[^a-z0-9\.\-_]/gi,'_');
    document.getElementById('doc-ruta').value=ruta;
    await apiUpload(ruta,base64);
  };
  reader.readAsDataURL(f);
});
function val(id){return document.getElementById(id).value.trim()}
function clear(prefix){['-titulo','-nombre','-desc','-foto','-link','-bio','-portada','-docente','-precio','-fecha','-lugar','-dest','-orden','-cat','-ruta','-texto'].forEach(s=>{const el=document.getElementById(prefix+s); if(el) el.value=s==='-orden'?1:s==='-dest'?'false':''})}
window.delItem=(key,idx)=>{DATA[key].splice(idx,1);renderLists();}
document.getElementById('btnGuardarTodo').addEventListener('click',async()=>{
  await apiSave('/data/config.json',DATA.config);
  await apiSave('/data/especialidades.json',DATA.especialidades);
  await apiSave('/data/abogados.json',DATA.abogados);
  await apiSave('/data/cursos.json',DATA.cursos);
  await apiSave('/data/eventos.json',DATA.eventos);
  await apiSave('/data/galeria.json',DATA.galeria);
  await apiSave('/data/documentos.json',DATA.documentos);
  await apiSave('/data/testimonios.json',DATA.testimonios);
  alert('Todo guardado');
});
document.getElementById('btnSalir').addEventListener('click',()=>{sessionStorage.clear();window.location.href='/admin/login.html'});
tabs(); loadAll();
