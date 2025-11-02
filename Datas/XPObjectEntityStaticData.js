import { StaticEntityStaticData } from './StaticEntityStaticData.js';

class XPObjectEntityStaticData extends StaticEntityStaticData {
    constructor(entity) {
        super(entity);
        this.xpAmount = entity?.xpAmount ?? 0;
        this.lifeTime = entity?.lifeTime ?? 0;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += 1; // xpAmount (uint8)
        size += 1; // lifeTime (uint8)
        return size;
    }
    
    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeUint8(this.xpAmount);
        writeHandle.writeUint8(this.lifeTime);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.xpAmount = readHandle.readUint8();
        this.lifeTime = readHandle.readUint8();
    }
}

export { XPObjectEntityStaticData };
