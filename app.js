const projectContainer = document.querySelector('#projectContainer');

async function getProjects() {
  try {
    const result = await fetch('./projects/projects.json');
    const projects = await result.json();
    makeUrl(projects);
    generateHTML(projects);
  } catch (err) {
    console.error(err);
  }
}

function makeUrl(projects) {
  projects.forEach((project) => {
    project.url = project.title.toLowerCase().split(' ').join('-');
  });
}

function generateTagsForHTML(project, tagName, className) {
  return project.tags.includes(tagName) ? className : 'hidden';
}

function generateHTML(projects) {
  projects.forEach((project) => {
    const html = `
    <article class="project">
      <div class="project-image">
        <img
          src="./projects/${project.url}/docs/design/desktop-preview.jpg"
          alt="${project.title}"
        />
      </div>
      <div class="project-info">
        <div class="project-tags">
          <span class="project-tag ${generateTagsForHTML(
            project,
            'html',
            'project-tag--html'
          )}"> HTML </span>
          <span class="project-tag ${generateTagsForHTML(
            project,
            'css',
            'project-tag--css'
          )}"> CSS </span>
          <span class="project-tag ${generateTagsForHTML(
            project,
            'js',
            'project-tag--js'
          )}"> JS </span>
          <span class="project-tag ${generateTagsForHTML(
            project,
            'api',
            'project-tag--api'
          )}"> API </span>
        </div>
        <h2 class="project-title">${project.title}</h2>
        <p class="project-description">${project.description}</p>
        <div class="project-buttons">
          <a
            href="https://github.com/SalahuddinAhammed/frontend-mentor-solutions/tree/main/projects/${
              project.url
            }"
            target="_blank"
            class="btn"
            >Code</a
          >
          <a
            href="https://frontend-mentor-solutions-salahuddin.netlify.app/projects/${
              project.url
            }"
            target="_blank"
            class="btn"
            >Live</a
          >
        </div>
      </div>
    </article>
  `;
    projectContainer.insertAdjacentHTML('afterbegin', html);
  });
}

getProjects();
