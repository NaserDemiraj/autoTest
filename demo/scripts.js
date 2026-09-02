(function(){
  function getCart(){
    try{ return JSON.parse(localStorage.getItem('demo_cart')||'[]'); }catch(e){return[]} }
  function saveCart(c){ localStorage.setItem('demo_cart', JSON.stringify(c)); }
  function addToCart(id){ const c=getCart(); c.push({id: id, name:'Test Product', price:9.99}); saveCart(c); }
  function renderCart(){ const el=document.getElementById('cart-contents'); if(!el) return; const c=getCart(); if(c.length===0){ el.innerHTML='<p>Your Shopping Cart is empty!</p>'; }else{ const rows=c.map((i,idx)=> `<div class="row" data-idx="${idx}"><span>${i.name}</span> - <span>${i.price}</span></div>`).join(''); el.innerHTML=rows; }}
  if(typeof window !== 'undefined'){
    window.addToCart = addToCart;
    document.addEventListener('DOMContentLoaded', function(){
      document.querySelectorAll('[data-test-id^="add-to-cart"]').forEach(btn=>{
        btn.addEventListener('click', function(){ const id=this.getAttribute('data-test-id').split('-').pop(); addToCart(id); window.location.href='cart.html'; });
      });
      const checkoutBtn = document.querySelector('[data-test-id="checkout-button"]');
      if(checkoutBtn) checkoutBtn.addEventListener('click', function(){ window.location.href='checkout.html'; });
      const confirm = document.querySelector('[data-test-id="confirm-order"]');
      if(confirm) confirm.addEventListener('click', function(){ // simple validation
        const f = document.getElementById('firstName'); if(!f.value){ alert('first name required'); return;} window.location.href='confirm.html';
      });
      renderCart();
    });
  }
})();
