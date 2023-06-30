import { projects } from "./projects.js";

const home = document.querySelector("nav > h1");
const menuBtn = document.querySelector("nav button");
const menuHidden = document.querySelector("nav .hidden");
const searchForm = document.querySelector("form");
const projectsList = document.querySelectorAll(".projects-list");
const totalProjects = document.querySelector("aside .total-projects");
const mainAppBody = document.querySelector("main#app");

// set favicon manually
const faviconElem = document.createElement("link");
const attributes = {
  rel: "shortcut icon",
  href: "../../img/favicon.ico",
  type: "image/x-icon",
};
for (let key in attributes) {
  faviconElem.setAttribute(key, attributes[key]);
}
document.head.prepend(faviconElem);

// get target file structure
const targetNameStructure = (text) => text.toLowerCase().split(" ").join("-");

// hide menu button on home page
window.addEventListener("DOMContentLoaded", () => {
  const projectListArr = Array.from(projectsList[0].children);
  if (mainAppBody) {
    const targetAttribute = mainAppBody.getAttribute("data-project-name");
    projectListArr.forEach((project) => {
      if (
        targetNameStructure(project.textContent.split(". ")[1]) ===
        targetAttribute
      )
        project.classList.add("active");
    });
  }
  if (menuHidden) menuHidden.style.display = "none";
});

// redirect to home url
home.addEventListener("click", () => {
  location.href = location.origin + "/index.html";
});

menuBtn.addEventListener("click", (e) => {
  const aside = e.currentTarget.parentElement.nextElementSibling;
  aside.classList.toggle("show-aside");
  e.currentTarget.classList.toggle("translate");
});

const activeUrl = (pathName) => {
  if (location.pathname === pathName) {
    return;
  } else {
    location.href = location.origin + pathName;
  }
};

const redirectUrl = (element) => {
  element.addEventListener("click", (e) => {
    const targetPath = targetNameStructure(
      e.currentTarget.textContent.split(". ")[1]
    );
    const pathName = "/projects/" + targetPath + "/" + "index.html";
    activeUrl(pathName);
  });
};

// search form submit
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = e.currentTarget.children.search;
  let targetPath = targetNameStructure(searchInput.value);
  const pathName = "/projects/" + targetPath + "/" + "index.html";
  activeUrl(pathName);
  searchInput.value = "";
});

const listProjects = (projects) => {
  projects.forEach((project, index) => {
    let li = document.createElement("li");
    projectsList.forEach((projectList) => {
      if (projectList.classList.contains("from-main")) {
        const imgUrl = `../img/${project
          .toLowerCase()
          .split(" ")
          .join("-")}.png`;
        li.innerHTML = `<div><div class="img-container"><img src=${imgUrl}></div><span class="s-no">${
          index + 1
        }.</span> <span class="project-name">${project}</span></div>`;
      } else {
        li.textContent = `${index + 1}. ${project}`;
      }
      projectList.append(li);
    });
    redirectUrl(li);
  });
  totalProjects.textContent = `Total no of ${
    projects.length <= 1 ? "project" : "projects"
  }: ${projects.length}`;
};

listProjects(projects);
