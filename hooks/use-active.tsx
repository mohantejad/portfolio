import { useEffect, useState, useLayoutEffect } from "react";

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newSection = `#${entry.target.id}`;
          if (newSection !== activeSection) {
            setActiveSection(newSection);
            window.history.replaceState(null, "", newSection); // Uses replaceState to avoid extra history entries
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [activeSection]);

  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetSection = document.querySelector(hash);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "instant" });
      }
    }
  }, []);

  return activeSection;
};

export default useActiveSection;
