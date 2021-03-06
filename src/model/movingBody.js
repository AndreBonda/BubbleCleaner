import { Body } from "./body.js";
import { Vector2D } from "./Vector2D.js";

export class MovingBody extends Body {
    constructor(x, y, radius, color, vx, vy, v, alpha) {
        super(x, y, radius, color);

        if ((!vx || !vy) && (!v || alpha === undefined))
            throw new Error("No valid arguments");

        if (vx && vy)
            this.vector = Vector2D.FromComponents(vx, vy);
        else
            this.vector = Vector2D.FromMagnitude(v, alpha);
    }

    update() {
        /**
         * La y viene negata poichè l'origine del canvas in realtà è in alto a sinistra della finestra.
         * Quindi se voglio muovere un corpo verso l'alto dovro decrementare la sua coordinata y, diversamente dovrò incrementarla se voglio muovere verso il basso.
         * La velocità è calcolata tramite il piano cartesiano tra il centro logico del canvas (calcolato nell'index) e il punto in cui clicco.
         * Più clicco lontano dal centro, più la velocità sarà alta.
         * Quindi le coordinate le moltiplico per la velocità / 200.
        */
       
        this.x += Math.cos(this.vector.alpha) * this.vector.v / 200;
        this.y -= Math.sin(this.vector.alpha) * this.vector.v / 200;
    }

}