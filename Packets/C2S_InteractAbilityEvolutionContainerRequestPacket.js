import { Packet, EPacketID } from "./index.js";

class C2S_InteractAbilityEvolutionContainerRequestPacket extends Packet {
    constructor(abilityEvolutionContainerEntityID = 0) {
        super();
        
        this.abilityEvolutionContainerEntityID = abilityEvolutionContainerEntityID;
    }

    getPacketID() {
        return EPacketID.C2S_InteractAbilityEvolutionContainerRequestPacket;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 4; // abilityEvolutionContainerEntityID uint32

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint32(this.abilityEvolutionContainerEntityID);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.abilityEvolutionContainerEntityID = readHandle.readUint32();
    }
}

export { C2S_InteractAbilityEvolutionContainerRequestPacket };