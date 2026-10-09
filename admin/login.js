(async function(){
  const claveInput=document.getElementById('clave');
  const btn=document.getElementById('btnEntrar');
  const msg=document.getElementById('msg');
  try{
    const r=await fetch('/data/auth.json',{cache:'no-store'});
    const auth=await r.json();
    if(auth.creado){
      btn.addEventListener('click',()=>{
        const k=claveInput.value.trim();
        if(!k){msg.textContent='Ingresa la clave';return}
        sessionStorage.setItem('vv_auth_ok','1');
        window.location.href='/admin/panel.html';
      });
    }else{
      document.querySelector('h1').textContent='Crear clave de acceso';
      document.querySelector('p').textContent='Configuración inicial (solo una vez)';
      btn.textContent='Crear clave';
      btn.addEventListener('click',async()=>{
        const k=claveInput.value.trim();
        if(k.length<4){msg.textContent='Mínimo 4 caracteres';return}
        msg.textContent='Guardando...';
        const payload=JSON.stringify({hash:k,creado:true,ts:Date.now()});
        try{
          await fetch('/admin/save-json.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path:'/data/auth.json',content:payload})});
        }catch(e){}
        sessionStorage.setItem('vv_auth_ok','1');
        window.location.href='/admin/panel.html';
      });
    }
  }catch(e){msg.textContent='Error cargando configuración';}
})();
