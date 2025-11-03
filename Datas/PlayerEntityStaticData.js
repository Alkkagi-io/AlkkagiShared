import { EEntityType } from './EEntityType.js';
import { CharacterEntityStaticData } from './CharacterEntityStaticData.js';

class PlayerEntityStaticData extends CharacterEntityStaticData {
    constructor(player) {
        super(player);
        this.entityType = EEntityType.Player;
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

export { PlayerEntityStaticData };
