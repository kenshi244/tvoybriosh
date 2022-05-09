'use strict'

var menuButton1 = document.getElementById('menuButton1');
var menuButton2 = document.getElementById('menuButton2');

menuButton1.addEventListener("click", () => {
    document.getElementById("menuList1").style.opacity = "1";
    document.getElementById("menuList1").style.display = "inline-block";
    document.getElementById("menuList1").style.position = "relative";
    document.getElementById("menuList2").style.opacity = "0";
    document.getElementById("menuList2").style.display = "none";
    document.getElementById("menuList2").style.position = "absolute";
}, false);

menuButton2.addEventListener("click", () => {
    document.getElementById("menuList2").style.opacity = "1";
    document.getElementById("menuList2").style.display = "inline-block";
    document.getElementById("menuList2").style.position = "relative";
    document.getElementById("menuList1").style.position = "absolute";
    document.getElementById("menuList1").style.opacity = "0";
    document.getElementById("menuList1").style.display = "none";

}, false);