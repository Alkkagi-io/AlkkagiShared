import { WorldPlayerData } from '../Modules/WorldPlayerData.js';
import { Packet, EPacketID } from "./index.js";

class S2C_AddPlayerPacket extends Packet {
    constructor(addPlayer) {
        super();        
        this.addPlayerData = new WorldPlayerData(addPlayer);
    }

    getPacketID() {
        return EPacketID.S2C_AddPlayerPacket;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += this.addPlayerData.getFlexibleSize(); // worldPlayerData

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeArrayBuffer(this.addPlayerData.serialize());
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.addPlayerData = new WorldPlayerData().deserialize(readHandle.readArrayBuffer());
    }
}

export { S2C_AddPlayerPacket };