/* GitHub Contents API wrapper (serial, sha-aware, reintentos) */
(function(){
  var OWNER='JDIAZP67', REPO='Estudio-de-Abogados-Online', BRANCH='main';
  var BASE='https://api.github.com/repos/'+OWNER+'/'+REPO+'/contents/';
  var HEAD={ 'Accept':'application/vnd.github+json', 'X-GitHub-Api-Version':'2026-03-10' };
  var cola=Promise.resolve();
  function auth(){
    var t=sessionStorage.getItem('lex_gh_pat');
    if(!t) return HEAD;
    return Object.assign({}, HEAD, {'Authorization':'Bearer '+t});
  }
  function encUtf8(b64){ return btoa(unescape(encodeURIComponent(b64))); }
  function decUtf8(c){ return decodeURIComponent(escape(atob(c.replace(/\n/g,'')))); }
  function encolar(fn){ cola=cola.then(fn,fn); return cola; }
  async function getSha(path){
    var r=await fetch(BASE+path+'?ref='+BRANCH,{headers:auth(),cache:'no-store'});
    if(r.status===404) return {exists:false,sha:null};
    if(r.status===401) return null;
    if(!r.ok) return null;
    var j=await r.json(); return {exists:true,sha:j.sha};
  }
  async function leer(path){
    var r=await fetch(BASE+path+'?ref='+BRANCH,{headers:auth(),cache:'no-store'});
    if(!r.ok) return null;
    var j=await r.json();
    try{ return JSON.parse(decUtf8(j.content)); }catch(e){ return decUtf8(j.content); }
  }
  async function escribir(path, contenido, msg){
    var txt=typeof contenido==='string'?contenido:JSON.stringify(contenido,null,2);
    var shaInfo=await getSha(path);
    if(shaInfo===null) throw new Error('PAT/credenciales inválidas');
    var body={message:msg,content:encUtf8(txt),branch:BRANCH};
    if(shaInfo.exists) body.sha=shaInfo.sha;
    var r=await fetch(BASE+path,{method:'PUT',headers:Object.assign({},auth(),{'Content-Type':'application/json'}),body:JSON.stringify(body)});
    if((r.status===409||r.status===422)&&shaInfo.exists){
      var sha2=await getSha(path); if(sha2&&sha2.exists){ body.sha=sha2.sha; r=await fetch(BASE+path,{method:'PUT',headers:Object.assign({},auth(),{'Content-Type':'application/json'}),body:JSON.stringify(body)}); }
    }
    return {ok:r.ok,status:r.status};
  }
  async function subirBinario(path, b64, msg){
    var shaInfo=await getSha(path);
    if(shaInfo===null) throw new Error('PAT/credenciales inválidas');
    var body={message:msg,content:b64,branch:BRANCH};
    if(shaInfo.exists) body.sha=shaInfo.sha;
    var r=await fetch(BASE+path,{method:'PUT',headers:Object.assign({},auth(),{'Content-Type':'application/json'}),body:JSON.stringify(body)});
    if((r.status===409||r.status===422)&&shaInfo.exists){
      var sha2=await getSha(path); if(sha2&&sha2.exists){ body.sha=sha2.sha; r=await fetch(BASE+path,{method:'PUT',headers:Object.assign({},auth(),{'Content-Type':'application/json'}),body:JSON.stringify(body)}); }
    }
    return {ok:r.ok,status:r.status};
  }
  async function borrar(path, msg){
    var shaInfo=await getSha(path); if(shaInfo===null||!shaInfo.exists) throw new Error('No existe o sin auth');
    var body={message:msg,sha:shaInfo.sha,branch:BRANCH};
    var r=await fetch(BASE+path,{method:'DELETE',headers:Object.assign({},auth(),{'Content-Type':'application/json'}),body:JSON.stringify(body)});
    return {ok:r.ok};
  }
  window.LexGitHub={ leer, escribir:function(p,c,m){return encolar(function(){return escribir(p,c,m);});}, subir:function(p,b,m){return encolar(function(){return subirBinario(p,b,m);});}, borrar:function(p,m){return encolar(function(){return borrar(p,m);});}, rate:async function(){try{var r=await fetch('https://api.github.com/rate_limit',{headers:auth()});return await r.json();}catch(e){return null;}} };
})();
