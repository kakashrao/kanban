import TaskSchema from "@/database/schemas/task";
import { StoreSelectorType } from "@/store";
import { Task } from "@/store/task";
import { FC } from "react";
import { useSelector } from "react-redux";

interface TaskColumnProps {
  task: Task;
  onAddColumn?: () => void;
  onshowTaskInfo?: (task: TaskSchema) => void;
}

const TaskColumn: FC<TaskColumnProps> = ({
  onAddColumn = () => {},
  task,
  onshowTaskInfo,
}) => {
  const activeBoardId = useSelector<StoreSelectorType, string>(
    (state) => state.board.activeEntity
  );

  return (
    <section className="flex flex-col gap-5 w-[300px] min-w-[300px] h-full">
      <div className={`flex gap-2${!task.columnId ? " invisible" : ""}`}>
        <span
          className="colored-point"
          style={{ backgroundColor: task.indicatingColor }}
        ></span>
        <p className="heading-s uppercase text-muted-foreground">
          {task.columnName} ({task.items.length})
        </p>
      </div>
      {!task.columnId ? (
        <div className="grow border rounded bg-task-column flex justify-center items-center">
          <p
            className="heading-xl cursor-pointer text-muted-foreground"
            onClick={onAddColumn}
          >
            + New Column
          </p>
        </div>
      ) : task.items.length ? (
        <div className="grow flex flex-col gap-4">
          {task.items.map((t) => (
            <div
              key={t.id}
              className="task-card cursor-pointer"
              onClick={() =>
                onshowTaskInfo({
                  ...t,
                  columnId: task.columnId,
                  boardId: activeBoardId,
                })
              }
            >
              <h1 className="heading-m text-primary-foreground text-wrap">
                {t.title}
              </h1>
              {t.subTasks?.length && (
                <p className="body-m text-muted-foreground">{`${t.subTasks.filter((st) => st.isCompleted).length} of ${t.subTasks.length} subtasks`}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grow border rounded bg-task-column text-muted-foreground flex flex-col flex justify-center items-center px-2">
          <p className="heading-m text-center mb-3">
            The column is empty. Create a new task to get started.
          </p>
        </div>
      )}
    </section>
  );
};

export default TaskColumn;
