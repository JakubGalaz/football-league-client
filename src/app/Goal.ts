import { Player } from "./Player";

export class Goal {
  constructor(
    public _id?: { $oid: string },
    public scorer?: Player,
    public assistant?: Player,
    public minute?: number
  ) {}
}
