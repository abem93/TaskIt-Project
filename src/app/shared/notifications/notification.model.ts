import { Task } from "../../task-list/task.model";

export class Notification {
  constructor(
    public action: string,
    public task: Task
  ) {}
}
