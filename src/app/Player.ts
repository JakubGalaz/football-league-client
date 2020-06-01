export class Player {
  constructor(
    public id?: string,
    public name?: string,
    public surname?: string,
    public age?: number,
    public club?: string,
    public position?: string,
    public goals?: number,
    public assists?: number,
    public yellowCards?: number,
    public redCards?: number
  ) {}
}
