import { EntityData } from './index.js';
import { DamagableEntityData } from './DamagableEntityData.js';

class GoldContainerEntityData extends DamagableEntityData {
    constructor(goldContainer) {
        super(goldContainer);
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

export { GoldContainerEntityData };