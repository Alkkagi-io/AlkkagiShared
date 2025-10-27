import { EStatLevelUpType } from "../Resource/ResourceStatLevelUp.js";
import { Packet, EPacketID } from "./index.js";

class C2S_CharacterStatLevelUpRequestPacket extends Packet {
    constructor(statLevelUpType = EStatLevelUpType.ADD_WEIGHT_PER) {
        super();
        
        this.statLevelUpType = statLevelUpType;
    }

    getPacketID() {
        return EPacketID.C2S_CharacterStatLevelUpRequest;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 1 // statLevelUpType (uint 8)

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint8(this.statLevelUpType);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.statLevelUpType = readHandle.readUint8();
    }
}

export { C2S_CharacterStatLevelUpRequestPacket };