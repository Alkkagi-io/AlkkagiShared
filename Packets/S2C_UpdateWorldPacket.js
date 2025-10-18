import { getBytesHeaderSize } from '../Modules/BufferHandle.js';
import { Packet, EPacketID } from "./index.js";
import { EntityDataFactory } from "../Datas/index.js"

class S2C_UpdateWorldPacket extends Packet {
    constructor(entities = []) {
        super();

        this.entityDatas = [];
        this.entityDatasSize = 0;
        entities.forEach(entity => {
            const entityData = EntityDataFactory.createEntityData(entity.getEntityType(), entity);
            if(entityData == null)
                return;

            this.entityDatasSize += entityData.getFlexibleSize();
            this.entityDatasSize += getBytesHeaderSize(); // Bytes Size Header
            this.entityDatasSize += 1; // EntityType Header (uint8)

            this.entityDatas.push(entityData);
        });
    }

    getPacketID() {
        return EPacketID.S2C_UpdateWorld;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 2; // entityDatas length (uint16)
        size += this.entityDatasSize;

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint16(this.entityDatas.length);
        for(let i = 0; i < this.entityDatas.length; ++i)
        {
            const entityData = this.entityDatas[i];
            writeHandle.writeUint8(entityData.entityType);
            writeHandle.writeArrayBuffer(entityData.serialize());
        }
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        const entityDatasLength = readHandle.readUint16();
        for(let i = 0; i < entityDatasLength; ++i)
        {
            const entityType = readHandle.readUint8();
            const entityData = EntityDataFactory.createEntityData(entityType, null);
            if(entityData == null)
                return;

            entityData.deserialize(readHandle.readArrayBuffer());
            entityData.entityType = entityType;
            this.entityDatas.push(entityData);
        }
    }
}

export { S2C_UpdateWorldPacket };