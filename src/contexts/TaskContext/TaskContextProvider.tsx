import { useEffect, useReducer, useRef } from "react";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { initialTaskState } from "./initialTaskState";
import { taskReducer } from "./taskReducer";
import { TaskContext } from "./TaskContext";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const playLoadBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  useEffect(() => {
    if (!state.activeTask) return;

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    const worker = TimerWorkerManager.getInstance();

    worker.onmessage((event) => {
      const countDownSeconds = event.data;

      if (countDownSeconds <= 0) {
        if (playLoadBeepRef.current) {
          playLoadBeepRef.current();
          playLoadBeepRef.current = null;
        }

        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        worker.terminate();
        return;
      }

      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    });

    worker.postMessage(state);

    return () => {
      worker.terminate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeTask?.id]);

  useEffect(() => {
    if (state.activeTask && playLoadBeepRef.current === null) {
      playLoadBeepRef.current = loadBeep();
    } else {
      playLoadBeepRef.current = null;
    }
  }, [state.activeTask]);

  useEffect(() => {
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
  }, [state.activeTask, state.formattedSecondsRemaining]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
