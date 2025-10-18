import { EntityData } from './index.js';

class XPContainerEntityData extends EntityData {
    constructor(xpContainer) {
        super(xpContainer);
        this.thisIsXPContainer = true;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 1; // thisIsXPContainer (uint8)
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint8(this.thisIsXPContainer ? 1 : 0);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.thisIsXPContainer = readHandle.readUint8() === 1;
    }
}

export { XPContainerEntityData };