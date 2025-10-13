import { parseToInteger, parseToFloat } from "./DataParseHelper.js";
import { ResourceBase } from "./ResourceBase.js";

const EStatType = {
    WEIGHT: 1,
    MAX_CHARGE_LEN: 2,
    MAX_HP: 3,
    MOVE_SPEED: 4,
    ATK_COOLTIME: 5,
    AUTO_HEAL: 6
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