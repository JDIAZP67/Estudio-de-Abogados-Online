/* Compresión WebP + validación PDF */
(function(){
  var MAX_LADO=1600, MAX_PESO=700*1024;
  window.LexMedia=(function(){
    function soportaWebP(cb){
      try{ var c=document.createElement('canvas'); c.width=c.height=1; cb(c.toDataURL('image/webp').indexOf('data:image/webp')===0); }catch(e){ cb(false); }
    }
    function aB64(blob){ return new Promise(function(res,rej){ var fr=new FileReader(); fr.onload=function(){ res(fr.result.split(',')[1]); }; fr.onerror=rej; fr.readAsDataURL(blob); }); }
    async function aWebP(file){
      if(!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) throw new Error('Formato no soportado');
      var bmp=await createImageBitmap(file);
      var max=Math.max(bmp.width,bmp.height); var esc=Math.min(1,MAX_LADO/max);
      var c=document.createElement('canvas'); c.width=Math.round(bmp.width*esc); c.height=Math.round(bmp.height*esc);
      var ctx=c.getContext('2d'); ctx.drawImage(bmp,0,0,c.width,c.height);
      for(var q of [0.82,0.70,0.60]){
        var blob=await new Promise(r=>c.toBlob(r,'image/webp',q));
        if(blob&&blob.size<=MAX_PESO){ var b64=await aB64(blob); return {blob,b64,ext:'webp'}; }
      }
      throw new Error('Imagen demasiado pesada');
    }
    async function validaPdf(file){
      if(file.type!=='application/pdf' && !/\.pdf$/i.test(file.name)) throw new Error('No es PDF');
      var buf=await file.slice(0,5).arrayBuffer(); var head=new TextDecoder().decode(buf);
      if(head!=='%PDF-') throw new Error('Archivo PDF inválido');
      if(file.size>MAX_PESO) throw new Error('PDF > 700 KB');
      return { b64:await aB64(file) };
    }
    return { soportaWebP, aWebP, validaPdf };
  })();
})();
