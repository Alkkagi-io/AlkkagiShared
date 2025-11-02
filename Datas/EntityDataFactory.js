import { EEntityType } from './EEntityType.js';
import { EntityDynamicData } from './EntityDynamicData.js';
import { StaticEntityStaticData } from './StaticEntityStaticData.js';
import { DamagableEntityDynamicData } from './DamagableEntityDynamicData.js';
import { PlayerEntityDynamicData } from './PlayerEntityDynamicData.js';
import { CharacterEntityDynamicData } from './CharacterEntityDynamicData.js';
import { CharacterEntityStaticData } from './CharacterEntityStaticData.js';
import { XPObjectEntityStaticData } from './XPObjectEntityStaticData.js';
import { XPContainerEntityStaticData } from './XPContainerEntityStaticData.js';

class EntityDataFactory {
    static entityStaticDataFactories = { };
    static entityDynamicDataFactories = { };

    constructor() {
        throw new Error("EntityDataFactory is a static class and cannot be instantiated");
    }

    static on(entityType, EntityStaticDataType, EntityDynamicDataType) {
        EntityDataFactory.entityStaticDataFactories[entityType] = EntityStaticDataType;
        EntityDataFactory.entityDynamicDataFactories[entityType] = EntityDynamicDataType;
    }

    static createEntityStaticData(entityType, entity) {
        if(entityType == EEntityType.None) {
            throw new Error(`Entity type is not set`);
        }

        const factory = EntityDataFactory.entityStaticDataFactories[entityType];
        if(factory == null) {
            return null;
        }

        return new factory(entity);
    }

    static createEntityDynamicData(entityType, entity) {
        if(entityType == EEntityType.None) {
            throw new Error(`Entity type is not set`);
        }

        const factory = EntityDataFactory.entityDynamicDataFactories[entityType];
        if(factory == null) {
            return null;
        }

        return new factory(entity);
    }
}

EntityDataFactory.on(EEntityType.XPObject, XPObjectEntityStaticData, null);
EntityDataFactory.on(EEntityType.XPContainer, XPContainerEntityStaticData, DamagableEntityDynamicData);
EntityDataFactory.on(EEntityType.GoldContainer, StaticEntityStaticData, DamagableEntityDynamicData);
EntityDataFactory.on(EEntityType.Player, CharacterEntityStaticData, PlayerEntityDynamicData);
EntityDataFactory.on(EEntityType.BotPlayer, CharacterEntityStaticData, CharacterEntityDynamicData);

export { EntityDataFactory };
