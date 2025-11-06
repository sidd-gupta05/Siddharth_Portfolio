import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(false);

    const handleNavClick = (e: MouseEvent) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");

        if (section) {
          const targetElement = document.querySelector(section);
          if (targetElement) {
            smoother.scrollTo(section, true, "top top");
          } else {
            console.warn(`Section ${section} not found on page`);
            smoother.scrollTo(0);
          }
        }
      }
    };

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", handleNavClick);
    });

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((elem) => {
        const element = elem as HTMLAnchorElement;
        element.removeEventListener("click", handleNavClick);
      });
      window.removeEventListener("resize", handleResize);

      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-logo" data-cursor="disable">
          <span className="logo-text">
            &lt;<span className="logo-name">SIDDHARTH.dev</span>/&gt;
          </span>
        </a>
        <a
          href="mailto:siddharthgupta2482005@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          siddharthgupta2482005@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#whatIDo" href="#whatIDo">
              <HoverLinks text="What I DO" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
