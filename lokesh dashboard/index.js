const showNavbar = (toggleId, navId, bodyId, headerId) => {
  const toggle = document.getElementById(toggleId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId);
  if (toggle && nav && bodypd && headerpd) {
    toggle.addEventListener("click", () => {
      headerpd.classList.toggle("body-pd");
    });
  }
};

showNavbar("header-toggle", "nav-bar", "body-pd", "header");

const linkColor = document.querySelectorAll(".nav_link");

function colorLink() {
  if (linkColor) {
    linkColor.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  }
}
linkColor.forEach((l) => l.addEventListener("click", colorLink));

var sideBar = document.getElementById("nav-bar");
var barBtn = document.getElementById("barButton");
function showSidebar() {
  sideBar.classList.toggle("responsivesidebar");
}