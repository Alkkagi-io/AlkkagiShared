import { EntityData } from './index.js';

class CharacterEntityData extends EntityData {
    constructor(character) {
        super(character);
        this.thisIsCharacter = true;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 1; // thisIsCharacter (uint8)
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint8(this.thisIsCharacter ? 1 : 0);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.thisIsCharacter = readHandle.readUint8() === 1;
    }
}

export { CharacterEntityData };