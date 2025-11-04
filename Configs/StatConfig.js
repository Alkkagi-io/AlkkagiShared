const Type = {
    WEIGHT: 0,
    MAX_HP: 1,
    ATK_COOLTIME: 2,
    POWER: 3,
    MOVE_SPEED: 4,
    AUTO_HEAL: 5,
};

const DefaultValue = {
    [Type.WEIGHT]: 1.5,
    [Type.MAX_HP]: 100,
    [Type.ATK_COOLTIME]: 2,
    [Type.POWER]: 15,
    [Type.MOVE_SPEED]: 4,
    [Type.AUTO_HEAL]: 1.5
};

export const StatConfig = { Type, DefaultValue };