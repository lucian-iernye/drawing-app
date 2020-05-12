$(function () {
  /* ----------- example of drawing into canvas------------
let canvas = document.getElementById("paint");
let context = canvas.getContext("2d");

//   draw a line
// declare new path
context.beginPath();
//   set line width
context.lineWidth = 40;
//   set line color
context.strokeStyle = "#42e565";
//   set cap to the line(round, butt, square)
context.lineCap = "round";
//   set line join style(bevel, round, miter)
context.lineJoin = "round";
//   position the context point
context.moveTo(50, 50);
//   draw a straight line from starting point to a new position
context.lineTo(200, 200);
//   draw another line
context.lineTo(400, 100);
//   make line visible
context.stroke();
---------------------------------------------------------*/

  //   declare variables
  //   painting, erasing or not
  let paint = false;
  //   painting or erasing
  let paint_erase = "paint";
  //   get the canvas and context
  let canvas = document.getElementById("paint");
  let ctx = canvas.getContext("2d");
  //   get the canvas container
  let container = $("#canvas-container");
  //   mouse position
  let mouse = {
    x: 0,
    y: 0,
  };

  //   onload load saved work from local strorage
  if (localStorage.getItem("imgCanvas") !== null) {
    let img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = localStorage.getItem("imgCanvas");
  }

  // set drawing parameters (lineWidth, lineJoin, lineCap)
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  //   click inside container
  container.mousedown(function (event) {
    paint = true;
    ctx.beginPath();
    mouse.x = event.pageX - this.offsetLeft;
    mouse.y = event.pageY - this.offsetTop;
    ctx.moveTo(mouse.x, mouse.y);
  });

  //   move the mouse while holding mouse key
  container.mousemove(function (event) {
    mouse.x = event.pageX - this.offsetLeft;
    mouse.y = event.pageY - this.offsetTop;
    if (paint === true) {
      if (paint_erase === "paint") {
        // get color input
        ctx.strokeStyle = $("#paint-color").val();
      } else {
        // color will be white
        ctx.strokeStyle = "white";
      }
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  });

  //   mouse-up(when we don't hold the click anymore) -> we are not painting/erasing anymore
  container.mouseup(function () {
    paint = false;
  });

  // if we leave the container we are not painting/erasing anymore
  container.mouseleave(function () {
    paint = false;
  });

  //   click on the erase button
  $("#erase").click(function () {
    if (paint_erase === "paint") {
      paint_erase = "erase";
    } else {
      paint_erase = "paint";
    }
    $(this).toggleClass("eraseMode");
    $(this).text($(this).text() == "Erase" ? "Paint" : "Erase");
  });

  // click on the save button
  $("#save").click(function () {
    if (typeof localStorage !== null) {
      localStorage.setItem("imgCanvas", canvas.toDataURL());
    } else {
      window.alert("Your browser does not support local storage!");
    }
  });
  // click on the reset button
  $("#reset").click(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paint_erase = "paint";
    $("#erase").removeClass("eraseMode");
  });

  // change color input
  $("#paint-color").change(function () {
    $("#circle").css("background-color", $(this).val());
  });

  // change lineWidth using slider
  $("#slider").slider({
    min: 3,
    max: 30,
    slide: function (event, ui) {
      $("#circle").height(ui.value);
      $("#circle").width(ui.value);
      ctx.lineWidth = ui.value;
    },
  });
});
