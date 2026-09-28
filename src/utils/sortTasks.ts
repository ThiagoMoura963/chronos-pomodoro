import type { TaskModel } from "../models/TaskModel";

type sortTaskOptions = {
  tasks: TaskModel[];
  direction?: "desc" | "asc";
  field?: keyof TaskModel;
};

export function sortTask({
  tasks = [],
  direction = "desc",
  field = "startDate",
}: sortTaskOptions): TaskModel[] {
  return [...tasks].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "desc" ? bValue - aValue : aValue - bValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "desc"
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }

    return 0;
  });
}
