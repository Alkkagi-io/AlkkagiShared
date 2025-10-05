import { parseToInteger, parseToFloat } from "./DataParseHelper.js";
import { ResourceBase } from "./ResourceBase.js";

class ResourceStat extends ResourceBase {
    constructor() {
        super();
        this.icon = "";
        this.levelUpEffect = "";
        this.maxLevel = 0;
        this.levelInfos = {};
    }

    init(id, dict) {
        super.init(id, dict);

        this.icon = this.getDictValue("Icon", "");
        this.levelUpEffect = this.getDictValue("LevelUpEffect", "");
        this.maxLevel = this.getDictValueInt("MaxLevel", 0);

        const raw = this.getDictValue("Levels");
        const baseInfo = raw["1"];
        if (!baseInfo) 
            throw new Error("Not exist level info exception");

        this.levelInfos = {};
        for (const [levelKey, dict] of Object.entries(raw)) {
            const level = parseToInteger(levelKey);
            this.levelInfos[level] = level === 1 ? { ...baseInfo } : { ...baseInfo, ...dict };
        }
    }

    getLevelValue(level, key) {
        return this.levelInfos[level][key];
    }

    getLevelValueInteger(level, key, defaultValue = 0) {
        const n = parseToInteger(this.levelInfos[level][key]);
        return Number.isFinite(n) ? n : defaultValue;
    }

    getLevelValueFloat(level, key, defaultValue = 0) {
        const n = parseToFloat(this.levelInfos[level][key]);
        return Number.isFinite(n) ? n : defaultValue;
    }
}

export { ResourceStat };