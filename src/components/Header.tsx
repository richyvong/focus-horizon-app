
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-primary">TaskHorizon</h1>
      </div>
      <div className="relative flex w-full max-w-sm items-center px-8">
        <Search className="absolute left-10 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          className="pl-8"
        />
      </div>
      <div>
        <Button size="sm" variant="outline">
          Upgrade
        </Button>
      </div>
    </header>
  );
};

export default Header;
