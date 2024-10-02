/* eslint-disable react/prop-types */
const CreateProfileMessage = ({ name, content, inbox, avatar }) => {
  return (
    <div
      className={`flex flex-col items-start gap-1 ${
        inbox ? "text-left" : "text-right justify-end"
      }`}
    >
      {/* Message Content */}
      <div className={`w-full flex items-end ${!inbox && "justify-end"}`}>
        <div
          className={`w-fit min-w-14 px-4 py-5 rounded text-custom-black border-4 rounded-t-2xl text-xs animate-typing ${
            inbox
              ? "border-opacity-20 border-custom-text-secondary rounded-br-2xl relative w-[max-content] before:absolute before:inset-0 before:bg-white before:animate-typewriter"
              : "border-opacity-10 border-custom-black bg-input-bg rounded-bl-2xl"
          }`}
        >
          {content}
        </div>
      </div>

      {/* Sender Name and Avatar */}
      <div className={`w-full flex ${!inbox && "justify-end"}`}>
        <div
          className={`p-px rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md border-2 border-opacity-20 ${
            inbox ? "border-custom-pink" : "border-custom-black"
          }`}
        >
          <div
            className={`px-7 ${
              inbox ? "bg-custom-gradient" : "bg-custom-black"
            } text-white font-medium text-xs rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md h-9 flex justify-center items-center gap-2`}
          >
            {inbox && avatar && <img src={avatar} />}
            {name}
            {!inbox && avatar && <img src={avatar} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfileMessage;
