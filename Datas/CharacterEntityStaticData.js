import { getBytesHeaderSize, getFlexiableUTF8Size } from '../Modules/BufferHandle.js';
import { EntityStaticData } from './EntityStaticData.js';
import { Vector } from '../Modules/Vector.js';

class CharacterEntityStaticData extends EntityStaticData {
    constructor(character) {
        super(character);
        this.position = character?.position ?? new Vector();
        this.scale = character?.scale ?? 1;
        this.abilityID = character?.abilityComponent?.ability?.abilityID ?? "";
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += this.position.getFlexibleSize() + getBytesHeaderSize(); // position
        size += 4; // scale
        size += 1; // abilityID
        return size;
    }
 
    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeArrayBuffer(this.position.serialize());
        writeHandle.writeFloat32(this.scale);
        writeHandle.writeUint8(this.abilityID);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.position = new Vector().deserialize(readHandle.readArrayBuffer());
        this.scale = readHandle.readFloat32();
        this.abilityID = readHandle.readUint8();
    }
}

export { CharacterEntityStaticData };
