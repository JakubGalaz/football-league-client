import { Player } from "./Player";

export class PlayerChange {
  constructor(
    public _id?: { $oid: string },
    public oldPlayer?: Player,
    public newPlayer?: Player,
    public minute?: number
  ) {}
}
