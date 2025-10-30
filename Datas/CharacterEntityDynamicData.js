import { getBytesHeaderSize, getFlexiableUTF8Size } from '../Modules/BufferHandle.js';
import { DamagableEntityDynamicData } from './DamagableEntityDynamicData.js';
import { Vector } from '../Modules/Vector.js';

class CharacterEntityDynamicData extends DamagableEntityDynamicData {
    constructor(character) {
        super(character);
        this.position = character?.position ?? new Vector();
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += this.position.getFlexibleSize() + getBytesHeaderSize(); // position
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeArrayBuffer(this.position.serialize());
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.position = new Vector().deserialize(readHandle.readArrayBuffer());
    }
}

export { CharacterEntityDynamicData };
