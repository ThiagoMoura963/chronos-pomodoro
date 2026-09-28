import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import styles from "./style.module.css";
import { useState } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { toastifyWrapper } from "../../adapters/toastifyWrapper";

export function MainForm() {
  const { state, dispatch } = useTaskContext();

  const lastTaskName = state.tasks[state.tasks.length - 1]?.name;

  const [taskName, setTaskName] = useState(lastTaskName ?? "");

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    toastifyWrapper.dimiss();

    if (!taskName.trim()) {
      toastifyWrapper.warning("Digite o nome da tarefa!");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interrupteDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    toastifyWrapper.success("Tarefa iniciada com sucesso!");
  }

  function handleInterruptionTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    toastifyWrapper.dimiss();

    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    toastifyWrapper.warning("Tarefa interrompida!");
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action="">
      <div className={styles.formRow}>
        <DefaultInput
          id="inputText"
          type="text"
          placeholder="Digite algo"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          disabled={!!state.activeTask}
        />
      </div>

      <div className={styles.formRow}>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}

      <div className={styles.formRow}>
        {!state.activeTask ? (
          <DefaultButton
            type="submit"
            title="Iniciar nova tarefa"
            aria-label="Iniciar nova tarefa"
            icon={<PlayCircleIcon />}
          />
        ) : (
          <DefaultButton
            type="button"
            title="Interromper tarefa"
            aria-label="Interromper tarefa"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptionTask}
          />
        )}
      </div>
    </form>
  );
}
