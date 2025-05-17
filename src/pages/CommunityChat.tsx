import Layout from "@/components/layouts/AuthLayout";
import { ChatWindow, Message } from "@/components/Eplore/CommunityChat";

const users = [
  { id: "1", name: "Mufteey", avatar: "/assets/members.png", online: true },
  {
    id: "2",
    name: "John Afolabi",
    avatar: "/assets/members.png",
    online: true,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    avatar: "/assets/members.png",
    online: false,
  },
];

const currentUser = {
  id: "4",
  name: "You",
  avatar: "/assets/members.png",
  online: true,
};

const initialMessages: Message[] = [
  {
    id: "1",
    userId: "1",
    text: "What is your height?",
    timestamp: new Date("2025-05-11T12:00:00"),
  },
  {
    id: "2",
    userId: "4",
    text: "My height is 6 feet.",
    timestamp: new Date("2025-05-11T12:01:00"),
  },
  {
    id: "3",
    userId: "2",
    text: "What is your Name?",
    timestamp: new Date("2025-05-11T12:02:00"),
    quotedMessage: {
      userId: "1",
      text: "What is your height?",
    },
  },
  {
    id: "4",
    userId: "2",
    text: "I'm 6'5 but people say i am more",
    timestamp: new Date("2025-05-11T12:03:00"),
    quotedMessage: {
      userId: "1",
      text: "What is your height?",
    },
  },
];

const CommunityChat = () => {
  const handleSendMessage = (text: string) => {
    console.log("New message:", text);
  };

  return (
    <Layout>
      <ChatWindow
        users={users}
        currentUser={currentUser}
        messages={initialMessages}
        onSendMessage={handleSendMessage}
        title="UI/UX Designers"
        subtitle="20 members, 10 online"
      />
    </Layout>
  );
};

export default CommunityChat;
