import { TrashIcon } from "lucide-react";
import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../Container";
import { DefaultButton } from "../DefaultButton";
import { Heading } from "../Heading";

import styles from "./style.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTask } from "../../utils/sortTasks";
import type { SortTaskOptions } from "../../utils/sortTasks";
import { useState } from "react";

export function History() {
  const { state } = useTaskContext();
  const [sortTaskOptions, setSortTaskOptions] = useState<SortTaskOptions>(
    () => {
      return {
        tasks: sortTask({ tasks: state.tasks }),
        direction: "desc",
        field: "startDate",
      };
    },
  );

  function handleSortTasks({ field }: Pick<SortTaskOptions, "field">) {
    const newDirection = sortTaskOptions.direction === "desc" ? "asc" : "desc";

    setSortTaskOptions({
      tasks: sortTask({
        tasks: sortTaskOptions.tasks,
        direction: newDirection,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              aria-label="Apagar histórico"
              title="Apagar histórico"
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSortTasks({ field: "name" })}
                  className={styles.thSort}
                >
                  Tarefa ⇵
                </th>
                <th
                  onClick={() => handleSortTasks({ field: "duration" })}
                  className={styles.thSort}
                >
                  Duração ⇵
                </th>
                <th
                  onClick={() => handleSortTasks({ field: "startDate" })}
                  className={styles.thSort}
                >
                  Data ⇵
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {sortTaskOptions.tasks.map((task) => {
                const taskTypeDictionary = {
                  workTime: "Foco",
                  shortBreakTime: "Descanso curto",
                  longBreakTime: "Descanso longo",
                };

                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
