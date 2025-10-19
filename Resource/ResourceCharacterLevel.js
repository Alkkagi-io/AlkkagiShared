import { StatConfig } from "../../src/Stat/StatConfig.js";
import { parseToInteger, parseToFloat } from "./DataParseHelper.js";
import { ResourceBase } from "./ResourceBase.js";

class ResourceCharacterLevel extends ResourceBase {
    constructor() {
        super();
        this.level = 0;
        this.requiredXP = 0; // total required xp.
    }

    init(id, dict) {
        super.init(id, dict);

        this.level = this.getDictValueInt("Level", 0);
        this.requiredXP = this.getDictValueInt("RequiredXP", 0);
    }
}

export { ResourceCharacterLevel };