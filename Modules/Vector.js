import { SerializableData } from './SerializableData.js';

class Vector extends SerializableData {
    static Zero() { return new Vector(0, 0); }
    static One() { return new Vector(1, 1); }
    static Up() { return new Vector(0, 1); }
    static Down() { return new Vector(0, -1); }
    static Left() { return new Vector(-1, 0); }
    static Right() { return new Vector(1, 0); }

    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    getFlexibleSize() {
        let size = 0;

        size += 4; // x float32
        size += 4; // y float32

        return size;
    }

    onSerialize(writeHandle) {
        writeHandle.writeFloat32(this.x);
        writeHandle.writeFloat32(this.y);
    }

    onDeserialize(readHandle) {
        this.x = readHandle.readFloat32();
        this.y = readHandle.readFloat32();
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    getSqrMagnitude() {
        return this.x * this.x + this.y * this.y;
    }

    normalize() {
        const sqrMagnitude = this.getSqrMagnitude();
        if(sqrMagnitude === 0) 
            return this;

        const inv = 1 / Math.sqrt(sqrMagnitude);

        this.x *= inv;
        this.y *= inv;
        return this;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    multiply(value) {
        this.x *= value;
        this.y *= value;
        return this;
    }

    divide(value) {
        this.x /= value;
        this.y /= value;
        return this;
    }

    // -- static methods --

    static equals(a, b) {
        return a.x === b.x && a.y === b.y;
    }
        
    static normalize(vector) {
        const sqrMagnitude = vector.getSqrMagnitude();
        if(sqrMagnitude === 0) 
            return new Vector(0, 0);

        const inv = 1 / Math.sqrt(sqrMagnitude);
        return new Vector(vector.x * inv, vector.y * inv);
    }

    static add(a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    }

    static subtract(a, b) {
        return new Vector(a.x - b.x, a.y - b.y);
    }

    static multiply(vector, value) {
        return new Vector(vector.x * value, vector.y * value);
    }

    static divide(vector, value) {
        return new Vector(vector.x / value, vector.y / value);
    }

    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    static cross(a, b) {
        return a.x * b.y - a.y * b.x;
    }
}

export { Vector };