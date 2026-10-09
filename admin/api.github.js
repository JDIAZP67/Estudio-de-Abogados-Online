const REPO_OWNER='JDIAZP67';
const REPO_NAME='Estudio-de-Abogados-Online';
const BRANCH='main';
async function getToken(){
  let t=sessionStorage.getItem('vv_gh_token');
  if(!t){t=prompt('Ingresa tu GitHub PAT fine-grained (solo contents:write)'); if(t) sessionStorage.setItem('vv_gh_token',t);}
  return t;
}
async function getSha(path){
  const t=await getToken(); if(!t) return null;
  const url=`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`;
  const r=await fetch(url,{headers:{'Authorization':'token '+t,'Accept':'application/vnd.github.v3+json'}});
  if(r.status===404) return {exists:false,sha:null};
  const j=await r.json(); return {exists:true,sha:j.sha};
}
async function apiRead(path){
  try{
    const t=await getToken(); if(!t) return null;
    const url=`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`;
    const r=await fetch(url,{headers:{'Authorization':'token '+t,'Accept':'application/vnd.github.v3+json'}});
    if(!r.ok) return null;
    const j=await r.json();
    const txt=atob(j.content.replace(/\n/g,''));
    try{return JSON.parse(txt)}catch(e){return txt}
  }catch(e){return null}
}
async function apiSave(path,content){
  try{
    const t=await getToken(); if(!t) return {ok:false};
    const txt=typeof content==='string'?content:JSON.stringify(content,null,2);
    const shaInfo=await getSha(path);
    const url=`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
    const body={message:'admin: actualizar '+path,content:btoa(unescape(encodeURIComponent(txt))),branch:BRANCH};
    if(shaInfo.exists) body.sha=shaInfo.sha;
    const r=await fetch(url,{method:'PUT',headers:{'Authorization':'token '+t,'Accept':'application/vnd.github.v3+json','Content-Type':'application/json'},body:JSON.stringify(body)});
    return {ok:r.ok};
  }catch(e){return {ok:false}}
}
async function apiUpload(path,data){
  try{
    const t=await getToken(); if(!t) return {ok:false};
    const shaInfo=await getSha(path);
    const url=`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
    const body={message:'admin: subir '+path,content:data,branch:BRANCH};
    if(shaInfo.exists) body.sha=shaInfo.sha;
    const r=await fetch(url,{method:'PUT',headers:{'Authorization':'token '+t,'Accept':'application/vnd.github.v3+json','Content-Type':'application/json'},body:JSON.stringify(body)});
    return {ok:r.ok};
  }catch(e){return {ok:false}}
}
