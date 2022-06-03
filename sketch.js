//falta getplayerInfo e mudaca
var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player, allPlayers;
var contagemJogador;
var carro1, carro2, carro1Img, carro2Img;
var pista;
var carros = []
var estadoJogo;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  carro1Img = loadImage("assets/car1.png");
  carro2Img = loadImage("assets/car2.png");
  pistaImg = loadImage("assets/PISTA.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();

}

function draw() {
  background(backgroundImage);

  if(contagemJogador === 2){
      game.update(1)
  }

  if(estadoJogo === 1){
    game.play()
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
