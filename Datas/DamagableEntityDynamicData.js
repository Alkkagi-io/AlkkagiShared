import { EntityDynamicData } from "./EntityDynamicData.js";

class DamagableEntityDynamicData extends EntityDynamicData {
    constructor(entity) {
        super(entity);
        const healthComponent = entity?.healthComponent ?? undefined;
        const ratio = (healthComponent ? healthComponent.currentHP / healthComponent.maxHPProvider() : 0) * 100;
        this.hpPer = Math.round(ratio);
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 1; // hpPer (uint16)
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint8(this.hpPer);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.hpPer = readHandle.readUint8();
    }
}

export { DamagableEntityDynamicData };
