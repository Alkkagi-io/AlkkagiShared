import { Packet, EPacketID } from "./index.js";

class S2C_InteractAbilityContainerResponsePacket extends Packet {
    constructor(ownGold = 0) {
        super();
        
        this.ownGold = ownGold;
    }

    getPacketID() {
        return EPacketID.S2C_InteractAbilityContainerResponsePacket;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 4; // ownGold uint32

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint32(this.ownGold);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.ownGold = readHandle.readUint32();
    }
}

export { S2C_InteractAbilityContainerResponsePacket };