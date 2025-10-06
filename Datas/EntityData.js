import { SerializableData } from "../Modules/SerializableData";
import { Vector } from "../Modules/Vector";

class EntityData extends SerializableData {
    constructor(entity) {
        super()

        if(entity === undefined)
        {
            this.entityID = 0;
            this.position = new Vector();
        }
        else
        {
            this.entityID = entity.entityID;
            this.position = entity.position;
        }
    }

    getFlexiableSize() {
        let size = 0;
        size += 2; // entityID uint16
        size += this.position.getFlexiableSize(); // position
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