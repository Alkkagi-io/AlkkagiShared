import { parseToInteger, parseToFloat } from "./DataParseHelper.js";
import { ResourceBase } from "./ResourceBase.js";

const EStatType = {
    ADD_WEIGHT_PER: 1,
    ADD_MAX_HP_PER: 2,
    AUTO_HEAL_PER_MIN: 3,
    ATK_COOLDOWN_PER: 4,
    ADD_MAX_CHARGE_LEN_PER: 5,
    ADD_MOVE_SPEED_PER: 6,
};

class ResourceStat extends ResourceBase {
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
}

export { ResourceStat, EStatType };