import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO" id="whatIDo">{/* ADD THIS ID */}
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <h4>Description</h4>
              <p>
                Crafting responsive, performant web applications with modern
                technologies. From frontend interfaces to backend systems, I
                build seamless digital experiences.
              </p>

              <div className="what-content-details">
                <h5>Skillset & tools</h5>
                <div className="what-content-flex">
                  <div className="what-tags">JavaScript</div>
                  <div className="what-tags">TypeScript</div>
                  <div className="what-tags">React</div>
                  <div className="what-tags">Tailwind</div>
                  <div className="what-tags">CSS</div>
                  <div className="what-tags">Node.js</div>
                  <div className="what-tags">Next.js</div>
                  <div className="what-tags">Express.js</div>
                  <div className="what-tags">MySQL</div>
                  <div className="what-tags">Prisma ORM</div>
                  <div className="what-tags">Supabase</div>
                  <div className="what-tags">NeonDB</div>
                  <div className="what-tags">MongoDB</div>
                </div>
              </div>

              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
