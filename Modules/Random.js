import { Vector } from './Vector.js';

class Random {
    constructor() {
        throw new Error('Random is a static class and cannot be instantiated');
    }

    static direction() {
        const angleInRadian = Math.random() * 2 * Math.PI; // 2PI == 360
        return new Vector(Math.cos(angleInRadian), Math.sin(angleInRadian));
    }

    static insideUnitCircle() {
        return Random.direction().multiply(Math.random());
    }

    static range(min, max) {
        return Math.random() * (max - min) + min;
    }

    static rangeInt(min, max) {
        return Math.floor(Random.range(min, max));
    }
}

export { Random };