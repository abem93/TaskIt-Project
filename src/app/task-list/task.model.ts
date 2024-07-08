export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public date: string,
    public priority: string,
    public status: string,
    public list: string
  ) {}
}
