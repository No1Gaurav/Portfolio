// --- Data Science Network Portfolio ---
const nodesData = [
    {
        id: 'core',
        label: 'AI/ML\nPortfolio',
        group: 'center',
        size: 32
    },
    {
        id: 'about',
        label: 'About',
        group: 'main',
        size: 24,
        content: `<h2>About Me</h2><p>I'm a motivated B.Tech Computer Science (AIML) student passionate about artificial intelligence and machine learning. My focus is on developing intelligent solutions that make a real impact.</p>`
    },
    {
        id: 'skills',
        label: 'Skills',
        group: 'main',
        size: 24,
        content: `<h2>Technical Skills</h2><ul class="skills-list"><li>Python</li><li>TensorFlow</li><li>PyTorch</li><li>Scikit-learn</li><li>Deep Learning</li><li>Computer Vision</li><li>NLP</li><li>Data Analysis</li></ul>`
    },
    {
        id: 'projects',
        label: 'Projects',
        group: 'main',
        size: 24,
        content: `<h2>Projects</h2><div class="project"><h3>Password Manager</h3><p>Developed a secure password management system with encryption and user authentication.</p><a href="https://github.com/No1Gaurav/Password_Manager" target="_blank">View on GitHub →</a></div>`
    },
    {
        id: 'contact',
        label: 'Contact',
        group: 'main',
        size: 24,
        content: `<h2>Contact</h2><p>Email: <a href="mailto:gsharma190805@gmail.com">gsharma190805@gmail.com</a></p><p>Phone: +91 83685 09312</p><div class="social-links"><a href="https://github.com/No1Gaurav" target="_blank">GitHub</a> | <a href="https://www.linkedin.com/in/gaurav-sharma19" target="_blank">LinkedIn</a> | <a href="Gaurav Sharma Resume FINAL.pdf" download>Download Resume</a></div>`
    }
];
const linksData = nodesData.filter(n => n.id !== 'core').map(n => ({ source: 'core', target: n.id }));

function initParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#64ffda' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#64ffda', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 1, random: true, out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }
}

function initNetwork() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3.select('#viz').attr('width', width).attr('height', height);
    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(nodesData)
        .force('link', d3.forceLink(linksData).id(d => d.id).distance(220))
        .force('charge', d3.forceManyBody().strength(-1800))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => d.size + 16));

    const link = svg.append('g')
        .attr('stroke', '#64ffda99')
        .attr('stroke-width', 2.5)
        .selectAll('line')
        .data(linksData)
        .join('line')
        .attr('class', 'link');

    const node = svg.append('g')
        .selectAll('g')
        .data(nodesData)
        .join('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    node.append('circle')
        .attr('r', d => d.size)
        .attr('class', d => d.group);

        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .each(function(d) {
                const lines = d.label.split(/\n|\r|\r\n/);
                d3.select(this).text(null);
                const fontSize = lines.length > 1 ? '0.9em' : '1.05em';
                lines.forEach((line, i) => {
                    d3.select(this).append('tspan')
                        .text(line)
                        .attr('x', 0)
                        .attr('dy', i === 0 ? '0em' : '1.1em')
                        .attr('font-size', fontSize);
                });
                // Adjust y so that multi-line text is vertically centered
                if (lines.length > 1) {
                    const shift = -((lines.length - 1) / 2) * 1.1;
                    d3.select(this).attr('dy', `${shift}em`);
                }
            });

    // Modal overlay logic
    const nodeDetails = document.querySelector('.node-details');
    const nodeContent = document.querySelector('.node-content');


    node.on('click', (event, d) => {
        if (d.content) {
            // Add 'View as Page' button if section exists
            let sectionId = null;
            if (d.id === 'about') sectionId = 'about-section';
            if (d.id === 'skills') sectionId = 'skills-section';
            if (d.id === 'projects') sectionId = 'projects-section';
            if (d.id === 'contact') sectionId = 'contact-section';
            let buttonHtml = '';
            if (sectionId) {
                buttonHtml = `<button class="view-as-page-btn" data-section="${sectionId}">View as Page ↓</button>`;
            }
            nodeContent.innerHTML = buttonHtml + d.content;
            nodeDetails.classList.remove('hidden');
            event.stopPropagation();
        }
    });

    // Only one document click handler for modal close
    document.addEventListener('click', function modalCloseHandler(event) {
        if (nodeDetails && !nodeDetails.contains(event.target)) {
            nodeDetails.classList.add('hidden');
        }
    }, {capture: true});

    // Delegate click for 'View as Page' button
    nodeDetails.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-as-page-btn')) {
            const section = document.getElementById(e.target.dataset.section);
            if (section) {
                nodeDetails.classList.add('hidden');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

// Style for the 'View as Page' button
const style = document.createElement('style');
style.innerHTML = `
.view-as-page-btn {
    display: block;
    margin: 0 auto 1.2rem auto;
    background: linear-gradient(90deg, #00bcd4 0%, #64ffda 100%);
    color: #0a192f;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    padding: 0.7em 1.5em;
    font-size: 1.1em;
    cursor: pointer;
    box-shadow: 0 2px 8px #00bcd455;
    transition: background 0.2s, color 0.2s;
}
.view-as-page-btn:hover {
    background: linear-gradient(90deg, #64ffda 0%, #00bcd4 100%);
    color: #172a45;
}`;
document.head.appendChild(style);

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

window.addEventListener('resize', () => {
    initNetwork();
});

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNetwork();
});
