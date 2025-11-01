import { getFlexiableUTF8Size } from "./BufferHandle.js";
import { SerializableData } from "./SerializableData.js";

class WorldPlayerData extends SerializableData {
    constructor(player) {
        super();
        this.entityID = player?.getID() ?? 0;
        this.name = player?.nickname ?? "";
    }

    etFlexibleSize() {
        let size = 0;
        
        size += 4; // entityID;
        size += getFlexiableUTF8Size(this.name); // name

        return size;
    }

    onSerialize(writeHandle) {
        writeHandle.writeUint16(this.entityID);
        writeHandle.writeStringUTF8(this.name);
    }

    onDeserialize(readHandle) {
        this.entityID = readHandle.readUint16();
        this.name = readHandle.readStringUTF8();
    }
}

export { WorldPlayerData };