/* Parche V4.3 */
const f=document.getElementById("floatingBtn");
window.addEventListener("scroll",()=>{
 const members=document.getElementById("members");
 const final=document.getElementById("finalcta");
 if(!f||!members)return;
 const start=members.offsetTop-200;
 if(window.scrollY>start){f.classList.add("show")}else{f.classList.remove("show")}
 if(final && final.getBoundingClientRect().top<window.innerHeight+100){f.classList.remove("show")}
});
