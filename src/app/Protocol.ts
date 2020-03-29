import { Goal } from "./Goal";
import { Player } from "./Player";
import { PlayerChange } from "./PlayerChange";
import {Card} from "./Card";

export class Protocol {
  constructor(
    public _id?: { $oid: string },
    public refree?: string,
    public host?: string,
    public guest?: string,
    public date?: string,
    public hostCards?: Card[],
    public guestCards?: Card[],

    public hostGoals?: Goal[],
    public guestGoals?: Goal[],
    public hostPlayers?: Player[],
    public guestPlayers?: Player[],
    public guestChange?: PlayerChange[],
    public hostChange?: PlayerChange[],
    public comments?: string
  ) {}
}
