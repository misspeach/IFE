/**
 * Created by shizhan on 17/4/4.
 */

(function () {
    var ops = document.getElementsByTagName("button"),
        main = document.getElementById("main");

    ops[0].addEventListener("click", function () {
        main.className = "";
        main.firstElementChild.setAttribute("id","r1");
    });
    ops[1].addEventListener("click", function () {
        main.className = "wrapper-flex";
        main.firstElementChild.setAttribute("id","r2");

    });
    ops[2].addEventListener("click", function () {
        main.className = "wrapper-inline";
        main.firstElementChild.setAttribute("id","r3");
    });
})();