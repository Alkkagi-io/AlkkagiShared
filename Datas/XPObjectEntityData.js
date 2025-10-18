import { EntityData } from './index.js';

class XPObjectEntityData extends EntityData {
    constructor(xpObject) {
        super(xpObject);
        this.thisIsXPObject = false;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 1; // thisIsXPObject (uint8)
        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint8(this.thisIsXPObject ? 1 : 0);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.thisIsXPObject = readHandle.readUint8() === 1;
    }
}

export { XPObjectEntityData };