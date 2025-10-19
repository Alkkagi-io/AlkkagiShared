import { EntityData } from './index.js';

class XPContainerEntityData extends EntityData {
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