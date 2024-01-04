keyboard$.subscribe(function(key) {
  if (key.mode === "global" && key.type === "[") {
    window.scrollTo({top:0, left:0, behavior:'smooth'})
  }
})

keyboard$.subscribe(function(key) {
  if (key.mode === "global" && key.type === "]") {
    window.scrollTo({top:document.body.scrollHeight, left:0, behavior:'smooth'})
  }
})