import { EEntityType } from './EEntityType.js';
import { CharacterEntityDynamicData } from './CharacterEntityDynamicData.js';

class PlayerEntityDynamicData extends CharacterEntityDynamicData {
    constructor(player) {
        super(player);

        this.entityType = EEntityType.Player;

        this.exp = player?.levelComponent?.xpAmount ?? 0;
        this.score = player?.score ?? 0;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 2; // exp
        size += 2; // score
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint16(this.exp);
        writeHandle.writeUint16(this.score);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.exp = readHandle.readUint16();
        this.score = readHandle.readUint16();
    }
}

export { PlayerEntityDynamicData };
