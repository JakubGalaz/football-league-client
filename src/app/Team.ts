import { Player } from "./Player";

export class Team {
  constructor(
  // public _id?: { $oid: string },
    public  id?: string,
    public name?: string,
    public coach?: string,
    public stadium?: string,
    public players?: Player[],
    public win?: number,
    public lose?: number,
    public draw?: number,
    public goalLost?: number,
    public goalsScored?: number,
  ) {}
}
