import Brand from "../Brand";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Twitter from "@/assets/twitter.svg";
import LinkedIn from "@/assets/linkedin.svg";
import Copyright from "@/assets/copyright.svg";

const Footer = () => {
  const about = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Get in touch", link: "/" },
    { id: 3, name: "FAQs", link: "/" },
  ];
  const resources = [
    { id: 1, name: "Documentation", link: "/" },
    { id: 2, name: "Blog", link: "/" },
    { id: 3, name: "Contact us", link: "/" },
  ];
  const product = [
    { id: 1, name: "Testimonial", link: "/" },
    { id: 2, name: "How it works", link: "/" },
  ];

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-custom-gradient font-sans px-10 py-[40px] mt-[40px]">
      <Brand />
      <section className="text-white flex flex-col gap-10 lg:flex-row lg:justify-between mt-[40px] lg:w-[1000px]">
        <div>
          <h3 className="lg:text-2xl font-semibold">About DateNexus</h3>
          {about.map((item) => (
            <ul key={item.id} className="p-0">
              <Link to={item.link}>
                <Button variant="link" className="text-white text-sm p-0">
                  {item.name}
                </Button>
              </Link>
            </ul>
          ))}
        </div>
        <div>
          <h3 className="lg:text-2xl font-semibold">Resources</h3>
          {resources.map((item) => (
            <ul key={item.id} className="p-0">
              <Link to={item.link}>
                <Button variant="link" className="text-white text-sm p-0">
                  {item.name}
                </Button>
              </Link>
            </ul>
          ))}
        </div>
        <div>
          <h3 className="lg:text-2xl font-semibold">Product</h3>
          {product.map((item) => (
            <ul key={item.id} className="p-0">
              <Link to={item.link}>
                <Button variant="link" className="text-white text-sm p-0">
                  {item.name}
                </Button>
              </Link>
            </ul>
          ))}
        </div>
      </section>
      <section className="flex justify-start md:justify-center gap-8 py-8">
        <Button className="bg-socials w-[91px] lg:w-[200px] py-6">
          <img src={Twitter} alt="Twitter Icon" />
        </Button>
        <Button className="bg-socials w-[91px] lg:w-[200px] py-6">
          <img src={LinkedIn} alt="LinkedIn Icon" />
        </Button>
      </section>
      <div className="flex justify-center">
        <section className="border-t border-solid border-white lg:w-[600px]">
          <div className="mt-2 flex items-center gap-2 text-white">
            <img src={Copyright} alt="" />
            <p className="text-xs sm:text-sm">
              {currentYear} DateNexus. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Footer;
