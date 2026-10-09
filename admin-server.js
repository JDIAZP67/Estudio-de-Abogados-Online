const http=require('http');
const fs=require('fs');
const path=require('path');
const url=require('url');
const crypto=require('crypto');
const port=3001;
const base=__dirname+'/..';
function safePath(p){const t=path.resolve(base,p);if(!t.startsWith(base)) return null; return t}
function send(res,status,ctype,body){res.writeHead(status,{'Content-Type':ctype});res.end(body)}
const server=http.createServer((req,res)=>{
  const u=url.parse(req.url,true);
  if(req.method==='GET'&&u.pathname==='/admin/api/read'){
    const p=safePath(u.query.path||'');
    if(!p||!p.endsWith('.json')) return send(res,400,'application/json','{"ok":false}');
    if(!fs.existsSync(p)) return send(res,404,'application/json','{"ok":false}');
    return send(res,200,'application/json',fs.readFileSync(p,'utf8'));
  }
  if(req.method==='POST'&&u.pathname==='/admin/api/save'){
    let body='';
    req.on('data',c=>body+=c);
    req.on('end',()=>{
      try{
        const d=JSON.parse(body);
        const p=safePath(d.path); if(!p) return send(res,403,'application/json','{"ok":false}');
        const dir=path.dirname(p); if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
        fs.writeFileSync(p,typeof d.content==='string'?d.content:JSON.stringify(d.content,null,2));
        return send(res,200,'application/json','{"ok":true}');
      }catch(e){return send(res,500,'application/json','{"ok":false}')}
    });
    return;
  }
  if(req.method==='POST'&&u.pathname==='/admin/api/upload'){
    let body=''; req.on('data',c=>body+=c); req.on('end',()=>{
      try{
        const d=JSON.parse(body);
        const p=safePath(d.path); if(!p) return send(res,403,'application/json','{"ok":false}');
        const dir=path.dirname(p); if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
        const buf=Buffer.from(d.data,'base64');
        fs.writeFileSync(p,buf);
        return send(res,200,'application/json','{"ok":true}');
      }catch(e){return send(res,500,'application/json','{"ok":false}')}
    });
    return;
  }
  if(req.method==='GET'&&u.pathname.startsWith('/admin/')){
    const fp=safePath(req.url.split('?')[0])||safePath('/admin/login.html');
    if(!fp) return send(res,404,'text/plain','404');
    const ctype=fp.endsWith('.js')?'text/javascript':fp.endsWith('.css')?'text/css':fp.endsWith('.html')?'text/html':fp.endsWith('.json')?'application/json':'text/plain';
    if(!fs.existsSync(fp)) return send(res,404,'text/plain','404');
    return send(res,200,ctype,fs.readFileSync(fp));
  }
  return send(res,404,'text/plain','404');
});
server.listen(port,()=>console.log('admin-server',port));
