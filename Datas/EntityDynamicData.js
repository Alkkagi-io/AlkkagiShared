import { SerializableData } from '../Modules/SerializableData.js';
import { EEntityType } from './EEntityType.js';

class EntityDynamicData extends SerializableData {
    constructor(entity) {
        super()

        this.entityType = entity?.getEntityType() ?? EEntityType.None; // do not serialize
        this.entityID = entity?.getID() ?? 0;
    }

    getFlexibleSize() {
        let size = 0;
        size += 4; // entityID (uint32)
        return size;
    }

    onSerialize(writeHandle) {
        writeHandle.writeUint16(this.entityID);
    }

    onDeserialize(readHandle) {
        this.entityID = readHandle.readUint16();
    }
}

export { EntityDynamicData };