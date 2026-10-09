(async function(){
  const claveInput=document.getElementById('clave');
  const btn=document.getElementById('btnEntrar');
  const msg=document.getElementById('msg');
  try{
    const r=await fetch('/data/auth.json',{cache:'no-store'});
    const auth=await r.json();
    if(auth&&auth.creado){
      btn.addEventListener('click',()=>{
        const k=claveInput.value.trim();
        if(!k){msg.textContent='Ingresa la clave';return}
        try{sessionStorage.setItem('vv_auth_ok','1');sessionStorage.setItem('vv_k',k)}catch(e){}
        window.location.href='/admin/panel.html';
      });
    }else{
      document.querySelector('h1').textContent='Crear clave de acceso (única vez)';
      document.querySelector('p').textContent='Esta clave será para el encargado. Recupérala si la olvidas.';
      btn.textContent='Crear clave';
      btn.addEventListener('click',async()=>{
        const k=claveInput.value.trim();
        if(k.length<4){msg.textContent='Mínimo 4 caracteres';return}
        msg.textContent='Guardando...';
        const authNew={hash:null,clave:k,creado:true,ts:Date.now()};
        try{await apiSave('/data/auth.json',authNew)}catch(e){}
        try{sessionStorage.setItem('vv_auth_ok','1');sessionStorage.setItem('vv_k',k)}catch(e){}
        window.location.href='/admin/panel.html';
      });
    }
  }catch(e){msg.textContent='Error cargando configuración';}
})();
