import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { Twitter, Github, Linkedin, Instagram } from "lucide-react";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href="mailto:siddharthgupta2482005@gmail.com"
                data-cursor="disable"
              >
                siddharthgupta2482005@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+8779032500" data-cursor="disable">
                +91 87790 32500
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <div className="contact-social-links">
              <a
                href="https://github.com/sidd-gupta05"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                <Github className="social-icon-inline" />
                Github
              </a>
              <a
                href="https://www.linkedin.com/siddharth-gupta-08a56528b/"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                <Linkedin className="social-icon-inline" />
                Linkedin
              </a>
              <a
                href="https://x.com/Siddhar39561176"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                <Twitter className="social-icon-inline" />
                Twitter
              </a>
              <a
                href="https://www.instagram.com/sidd_gupta_45/"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                <Instagram className="social-icon-inline" />
                Instagram
              </a>
            </div>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Siddharth Gupta</span>
            </h2>
            <h5>
              <MdCopyright /> 2024
            </h5>
          </div>
        </div>

        {/* Siddharth Gupta Background Text */}
        <div className="contact-name-background">Siddharth</div>
      </div>
    </div>
  );
};

export default Contact;
