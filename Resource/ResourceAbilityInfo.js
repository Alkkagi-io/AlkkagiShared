import { StatConfig } from "../Configs/StatConfig.js";
import { parseToInteger, parseToFloat } from "./DataParseHelper.js";
import { ResourceBase } from "./ResourceBase.js";
import { EAbilityType } from "../Datas/EAbilityType.js";

class ResourceAbilityInfo extends ResourceBase {
    static _entryAbilityInfos = [];
    static _trailingAbilityInfosMap = new Map();

    constructor() {
        super();

        this.precedingAbilityID = "";
        this.abilityType = EAbilityType.None;
    }

    init(id, dict) {
        super.init(id, dict);

        this.precedingAbilityID = this.getDictValue("PrecedingAbilityID", "");
        this.abilityType = EAbilityType[this.getDictValue("AbilityType", "None")];
    }

    static indexing() {
        for(const abilityInfo of this.getAll().values()) {
            if(abilityInfo.precedingAbilityID == null || abilityInfo.precedingAbilityID == "") {
                this._entryAbilityInfos.push(abilityInfo);
            }

            let trailingAbilities = this._trailingAbilityInfosMap.get(abilityInfo.precedingAbilityID);
            if(trailingAbilities == null) {
                trailingAbilities = [];
                this._trailingAbilityInfosMap.set(abilityInfo.precedingAbilityID, trailingAbilities);
            }

            trailingAbilities.push(abilityInfo);
        }
    }

    static getEntryAbilityInfos() {
        return this._entryAbilityInfos;
    }

    static getTrailingAbilityInfos(abilityID) {
        const trailingAbilityInfos = this._trailingAbilityInfosMap.get(abilityID);
        return trailingAbilityInfos;
    }
}

export { ResourceAbilityInfo };