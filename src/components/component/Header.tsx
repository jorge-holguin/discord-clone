import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "../hooks/useUser";

export function Header({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean; setIsDarkMode: (value: boolean) => void }) {
  const user = useUser();

  return (
    <header className="p-4 flex items-center justify-between bg-card text-card-foreground">
      <div className="flex items-center gap-2">
        <img
          src="/placeholder.svg"
          alt="Platform Logo"
          width={32}
          height={32}
          style={{ aspectRatio: "32/32", objectFit: "cover" }}
        />
        <h1 className="text-xl font-bold">Collab AI</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </Button>
        {user && ( // Solo renderiza el Avatar si `user` está disponible
          <>
            <span>{user}</span>
            <Avatar>
              <AvatarImage src="" alt={user} />
              <AvatarFallback>{user.charAt(0)}</AvatarFallback>
            </Avatar>
          </>
        )}
      </div>
    </header>
  );
}

function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
