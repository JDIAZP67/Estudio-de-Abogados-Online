(async function(){
  const files=[
    '/data/config.json',
    '/data/especialidades.json',
    '/data/abogados.json',
    '/data/cursos.json',
    '/data/eventos.json',
    '/data/galeria.json',
    '/data/documentos.json',
    '/data/testimonios.json'
  ];
  const data={};
  for(const f of files){
    try{
      const r=await fetch(f,{cache:'no-store'});
      if(r.ok) data[f.split('/').pop().replace('.json','')]=await r.json();
      else data[f.split('/').pop().replace('.json','')]=[];
    }catch(e){data[f.split('/').pop().replace('.json','')]=[]}
  }
  window.VV_DATA=data;
})();
