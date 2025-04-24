
import { useTaskStore } from "@/lib/store";
import TaskItem from "./TaskItem";
import { format, isToday } from "date-fns";
import { Separator } from "@/components/ui/separator";

const TaskList = () => {
  const { tasks, activeFilter, projects } = useTaskStore();

  // Filter tasks based on activeFilter
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "today") {
      return task.dueDate && isToday(new Date(task.dueDate));
    }
    return task.projectId === activeFilter;
  });

  // Get active project name
  const activeProject = 
    activeFilter === "today" 
      ? "Today" 
      : projects.find((p) => p.id === activeFilter)?.name || "Tasks";

  // Group tasks by completion status
  const incompleteTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{activeProject}</h1>
        <p className="text-muted-foreground">{format(new Date(), "EEEE, MMMM d")}</p>
      </div>

      <div className="space-y-1">
        {incompleteTasks.length > 0 ? (
          incompleteTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <p className="py-4 text-center text-muted-foreground">
            No tasks to show. Add a new task to get started!
          </p>
        )}
      </div>

      {completedTasks.length > 0 && (
        <>
          <Separator className="my-4" />
          <div>
            <h2 className="mb-2 font-medium">Completed ({completedTasks.length})</h2>
            <div className="space-y-1">
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
