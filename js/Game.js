class Game {
  constructor() {
    this.resetTitle=createElement("h2")
    this.resetButton=createButton("")
    this.leadeboardTitle=createElement("h2")
    this.leader1=createElement("h2")
    this.leader2=createElement("h2")
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    contagemJogador = player.getCount();
    carro1 = createSprite (width/2-50,height-100);
    carro1.addImage(carro1Img);

    carro2 = createSprite (width/2+100, height-100);
    carro2.addImage(carro2Img);

    carros = [carro1, carro2]
  }

  getState(){
    var gameStateR = database.ref("estadoJogo");
    gameStateR.on("value",function(data){
      estadoJogo = data.val()
    })
  }

  update(state){
    database.ref("/").update({
      estadoJogo:state
    })
  }

  play(){
    this.mudanca()
    this.handleElements()
    this.resetButton()
    Player.getPlayerInf()
    if(allPlayers!== undefined){
      image(pista,0,-height*5,width,height*6);
      showLeaderboard()
      var index = 0;
      for(var playerS in allPlayers){
        index +=1
        var x = allPlayers[playerS].positionX
        var y = height- allPlayers[playerS].positionY
        carros[index-1].position.x = x
        carros[index-1].position.y = y
        if(index === player.index){
          stroke(10)
          fill("white")
          ellipse(x,y,60,60)
        }
      }
      this.playerControls()
      drawSprites;
    }
  
  }

  playerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY = player.positionY+10
      player.update()
    }

    if(keyIsDown(LEFT_ARROW)){
      player.positionX = player.positionX-5
      player.update()
    }

    if(keyIsDown(RIGHT_ARROW)){
      player.positionX = player.positionX+5
      player.update()
    }

  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reinicar Jogo");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Placar");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  resetButton(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        contagemJogador:0,estadoJogo:0,players:{}
      })
      window.location.reload()
    })
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

}
