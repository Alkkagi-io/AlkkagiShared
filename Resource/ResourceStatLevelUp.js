import { StatConfig } from "../Configs/StatConfig.js";
import { parseToInteger, parseToFloat } from "./DataParseHelper.js";
import { ResourceBase } from "./ResourceBase.js";

const EStatLevelUpType = {
    ADD_WEIGHT: 1,
    ADD_POWER: 2,
    ADD_MAX_HP: 3,
    ADD_MOVE_SPEED: 4,
    REDUCE_ATK_COOLTIME: 5,
    AUTO_HEAL: 6
};

class ResourceStatLevelUp extends ResourceBase {
    constructor() {
        super();
        this.icon = "";
        this.levelUpEffect = "";
        this.maxLevel = 0;
        this.isPercentage = false;
        this.levelValues = [];
    }

    init(id, dict) {
        super.init(id, dict);

        this.icon = this.getDictValue("Icon", "");
        this.levelUpEffect = this.getDictValue("LevelUpEffect", "");
        this.maxLevel = this.getDictValueInt("MaxLevel", 0);
        this.isPercentage = this.getDictValueBool("IsPercentage", false);
        this.levelValues = this.getDictValue("LevelValues");
    }

    getLevelValue(level) {
        if (level > this.maxLevel)
            throw new Error('Invalid level exception');

        return this.levelValues[level];
    }

    static getByStatType(type) {
        switch (type) {
            case StatConfig.Type.WEIGHT:
                return this.get(EStatLevelUpType.ADD_WEIGHT);
            case StatConfig.Type.MAX_HP:
                return this.get(EStatLevelUpType.ADD_MAX_HP);
            case StatConfig.Type.ATK_COOLTIME:
                return this.get(EStatLevelUpType.REDUCE_ATK_COOLTIME);
            case StatConfig.Type.AUTO_HEAL:
                return this.get(EStatLevelUpType.AUTO_HEAL);
            case StatConfig.Type.POWER:
                return this.get(EStatLevelUpType.ADD_POWER);
            case StatConfig.Type.MOVE_SPEED:
                return this.get(EStatLevelUpType.ADD_MOVE_SPEED);
            default:
                return null;
        }
    }
}

export { ResourceStatLevelUp, EStatLevelUpType };