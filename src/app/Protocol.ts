import { Goal } from "./Goal";
import { Player } from "./Player";
import { PlayerChange } from "./PlayerChange";

export class Protocol {
  constructor(
    public _id?: { $oid: string },
    public host?: string,
    public guest?: string,
    public hostGoals?: Goal[],
    public guestGoals?: Goal[],
    public refree?: string,
    public hostPlayers?: Player[],
    public guestPlayers?: Player[],
    public guestChange?: PlayerChange[],
    public hostChange?: PlayerChange[],
    public comments?: string
  ) {}
}
