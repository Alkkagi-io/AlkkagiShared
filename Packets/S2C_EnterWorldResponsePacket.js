import { getFlexiableUTF8Size } from '../Modules/BufferHandle.js';
import { WorldPlayerData } from '../Modules/WorldPlayerData.js';
import { Packet, EPacketID } from "./index.js";

class S2C_EnterWorldResponsePacket extends Packet {
    constructor(entityID = 0, worldPlayers = []) {
        super();
        
        this.entityID = entityID;
        this.worldPlayerData = [];
        for (const player of worldPlayers) {
            this.worldPlayerData.push(new WorldPlayerData(player));
        }
    }

    getPacketID() {
        return EPacketID.S2C_EnterWorldResponse;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 4 // entity ID (uint 32)
        size += 4 // world player data length
        for (const data of this.worldPlayerData) {
            size += data.getFlexibleSize();
        }

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint32(this.entityID);
        writeHandle.writeUint32(this.worldPlayerData.length);
        for (const data of this.worldPlayerData) {
            writeHandle.writeArrayBuffer(data.serialize());
        }
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.entityID = readHandle.readUint32();
        const length = readHandle.readUint32();
        this.worldPlayerData = [];
        for(let i = 0; i < length; i++) {
            this.worldPlayerData.push(new WorldPlayerData().deserialize(readHandle.readArrayBuffer()));
        }
    }
}

export { S2C_EnterWorldResponsePacket };