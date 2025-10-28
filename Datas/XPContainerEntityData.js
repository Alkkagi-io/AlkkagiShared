import { EntityData } from './index.js';
import { DamagableEntityData } from './DamagableEntityData.js';

class XPContainerEntityData extends DamagableEntityData {
    constructor(xpContainer) {
        super(xpContainer);
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

export { XPContainerEntityData };