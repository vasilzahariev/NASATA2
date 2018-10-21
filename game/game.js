class Button {
  constructor(x, y, wid, hei, col) {
      this.x = x;
      this.y = y;
      this.wid = wid;
      this.hei = hei;
      this.col = col;
      this.ang = 20;
      this.txtC = "black";
  }
  draw(){
    context.fillStyle = this.col;
    drawRoundButton(context, this.x, this.y, this.wid, this.hei, this.ang);
  }
  frame(){
    context.strokeStyle = "black";
    drawRoundButtonFrame(context, this.x, this.y, this.wid, this.hei, this.ang);
  }
  txt(t){
    context.fillStyle = this.txtC;
    context.font = "15px Arial";
    context.fillText(t,this.x+(this.wid/4)+15,this.y+(this.hei/2)+5);
  }
}

class SelecedAnimal {
  constructor(anm, source, zone) {
    this.x = 0;
    this.y = 0;
    this.s = 0;
    this.mouseM = false;
    this.anm = anm;
    this.sor = new Image();
    this.sor.src = source;
    this.zone = zone;
    this.myOtg = 0;
    this.randC = [1,2,3,4,5,6,7,8];
    this.otgs = [0,0,0,0,0];
    this.xove = [this.x-1.1*this.s, this.x-0.55*this.s, this.x, this.x+0.55*this.s, this.x+1.1*this.s];
    this.colors = ["#E1E1E1","#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1"];
    this.Actcolors = ["#E1E1E1","#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1"]

  }
  kude(){
    this.xove = [this.x-1.1*this.s, this.x-0.55*this.s, this.x, this.x+0.55*this.s, this.x+1.1*this.s];
  }
  draw(){
    this.kude();
    if(this.anm.length < 12){
    context.fillStyle = "black";
    context.font = "16px Arial";
    context.fillText(this.anm, this.x-0.7*this.s, this.y-1.4*this.s);
  }else{
    context.fillStyle = "black";
    context.font = "10px Arial";
    context.fillText(this.anm, this.x-1.2*this.s, this.y-1.4*this.s);
  }

    context.strokeStyle = "black";
    context.strokeRect(this.x-this.s-20,this.y-this.s-40, this.s*2+40, this.s*2+80);
    context.strokeRect(this.x-this.s, this.y-this.s, 2*this.s, 2*this.s);
    for (var i = 0; i < this.xove.length; i++) {
      if(!this.mouseM){
      context.fillStyle = this.colors[this.otgs[i]];
    }else{
      context.fillStyle = this.Actcolors[this.otgs[i]];
    }
      context.drawImage(this.sor, this.x-this.s, this.y-this.s,2*this.s,2*this.s);
      context.beginPath();
      context.arc(this.xove[i], this.y+1.5*this.s, 10, 0, 2 * Math.PI);
      context.closePath();
      context.fill();

      context.drawImage(this.sor, this.x-this.s, this.y-this.s,2*this.s,2*this.s);
      context.beginPath();
      context.arc(this.xove[i], this.y+1.5*this.s, 10, 0, 2 * Math.PI);
      context.closePath();
      context.stroke();
    }
    for (var i = 0; i < this.otgs.length; i++) {
      context.fillStyle = "black";
      context.font = "12px Arial";
      context.fillText(this.otgs[i], this.xove[i]-this.s/10, this.y+1.6*this.s);
    }

  }
}

﻿// Creating variables
//level max - 10
//round max - ???
var to4ki = 0;
var logo = new Image();
var zones = ["#f00","#0f0", "#ff4500", "#ffa500", "#f0e68c", "#32cd32", "#2e8b57", "#87ceeb", "#4169e1"];
var Start = true, game = false, end = false, tutorial = false, tutorial2 = false;
var startB = new Button(340, 400, 120, 40, 20, "#E1E1E1");
var tutB = new Button(340, 470, 120, 40, 20, "#E1E1E1");
var nextL = new Button(700, 500, 80, 40, 20, "#0f0");
var tutB2 = new Button(700, 580, 80, 40, 20, "#E1E1E1");
var backH = new Button(350, 500, 120, 40, 20, "#0f0");
var backH2 = new Button(700, 600, 80, 40, 20, "#0f0");
var backG = new Button(700, 600, 80, 40, 20, "#0f0");
var map = new Image(), tutr = new Image();
var animalsLevel = [],nivo = 1;
for (var i = 0; i < 3; i++) {
  var  k = Math.floor(Math.random()*animals.length);
  var povt = 0;
  animalsLevel.push(new SelecedAnimal(animals[k].anm, animals[k].sor, animals[k].zone));
  animalsLevel[i].otgs[Math.floor(Math.random()*animalsLevel[i].otgs.length)] = animalsLevel[i].zone;
  for (var j = 0; j < animalsLevel[i].otgs.length; j++) {
    var k = Math.floor(Math.random()*animalsLevel[i].randC.length);
    if(animalsLevel[i].randC[k] == animalsLevel[i].zone){
      animalsLevel[i].randC.splice(k, 1);
      j = 0;
    }
    if(animalsLevel[i].otgs[j] == 0 && animalsLevel[i].randC[k] != animalsLevel[i].zone){
        animalsLevel[i].otgs[j] = animalsLevel[i].randC[k];
        animalsLevel[i].randC.splice(k, 1);
        j=0;
    }
  }
}
animalsLevel[0].x = 100;
animalsLevel[0].y = 550;
animalsLevel[0].s = 40;
animalsLevel[0].kude();

animalsLevel[1].x = 250;
animalsLevel[1].y = 550;
animalsLevel[1].s = 40;
animalsLevel[1].kude();

animalsLevel[2].x = 400;
animalsLevel[2].y = 550;
animalsLevel[2].s = 40;
animalsLevel[2].kude();

map.src = "../imgs/map1.png";
logo.src = "../imgs/dw.png";
tutr.src = "../imgs/tut2.png";

function update() {

  if(Start){

  }else if(game){
    for (var i = 0; i < animalsLevel.length; i++) {
      for(var j = 0; j < animalsLevel[i].otgs.length; j++){
        var d = Math.sqrt(Math.pow(animalsLevel[i].xove[j]-mouseX, 2) + Math.pow(animalsLevel[i].y+1.5*animalsLevel[i].s-mouseY, 2));
        if(d<=10){
          animalsLevel[i].mouseM = true;
          animalsLevel[i].Actcolors[animalsLevel[i].otgs[j]] = zones[animalsLevel[i].otgs[j]];
        }else{
          animalsLevel[i].Actcolors[animalsLevel[i].otgs[j]] = animalsLevel[i].colors[animalsLevel[i].otgs[j]];
          //animalsLevel[i].mouseM = false;
        }
      }
    }
  }

}

function draw() {
    // This is how you draw a rectangle
    context.fillStyle = "#E1E1E1";
    context.fillRect(0,0,800,650);
    if(Start){
      context.fillStyle = "black";
      context.font = "60px Arial";
      context.fillText("Do you know?",220,80);
      context.drawImage(logo, 250, 80, 300, 300);
        startB.draw();
        startB.frame();
        startB.txt("Play");
        tutB.draw();
        tutB.frame();
        context.fillStyle = tutB.txtC;
        context.font = "15px Arial";
        context.fillText("Tutorial",tutB.x+35,tutB.y+25);


    }else if(game){

      context.drawImage(map,50,60,690,404);
      context.fillStyle = "black";
      context.font = "20px Arial";
      context.fillText("Level "+ nivo+" /10",360, 40);
      animalsLevel[0].draw();
      animalsLevel[1].draw();
      animalsLevel[2].draw();

      nextL.draw();
      nextL.frame();
      context.fillStyle = nextL.txtC;
      context.font = "15px Arial";
      context.fillText("Next",nextL.x+25,nextL.y+25);

      tutB2.draw();
      nextL.frame();
      context.fillStyle = tutB2.txtC;
      context.font = "15px Arial";
      context.fillText("Tutorial",tutB2.x+15,tutB2.y+25);
    }else if(end){
      context.fillStyle = "black";
      context.font = "80px Arial";
      context.fillText("Your score: "+to4ki+"/30",120,300);
      backH.draw();
      backH.frame();
      context.fillStyle = backH.txtC;
      context.font = "17px Arial";
      context.fillText("Home",backH.x+35,backH.y+25);
    }else if(tutorial){
      context.drawImage(tutr, 0, 0, 800, 650);
      backH2.draw();
      backH2.frame();
      context.fillStyle = backH2.txtC;
      context.font = "17px Arial";
      context.fillText("Home",backH2.x+15,backH2.y+25);
    }else if(tutorial2){
      context.drawImage(tutr, 0, 0, 800, 650);
      backG.draw();
      backG.frame();
      context.fillStyle = backG.txtC;
      context.font = "10px Arial";
      context.fillText("Back to game",backG.x+10,backG.y+25);
    }

    context.strokeStyle = "black";
    context.strokeRect(0,0,800,650);
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    if(Start){
        if(areColliding(startB.x, startB.y, startB.wid, startB.hei, mouseX, mouseY, 1,1)){
          Start = false;
          game  = true;
          mouseX = 100000;
        }

        if(areColliding(tutB.x, tutB.y, tutB.wid, tutB.hei, mouseX, mouseY, 1,1)){
          Start = false;
          tutorial = true;
          mouseX = 100000;
        }
    }else if(game){
      for (var i = 0; i < animalsLevel.length; i++) {
        for(var j = 0; j < animalsLevel[i].otgs.length; j++){
          var d = Math.sqrt(Math.pow(animalsLevel[i].xove[j]-mouseX, 2) + Math.pow(animalsLevel[i].y+1.5*animalsLevel[i].s-mouseY, 2));
          if(d<=10){
            animalsLevel[i].mouseM = false;
            animalsLevel[i].myOtg = animalsLevel[i].otgs[j];
            //console.log(animalsLevel[i].myOtg, animalsLevel[i].myOtg);
            animalsLevel[i].colors = ["#E1E1E1","#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1", "#E1E1E1"];
            animalsLevel[i].colors[animalsLevel[i].otgs[j]] = zones[animalsLevel[i].otgs[j]];
          }
        }
      }
      if(areColliding(nextL.x, nextL.y, nextL.wid, nextL.hei, mouseX, mouseY, 1,1)){
        if(nivo<10){
        nivo++;
        game  = true;
        mouseX = 100000;
        for (var i = 0; i < animalsLevel.length; i++) {
          if (animalsLevel[i].zone == animalsLevel[i].myOtg) {
            to4ki++;
          }
        }
        animalsLevel = [];
        for (var i = 0; i < 3; i++) {
          var  k = Math.floor(Math.random()*animals.length);
          var povt = 0;
          animalsLevel.push(new SelecedAnimal(animals[k].anm, animals[k].sor, animals[k].zone));
          animalsLevel[i].otgs[Math.floor(Math.random()*animalsLevel[i].otgs.length)] = animalsLevel[i].zone;
          for (var j = 0; j < animalsLevel[i].otgs.length; j++) {
            var k = Math.floor(Math.random()*animalsLevel[i].randC.length);
            if(animalsLevel[i].randC[k] == animalsLevel[i].zone){
              animalsLevel[i].randC.splice(k, 1);
              j = 0;
            }
            if(animalsLevel[i].otgs[j] == 0 && animalsLevel[i].randC[k] != animalsLevel[i].zone){
                animalsLevel[i].otgs[j] = animalsLevel[i].randC[k];
                animalsLevel[i].randC.splice(k, 1);
                j=0;
            }
          }
        }
        animalsLevel[0].x = 100;
        animalsLevel[0].y = 550;
        animalsLevel[0].s = 40;
        animalsLevel[0].kude();

        animalsLevel[1].x = 250;
        animalsLevel[1].y = 550;
        animalsLevel[1].s = 40;
        animalsLevel[1].kude();

        animalsLevel[2].x = 400;
        animalsLevel[2].y = 550;
        animalsLevel[2].s = 40;
        animalsLevel[2].kude();
      }else{
        game=false;
        end = true;
      }
      }
      if(areColliding(tutB2.x, tutB2.y, tutB2.wid, tutB2.hei, mouseX, mouseY, 1, 1)){
        tutorial2 = true;
        game = false;
      }
    }else if(end){
      if(areColliding(backH.x, backH.y, backH.wid, backH.hei, mouseX, mouseY, 1, 1)){
        mouseX = 1000;
        Start = true;
        end = false;
        game = false;
        to4ki = 0;
        nivo = 1;
        animalsLevel = [];
        for (var i = 0; i < 3; i++) {
          var  k = Math.floor(Math.random()*animals.length);
          var povt = 0;
          animalsLevel.push(new SelecedAnimal(animals[k].anm, animals[k].sor, animals[k].zone));
          animalsLevel[i].otgs[Math.floor(Math.random()*animalsLevel[i].otgs.length)] = animalsLevel[i].zone;
          for (var j = 0; j < animalsLevel[i].otgs.length; j++) {
            var k = Math.floor(Math.random()*animalsLevel[i].randC.length);
            if(animalsLevel[i].randC[k] == animalsLevel[i].zone){
              animalsLevel[i].randC.splice(k, 1);
              j = 0;
            }
            if(animalsLevel[i].otgs[j] == 0 && animalsLevel[i].randC[k] != animalsLevel[i].zone){
                animalsLevel[i].otgs[j] = animalsLevel[i].randC[k];
                animalsLevel[i].randC.splice(k, 1);
                j=0;
            }
          }
        }
        animalsLevel[0].x = 100;
        animalsLevel[0].y = 550;
        animalsLevel[0].s = 40;
        animalsLevel[0].kude();

        animalsLevel[1].x = 250;
        animalsLevel[1].y = 550;
        animalsLevel[1].s = 40;
        animalsLevel[1].kude();

        animalsLevel[2].x = 400;
        animalsLevel[2].y = 550;
        animalsLevel[2].s = 40;
        animalsLevel[2].kude();
      }
    }else if(tutorial){

      if(areColliding(backH2.x, backH2.y, backH2.wid, backH2.hei, mouseX, mouseY, 1, 1)){
        Start = true;
        tutorial = false;
      }

    }else if(tutorial2){
      if(areColliding(backG.x, backG.y, backG.wid, backG.hei, mouseX, mouseY, 1, 1)){
        game = true;
        tutorial2 = false;
      }
    }
};

function mousemove() {
    // Show coordinates of mouse on click
    if(Start){
        if(areColliding(startB.x, startB.y, startB.wid, startB.hei, mouseX, mouseY, 1,1)){
          startB.col = "black";
          startB.txtC = "#E1E1E1";
        }else{
          startB.col = "#E1E1E1";
          startB.txtC = "black"
        }

        if(areColliding(tutB.x, tutB.y, tutB.wid, tutB.hei, mouseX, mouseY, 1,1)){
          tutB.col = "black";
          tutB.txtC = "#E1E1E1";
        }else{
          tutB.col = "#E1E1E1";
          tutB.txtC = "black";
        }
    }else if(game){
      if(areColliding(nextL.x, nextL.y, nextL.wid, nextL.hei, mouseX, mouseY, 1,1)){
        nextL.col = "#0f0";
        nextL.txtC = "black";
      }else{
        nextL.col = "green";
        nextL.txtC = "#E1E1E1"
      }

      if(areColliding(tutB2.x, tutB2.y, tutB2.wid, tutB2.hei, mouseX, mouseY, 1,1)){
        tutB2.col = "black";
        tutB2.txtC = "#E1E1E1";
      }else{
        tutB2.col = "#E1E1E1";
        tutB2.txtC = "black"
      }
    }else if(end){
      if(areColliding(backH.x, backH.y, backH.wid, backH.hei, mouseX, mouseY, 1, 1)){
        backH.col = "#0f0";
        backH.txtC = "black";
      }else{
        backH.col = "green";
        backH.txtC = "#E1E1E1"
      }
    }else if(tutorial){

      if(areColliding(backH2.x, backH2.y, backH2.wid, backH2.hei, mouseX, mouseY, 1, 1)){
        backH2.col = "#0f0";
        backH2.txtC = "black";
      }else{
        backH2.col = "green";
        backH2.txtC = "#E1E1E1"
      }

    }else if(tutorial2){

      if(areColliding(backG.x, backG.y, backG.wid, backG.hei, mouseX, mouseY, 1, 1)){
        backG.col = "#0f0";
        backG.txtC = "black";
        }else{
        backG.col = "green";
        backG.txtC = "#E1E1E1"
        }

    }

};

function drawRoundButton(ctx, x, y, width, height, arcsize) {
    ctx.beginPath();
    ctx.moveTo(x+arcsize, y);
    ctx.lineTo(x+width-arcsize, y);
    ctx.arcTo(x+width, y, x+width, y+arcsize, arcsize);
    ctx.lineTo(x+width,y+height-arcsize);
    ctx.arcTo(x+width, y+height, x+width-arcsize, y+height, arcsize);
    ctx.lineTo(x+arcsize, y+height);
    ctx.arcTo(x, y+height, x, y-arcsize, arcsize);
    ctx.lineTo(x, y+arcsize);
    ctx.arcTo(x, y, x+arcsize, y, arcsize);
    ctx.lineTo(x+arcsize, y);
    ctx.stroke();
    ctx.fill();
};

function drawRoundButtonFrame(ctx, x, y, width, height, arcsize) {
    ctx.beginPath();
    ctx.moveTo(x+arcsize, y);
    ctx.lineTo(x+width-arcsize, y);
    ctx.arcTo(x+width, y, x+width, y+arcsize, arcsize);
    ctx.lineTo(x+width,y+height-arcsize);
    ctx.arcTo(x+width, y+height, x+width-arcsize, y+height, arcsize);
    ctx.lineTo(x+arcsize, y+height);
    ctx.arcTo(x, y+height, x, y-arcsize, arcsize);
    ctx.lineTo(x, y+arcsize);
    ctx.arcTo(x, y, x+arcsize, y, arcsize);
    ctx.lineTo(x+arcsize, y);
    ctx.stroke();
};
