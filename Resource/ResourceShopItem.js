const { ResourceBase } = require("./ResourceBase.js");

class ResourceShopItem extends ResourceBase {
    constructor() {
        super();
        this.price = 0;
        this.ability = {};
    }

    init(id, dict) {
        super(id, dict);
        this.price = this.getDictValueInt("Price");
        this.ability = this.getDictValue("Ability");
    }
}

export { ResourceShopItem };