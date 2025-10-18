import { getBytesHeaderSize } from '../Modules/BufferHandle.js';
import { SerializableData } from '../Modules/SerializableData.js';
import { Vector } from '../Modules/Vector.js';
import { EEntityType } from './index.js';

class EntityData extends SerializableData {
    constructor(entity) {
        super()

        this.entityType = entity?.getEntityType() ?? EEntityType.None; // do not serialize
        this.entityID = entity?.getID() ?? 0;
        this.position = entity?.position ?? new Vector();
    }

    getFlexibleSize() {
        let size = 0;
        size += 4; // entityID (uint32)
        size += this.position.getFlexibleSize() + getBytesHeaderSize(); // position
        return size;
    }

    onSerialize(writeHandle) {
        writeHandle.writeUint16(this.entityID);
        writeHandle.writeArrayBuffer(this.position.serialize());
    }

    onDeserialize(readHandle) {
        this.entityID = readHandle.readUint16();
        this.position = new Vector().deserialize(readHandle.readArrayBuffer());
    }
}

export { EntityData };