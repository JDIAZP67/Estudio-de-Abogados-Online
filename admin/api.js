async function apiRead(path){
  try{const r=await fetch('http://localhost:3001/admin/api/read?path='+encodeURIComponent(path),{cache:'no-store'}); return await r.json()}catch(e){return null}
}
async function apiSave(path,content){
  try{const r=await fetch('http://localhost:3001/admin/api/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path,content:typeof content==='string'?content:JSON.stringify(content,null,2)})}); return await r.json()}catch(e){return {ok:false}}
}
async function apiUpload(path,data){
  try{const r=await fetch('http://localhost:3001/admin/api/upload',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path,data})}); return await r.json()}catch(e){return {ok:false}}
}
