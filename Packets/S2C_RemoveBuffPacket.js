import { Packet } from "./Base/Packet.js";
import { EPacketID } from "./EPacketID.js";

class S2C_RemoveBuffPacket extends Packet {
    constructor(playerId, removeBuffType) {
        super();
        this.removeBuffType = removeBuffType;
    }

    getPacketID() {
        return EPacketID.S2C_RemoveBuffPacket;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 1; // removeBuffType

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint8(this.removeBuffType);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.removeBuffType = readHandle.readUint8();
    }
}

export { S2C_RemoveBuffPacket }