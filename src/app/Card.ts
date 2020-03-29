import { Player } from "./Player";

export class Card {
  constructor(
    public _id?: { $oid: string },
    public card?: string,
    public player?: Player,
    public minute?: number
  ) {}
}
