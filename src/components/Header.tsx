
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Task Manager
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user ? (
            <Button variant="ghost" onClick={handleSignOut}>
              Sign out
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
