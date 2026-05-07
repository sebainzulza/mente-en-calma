import { ChatWindow } from "@/components/chat/ChatWindow";

export const metadata = {
  title: "Chat — mente-en-calma",
};

export default function ChatPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold">Conversa</h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Un espacio para compartir lo que sientes. Sin juicios.
        </p>
      </header>
      <ChatWindow />
    </div>
  );
}
