const EPacketID = {
    Message: 0,
    Vector: 1,
    S2C_UpdateWorld: 2,
    C2S_EnterWorldRequest: 3,
    S2C_EnterWorldResponse: 4,
    C2S_MoveInput: 5,
    C2S_StartAttackCharging: 6,
    C2S_FinishAttackCharging: 7,
    C2S_BuyItem: 8,
    S2C_CharacterLevelUp: 9,
    C2S_CharacterStatLevelUpRequest: 10,
    S2C_CharacterStatLevelUpResponse: 11,
    S2C_UpdateRankingPacket: 12,
    S2C_AddPlayerPacket: 13,
    S2C_RemovePlayerPacket: 14,
    S2C_AddBuffPacket: 15,
    S2C_RemoveBuffPacket: 16
};

export { EPacketID };