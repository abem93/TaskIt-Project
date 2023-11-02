export class Notification {
  constructor(
    public id: number,
    public action: string,
    public show: boolean = false,
  ) {}
}
