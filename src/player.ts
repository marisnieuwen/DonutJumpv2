import * as PIXI from "pixi.js"
// import { Rectangle } from "pixi.js"
import { Game } from "./game"

export class Player extends PIXI.Sprite {

    private xspeed = 0;
    private yspeed = 0;
    public game: Game;
    
    private jumpy = 0;
    private jumpHeight = -10
    private jumping = false
    private gravity = 0.2

    constructor(game:Game, texture: PIXI.Texture) {
        super(texture)

        this.game = game
        this.anchor.set(0.5)
        this.x = 30
        this.y = 510

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    } 
        
    update(delta: number) {
        this.x += this.xspeed
        this.y += this.yspeed
        let mapwidth = 2880
        let mapheight = 520


        this.x = this.clamp(this.x + this.xspeed, 0, mapwidth)
        this.y = this.clamp(this.y + this.yspeed, 0, mapheight)

        if (this.jumping) {
            this.jumpy += this.gravity
            this.y += this.jumpy
        }

      
    }

    clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }
    
    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -2
                this.scale.set(1, 1)
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 2
                this.scale.set(-1, 1)
                break
            case "W":
            case "ARROWUP":
                if(!this.jumping){
                    this.jumping = true
                    console.log("jumped")
                    this.jumpy = this.jumpHeight
                    this.yspeed = -2
                }
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "ARROWUP":
                this.yspeed = 0
                break
        }
    }
}