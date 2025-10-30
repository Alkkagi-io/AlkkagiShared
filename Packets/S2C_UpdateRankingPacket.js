import { getBytesHeaderSize } from '../Modules/BufferHandle.js';
import { Packet, EPacketID } from "./index.js";

class S2C_UpdateRankingPacket extends Packet {
    constructor(rankingPlayers = []) {
        super();

        this.rankingPlayerIds = [];
        this.rankingPlayerScores = [];
        rankingPlayers.forEach(player => {
            this.rankingPlayerIds.push(player.entityID);
            this.rankingPlayerScores.push(player.score);
        });
    }

    getPacketID() {
        return EPacketID.S2C_UpdateRankingPacket;
    }

    getFlexibleSize() {
        let size = super.getFlexibleSize();

        size += 2; // rankingDataLength
        size += this.rankingPlayerIds.length * 4; // id(2) + score(2)

        return size;
    }

    onSerialize(writeHandle) {
        super.onSerialize(writeHandle);

        writeHandle.writeUint16(this.rankingPlayerIds.length);
        for(let i = 0; i < this.rankingPlayerIds.length; ++i) {
            writeHandle.writeUint16(this.rankingPlayerIds[i]);
            writeHandle.writeUint16(this.rankingPlayerScores[i]);
        }
    }

    onDeserialize(readHandle) {
        super.onDeserialize(readHandle);

        const rankingDataLength = readHandle.readUint16();
        for(let i = 0; i < rankingDataLength; ++i) {
            const id = readHandle.readUint16();
            const score = readHandle.readUint16();

            this.rankingPlayerIds.push(id);
            this.rankingPlayerScores.push(score);
        }
    }
}

export { S2C_UpdateRankingPacket };