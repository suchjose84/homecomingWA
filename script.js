const eventDate = new Date(2026,3,18,13,0,0);

function tick(){
  const diff = eventDate - new Date();
  if(diff<=0) return;
  const s=Math.floor(diff/1000);
  document.getElementById('d').textContent=Math.floor(s/86400);
  document.getElementById('h').textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');
  document.getElementById('m').textContent=String(Math.floor(s%3600/60)).padStart(2,'0');
  document.getElementById('s').textContent=String(s%60).padStart(2,'0');
}
tick(); setInterval(tick,1000);
document.getElementById('year').textContent=new Date().getFullYear();