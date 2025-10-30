import { EEntityType } from './EEntityType.js';
import { CharacterEntityDynamicData } from './CharacterEntityDynamicData.js';

class PlayerEntityDynamicData extends CharacterEntityDynamicData {
    constructor(player) {
        super(player);

        this.entityType = EEntityType.Player;

        this.exp = player?.levelComponent?.xpAmount ?? 0;
        this.score = player?.score ?? 0;

        const attackComponent = player?.attackComponent ?? undefined;
        const remainAtkCoolRatio = (attackComponent?.getRemainAttackCooltimePer() ?? 0) * 100;
        this.remainAtkCoolPer = Math.round(remainAtkCoolRatio);

        const chargingRatio = (attackComponent?.getChargingPer() ?? 0) * 100;
        this.chargingPer = Math.round(chargingRatio);
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 2; // exp
        size += 2; // score
        size += 2; // remainAtkCoolPer
        size += 2; // chargingPer
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint16(this.exp);
        writeHandle.writeUint16(this.score);
        writeHandle.writeUint16(this.remainAtkCoolPer);
        writeHandle.writeUint16(this.chargingPer);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.exp = readHandle.readUint16();
        this.score = readHandle.readUint16();
        this.remainAtkCoolPer = readHandle.readUint16();
        this.chargingPer = readHandle.readUint16();
    }
}

export { PlayerEntityDynamicData };
