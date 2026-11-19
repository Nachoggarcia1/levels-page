const h=document.getElementById("header");const f=document.getElementById("floatingBtn");const final=document.getElementById("finalcta");window.addEventListener("scroll",()=>{h.classList.toggle("scrolled",window.scrollY>50);const max=document.documentElement.scrollHeight-window.innerHeight;f.classList.toggle("show",window.scrollY>max*0.25);if(final.getBoundingClientRect().top<window.innerHeight){f.classList.remove("show")}});const t=document.getElementById("menuToggle"),m=document.getElementById("menu");t&&t.addEventListener('click',()=>m.classList.toggle('open'));m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>m.classList.remove('open')));
const f=document.getElementById("floatingBtn");
window.addEventListener("scroll",()=>{
 const members=document.getElementById("members");
 const final=document.getElementById("finalcta");
 if(!f||!members)return;
 const start=members.offsetTop-200;
 if(window.scrollY>start){f.classList.add("show")}else{f.classList.remove("show")}
 if(final && final.getBoundingClientRect().top<window.innerHeight+100){f.classList.remove("show")}
});
