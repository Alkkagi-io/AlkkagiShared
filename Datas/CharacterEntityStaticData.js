import { getBytesHeaderSize, getFlexiableUTF8Size } from '../Modules/BufferHandle.js';
import { EntityStaticData } from './EntityStaticData.js';
import { Vector } from '../Modules/Vector.js';

class CharacterEntityStaticData extends EntityStaticData {
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

export { CharacterEntityStaticData };
