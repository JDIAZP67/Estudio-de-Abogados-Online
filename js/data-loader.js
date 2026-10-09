(function(){
  var KEY='lex_data', KEYR='lex_reload';
  function aplicar(data){
    try{
      if(!window.LEX) return;
      var m=data||{};
      ['config','servicios','staff','cursos','eventos','galeria','documentos','testimonios','pagos'].forEach(function(k){ if(m[k]!==undefined) window.LEX[k]=m[k]; });
      if(m.servicios!==undefined) window.LEX.especialidades=m.servicios;
      if(m.staff!==undefined) window.LEX.abogados=m.staff;
    }catch(e){}
  }
  try{ var c=JSON.parse(sessionStorage.getItem(KEY)||'null'); if(c&&c.data) aplicar(c.data); }catch(e){}
  fetch('data/contenido.json',{cache:'no-store'}).then(function(r){ if(!r.ok) return Promise.reject(r.status); return r.text(); }).then(function(txt){
    try{ var dig=txt.length+':'+txt.slice(0,64); var data=JSON.parse(txt); var prev=JSON.parse(sessionStorage.getItem(KEY)||'null');
      if(!prev||prev.digest!==dig){ sessionStorage.setItem(KEY,JSON.stringify({digest:dig,ts:Date.now(),data:data})); if(sessionStorage.getItem(KEYR)!==dig){ sessionStorage.setItem(KEYR,dig); location.reload(); return; } }
      sessionStorage.removeItem(KEYR); aplicar(data); window.dispatchEvent(new CustomEvent('lex:ready',{detail:data}));
    }catch(e){}
  }).catch(function(){});
  function inject(){ var s=document.createElement('script'); s.src='js/config-admin.js'; s.async=false; document.body.appendChild(s); }
  if(document.readyState==='loading'){ window.addEventListener('DOMContentLoaded',inject); } else { inject(); }
})();
