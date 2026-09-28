import type { TaskModel } from "../models/TaskModel";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.completeDate) return "Completada";
  if (task.interrupteDate) return "Interrompida";
  if (task.id === activeTask?.id) return "Em progresso";
  return "Abandonada";
}
