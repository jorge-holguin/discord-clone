import { Avatar } from "@/components/ui/avatar";

export function Message({ name, time, content }: { name: string; time: string; content: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <Avatar src="/placeholder-user.jpg" alt={name} fallback={name.charAt(0)} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-gray-900 dark:text-white">{name}</div>  {/* Nombre visible en ambos modos */}
          <div className="text-xs text-gray-500 dark:text-gray-400">{time}</div> {/* Hora con contraste adecuado */}
        </div>
        <div className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
          {content}  {/* Contenido del mensaje con fondo y texto visibles */}
        </div>
      </div>
    </div>
  );
}
