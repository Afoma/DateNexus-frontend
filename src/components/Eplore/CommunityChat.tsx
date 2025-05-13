import { useState } from "react";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Types
export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
  quotedMessage?: {
    userId: string;
    text: string;
  };
}

// Helpers
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (date: Date): string => {
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return `Today ${formatTime(date)}`;
  }

  return (
    date.toLocaleDateString([], { weekday: "long" }) + " " + formatTime(date)
  );
};

interface MessageBubbleProps {
  message: Message;
  users: User[];
  isMine: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  users,
  isMine,
}) => {
  const sender = users.find((user) => user.id === message.userId);

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-4`}>
      {!isMine && (
        <div className="mr-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
            <img
              src={sender?.avatar}
              alt={sender?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div className={`max-w-xs ${isMine ? "ml-12" : "mr-12"}`}>
        {!isMine && (
          <div className="text-xs font-medium text-[#A50976] mb-1">
            {sender?.name}
          </div>
        )}

        {message.quotedMessage && (
          <div className="bg-gray-100 rounded-lg p-2 mb-1 border-l-4 border-[#A50976] text-sm">
            <div className="text-xs font-medium text-[#A50976]">
              {users.find((u) => u.id === message.quotedMessage?.userId)?.name}
            </div>
            <div className="text-gray-600">{message.quotedMessage.text}</div>
          </div>
        )}

        <div
          className={`py-2 px-4 rounded-2xl ${
            isMine
              ? "bg-gray-100 text-gray-800"
              : "bg-white border border-gray-200 text-gray-800"
          }`}
        >
          <div className="text-sm">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

interface DateSeparatorProps {
  date: Date;
}

const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => (
  <div className="flex justify-center my-4">
    <div className="bg-gray-200 rounded-full px-4 py-1 text-xs text-gray-600">
      {formatDate(date)}
    </div>
  </div>
);

interface ChatWindowProps {
  users: User[];
  currentUser: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
  title: string;
  subtitle?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  users,
  currentUser,
  messages,
  onSendMessage,
  title,
  subtitle = "",
}) => {
  const [messageText, setMessageText] = useState<string>("");
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = "";

  messages.forEach((message) => {
    const messageDate = message.timestamp.toDateString();

    if (messageDate !== currentDate) {
      currentDate = messageDate;
      groupedMessages.push({
        date: messageDate,
        messages: [message],
      });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(message);
    }
  });

  return (
    <div className="flex flex-col h-auto min-h-screen overflow-hidden">
      {/* Header */}
      <header className="p-4 bg-gradient-to-r from-[#F83E67] to-[#A50976] text-white flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <button
            className="mr-3 p-1 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => navigate("/app/explore")}
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center mr-3">
              <img
                src="/assets/community-1.jpeg"
                className="rounded-full object-cover h-full w-full"
                alt="datenexus"
              />
            </div>
            <div>
              <h1 className="font-semibold">{title}</h1>
              {subtitle && <p className="text-xs text-white/90">{subtitle}</p>}
            </div>
          </div>
        </div>

        <button
          className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium transition-colors"
          onClick={() => console.log("Join call")}
        >
          <span className="bg-gradient-to-r from-[#F83E67] to-[#A50976] bg-clip-text text-transparent">
            Join Call
          </span>
        </button>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 relative bg-gray-50">
        <img src="/assets/chatbg.svg" className="absolute" alt="background" />
        <div className="relative z-10">
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex}>
              <DateSeparator date={group.messages[0].timestamp} />
              {group.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  users={users}
                  isMine={message.userId === currentUser.id}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center bg-white rounded-full border border-gray-300 px-4 py-2">
          <button className="text-gray-500 mr-2">
            <Paperclip size={20} />
          </button>

          <input
            type="text"
            placeholder="Message"
            className="flex-1 outline-none text-gray-800"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button
            onClick={handleSendMessage}
            className={`p-2 rounded-full ${
              messageText.trim()
                ? "text-[#F83E67] hover:bg-fuchsia-50"
                : "text-gray-400"
            }`}
            disabled={!messageText.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
