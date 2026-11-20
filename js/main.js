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

  // enquiry form -> WhatsApp
  var form=document.getElementById('enquiry');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(form);
      var msg='New enquiry from Farm Og website%0A'+
        'Name: '+encodeURIComponent(d.get('name'))+'%0A'+
        'Email: '+encodeURIComponent(d.get('email'))+'%0A'+
        'Phone: '+encodeURIComponent(d.get('phone'))+'%0A'+
        'Product: '+encodeURIComponent(d.get('product'))+'%0A'+
        'Message: '+encodeURIComponent(d.get('message'));
      window.open('https://wa.me/918976715225?text='+msg,'_blank','noopener');
      document.querySelector('.ok').style.display='block';
    });
  }
  var p=new URLSearchParams(location.search).get('product');
  if(p&&form){form.product.value=p}
})();
