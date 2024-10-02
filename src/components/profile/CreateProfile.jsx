import CreateProfileMessage from "../ui/CreateProfileMessage";
import NotificationIcon from "../../assets/notification.svg";
import CupidAvatar from "../../assets/cupidMessageAvatar.svg";
import TopCurve from "../TopCurve";
import FileIcon from "../../assets/file.svg";
import SendIcon from "../../assets/arrow-right-pink.svg";
import SendIconDisabled from "../../assets/arrow-right-grey.svg";
import PinkStep from "../../assets/pink-step.svg";
import GrayStep from "../../assets/gray-step.svg";
import PinkStepLg from "../../assets/pink-step-lg.svg";
import GrayStepLg from "../../assets/gray-step-lg.svg";
// import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import userPrompts, { infoType } from "./userPrompts";
import axiosInstance from "@/services/api-client";

const CreateProfile = () => {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Start prompts for new section
  useEffect(() => {
    setRetryCount(0);
    if (progress <= Object.keys(infoType).length - 1) {
      sendMessageAsCupid(userPrompts[infoType[progress].requestPath].initial);
    }
    getUserProfile();
  }, [progress]);

  // Scroll to the bottom when message is added
  useEffect(() => {
    scrollToBottom();
  }, [sentMessages]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // On message input
  const handleMessageInput = (event) => {
    setMessage(event.target.value);
  };

  // When message is sent
  const addMessage = (event) => {
    event.preventDefault();
    inputRef.current.disabled = true;
    axiosInstance
      .post(`users/${infoType[progress].requestPath}`, {
        [infoType[progress].requestBodyProperty]: message,
      })
      .then(() => {
        updateSentMessages(message);
        if (progress < Object.keys(infoType).length - 1) {
          setProgress((currentProgress) => currentProgress + 1);
        } else {
          getUserProfile();
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
          const newRetryCount =
            retryCount +
            (retryCount >=
            userPrompts[infoType[progress].requestPath].retries.length - 1
              ? 0
              : 1);
          setRetryCount(newRetryCount);
          updateSentMessages(message);
          sendMessageAsCupid(
            userPrompts[infoType[progress].requestPath].retries[retryCount]
          );
        }
      })
      .finally(() => {
        inputRef.current.disabled = false;
      });
  };

  // Update message list
  const updateSentMessages = (message) => {
    const newMessage = {
      inbox: false,
      name: user && user.name ? user.name : "Guest",
      content: message,
    };
    setSentMessages((previousMessageList) => [
      ...previousMessageList,
      newMessage,
    ]);
    setMessage("");
  };

  // Send message as cupid
  const sendMessageAsCupid = (message) => {
    const newMessage = {
      inbox: true,
      name: "Cupid",
      content: message,
      avatar: CupidAvatar,
    };
    setSentMessages((previousMessageList) => [
      ...previousMessageList,
      newMessage,
    ]);
  };

  // Save user info
  const getUserProfile = () => {
    axiosInstance.get(`/users/profile`).then((response) => {
      setUser(response.data.data.user);
      if (progress >= Object.keys(infoType).length) {
        promptForImage(response.data.data.user);
      }
    });
  };

  // Prompt for image
  const promptForImage = (user) => {
    const interestsString = user.interests.join(", ");
    sendMessageAsCupid(
      `Hey ${user.name}, I’ve got all your info! It’s exciting that you're into ${interestsString}, and I’ve noted you’re from ${user.location}. The next step is to upload a profile picture to finish things off!`
    );
  };

  return (
    <div className="h-screen grid lg:grid-cols-[386px_1fr] overflow-hidden">
      <Toaster />

      {/* Sidebar */}
      <div className="hidden lg:grid lg:min-h-screen lg:bg-input-bg">
        <TopCurve />
        <h3 className=" text-custom-pink text-6xl text-center font-semibold">
          <span className="text-custom-pink text-4xl font-medium">
            Welcome to
          </span>{" "}
          <span className="text-black">Date</span>Nexus
        </h3>
      </div>

      {/* Chat Area */}
      <div className="overflow-auto relative">
        <div>
          <div className="lg:hidden bg-white bg-opacity-50 flex justify-between">
            <TopCurve />
            <img src={NotificationIcon} alt="Notification" className="pr-4" />
          </div>
          <div className="page-info px-6 mb-9">
            <div className="flex justify-between gap-2 mt-3 mb-8 md:hidden">
              {Object.keys(infoType).map((i) => (
                <img key={i} src={progress <= +i ? GrayStep : PinkStep} />
              ))}
            </div>
            <div className="hidden md:flex gap-10 my-16 mb-8">
              {Object.keys(infoType).map((i) => (
                <img key={i} src={progress <= +i ? GrayStepLg : PinkStepLg} />
              ))}
            </div>
            <div className="text-xl lg:text-2xl font-semibold mb-3">
              Create your Date<span className="text-custom-pink">Nexus</span>{" "}
              profile
            </div>
            <div className="text-[#6E6E6E] text-sm">
              Building your unique digital identity.
            </div>
          </div>
        </div>

        <div className="px-6 pb-[70px] flex flex-col gap-5">
          {sentMessages.map((sentMessage, i) => (
            <CreateProfileMessage key={i} {...sentMessage} />
          ))}

          <div ref={messagesEndRef} />

          <form
            onSubmit={addMessage}
            className="fixed lg:sticky bottom-2 flex items-center gap-3 h-11 w-11/12 lg:w-full max-w-7xl left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 rounded-md border border-input px-3 text-sm ring-offset-background bg-input-bg"
          >
            <img src={FileIcon} alt="" />
            <input
              ref={inputRef}
              value={message}
              onInput={handleMessageInput}
              autoFocus
              type="text"
              placeholder="Enter message"
              className="h-100 flex-1 bg-transparent placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <img
              className={`${
                message?.length && !inputRef.current.disabled
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              onClick={addMessage}
              src={
                message?.length && !inputRef.current.disabled
                  ? SendIcon
                  : SendIconDisabled
              }
              alt={
                message?.length && !inputRef.current.disabled
                  ? "Send Icon"
                  : "Send Icon Disabled"
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
