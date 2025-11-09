import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  const isMobile = useRef(false);

  useEffect(() => {
    // Check if mobile on initial load
    isMobile.current = window.innerWidth <= 768;

    const checkMobile = () => {
      isMobile.current = window.innerWidth <= 768;
    };

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    let timeline: gsap.core.Timeline;
    let resizeTimeout: NodeJS.Timeout;

    function initAnimation() {
      // Kill existing timeline and ScrollTrigger
      if (timeline) {
        timeline.kill();
      }
      ScrollTrigger.getById("work")?.kill();

      // Don't initialize horizontal scroll on mobile
      if (isMobile.current) {
        // Initialize mobile animations
        initMobileAnimations();
        return;
      }

      // Desktop horizontal scroll animation (your existing code)
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;

      const workContainer = document.querySelector(".work-container");
      if (!workContainer) return;

      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;

      const translateX =
        rect.width * box.length - (rectLeft + parentWidth) + padding;

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: "work",
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    }

    function initMobileAnimations() {
      const workBoxes = gsap.utils.toArray(".work-box");

      workBoxes.forEach((box: any, index: number) => {
        const isEven = index % 2 === 0;

        // Set initial positions
        gsap.set(box, {
          x: isEven ? -100 : 100,
          opacity: 0,
        });

        // Create scroll trigger for each box
        ScrollTrigger.create({
          trigger: box,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            gsap.to(box, {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(box, {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onLeave: () => {
            gsap.to(box, {
              x: isEven ? -50 : 50,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
            });
          },
          onLeaveBack: () => {
            gsap.to(box, {
              x: isEven ? -50 : 50,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
            });
          },
        });
      });
    }

    // Initialize animation after a short delay to ensure DOM is ready
    const initialize = () => {
      setTimeout(() => {
        initAnimation();
        ScrollTrigger.refresh();
      }, 100);
    };

    // Wait for images to load before initializing
    const images = document.querySelectorAll(".work-image img");
    let loadedImages = 0;

    if (images.length > 0) {
      images.forEach((img) => {
        if ((img as HTMLImageElement).complete) {
          loadedImages++;
        } else {
          img.addEventListener("load", () => {
            loadedImages++;
            if (loadedImages === images.length) {
              initialize();
            }
          });
        }
      });

      if (loadedImages === images.length) {
        initialize();
      }
    } else {
      initialize();
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initAnimation();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      if (timeline) {
        timeline.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger?.classList?.contains("work-box")) {
          trigger.kill();
        }
      });
      ScrollTrigger.getById("work")?.kill();
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const projects = [
    {
      id: 1,
      name: "Koragg AI",
      category: "Voice Assistant",
      description:
        "Voice-powered assistant that lets you control your PC hands-free. Open apps, websites, send WhatsApp messages, take screenshots, generate images, and play anything on YouTube—just by speaking.",
      tools: "Python, Selenium, Web Speech API, OpenAI API, Pygame",
      github: "https://github.com/sidd-gupta05/Koragg-AI-Voice-Assistant/",
      linkedin:
        "https://www.linkedin.com/posts/siddharth-gupta-08a56528b_python-voiceassistant-ai-activity-7352557540116725760-B5WZ",
      image: "images/koragg.png",
    },
    {
      id: 2,
      name: "Labsphere",
      category: "Lab Management System",
      description:
        "Intelligent laboratory management system enabling patients to book appointments, make secure Razorpay payments, and track reports in real time.",
      tools: "Next.js, TypeScript, Prisma, Supabase, Gemini API, Razorpay API",
      github: "https://github.com/sidd-gupta05/CodeQuest",
      demo: "https://labsphere-three.vercel.app/",
      image: "images/labsphere.png",
    },
    {
      id: 3,
      name: "Finance AI",
      category: "Expense Tracking Platform",
      description:
        "Automates expense tracking with AI-powered bill scanning, eliminating manual entry. Provides monthly reports and budget alerts using Gemini AI.",
      tools: "Next.js, React, Clerk, Tailwind CSS, Gemini API, Arcjet, Prisma",
      github: "https://github.com/sidd-gupta05/Finanace-AI",
      demo: "https://finanace-ai-sidd.vercel.app",
      image: "images/financeAI.png",
    },
    {
      id: 4,
      name: "AI Form Builder",
      category: "Form Creation Platform",
      description:
        "Build custom forms with ease, share them instantly, and collect responses seamlessly. Manage submissions efficiently and export data to Excel.",
      tools: "Next.js, React, Gemini AI, Clerk, Tailwind CSS",
      github: "https://github.com/sidd-gupta05/ai-form-builder",
      demo: "https://ai-form-builder-sidd.vercel.app/",
      image: "images/AIFormBuilder.png",
    },
    {
      id: 5,
      name: "Gifly",
      category: "GIF Creation Platform",
      description:
        "Create and share custom GIFs, stickers, and text animations. User-friendly interface for personalization and creative expression with friends.",
      tools: "React, Giphy API, Tailwind CSS",
      github: "https://github.com/sidd-gupta05/gifly",
      demo: "https://sidd-gifly.vercel.app",
      image: "images/Gifly.png",
    },
    {
      id: 6,
      name: "Portfolio",
      category: "Interactive Portfolio",
      description:
        "Digitally crafted world where code meets creativity. Interactive portfolio with GSAP-powered animations and seamless transitions.",
      tools: "React, TypeScript, Three.js, GSAP, Vite",
      github: "https://github.com/sidd-gupta05/Siddharth_Portfolio",
      demo: "https://sidd_portfolio.dev",
      image: "images/portfolio.png",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <p className="work-description">{project.description}</p>
                <h4>Tools and Technologies</h4>
                <p>{project.tools}</p>
                <div className="work-buttons">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-btn github-btn"
                  >
                    GitHub
                  </a>
                  {project.linkedin ? (
                    <a
                      href={project.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn linkedin-btn"
                    >
                      LinkedIn
                    </a>
                  ) : project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn demo-btn"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.demo || project.linkedin}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
