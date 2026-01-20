import { useRef } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TestimonialSection = () => {
  const vdRef = useRef([]);

  useGSAP(() => {
    // Only apply desktop animations on larger screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(".testimonials-section", {
        marginTop: "-140vh",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top bottom",
          end: "200% top",
          scrub: true,
        },
      });

      tl.to(".testimonials-section .first-title", {
        xPercent: 70,
      })
        .to(
          ".testimonials-section .sec-title",
          {
            xPercent: 25,
          },
          "<",
        )
        .to(
          ".testimonials-section .third-title",
          {
            xPercent: -50,
          },
          "<",
        );

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "10% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      pinTl.from(".vd-card", {
        yPercent: 150,
        stagger: 0.2,
        ease: "power1.inOut",
      });
    });

    // Mobile animations
    mm.add("(max-width: 767px)", () => {
      gsap.set(".testimonials-section", {
        marginTop: "0",
      });

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top top",
          end: "150% top",
          scrub: 1,
          pin: true,
        },
      });

      mobileTl.from(".vd-card", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.15,
        ease: "power1.out",
      });
    });
  });

  const handlePlay = (index) => {
    const video = vdRef.current[index];
    if (video) video.play();
  };

  const handlePause = (index) => {
    const video = vdRef.current[index];
    if (video) video.pause();
  };

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center justify-center md:justify-start pt-0 md:pt-[5vw] px-4">
        <h1 className="text-black first-title text-center md:text-left">
          What's
        </h1>
        <h1 className="text-light-brown sec-title text-center md:text-left">
          Everyone
        </h1>
        <h1 className="text-black third-title text-center md:text-left">
          Talking
        </h1>
      </div>

      <div className="pin-box">
        <div className="flex md:flex-row flex-col items-center justify-center md:justify-start gap-4 md:gap-0 w-full px-4 md:px-0">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`vd-card ${card.translation} ${card.rotation} md:block ${
                index > 2 ? "hidden md:block" : ""
              }`}
              onMouseEnter={() => handlePlay(index)}
              onMouseLeave={() => handlePause(index)}
              onTouchStart={() => handlePlay(index)}
              onTouchEnd={() => handlePause(index)}>
              <video
                ref={(el) => (vdRef.current[index] = el)}
                src={card.src}
                playsInline
                muted
                loop
                className="size-full object-cover aspect-[9/16]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
