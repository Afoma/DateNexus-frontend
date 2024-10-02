export const infoType = {
  0: { requestPath: "profile-name", requestBodyProperty: "name" },
  1: { requestPath: "profile-intrests", requestBodyProperty: "intrests" },
  2: { requestPath: "profile-location", requestBodyProperty: "location" },
  3: { requestPath: "profile-age", requestBodyProperty: "age" },
};

export default {
  [infoType[0].requestPath]: {
    initial: "Can I know your name, please?",
    retries: [
      "Thanks for your response! However, I couldn't catch your name. Could you please share it with me?",
      "Sorry, I missed your name. What should I call you?",
      "It seems I still don't know your name. May I have it?",
      "I'd love to address you by your name. Can you share it with me?",
    ],
  },
  [infoType[1].requestPath]: {
    initial: "What are some things you enjoy doing?",
    retries: [
      "Thanks for your response! However, I couldn't catch your hobbies. Could you tell me more about what you like?",
      "I didn't quite catch your interests. What activities are you into?",
      "It looks like I missed out on your interests. What do you enjoy doing in your free time?",
      "I still couldn't determine what you're passionate about. Could you share some of your hobbies or interests?",
    ],
  },
  [infoType[2].requestPath]: {
    initial: "Where are you currently based?",
    retries: [
      "Thanks for your response! However, I couldn't figure out where you're located. Could you let me know?",
      "It seems I missed your location. What city or country are you in?",
      "I didn't quite catch where you're from. Could you share your location?",
      "It seems I still don't know where you're located. Where are you right now?",
    ],
  },
  [infoType[3].requestPath]: {
    initial: "How old are you?",
    retries: [
      "Thanks for your response! However, I couldn't determine your age. Could you share it with me?",
      "Sorry, I missed your age. How old are you?",
      "It seems I didn't catch your age. Would you mind telling me?",
      "I'm still not sure about your age. Could you let me know how old you are?",
    ],
  },
};
