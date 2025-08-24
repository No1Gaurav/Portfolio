// --- Data Science Network Portfolio with Animations, Tooltips, and Parallax Particles ---

const data = {
  name: 'AI/ML Portfolio',
  icon: '💡',
  description: 'My AI/ML Portfolio',
  children: [
    {
      name: 'About',
      icon: '👤',
      description: 'Who am I?',
      content: `<button class='view-as-page-btn' data-section='about-section'>View as Page ↓</button><h2>About Me</h2><p>I'm a motivated B.Tech Computer Science (AIML) student passionate about AI/ML.</p>`
    },
    {
      name: 'Skills',
      icon: '🛠️',
      description: 'My Tech Skills',
      content: `<button class='view-as-page-btn' data-section='skills-section'>View as Page ↓</button><h2>Skills</h2><ul><li>Python</li><li>TensorFlow</li><li>PyTorch</li><li>Scikit-learn</li><li>Deep Learning</li><li>Computer Vision</li><li>NLP</li><li>Data Analysis</li></ul>`
    },
    {
      name: 'Projects',
      icon: '💼',
      description: 'My Projects',
      content: `<button class='view-as-page-btn' data-section='projects-section'>View as Page ↓</button><h2>Projects</h2><div class='project'><h3>Password Manager</h3><p>Developed a secure password management system with encryption and user authentication.</p><a href='https://github.com/No1Gaurav/Password_Manager' target='_blank'>View on GitHub →</a></div>`
    },
    {
      name: 'Contact',
      icon: '✉️',
      description: 'Contact Me',
      content: `<button class='view-as-page-btn' data-section='contact-section'>View as Page ↓</button><h2>Contact</h2><p>Email: gsharma190805@gmail.com</p><p>Phone: +91 83685 09312</p><div class='social-links'><a href='https://github.com/No1Gaurav' target='_blank'>GitHub</a> | <a href='https://www.linkedin.com/in/gaurav-sharma19' target='_blank'>LinkedIn</a> | <a href='Gaurav Sharma Resume FINAL.pdf' download>Download Resume</a></div>`
    }
  ]
};

function renderSunburst() {
  const svgElem = document.getElementById('sunburst-demo');
  const width = svgElem.clientWidth;
  const height = svgElem.clientHeight;
  const radius = Math.min(width, height) / 2 - 10;
  const svg = d3.select('#sunburst-demo')
    .attr('width', width)
    .attr('height', height);
  svg.selectAll('*').remove();
  const g = svg.append('g')
    .attr('transform', `translate(${width/2},${height/2})`);

  const root = d3.hierarchy(data).sum(d=>1);
  const partition = d3.partition().size([2 * Math.PI, radius]);
  partition(root);

  const arc = d3.arc()
    .startAngle(d=>d.x0)
    .endAngle(d=>d.x1)
    .innerRadius(d=>d.y0)
    .outerRadius(d=>d.y1-8);

  const color = d3.scaleOrdinal()
    .domain(['About','Skills','Projects','Contact'])
    .range(['#00eaff','#00bcd4','#7c4dff','#ff4081']);

  // Tooltip
  const tooltip = d3.select('#sunburst-tooltip');

  // Draw arcs
  g.selectAll('path')
    .data(root.descendants().filter(d=>d.depth))
    .join('path')
    .attr('class', d => 'arc' + (d.depth === 1 && d.parent == root ? ' arc-main' : ''))
    .attr('d', arc)
    .attr('fill', d => color(d.data.name) || '#222')
    .on('mouseover', function(e, d) {
      d3.select(this).classed('arc-glow', true);
      tooltip
        .style('opacity', 1)
        .html(`<span class="arc-emoji">${d.data.icon}</span> ${d.data.description || d.data.name}`);
    })
    .on('mousemove', function(e) {
      tooltip
        .style('left', (e.offsetX + 20) + 'px')
        .style('top', (e.offsetY - 10) + 'px');
    })
    .on('mouseleave', function() {
      d3.select(this).classed('arc-glow', false);
      tooltip.style('opacity', 0);
    })
    .on('click', function(e, d) {
      e.stopPropagation();
      if (d.data.content) {
        d3.select('#sidePanel').html(`<span class='arc-icon'>${d.data.icon}</span> ${d.data.content}`).classed('show', true);
      }
    });

  // Draw labels
  g.selectAll('text')
    .data(root.descendants().filter(d=>d.depth))
    .join('text')
    .attr('class', d => 'arc-label' + (d.depth === 1 && d.parent == root ? ' arc-main-label' : ''))
    .attr('transform', function(d) {
      const angle = ((d.x0 + d.x1)/2) * 180/Math.PI - 90;
      const r = (d.y0 + d.y1)/2;
      return `rotate(${angle}) translate(${r},0) rotate(${angle>90?180:0})`;
    })
    .attr('dy','0.35em')
    .text('')
    .each(function(d) {
      const sel = d3.select(this);
      sel.text(null);
      sel.append('tspan')
        .attr('class','arc-emoji')
        .attr('x',0)
        .attr('dy','0em')
        .text(d.data.icon);
      sel.append('tspan')
        .attr('x',0)
        .attr('dy','1.2em')
        .text(d.data.name);
    });

  // Center node pulse
  g.append('circle')
    .attr('r', root.y0 + (radius * 0.18))
    .attr('fill', '#0a192f')
    .attr('class', 'arc-center-pulse')
    .lower();

  g.append('text')
    .attr('class', 'arc-label')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .html('💡 AI/ML Portfolio');
}

// Initial render
renderSunburst();
window.addEventListener('resize', renderSunburst);

// Hide side panel when clicking outside
d3.select('body').on('click', function(e) {
  if (!e.target.closest('.side-panel')) d3.select('#sidePanel').classed('show', false);
});

// Delegate click for "View as Page" buttons in the side panel
document.getElementById('sidePanel').addEventListener('click', function(e) {
  if (e.target.classList.contains('view-as-page-btn')) {
    const section = document.getElementById(e.target.dataset.section);
    if (section) {
      document.getElementById('sidePanel').classList.remove('show');
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      section.classList.add('section-glow');
      setTimeout(() => section.classList.remove('section-glow'), 1200);
    }
  }
});