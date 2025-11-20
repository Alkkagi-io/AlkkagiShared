import { Packet, EPacketID } from "./index.js";

class C2S_InteractAbilityContainerRequestPacket extends Packet {
    constructor(abilityContainerEntityID = 0) {
        super();
        
        this.abilityContainerEntityID = abilityContainerEntityID;
    }

    getPacketID() {
        return EPacketID.C2S_InteractAbilityContainerRequestPacket;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 4; // abilityContainerEntityID uint32

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint32(this.abilityContainerEntityID);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.abilityContainerEntityID = readHandle.readUint32();
    }
}

export { C2S_InteractAbilityContainerRequestPacket };