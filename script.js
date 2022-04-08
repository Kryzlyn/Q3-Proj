 const score=document.getElementById('player-score');
            const startScreen=document.getElementById('menu');
            const gameArea=document.getElementById('road');
            startScreen.addEventListener('click',start);
            let player={speed:3,score:0};
            let keys ={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false}

            document.addEventListener('keydown',keyDown);
            document.addEventListener('keyup',keyUp);

            function keyDown(e){
                e.preventDefault();
                keys[e.key]=true;
                
            }
            function keyUp(e){
                e.preventDefault();
                keys[e.key]=false;
           
            }

            // generating random colors for the enemy motor
            function randomizeColor(){
                function c(){
                    let color=Math.floor(Math.random()*256).toString(16);
                    return ("0"+String(color)).substr(-2);
                }
                return "#"+c()+c()+c();
            }

            function isCollide(a,b){
                aRect=a.getBoundingClientRect();
                bRect=b.getBoundingClientRect();
                return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
            }

            function moveLines(){
                let lines=document.querySelectorAll('.lines');
                lines.forEach(function(item){
                    if(item.y >=650){
                        item.y-=740;
                    }
                    item.y+=player.speed;
                    item.style.top=item.y+"px";
                })
            }
            function endGame(){
                player.start=false;
                startScreen.classList.remove('hide');
                startScreen.style.backgroundColor="#C41E3A";
                var res="";
                if(player.score<1000){
                    res="Below Average Motorist."
                }else if(player.score>1000 && player.score<=10000){
                    res="Average Motorist.";
                }else if(player.score>10000){
                    res="Excellent Motorist.";
                }


                startScreen.innerHTML="GAME OVER <br> " +res+" You Travelled: "+player.score+" meters"+"<br>Press again to restart";
            }
            function moveEnemy(car){
                let enemy=document.querySelectorAll('.enemy');
                enemy.forEach(function(item){

                    if(isCollide(car,item)){
                        console.log("Bang!");
                        endGame();
                    }
                    if(item.y >=750){
                        item.y=-300;
                        item.style.left=Math.floor(Math.random()*350)+"px";
                    }
                    item.y+=player.speed;
                    item.style.top=item.y+"px";
                })
            }
            function gamePlay(){
                let car=document.querySelector('.car');
                let road=gameArea.getBoundingClientRect();
                if(player.start){
                    moveLines();
                    moveEnemy(car);

                    if(keys.ArrowUp && player.y>(road.top+70)){
                        player.y-=player.speed
                    }
                    if(keys.ArrowDown && player.y<(road.bottom-85)){
                        player.y+=player.speed
                    }
                    if(keys.ArrowLeft && player.x>0 ){
                        player.x-=player.speed
                    }
                    if(keys.ArrowRight && player.x<(road.width-50)){
                        player.x+=player.speed
                    }
                    car.style.top=player.y+"px";
                    car.style.left=player.x+"px";
                    window.requestAnimationFrame(gamePlay);
                    console.log(player.score++);
                    player.score++;
                    let ps=player.score-1;
                    score.innerText="Score: "+ps;
                }
            }
            function start(){
                startScreen.classList.add('hide');
                gameArea.innerHTML="";
                player.start=true;
                player.score=0;
                window.requestAnimationFrame(gamePlay);

                for(x=0;x<5;x++){
                    let roadLine=document.createElement('div');
                    roadLine.setAttribute('class','lines');
                    roadLine.y=(x*150);
                    roadLine.style.top=roadLine.y+"px";
                    gameArea.appendChild(roadLine);
                }

                let car=document.createElement('div');
                car.setAttribute('class','car');
                gameArea.appendChild(car);

                player.x=car.offsetLeft;
                player.y=car.offsetTop;


                for(x=0;x<3;x++){
                    let enemyMoto=document.createElement('div');
                    enemyMoto.setAttribute('class','enemy');
                    enemyMoto.y=((x+1)*351)*-1;
                    enemyMoto.style.top=enemyMoto.y+"px";
                    enemyMoto.style.backgroundColor=randomizeColor();
                    enemyMoto.style.left=Math.floor(Math.random()*350)+"px";
                    gameArea.appendChild(enemyMoto);
                }


            }
            