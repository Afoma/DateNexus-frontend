import Layouts from "./Layouts";
import Logo from "./Logo";

const Thanks = () => {
  return (
    <Layouts>
      <div className="flex flex-col justify-center items-center px-6">
        <Logo />
        <h3 className="text-center text-gradient-custom text-2xl lg:text-4xl font-medium">Thank you, you will hear from us soon!</h3>
      </div>
    </Layouts>
  );
};

export default Thanks;
