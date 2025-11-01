import { Packet, EPacketID } from "./index.js";

class S2C_RemovePlayerPacket extends Packet {
    constructor(removePlayerEntityID) {
        super();        
        this.removePlayerEntityID = removePlayerEntityID;
    }

    getPacketID() {
        return EPacketID.S2C_RemovePlayerPacket;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 4; // removePlayerEntityData

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint32(this.removePlayerEntityID);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.removePlayerEntityID = readHandle.readUint32();
    }
}
export { S2C_RemovePlayerPacket };