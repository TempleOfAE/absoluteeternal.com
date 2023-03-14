var overlays = [false,false,false,false,false,false,false]

function on(d) {
  if (d == 0){
    document.getElementById("o0").style.display = "block";
  }
  if (d == 1){
    document.getElementById("o1").style.display = "block";
  }
  if (d == 2){
    document.getElementById("o2").style.display = "block";
  }
  overlays[d] = true
}

function off(d){
  if (d == 0){
    document.getElementById("o0").style.display = "none";
  }
  if (d == 1){
    document.getElementById("o1").style.display = "none";
  }
  if (d == 2){
    document.getElementById("o2").style.display = "none";
  }
  overlays[d] = false
}