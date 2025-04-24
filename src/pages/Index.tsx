
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";
import AddTaskForm from "@/components/AddTaskForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTaskStore } from "@/lib/store";
import { toast } from "sonner";
import { useEffect } from "react";

const Index = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { activeFilter, projects } = useTaskStore();
  const activeProject = projects.find(p => p.id === activeFilter);

  // Show toast when project changes
  useEffect(() => {
    if (activeProject) {
      toast(`Viewing ${activeProject.name}`);
    } else if (activeFilter === "today") {
      toast("Viewing today's tasks");
    }
  }, [activeFilter, activeProject]);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="relative flex flex-1 flex-col overflow-y-auto">
          <TaskList />
          
          <div className="sticky bottom-6 flex justify-center">
            <Button 
              onClick={() => setIsAddingTask(true)}
              className="gap-2 shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Add task
            </Button>
          </div>
        </main>
      </div>

      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <AddTaskForm onClose={() => setIsAddingTask(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
