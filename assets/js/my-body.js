let scroll_top = document.getElementById("scroll_top");
scroll_top.addEventListener(
  type='click',
  listener=function() {
    window.scrollTo({top:0, left:0, behavior:'smooth'})
  }
);

let scroll_bot = document.getElementById("scroll_bot");
scroll_bot.addEventListener(
  type='click',
  listener=function() {
    window.scrollTo({top:document.body.scrollHeight, left:0, behavior:'smooth'})
  }
);