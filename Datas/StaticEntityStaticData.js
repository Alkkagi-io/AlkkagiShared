import { getBytesHeaderSize } from '../Modules/BufferHandle.js';
import { EntityStaticData } from './EntityStaticData.js';
import { Vector } from '../Modules/Vector.js';

class StaticEntityStaticData extends EntityStaticData {
    constructor(entity) {
        super(entity);
        this.position = entity?.position ?? new Vector();
        this.scale = entity?.scale ?? 1;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();
        size += this.position.getFlexibleSize() + getBytesHeaderSize(); // position + header
        size += 4; // scale
        return size;
    }
    
    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);
        writeHandle.writeArrayBuffer(this.position.serialize());
        writeHandle.writeUint32(this.scale);
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);
        this.position = new Vector().deserialize(readHandle.readArrayBuffer());
        this.scale = readHandle.readUint32();
    }
}

export { StaticEntityStaticData };
