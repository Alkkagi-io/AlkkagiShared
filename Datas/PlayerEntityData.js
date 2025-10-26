import { CharacterEntityData } from './CharacterEntityData.js';
import { EEntityType } from './EEntityType.js';

class PlayerEntityData extends CharacterEntityData {
    constructor(player) {
        super(player);
        this.entityType = EEntityType.Player;
        this.level = player?.levelComponent?.level ?? 0;
        this.exp = player?.levelComponent?.xpAmount ?? 0;
        this.score = player?.score ?? 0;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 4; // level
        size += 4; // exp
        size += 4; // score
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint16(this.level);
        writeHandle.writeUint16(this.exp);
        writeHandle.writeUint16(this.score);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.level = readHandle.readUint16();
        this.exp = readHandle.readUint16();
        this.score = readHandle.readUint16();
    }
}

export { PlayerEntityData };