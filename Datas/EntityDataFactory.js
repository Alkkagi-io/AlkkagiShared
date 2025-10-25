import { EEntityType, CharacterEntityData, XPObjectEntityData, XPContainerEntityData, GoldContainerEntityData, PlayerEntityData } from './index.js';

class EntityDataFactory {
    constructor() {
        throw new Error("EntityDataFactory is a static class and cannot be instantiated");
    }

    static on(entityType, EntityDataType) {
        this.entityDataFactories ??= { };
        this.entityDataFactories[entityType] = EntityDataType;
    }

    static createEntityData(entityType, entity) {
        if(entityType == EEntityType.None) {
            throw new Error(`Entity type is not set`);
        }

        const factory = this.entityDataFactories[entityType];
        if(factory == null) {
            throw new Error(`EntityDataFactory for entityType ${entityType} not found`);
        }

        return new factory(entity);
    }
}

EntityDataFactory.on(EEntityType.Player, PlayerEntityData);
EntityDataFactory.on(EEntityType.Character, CharacterEntityData);
EntityDataFactory.on(EEntityType.XPObject, XPObjectEntityData);
EntityDataFactory.on(EEntityType.XPContainer, XPContainerEntityData);
EntityDataFactory.on(EEntityType.GoldContainer, GoldContainerEntityData);

export { EntityDataFactory };