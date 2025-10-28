import { EntityData } from "./EntityData.js";

class DamagableEntityData extends EntityData {
    constructor(entity) {
        super(entity);
        const healthComponent = entity?.healthComponent ?? undefined;
        const ratio = (healthComponent ? healthComponent.currentHP / healthComponent.maxHPProvider() : 0) * 100;
        this.hpPer = Math.round(ratio);
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 2; // hpPer (uint16)
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint16(this.hpPer);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.hpPer = readHandle.readUint16();
    }
}

export { DamagableEntityData };