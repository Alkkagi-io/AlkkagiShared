import { Packet } from "./Base/Packet.js";
import { EPacketID } from "./EPacketID.js";

class C2S_BuyItemPacket extends Packet {
    constructor(buyItemId = 0) {
        super();
        this.buyItemId = buyItemId;
    }

    getPacketID() {
        return EPacketID.C2S_BuyItem;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 1; // buyItemId (uint8)

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint8(this.buyItemId);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.buyItemId = readHandle.readUint8();
    }
}

export { C2S_BuyItemPacket };