
import { Calendar, Inbox, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useTaskStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Sidebar = () => {
  const { projects, activeFilter, setActiveFilter, addProject } = useTaskStore();
  const [newProject, setNewProject] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddProject = () => {
    if (newProject.trim()) {
      addProject({
        name: newProject,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
      setNewProject("");
      setIsAdding(false);
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r">
      <div className="p-4">
        <Button className="w-full justify-start gap-2" variant="default">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          <Button
            variant="ghost"
            className={cn(
              "sidebar-item w-full justify-start",
              activeFilter === "inbox" && "active"
            )}
            onClick={() => setActiveFilter("inbox")}
          >
            <Inbox className="h-4 w-4" />
            <span>Inbox</span>
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "sidebar-item w-full justify-start",
              activeFilter === "today" && "active"
            )}
            onClick={() => setActiveFilter("today")}
          >
            <Calendar className="h-4 w-4" />
            <span>Today</span>
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <div className="flex items-center justify-between py-2">
            <h2 className="text-sm font-semibold">Projects</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => setIsAdding(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-1">
            {isAdding && (
              <div className="flex items-center gap-2 py-1">
                <Input
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  placeholder="Project name"
                  className="h-8"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddProject();
                    if (e.key === "Escape") setIsAdding(false);
                  }}
                />
                <Button 
                  size="sm" 
                  className="h-8" 
                  onClick={handleAddProject}
                >
                  Add
                </Button>
              </div>
            )}
            
            {projects
              .filter(project => project.id !== "inbox")
              .map((project) => (
                <Button
                  key={project.id}
                  variant="ghost"
                  className={cn(
                    "sidebar-item w-full justify-start gap-2",
                    activeFilter === project.id && "active"
                  )}
                  onClick={() => setActiveFilter(project.id)}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="truncate">{project.name}</span>
                </Button>
              ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
