import { parseToInteger, parseToBoolean, parseToFloat } from "./DataParseHelper.js";
import { ResourceBase } from "./ResourceBase.js";

class ResourceShopItem extends ResourceBase {
    constructor() {
        super();
        this.price = 0;
        this.ability = {};
    }

    init(id, dict) {
        super.init(id, dict);
        this.price = this.getDictValueInt("Price");
        this.ability = this.getDictValue("Ability");
    }

    getAbilityValue(key, defaultValue = "") {
        return this.ability[key];
    }

    getAbilityValueInt(key, defaultValue = 0) {
        const n = parseToInteger(this.ability[key]);
        return Number.isFinite(n) ? n : defaultValue;
    }

    getAbilityValueFloat(key, defaultValue = 0) {
        const n = parseToFloat(this.ability[key]);
        return Number.isFinite(n) ? n : defaultValue;
    }

    getAbilityValueBool(key, defaultValue = false) {
        const b = parseToBoolean(this.ability[key]);
        return (b === undefined || b === null) ? defaultValue : Boolean(b);
    }
}

export { ResourceShopItem };