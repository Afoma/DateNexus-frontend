import BrandLogo from "@/assets/DateNexus.svg";

const Logo = () => {
  return (
    <div>
      <img
        src={BrandLogo}
        className="w-[100px]"
        alt="DateNexus Logo"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          console.error("Failed to load logo image");
        }}
      />
    </div>
  );
};

export default Logo;
