import { getBytesHeaderSize, getFlexiableUTF8Size } from '../Modules/BufferHandle.js';
import { DamagableEntityDynamicData } from './DamagableEntityDynamicData.js';
import { Vector } from '../Modules/Vector.js';

class CharacterEntityDynamicData extends DamagableEntityDynamicData {
    constructor(character) {
        super(character);
        this.position = character?.position ?? new Vector();
        this.scale = character?.scale ?? 1;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += this.position.getFlexibleSize() + getBytesHeaderSize(); // position
        size += 4; // scale
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeArrayBuffer(this.position.serialize());
        writeHandle.writeUint32(this.scale);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.position = new Vector().deserialize(readHandle.readArrayBuffer());
        this.scale = readHandle.readUint32();
    }
}

export { CharacterEntityDynamicData };
