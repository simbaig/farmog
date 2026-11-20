(function(){
  var b=document.querySelector('.burger'),m=document.querySelector('.menu');
  b.addEventListener('click',function(){b.classList.toggle('open');m.classList.toggle('open')});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('open');m.classList.remove('open')})});

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

  // hero slider
  var slides=document.querySelectorAll('.slide'),dots=document.querySelectorAll('.dots button'),cur=0,timer;
  function go(n){
    slides[cur].classList.remove('on');dots[cur].classList.remove('on');
    cur=(n+slides.length)%slides.length;
    slides[cur].classList.add('on');dots[cur].classList.add('on');
  }
  if(slides.length>1){
    var start=function(){timer=setInterval(function(){go(cur+1)},6000)};
    dots.forEach(function(d,i){d.addEventListener('click',function(){clearInterval(timer);go(i);start()})});
    start();
  }

  // enquiry form -> FormSubmit (https://formsubmit.co) emails it to hello@farmog.in; WhatsApp link if it fails
  var form=document.getElementById('enquiry');
  if(form){
    var ok=form.querySelector('.ok'),err=form.querySelector('.err'),btn=form.querySelector('button[type=submit]');
    if(location.search.indexOf('sent=1')>-1)ok.style.display='block';
    form.addEventListener('submit',function(e){
      e.preventDefault();
      ok.style.display='none';err.style.display='none';
      var d=new FormData(form),data={};
      d.forEach(function(v,k){data[k]=v});
      var label=btn.innerHTML;btn.disabled=true;btn.textContent='Sending…';
      function fail(){
        var wa='https://wa.me/918976715225?text='+encodeURIComponent(['New enquiry from Farm Og website','Name: '+data.name,'Phone: '+data.phone,'Product: '+(data.product||''),'Message: '+(data.message||'')].join(String.fromCharCode(10)));
        err.innerHTML='Sorry, we could not send your enquiry. Please <a href="'+wa+'" target="_blank" rel="noopener">send it on WhatsApp</a> instead.';
        err.style.display='block';
      }
      fetch('https://formsubmit.co/ajax/hello@farmog.in',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json()})
        .then(function(j){if(j&&(j.success===true||j.success==='true')){form.reset();ok.style.display='block'}else fail()})
        .catch(fail)
        .then(function(){btn.disabled=false;btn.innerHTML=label});
    });
  }
  var p=new URLSearchParams(location.search).get('product');
  if(p&&form){form.product.value=p}
})();
