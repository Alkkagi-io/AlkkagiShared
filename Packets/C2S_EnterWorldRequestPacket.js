import { getFlexiableUTF8Size } from '../Modules/BufferHandle.js';
import { Packet, EPacketID } from "./index.js";

class C2S_EnterWorldRequestPacket extends Packet {
    constructor(nickname, isMobile) {
        super();

        this.nickname = nickname;
        this.isMobile = isMobile;
    }

    getPacketID() {
        return EPacketID.C2S_EnterWorldRequest;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += getFlexiableUTF8Size(this.nickname); // utf8 str (max 4 bytes)
        size += getUint8Size(this.isMobile);

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeStringUTF8(this.nickname);
        writeHandle.writeUint8(this.isMobile);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.nickname = readHandle.readStringUTF8();
        this.isMobile = readHandle.readUint8();
    }
}

export { C2S_EnterWorldRequestPacket };