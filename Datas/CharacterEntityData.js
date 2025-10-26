import { getFlexiableUTF8Size } from '../Modules/BufferHandle.js';
import { EntityData } from './EntityData.js';

class CharacterEntityData extends EntityData {
    constructor(character) {
        super(character);
        this.name = character?.nickname ?? "";
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += getFlexiableUTF8Size(this.name) // name
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeStringUTF8(this.name);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.name = readHandle.readStringUTF8();
    }
}

export { CharacterEntityData };