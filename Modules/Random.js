import { Vector } from './Vector.js';

class Random {
    static direction() {
        const angleInRadian = Math.random() * 2 * Math.PI; // 2PI == 360
        return new Vector(Math.cos(angleInRadian), Math.sin(angleInRadian));
    }

    static insideUnitCircle() {
        return this.direction().multiply(Math.random());
    }

    static range(min, max) {
        return Math.random() * (max - min) + min;
    }

    static rangeInt(min, max) {
        return Math.floor(this.range(min, max));
    }
}

export { Random };