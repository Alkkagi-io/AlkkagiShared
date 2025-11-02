import { StaticEntityStaticData } from './StaticEntityStaticData.js';

class XPContainerEntityStaticData extends StaticEntityStaticData {
    constructor(entity) {
        super(entity);
        this.xpUnit = entity?.xpUnit ?? 0;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 1; // xpUnit (uint8)
        return size;
    }
    
    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint8(this.xpUnit);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.xpUnit = readHandle.readUint8();
    }
}

export { XPContainerEntityStaticData };
