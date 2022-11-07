/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

const addNavLinks = () => {
  const allSections = Array.from(document.querySelectorAll("section"));
  const navUl = document.querySelector("#navbar__list");
  navUl.innerHTML = "";
  allSections.map((section) => {
    navUl.innerHTML += `
            <li><a class="menu__link" href="#${section.id}" data-nav-link="${section.id}">${section.dataset.nav}</a></li>
        `;
  });
};
//trigger function to display the pre-existen sections
addNavLinks();

function handleActive() {
  const liLinks = document.querySelectorAll("#navbar__list li a");
  const allSections = document.querySelectorAll("section");
  liLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      liLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
      allSections.forEach((section) =>
        section.classList.remove("your-active-class")
      );
      document
        .getElementById(`${e.target.dataset.navLink}`)
        .classList.add("your-active-class");
    });
  });
}
handleActive();

//get next id
const getNextId = () => {
  const allSections = Array.from(document.querySelectorAll("section"));
  return allSections.length;
};

const addNewContent = () => {
  //get main element to wrap new section inside
  const main = document.querySelector("main");
  //get how many sections hard coded in the html page
  const prevSectionCount = getNextId();
  //clean main dom elements
  main.innerHTML += `
        <section id="section${prevSectionCount + 1}" data-nav="Section ${
    prevSectionCount + 1
  }">
        <div class="landing__container">
        <h2>Section ${prevSectionCount + 1}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>
        </section>
    `;
  addNavLinks();
  handleActive();
};

const addBtn = document.querySelector("#add-section");
addBtn.addEventListener("click", addNewContent);

//function to toggle top button
const toTopBtn = document.querySelector("#top-btn");
const toggleVisibilty = () => {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 250) {
      toTopBtn.style.right = "10px";
    } else {
      toTopBtn.style.right = "-100%";
    }
  });
};
toggleVisibilty();

//function to manage click on top button
const toTop = () => {
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
toTop();

//observe section on scroll
function observeSection() {
  const observeClass = new IntersectionObserver(
    function (targets) {
      targets.forEach((target) => {
        const navLinks = Array.from(
          document.querySelectorAll("#navbar__list li a")
        );
        //loop on each nav link and return the data-nav-link that matches the target.id
        const currentNavLink = navLinks.find((link) => {
          return link.dataset.navLink == target.target.id;
        });
        if (target.isIntersecting) {
          //add yoyr active class to the section
          target.target.classList.add("your-active-class");
          //remove active class from all links before adding it to the relevant one
          navLinks.forEach((link) => link.classList.remove("active"));
          currentNavLink.classList.add("active");
        } else {
          //remove active class from the section when it is not observed
          target.target.classList.remove("your-active-class");
        }
      });
    },
    //options to control the space before section appearing
    {
      threshold: 0.6,
    }
  );
  //run observe method inside the observe class for each section
  let sections = document.querySelectorAll("section");
  return sections.forEach((section) => {
    observeClass.observe(section);
  });
}

//call observeSection onscroll the window / onload / onclick the add btn
window.addEventListener("scroll", observeSection);
window.addEventListener("load", observeSection);
addBtn.addEventListener("click",observeSection);
