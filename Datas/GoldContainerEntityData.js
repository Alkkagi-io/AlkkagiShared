import { EntityData } from './index.js';

class GoldContainerEntityData extends EntityData {
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