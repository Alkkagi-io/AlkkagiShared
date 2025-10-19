import { EntityData } from './index.js';

class CharacterEntityData extends EntityData {
    constructor(character) {
        super(character);
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
    }
}

export { CharacterEntityData };