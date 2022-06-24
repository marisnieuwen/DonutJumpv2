import * as PIXI from "pixi.js";
import { Player } from "./player";
import { Donut } from "./donut";

import bgtexture from "./images/background2.png";
import playerImage from "./images/player2.png";
import donutImage from "./images/donutobstacle.png";

export class Game {
    public pixi: PIXI.Application;
    private loader: PIXI.Loader;
    private background : PIXI.Sprite; 
    private player: Player;
    private donuts: Donut[] = [];

    constructor() {
        this.pixi = new PIXI.Application({ width: 2880, height: 1000 });
        document.body.appendChild(this.pixi.view);
    
        this.loader = new PIXI.Loader();
        this.loader
          .add("backgroundTexture", bgtexture)
          .add("donutTexture", donutImage)
          .add("playerTexture", playerImage);
    
        this.loader.load(() => this.doneLoading());
      }

      public doneLoading() {
        this.background = new PIXI.Sprite(
          this.loader.resources["backgroundTexture"].texture!
        );
        this.pixi.stage.addChild(this.background);
    
        // this.interface = new UI();
        // this.pixi.stage.addChild(this.interface);

        this.player = new Player(
            this,
            this.loader.resources["playerTexture"].texture!
          );
          this.pixi.stage.addChild(this.player);

          for (let i = 0; i < 20; i++) {
            let donut = new Donut(
              this,
              this.loader.resources["donutTexture"].texture!,
              this.loader.resources["eatenTexture"].texture!
            );
            this.pixi.stage.addChild(donut);
            this.donuts.push(donut);
          }
    
    
        this.pixi.ticker.add((delta) => this.update(delta));
      }
 
      private update(delta: number) {
        this.player.update(delta);
        // donut.update(delta);

        for (let donut of this.donuts) {

            donut.update(delta);
    
        //   if (this.collision(donut, this.player)) {
        //     donut.eaten();
        //     this.donuts = this.donuts.filter(f => f != donut)
        //     donut.destroy();
        //     this.interface.addScore(1);
        //   }
        }
    }
        

        private collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
            const bounds1 = sprite1.getBounds();
            const bounds2 = sprite2.getBounds();
        
            return (
              bounds1.x < bounds2.x + bounds2.width &&
              bounds1.x + bounds1.width > bounds2.x &&
              bounds1.y < bounds2.y + bounds2.height &&
              bounds1.y + bounds1.height > bounds2.y
            );
          }
}

