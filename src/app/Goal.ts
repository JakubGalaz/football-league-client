import { Player } from "./Player";

export class Goal {
  constructor(
    public _id?: { $oid: string },
    public scorrer?: Player,
    public asistant?: Player,
    public minute?: number
  ) {}
}
