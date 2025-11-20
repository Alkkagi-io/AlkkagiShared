import { Packet, EPacketID } from "./index.js";

class S2C_InformCharacterAbilityChangedPacket extends Packet {
    constructor(entityID = 0, abilityID = 0) {
        super();
        
        this.entityID = entityID;
        this.abilityID = abilityID;
    }

    getPacketID() {
        return EPacketID.S2C_InformCharacterAbilityChangedPacket;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 4; // entityID uint32
        size += 1; // abilityID uint8

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint32(this.entityID);
        writeHandle.writeUint8(this.abilityID);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.entityID = readHandle.readUint32();
        this.abilityID = readHandle.readUint8();
    }
}

export { S2C_InformCharacterAbilityChangedPacket };