import { StatConfig } from "../../src/Stat/StatConfig.js";
import { parseToInteger, parseToFloat } from "./DataParseHelper.js";
import { ResourceBase } from "./ResourceBase.js";

const ELevelUpType = {
    ADD_WEIGHT_PER: 1,
    ADD_MAX_CHARGE_LEN_PER: 2,
    ADD_MAX_HP_PER: 3,
    ADD_MOVE_SPEED_PER: 4,
    REDUCE_ATK_COOLTIME_PER: 5,
    AUTO_HEAL: 6
};

class ResourceLevelUp extends ResourceBase {
    constructor() {
        super();
        this.icon = "";
        this.levelUpEffect = "";
        this.maxLevel = 0;
        this.levelValues = [];
    }

    init(id, dict) {
        super.init(id, dict);

        this.icon = this.getDictValue("Icon", "");
        this.levelUpEffect = this.getDictValue("LevelUpEffect", "");
        this.maxLevel = this.getDictValueInt("MaxLevel", 0);
        this.levelValues = this.getDictValue("LevelValues");
    }

    getLevelValue(level) {
        if (level > this.maxLevel)
            throw new Error('Invalid level exception');

        return this.levelValues[level];
    }

    isPercentage() {
        return this.id !== ELevelUpType.AUTO_HEAL;
    }

    static getByStatType(type) {
        switch (type) {
            case StatConfig.Type.WEIGHT:
                return this.get(ELevelUpType.ADD_WEIGHT_PER);
            case StatConfig.Type.MAX_HP:
                return this.get(ELevelUpType.ADD_MAX_HP_PER);
            case StatConfig.Type.ATK_COOLTIME:
                return this.get(ELevelUpType.REDUCE_ATK_COOLTIME_PER);
            case StatConfig.Type.AUTO_HEAL:
                return this.get(ELevelUpType.AUTO_HEAL);
            case StatConfig.Type.MAX_CHARGE_LEN:
                return this.get(ELevelUpType.ADD_MAX_CHARGE_LEN_PER);
            case StatConfig.Type.MOVE_SPEED:
                return this.get(ELevelUpType.ADD_MOVE_SPEED_PER);
            default:
                return null;
        }
    }
}

export { ResourceLevelUp, ELevelUpType };