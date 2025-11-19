import { SerializableData } from "./SerializableData.js";

class BuffData extends SerializableData {
    constructor(type, time, value) {
        this.type = type;
        this.time = time;
        this.value = value;
    }

    getFlexibleSize() {
        let size = 0;

        size += 1; // type int8
        size += 4; // time float32
        size += 4; // value float32

        return size;
    }

    onSerialize(writeHandle) {
        writeHandle.writeUint8(this.type);
        writeHandle.writeFloat32(this.time);
        writeHandle.writeFloat32(this.value);
    }

    onDeserialize(readHandle) {
        this.type = readHandle.readUint8();
        this.time = readHandle.readFloat32();
        this.value = readHandle.readFloat32();
    }
}

export { BuffData }