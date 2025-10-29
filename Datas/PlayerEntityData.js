import { CharacterEntityData } from './CharacterEntityData.js';
import { EEntityType } from './EEntityType.js';

class PlayerEntityData extends CharacterEntityData {
    constructor(player) {
        super(player);
        this.entityType = EEntityType.Player;
        // this.level = player?.levelComponent?.level ?? 0;
        this.exp = player?.levelComponent?.xpAmount ?? 0;
        this.score = player?.score ?? 0;

        const attackComponent = player?.attackComponent ?? undefined;
        const remainAtkCoolRatio = attackComponent?.getRemainAttackCooltimePer() * 100 ?? 0;
        this.remainAtkCoolPer = Math.round(remainAtkCoolRatio);

        const chargingRatio = attackComponent?.getChargingPer() * 100 ?? 0;
        this.chargingPer = Math.round(chargingRatio);
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        // size += 4; // level
        size += 4; // exp
        size += 4; // score
        size += 4; // remainAtkCoolPer
        size += 4; // chargingPer
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        // writeHandle.writeUint16(this.level);
        writeHandle.writeUint16(this.exp);
        writeHandle.writeUint16(this.score);
        writeHandle.writeUint16(this.remainAtkCoolPer);
        writeHandle.writeUint16(this.chargingPer);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        // this.level = readHandle.readUint16();
        this.exp = readHandle.readUint16();
        this.score = readHandle.readUint16();
        this.remainAtkCoolPer = readHandle.readUint16();
        this.chargingPer = readHandle.readUint16();
    }
}

export { PlayerEntityData };