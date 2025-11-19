import { Packet } from "./Base/Packet.js";
import { EPacketID } from "./EPacketID.js";
import { BuffData } from "../Modules/BuffData.js";

class S2C_AddBuffPacket extends Packet {
    constructor(playerId, addedBuff) {
        super();
        this.addedBuff = addedBuff;
    }

    getPacketID() {
        return EPacketID.S2C_AddBuffPacket;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += this.addedBuff.getFlexibleSize(); // addedBuff

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeArrayBuffer(this.addedBuff.serialize());
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.addedBuff = new BuffData().deserialize(readHandle.readArrayBuffer());
    }
}

export { S2C_AddBuffPacket }