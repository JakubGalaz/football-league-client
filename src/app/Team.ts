import { Player } from "./Player";

export class Team {
  constructor(
    public _id?: { $oid: string },
    public name?: string,
    public coach?: string,
    public stadium?: string,
    public players?: Player[]
  ) {}
}
