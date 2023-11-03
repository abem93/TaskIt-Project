import { Task } from "./task.model";

export class Notification {
  constructor(
    public action: string,
    public task: Task
  ) {}
}
