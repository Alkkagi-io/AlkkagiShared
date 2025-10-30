import { getBytesHeaderSize } from '../Modules/BufferHandle.js';
import { EntityStaticData } from './EntityStaticData.js';
import { Vector } from '../Modules/Vector.js';

class StaticEntityStaticData extends EntityStaticData {
    constructor(entity) {
        super(entity);
        this.position = entity?.position ?? new Vector();
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += this.position.getFlexibleSize() + getBytesHeaderSize(); // position + header
        return size;
    }
    
    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeArrayBuffer(this.position.serialize());
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.position = new Vector().deserialize(readHandle.readArrayBuffer());
    }
}

export { StaticEntityStaticData };
