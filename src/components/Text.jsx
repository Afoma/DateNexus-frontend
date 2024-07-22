/* eslint-disable react/prop-types */

const Text = ({ title, pinkTitle, children }) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-4xl text-black font-semibold flex justify-center items-center gap-2">
        {title}
        <span className="text-custom-pink">{pinkTitle}</span>
      </h3>
      <p className="text-custom-text-secondary text-center text-sm">
        {children}
      </p>
    </div>
  );
};

export default Text;
