import "./styles/Career.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const careerInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTimeline = () => {
      const careerBoxes = gsap.utils.toArray(".career-info-box");
      const timeline = timelineRef.current;
      const dot = dotRef.current;

      if (!timeline || !dot || careerBoxes.length === 0) return;

      // Kill existing ScrollTriggers to avoid duplicates
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && careerBoxes.includes(trigger.trigger)) {
          trigger.kill();
        }
      });

      // Reset positions
      gsap.set(timeline, { height: "0px" });
      gsap.set(dot, { y: 0 });

      // Calculate positions for each career box
      careerBoxes.forEach((box: any) => {
        const boxTop = box.offsetTop;
        const boxHeight = box.offsetHeight;

        ScrollTrigger.create({
          trigger: box,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            gsap.to(timeline, {
              height: `${boxTop + boxHeight / 2}px`,
              duration: 0.5,
              ease: "power2.out",
            });

            gsap.to(dot, {
              y: boxTop + boxHeight / 2,
              duration: 0.5,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(timeline, {
              height: `${boxTop + boxHeight / 2}px`,
              duration: 0.5,
              ease: "power2.out",
            });

            gsap.to(dot, {
              y: boxTop + boxHeight / 2,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        });
      });

      // Set initial position to first box
      const firstBox: any = careerBoxes[0];
      if (firstBox) {
        const firstBoxTop = firstBox.offsetTop;
        const firstBoxHeight = firstBox.offsetHeight;

        gsap.set(timeline, { height: `${firstBoxTop + firstBoxHeight / 2}px` });
        gsap.set(dot, { y: firstBoxTop + firstBoxHeight / 2 });
      }
    };

    // Initial setup
    const ctx = gsap.context(() => {
      updateTimeline();
    });

    // Update on resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateTimeline();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info" ref={careerInfoRef}>
          <div className="career-timeline" ref={timelineRef}>
            <div className="career-dot" ref={dotRef}></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer</h4>
                <h5>Gifly Project</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Started my development journey with Gifly, a creative GIF creation
              platform that allows users to generate and share custom
              animations. Built with React and integrated Giphy API to provide
              seamless GIF creation experience. This project taught me the
              fundamentals of API integration, state management, and responsive
              design while creating an engaging user interface for creative
              expression.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Finance AI</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Developed an intelligent expense tracking platform that automates
              financial management using AI-powered bill scanning. Implemented
              Gemini AI for receipt analysis, eliminating manual data entry
              while providing smart budget alerts and monthly financial reports.
              Gained expertise in full-stack development with Next.js,
              authentication with Clerk, and AI integration for practical
              real-world applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Developer</h4>
                <h5>AI Form Builder</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Created an innovative form building platform powered by Gemini AI
              that simplifies form creation and management. Enabled users to
              build custom forms through natural language prompts, share them
              instantly, and collect responses efficiently. Enhanced my skills
              in AI integration, form validation, and data management while
              learning to export submissions to Excel for comprehensive data
              analysis.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Engineer</h4>
                <h5>Koragg AI</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Engineered a sophisticated voice-powered AI assistant that enables
              hands-free computer control through natural language commands.
              Integrated multiple APIs including OpenAI, Web Speech API, and
              Selenium to handle complex tasks like opening applications,
              sending messages, taking screenshots, and controlling media
              playback. Mastered Python development, voice recognition systems,
              and multi-threaded application architecture for real-time voice
              processing.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Engineer</h4>
                <h5 className="founder-role">
                  <span className="cofounder">Co-Founder & COO</span> -
                  Labsphere
                </h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently leading development as <strong>Co-Founder & COO</strong>{" "}
              for Labsphere, an intelligent laboratory management system created
              as part of the 500-hour CodeQuest challenge. Building a
              comprehensive platform that enables patients to book appointments,
              make secure Razorpay payments, and track medical reports in
              real-time. Utilizing Next.js, TypeScript, Prisma, and Supabase to
              create a scalable startup-ready solution while implementing
              advanced features like real-time notifications and AI-powered
              report analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
