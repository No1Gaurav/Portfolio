import React, { useEffect, useRef, useCallback } from "react";
import "./ml-pipeline-theme.css";

export default function App() {
  const tooltipRef = useRef(null);
  const nodeDetailsRef = useRef(null);
  const nodeContentRef = useRef(null);
  const cursorRef = useRef(null);

  // Optimized Custom Cursor Logic
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const crosshair = document.createElement('div');
    crosshair.className = 'cursor-crosshair';
    document.body.appendChild(crosshair);
    
    cursorRef.current = cursor;
    
    // Use requestAnimationFrame for smooth movement
    let animationId;
    let mouseX = 0;
    let mouseY = 0;
    
    const updateCursor = () => {
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      crosshair.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      animationId = requestAnimationFrame(updateCursor);
    };
    
    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const addHoverEffect = () => {
      cursor.classList.add('hover');
    };

    const removeHoverEffect = () => {
      cursor.classList.remove('hover');
    };

    const addClickEffect = () => {
      cursor.classList.add('click');
    };

    const removeClickEffect = () => {
      cursor.classList.remove('click');
    };

    // Start animation loop
    updateCursor();
    
    // Add optimized event listeners
    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mousedown', addClickEffect, { passive: true });
    document.addEventListener('mouseup', removeClickEffect, { passive: true });
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .neural-node, .view-section-btn, .view-as-page-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect, { passive: true });
      el.addEventListener('mouseleave', removeHoverEffect, { passive: true });
    });

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', addClickEffect);
      document.removeEventListener('mouseup', removeClickEffect);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
      
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      if (crosshair.parentNode) {
        crosshair.parentNode.removeChild(crosshair);
      }
    };
  }, []);

  // Portfolio sections as neural network nodes
  const portfolioNodes = [
    { id: "about", name: "About Me", type: "input", description: "Personal introduction and background", icon: "👨‍💻", details: "B.Tech Computer Science (AIML) student passionate about AI/ML" },
    { id: "skills", name: "Skills", type: "processing", description: "Technical expertise and tools", icon: "🛠️", details: "Python, TensorFlow, PyTorch, Deep Learning, Computer Vision, NLP" },
    { id: "education", name: "Education", type: "learning", description: "Academic background", icon: "🎓", details: "Computer Science with specialization in AI/ML" },
    { id: "projects", name: "Projects", type: "application", description: "Practical implementations", icon: "🚀", details: "Password Manager, ML models, and AI applications" },
    { id: "experience", name: "Experience", type: "training", description: "Professional journey", icon: "💼", details: "Hands-on experience in AI/ML development" },
    { id: "achievements", name: "Achievements", type: "validation", description: "Recognition and milestones", icon: "🏆", details: "Academic and technical accomplishments" },
    { id: "contact", name: "Contact", type: "output", description: "Connect with me", icon: "📧", details: "Email: gsharma190805@gmail.com | Phone: +91 83685 09312" }
  ];

  // Portfolio sections data for detailed view
  const portfolioSections = [
    {
      id: "about",
      label: "About",
      content: `<h2>About Me</h2><p>I'm a motivated B.Tech Computer Science (AIML) student passionate about AI/ML. My focus is on developing intelligent solutions that make a real impact.</p>`,
    },
    {
      id: "skills",
      label: "Skills", 
      content: `<h2>Skills</h2><ul><li>Python</li><li>TensorFlow</li><li>PyTorch</li><li>Scikit-learn</li><li>Deep Learning</li><li>Computer Vision</li><li>NLP</li><li>Data Analysis</li></ul>`,
    },
    {
      id: "education",
      label: "Education",
      content: `<h2>Education</h2><p><strong>B.Tech Computer Science (AIML)</strong></p><p>Focused on Artificial Intelligence and Machine Learning with hands-on experience in modern AI technologies.</p>`,
    },
    {
      id: "projects",
      label: "Projects",
      content: `<h2>Projects</h2><div class='project'><h3>Password Manager</h3><p>Developed a secure password management system with encryption and user authentication.</p><a href='https://github.com/No1Gaurav/Password_Manager' target='_blank'>View on GitHub →</a></div>`,
    },
    {
      id: "experience",
      label: "Experience",
      content: `<h2>Experience</h2><p>Building practical AI/ML solutions and exploring cutting-edge technologies in artificial intelligence and deep learning.</p>`,
    },
    {
      id: "achievements",
      label: "Achievements",
      content: `<h2>Achievements</h2><p>Developing expertise in AI/ML technologies and building innovative projects that demonstrate practical applications of artificial intelligence.</p>`,
    },
    {
      id: "contact",
      label: "Contact",
      content: `<h2>Contact</h2><p>Email: <a href="mailto:gsharma190805@gmail.com">gsharma190805@gmail.com</a></p><p>Phone: +91 83685 09312</p><div class='social-links'><a href='https://github.com/No1Gaurav' target='_blank'>GitHub</a> | <a href='https://www.linkedin.com/in/gaurav-sharma19' target='_blank'>LinkedIn</a> | <a href='Gaurav_Sharma_Resume.pdf' download>Download Resume</a></div>`,
    },
  ];

  // Close modal function
  const closeModal = () => {
    nodeDetailsRef.current.classList.add("hidden");
  };

  // Handle portfolio node clicks
  const handleNodeClick = (node) => {
    const content = `
      <div class="node-info">
        <div class="node-header">
          <span class="node-icon">${node.icon}</span>
          <h2>${node.name}</h2>
        </div>
        <div class="node-content-section">
          <p class="node-type"><strong>Type:</strong> ${node.type.charAt(0).toUpperCase() + node.type.slice(1)} Stage</p>
        </div>
        <div class="node-content-section">
          <p class="node-description"><strong>Overview:</strong> ${node.description}</p>
        </div>
        <div class="node-content-section">
          <p class="node-details-card"><strong>Details:</strong> ${node.details}</p>
          ${node.id === 'skills' ? `
            <div class="skill-tags">
              <span class="skill-tag">Python</span>
              <span class="skill-tag">Machine Learning</span>
              <span class="skill-tag">Deep Learning</span>
              <span class="skill-tag">React</span>
              <span class="skill-tag">TensorFlow</span>
              <span class="skill-tag">PyTorch</span>
              <span class="skill-tag">Data Science</span>
            </div>
          ` : ''}
        </div>
        <button class="view-section-btn" data-section="${node.id}">
          <span>View Full Section</span> 
          <span style="margin-left: 0.5rem;">↓</span>
        </button>
      </div>
    `;
    nodeContentRef.current.innerHTML = content;
    nodeDetailsRef.current.classList.remove("hidden");
  };

  // Handle section clicks (for backward compatibility)
  const handleSectionClick = (section) => {
    const node = portfolioNodes.find(n => n.id === section.id);
    if (node) {
      handleNodeClick(node);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (nodeDetailsRef.current && !nodeDetailsRef.current.contains(event.target)) {
        nodeDetailsRef.current.classList.add("hidden");
      }
    };

    document.addEventListener("click", handleOutsideClick, { capture: true });
    return () => document.removeEventListener("click", handleOutsideClick, { capture: true });
  }, []);

  // Handle view section button clicks
  useEffect(() => {
    const handleViewSectionClick = (e) => {
      if (e.target.classList.contains("view-section-btn")) {
        const sectionId = e.target.dataset.section;
        let targetSectionId = null;
        
        if (sectionId === "about") targetSectionId = "about-section";
        if (sectionId === "skills") targetSectionId = "skills-section";
        if (sectionId === "education") targetSectionId = "education-section";
        if (sectionId === "projects") targetSectionId = "projects-section";
        if (sectionId === "experience") targetSectionId = "experience-section";
        if (sectionId === "achievements") targetSectionId = "achievements-section";
        if (sectionId === "contact") targetSectionId = "contact-section";
        
        const section = document.getElementById(targetSectionId);
        if (section) {
          nodeDetailsRef.current.classList.add("hidden");
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      
      // Keep backward compatibility
      if (e.target.classList.contains("view-as-page-btn")) {
        const section = document.getElementById(e.target.dataset.section);
        if (section) {
          nodeDetailsRef.current.classList.add("hidden");
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Add hover effects for custom cursor to new elements
    const addCursorHoverEffects = () => {
      const interactiveElements = document.querySelectorAll('button, a, .neural-node, .view-section-btn, .view-as-page-btn');
      interactiveElements.forEach(el => {
        if (!el.hasAttribute('data-cursor-added')) {
          el.setAttribute('data-cursor-added', 'true');
          el.addEventListener('mouseenter', () => {
            if (cursorRef.current) {
              cursorRef.current.classList.add('hover');
            }
          });
          el.addEventListener('mouseleave', () => {
            if (cursorRef.current) {
              cursorRef.current.classList.remove('hover');
            }
          });
        }
      });
    };

    if (nodeDetailsRef.current) {
      nodeDetailsRef.current.addEventListener("click", handleViewSectionClick);
      // Add cursor effects when modal opens
      setTimeout(addCursorHoverEffects, 100);
    }

    return () => {
      if (nodeDetailsRef.current) {
        nodeDetailsRef.current.removeEventListener("click", handleViewSectionClick);
      }
    };
  }, []);

  return (
    <div>
      {/* Enhanced Particle System with Movement */}
      <div className="css-particles">
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} className="css-particle" />
        ))}
      </div>

      {/* Dynamic Connection Lines */}
      <div className="particle-lines">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="connection-line" />
        ))}
      </div>

      {/* Title */}
      <div className="overlay-container">
        <div className="main-title">
          <div className="title-content">
            <h1>Gaurav Sharma</h1>
            <p className="subtitle">AI/ML Developer & Data Scientist</p>
            <div className="matrix-effect">
              Exploring Data • Building Intelligence • Creating Solutions
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Portfolio Network Visualization */}
      <div className="neural-network-section">
        <div className="network-container">
          <h3 className="network-title">Portfolio Network Explorer</h3>
          <p className="network-subtitle">Click any node to explore my professional journey</p>
          
          {/* Single layer neural network with curved arrows */}
          <div className="neural-network-single">
            <div className="neural-nodes">
              {portfolioNodes.map((node, index) => (
                <div
                  key={node.id}
                  className={`neural-node-container ${node.type}`}
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    '--node-index': index 
                  }}
                >
                  {/* Node name above/below alternating */}
                  <div className={`node-name ${index % 2 === 0 ? 'above' : 'below'}`}>
                    {node.name}
                  </div>
                  
                  {/* Neural node with hemisphere border and arrow */}
                  <div
                    className={`neural-node ${node.type}`}
                    onClick={() => handleNodeClick(node)}
                    title={node.name}
                  >
                    <div className="node-pulse"></div>
                    
                    {/* Hemisphere border with arrow */}
                    <div className={`hemisphere-border ${index % 2 === 0 ? 'top' : 'bottom'}`}>
                      <div className="hemisphere-arrow">
                        <svg viewBox="0 0 20 15" className="hemisphere-arrow-svg">
                          <defs>
                            <linearGradient id={`hemisphereGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.9)" />
                              <stop offset="100%" stopColor="rgba(244, 114, 182, 0.9)" />
                            </linearGradient>
                          </defs>
                          {index % 2 === 0 ? (
                            // Arrow pointing up (name is above)
                            <path 
                              d="M 10 12 L 6 8 M 10 12 L 14 8 M 10 12 L 10 3" 
                              stroke={`url(#hemisphereGradient${index})`} 
                              strokeWidth="2" 
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ) : (
                            // Arrow pointing down (name is below)
                            <path 
                              d="M 10 3 L 6 7 M 10 3 L 14 7 M 10 3 L 10 12" 
                              stroke={`url(#hemisphereGradient${index})`} 
                              strokeWidth="2" 
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}
                        </svg>
                      </div>
                    </div>
                    
                    <div className="node-core">
                      <span className="node-icon">{node.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <div className="modal-overlay hidden" onClick={closeModal}></div>

      {/* Modal */}
      <div className="node-details-modal hidden" ref={nodeDetailsRef}>
        {/* Creative Modal Background Elements */}
        <div className="modal-floating-elements">
          <div className="modal-float-element"></div>
          <div className="modal-float-element"></div>
          <div className="modal-float-element"></div>
          <div className="modal-float-element"></div>
        </div>
        
        {/* Data Visualization Element */}
        <div className="modal-data-viz">
          <div className="modal-data-bar"></div>
          <div className="modal-data-bar"></div>
          <div className="modal-data-bar"></div>
          <div className="modal-data-bar"></div>
          <div className="modal-data-bar"></div>
        </div>
        
        {/* Close Button */}
        <button className="close-btn" onClick={closeModal}>×</button>
        
        <div className="node-content" ref={nodeContentRef}></div>
      </div>

      {/* Scroll Sections - Complete Portfolio */}
      <section id="about-section" className="scroll-section">
        <h2>👨‍💻 About Me</h2>
        <p>
          I'm a motivated B.Tech Computer Science (AIML) student passionate
          about artificial intelligence and machine learning. My focus is on
          developing intelligent solutions that make a real impact in the world
          through innovative AI technologies.
        </p>
        <p>
          I believe in continuous learning and staying updated with the latest
          advancements in AI/ML. My journey in computer science has been driven
          by curiosity and a desire to solve complex problems using data-driven
          approaches.
        </p>
      </section>

      <section id="skills-section" className="scroll-section">
        <h2>🛠️ Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Programming Languages</h3>
            <ul className="skills-list">
              <li>Python</li>
              <li>JavaScript</li>
              <li>SQL</li>
              <li>R</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>AI/ML Frameworks</h3>
            <ul className="skills-list">
              <li>TensorFlow</li>
              <li>PyTorch</li>
              <li>Scikit-learn</li>
              <li>Keras</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Specializations</h3>
            <ul className="skills-list">
              <li>Deep Learning</li>
              <li>Computer Vision</li>
              <li>Natural Language Processing</li>
              <li>Data Analysis</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="education-section" className="scroll-section">
        <h2>🎓 Education</h2>
        <div className="education-item">
          <h3>Bachelor of Technology - Computer Science (AIML)</h3>
          <p className="institution">Specialization in Artificial Intelligence and Machine Learning</p>
          <p className="duration">Current Student</p>
          <p>
            Focused curriculum covering advanced topics in AI/ML including deep learning,
            neural networks, computer vision, natural language processing, and data science.
            Hands-on experience with modern AI frameworks and real-world applications.
          </p>
        </div>
      </section>

      <section id="projects-section" className="scroll-section">
        <h2>🚀 Projects</h2>
        <div className="projects-grid">
          <div className="project">
            <h3>Password Manager</h3>
            <p>
              Developed a secure password management system with encryption and
              user authentication. Features include secure storage, password generation,
              and cross-platform compatibility.
            </p>
            <div className="tech-stack">
              <span className="tech">Python</span>
              <span className="tech">Encryption</span>
              <span className="tech">Security</span>
            </div>
            <a
              href="https://github.com/No1Gaurav/Password_Manager"
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              View on GitHub →
            </a>
          </div>
          <div className="project">
            <h3>AI/ML Portfolio Website</h3>
            <p>
              Interactive portfolio showcasing AI/ML projects with neural network
              visualization and particle effects. Built with React and modern web technologies.
            </p>
            <div className="tech-stack">
              <span className="tech">React</span>
              <span className="tech">JavaScript</span>
              <span className="tech">CSS</span>
            </div>
          </div>
        </div>
      </section>

      <section id="experience-section" className="scroll-section">
        <h2>💼 Experience</h2>
        <div className="experience-item">
          <h3>AI/ML Developer</h3>
          <p className="role-type">Personal Projects & Learning</p>
          <p>
            Developing practical AI/ML solutions and exploring cutting-edge technologies
            in artificial intelligence and deep learning. Focus on building real-world
            applications that solve meaningful problems.
          </p>
          <ul>
            <li>Hands-on experience with TensorFlow and PyTorch</li>
            <li>Implementation of computer vision and NLP projects</li>
            <li>Data preprocessing and model optimization</li>
            <li>Deployment of ML models in production environments</li>
          </ul>
        </div>
      </section>

      <section id="achievements-section" className="scroll-section">
        <h2>🏆 Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement">
            <h3>Academic Excellence</h3>
            <p>Consistent performance in Computer Science and AI/ML coursework</p>
          </div>
          <div className="achievement">
            <h3>Technical Projects</h3>
            <p>Successfully developed and deployed multiple software applications</p>
          </div>
          <div className="achievement">
            <h3>Continuous Learning</h3>
            <p>Actively pursuing advanced AI/ML concepts and staying updated with industry trends</p>
          </div>
          <div className="achievement">
            <h3>Problem Solving</h3>
            <p>Strong analytical skills in tackling complex technical challenges</p>
          </div>
        </div>
      </section>

      <section id="contact-section" className="scroll-section">
        <h2>📧 Contact</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <h3>Email</h3>
            <a href="mailto:gsharma190805@gmail.com">gsharma190805@gmail.com</a>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+91 83685 09312</p>
          </div>
          <div className="contact-item">
            <h3>Social Links</h3>
            <div className="social-links">
              <a href="https://github.com/No1Gaurav" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/gaurav-sharma19"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="contact-item">
            <h3>Resume</h3>
            <a href="Gaurav_Sharma_Resume.pdf" download className="resume-download">
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
