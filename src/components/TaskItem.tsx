
import { useTaskStore } from "@/lib/store";
import { Task, Priority } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Edit,
  Flag,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  task: Task;
}

const priorityIcons: Record<Priority, React.ReactNode> = {
  urgent: <Flag className="h-3 w-3 priority-urgent" />,
  high: <Flag className="h-3 w-3 priority-high" />,
  medium: <Flag className="h-3 w-3 priority-medium" />,
  low: <Flag className="h-3 w-3 priority-low" />,
};

const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTaskCompletion, deleteTask } = useTaskStore();

  return (
    <div className="group flex items-start justify-between gap-2 rounded-md p-2 hover:bg-muted/50">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => toggleTaskCompletion(task.id)}
          className="mt-1"
        />
        <div className="flex flex-col gap-1">
          <h3 className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-3">
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(task.dueDate), "MMM d")}</span>
              </div>
            )}
            {task.priority && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {priorityIcons[task.priority]}
                <span className={`priority-${task.priority}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex opacity-0 transition-opacity group-hover:opacity-100">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Edit className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Set due date</DropdownMenuItem>
            <DropdownMenuItem>Change priority</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteTask(task.id)}
              className="text-destructive focus:text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TaskItem;
