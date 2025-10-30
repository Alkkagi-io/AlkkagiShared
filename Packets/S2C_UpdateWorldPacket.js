import { getBytesHeaderSize } from '../Modules/BufferHandle.js';
import { Packet, EPacketID } from "./index.js";
import { EEntityType, EntityDataFactory } from "../Datas/index.js"

class S2C_UpdateWorldPacket extends Packet {
    constructor(elapsedMS = 0, clientPlayerEntity = null, appearedEntities = [], nearbyEntities = [], disappearedEntities = []) {
        super();

        this.elapsedMS = elapsedMS;
        
        this.appearedEntityStaticDataSize = 0;
        this.appearedEntityStaticDatas = [];
        appearedEntities.forEach(entity => {
            const entityDataBundle = this._createEntityData(clientPlayerEntity, entity, EntityDataFactory.createEntityStaticData);
            if(entityDataBundle == null)
                return;
            
            this.appearedEntityStaticDataSize += entityDataBundle.dataSize;
            this.appearedEntityStaticDatas.push(entityDataBundle.entityData);
        });
        
        this.nearbyEntityDynamicDataSize = 0;
        this.nearbyEntityDynamicDatas = [];
        nearbyEntities.forEach(entity => {
            const entityDataBundle = this._createEntityData(clientPlayerEntity, entity, EntityDataFactory.createEntityDynamicData);
            if(entityDataBundle == null)
                return;
            
            this.nearbyEntityDynamicDataSize += entityDataBundle.dataSize;
            this.nearbyEntityDynamicDatas.push(entityDataBundle.entityData);
        });

        this.disappearedEntityIDs = [];
        disappearedEntities.forEach(entity => {
            this.disappearedEntityIDs.push(entity.entityID);
        });
    }

    _createEntityData(clientPlayerEntity, entity, factory) {
        const entityType = entity == clientPlayerEntity ? EEntityType.Player : entity.getEntityType();
        const entityData = factory(entityType, entity);

        if(entityData == null)
            return null;
        
        return { 
            dataSize: entityData.getFlexibleSize() + getBytesHeaderSize() + 1, // flexible data size + byte header + entity type header(uint8)
            entityData: entityData
        };
    }

    getPacketID() {
        return EPacketID.S2C_UpdateWorld;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 2; // elapsedMS (uint16)
        size += this.appearedEntityStaticDataSize + 2; // appearedEntityStaticDataSize + length (uint16)
        size += this.nearbyEntityDynamicDataSize + 2; // nearbyEntityDynamicDataSize + length (uint16)
        size += this.disappearedEntityIDs.length * 4 + 2; // disappearedEntityIDsSize + length (uint16)

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint16(this.elapsedMS);
        this._writeEntityDatas(writeHandle, this.appearedEntityStaticDatas);
        this._writeEntityDatas(writeHandle, this.nearbyEntityDynamicDatas);

        writeHandle.writeUint16(this.disappearedEntityIDs.length);
        for(let i = 0; i < this.disappearedEntityIDs.length; ++i) {
            writeHandle.writeUint32(this.disappearedEntityIDs[i]);
        }
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        this.elapsedMS = readHandle.readUint16();
        this._readEntityDatas(readHandle, EntityDataFactory.createEntityStaticData, this.appearedEntityStaticDatas);
        this._readEntityDatas(readHandle, EntityDataFactory.createEntityDynamicData, this.nearbyEntityDynamicDatas);
        
        const disappearedEntityIDsLength = readHandle.readUint16();
        for(let i = 0; i < disappearedEntityIDsLength; ++i) {
            this.disappearedEntityIDs.push(readHandle.readUint32());
        }
    }

    _writeEntityDatas(writeHandle, entityDatas) {
        writeHandle.writeUint16(entityDatas.length);
        for(let i = 0; i < entityDatas.length; ++i) {
            const entityData = entityDatas[i];
            writeHandle.writeUint8(entityData.entityType);
            writeHandle.writeArrayBuffer(entityData.serialize());
        }
    }

    _readEntityDatas(readHandle, factory, entityDatas) {
        const entityDataLength = readHandle.readUint16();
        for (let i = 0; i < entityDataLength; ++i) {
            const entityType = readHandle.readUint8();
            const entityData = factory(entityType, null);
            if (entityData == null)
                return;

            entityData.deserialize(readHandle.readArrayBuffer());
            entityData.entityType = entityType;

            entityDatas.push(entityData);
        }
    }
}

export { S2C_UpdateWorldPacket };