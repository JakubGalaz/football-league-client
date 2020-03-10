import { Player } from "./Player";

export class PlayerChange {
  constructor(
    public _id?: { $oid: string },
    public oldPlayers?: Player[],
    public newPlayers?: Player[],
    public minute?: number
  ) {}
}
