var acc = document.getElementsByClassName("accordion");
var pan = document.getElementsByClassName("panel");

let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

const input = document.querySelector(".input");
input.addEventListener("keyup", function (e) {
  // alert("vbnm");
  var text = e.target.value.toLowerCase();
  for (i = 0; i < acc.length; i++) {
    if (acc[i].innerHTML.toLowerCase().includes(text)) {
      acc[i].style.display = "block";
      pan[i].style.display = "block";
    } else {
      acc[i].style.display = "none";
      pan[i].style.display = "none";
    }
  }
});
