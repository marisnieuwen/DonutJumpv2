import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Donut extends PIXI.Sprite {
  private game: Game;

  constructor(game: Game, texture: PIXI.Texture, eatenTexture: PIXI.Texture) {
    super(texture);
    this.game = game;
    this.anchor.set(0.5);
    this.x = Math.random() * 1600; // map size
    this.y = 510
  }

  update(delta: number) {


}
}
