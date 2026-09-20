import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tisForWhenTaskActive = {
    workTime: (
      <span>
        Foque por <b> {state.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Descanse por <b>{state.config.shortBreakTime}min</b>
      </span>
    ),
    longBreakTime: (
      <span>
        Descanse por <b>{state.config.longBreakTime}min</b>
      </span>
    ),
  };

  const tipsForNoTaskActive = {
    workTime: (
      <span>
        Próximo ciclo é de <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Próximo descanso é de <b>{state.config.shortBreakTime}min</b>{" "}
      </span>
    ),
    longBreakTime: (
      <span>
        Próximo descanso é de <b>{state.config.longBreakTime}min</b>
      </span>
    ),
  };

  return (
    <>
      {!!state.activeTask && tisForWhenTaskActive[state.activeTask.type]}
      {!state.activeTask && tipsForNoTaskActive[nextCycleType]}
    </>
  );
}
