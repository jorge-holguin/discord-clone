import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ChannelList() {
  return (
    <div className="p-4 overflow-auto bg-secondary text-secondary-foreground">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Channels</h2>
        <Button variant="ghost" size="icon">
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="space-y-2">
        <Link href="#" className="block px-2 py-1 rounded hover:bg-muted hover:text-muted-foreground" prefetch={false}>
          #general
        </Link>
        <Link href="#" className="block px-2 py-1 rounded hover:bg-muted hover:text-muted-foreground" prefetch={false}>
          #announcements
        </Link>
        <Link href="#" className="block px-2 py-1 rounded hover:bg-muted hover:text-muted-foreground" prefetch={false}>
          #random
        </Link>
      </div>
    </div>
  )
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
