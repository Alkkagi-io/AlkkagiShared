import { Packet, EPacketID } from "./index.js";

class S2C_CharacterStatLevelUpResponsePacket extends Packet {
    constructor(statType = EStatLevelUpType.ADD_WEIGHT_PER, statLevel = 0, statPoint = 0) {
        super();
        
        this.statType = statType;
        this.statLevel = statLevel;
        this.statPoint = statPoint;
    }

    getPacketID() {
        return EPacketID.S2C_CharacterStatLevelUpResponse;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 1 // statType (uint 8)
        size += 1 // statLevel (uint 8)
        size += 1 // statPoint (uint 8)

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint8(this.statType);
        writeHandle.writeUint8(this.statLevel);
        writeHandle.writeUint8(this.statPoint);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.statType = readHandle.readUint8();
        this.statLevel = readHandle.readUint8();
        this.statPoint = readHandle.readUint8();
    }
}

export { S2C_CharacterStatLevelUpResponsePacket };