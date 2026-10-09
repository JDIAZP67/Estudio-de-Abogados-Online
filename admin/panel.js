(function(){
  if(sessionStorage.getItem('vv_auth_ok')!=='1'){window.location.href='/admin/login.html';return}
  const tabs=document.querySelectorAll('nav button');
  const sections=document.querySelectorAll('.tab');
  tabs.forEach(b=>b.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    sections.forEach(s=>s.classList.add('hidden'));
    b.classList.add('active');
    document.getElementById(b.dataset.tab).classList.remove('hidden');
  }));
  document.getElementById('btnSalir').addEventListener('click',()=>{
    sessionStorage.removeItem('vv_auth_ok');
    window.location.href='/admin/login.html';
  });
})();
