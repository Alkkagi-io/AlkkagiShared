import { Packet, EPacketID } from "./index.js";

class S2C_CharacterLevelUpPacket extends Packet {
    constructor(currentLevel = 0, currentStatPoint = 0) {
        super();
        
        this.currentLevel = currentLevel;
        this.currentStatPoint = currentStatPoint;
    }

    getPacketID() {
        return EPacketID.S2C_CharacterLevelUp;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 1 // currentLevel (uint 8)
        size += 1 // currentStatPoint (uint 8)

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint8(this.currentLevel);
        writeHandle.writeUint8(this.currentStatPoint);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.currentLevel = readHandle.readUint8();
        this.currentStatPoint = readHandle.readUint8();
    }
}

export { S2C_CharacterLevelUpPacket };