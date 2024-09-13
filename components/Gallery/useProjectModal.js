import { useState, useEffect } from "react";

function useProjectModal() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "visible";
    window.removeEventListener("scroll", handleScroll);
  };

  const handleScroll = () => window.scrollTo(0, 0);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.body.style.overflow = "visible";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedProject]);

  return { selectedProject, setSelectedProject, handleCloseModal, handleScroll };
}

export default useProjectModal;
