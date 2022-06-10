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
    carro1.scale = 0.2
    carro2 = createSprite (width/2+100, height-100);
    carro2.addImage(carro2Img);
    carro2.scale = 0.2
    carros = [carro1, carro2]
    combustivel = new Group()
    obstaculos =  new Group()
    coin = new Group()
    this.addSprites(coin,50,coinImg,0.09);
    this.addSprites(combustivel,10,combustivelImg,0.02)
    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstaculo2 },
      { x: width / 2 - 150, y: height - 1300, image: obstaculo1 },
      { x: width / 2 + 250, y: height - 1800, image: obstaculo1 },
      { x: width / 2 - 180, y: height - 2300, image: obstaculo2 },
      { x: width / 2, y: height - 2800, image: obstaculo2 },
      { x: width / 2 - 180, y: height - 3300, image: obstaculo1 },
      { x: width / 2 + 180, y: height - 3300, image: obstaculo2 },
      { x: width / 2 + 250, y: height - 3800, image: obstaculo2 },
      { x: width / 2 - 150, y: height - 4300, image: obstaculo1 },
      { x: width / 2 + 250, y: height - 4800, image: obstaculo2 },
      { x: width / 2, y: height - 5300, image: obstaculo1 },
      { x: width / 2 - 180, y: height - 5500, image: obstaculo2 }
    ];
    this.addSprites(obstaculos,obstaclesPositions.length,obstaculo1,0.04,obstaclesPositions)
  }

  handleFuel(index){
    carros[index-1].overlap(combustivel,function(collector,collected){
      player.fuel = 185
      collected.remove()
    })
  }

  handleCoin(index){
    carros[index-1].overlap(coin,function(collector,collected){
      player.score += 20
      player.update
      collected.remove()
    })
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //Se a matriz NÃO  estiver vazia
      // adicionar as posições da matriz à x e y
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;

      } else {

        //aleatório para as metades da tela em x e y
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      }

      //criar sprite nas posições aleatórias
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);

    }
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
    this.resetButtonf()
    Player.getPlayersInf()
    if(allPlayers!== undefined){
      image(pistaImg,0,-height*5,width,height*6);
      this.showLeaderboard()
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
          this.handleFuel
          this.handleCoin
        }
      }
      this.playerControls()
      drawSprites();
    }
  
  }

  playerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY = player.positionY+10
      player.update()

    }

    if(keyIsDown(LEFT_ARROW) && player.positionX>width/3-50){
      player.positionX = player.positionX-5
      player.update()
    }

    if(keyIsDown(RIGHT_ARROW) && player.positionX<width/2+300){
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

  resetButtonf(){
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
