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

/*
when clicking on the add button run addNewContent function
1- get next id of the section which comes after the pre-exist 3 sections 
2- add new section with id and data-nav
3- run the add nav links function to update the nav links
4- run handle active to update the active target
*/
const addBtn = document.querySelector("#add-section");
addBtn.addEventListener("click", addNewContent);

function addNewContent (){
  //get main element to wrap new section inside
  const main = document.querySelector("main");
  //get how many sections hard coded in the html page
  const prevSectionCount = getNextId();
  //clean main dom elements
  main.innerHTML += `
        <section id="section${prevSectionCount + 1}" data-nav="Section ${prevSectionCount + 1}">
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

function getNextId(){
  const allSections = Array.from(document.querySelectorAll("section"));
  return allSections.length;
};


/*
add navigation links dynamically according to the number of sections
1- get all sections
2- create nav link for each section
3- add custom attribute to the anchor tag which carries the same value as section.id
*/

function addNavLinks (){
  const allSections = Array.from(document.querySelectorAll("section"));
  const navUl = document.querySelector("#navbar__list");

  //empty the navul each time we add the links to avoid duplications
  navUl.innerHTML = "";
  //map all the sections and create link for each one accordingly
  allSections.map((section) => {
    navUl.innerHTML += `
            <li><a class="menu__link" data-nav-link="${section.id}">${section.dataset.nav}</a></li>
        `;
  });
};
addNavLinks();

/*
handle active class on the nav links 
1- get all links and for each one add event click
2- when clicking any of the links 
3- remove active class from all other links
4- add it to the target link
*/
function handleActive() {
  const liLinks = document.querySelectorAll("#navbar__list li a");
  const allSections = document.querySelectorAll("section");
  liLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      liLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
      allSections.forEach((section) => section.classList.remove("your-active-class"));
      document.getElementById(`${e.target.dataset.navLink}`).classList.add("your-active-class");
    });
  });
}
handleActive();


/*
when clicking any where in the navbar menu
1- check if the target has attribute of data-nav-link that carries the same id as the section
2- get the corresponding section
3- navigate to the section in a smoothy way
4- mimick clicking the burger icon again to collapse the navbar menu
*/
const navBarMenu = document.querySelector(".navbar__menu");
navBarMenu.addEventListener("click" , navigateToSection);
function navigateToSection(e){
  e.preventDefault();
  if(e.target.dataset.navLink){
    document.querySelector(`#${e.target.dataset.navLink}`).scrollIntoView({behavior:"smooth"});
    console.log(e.target)
    //if media matches the width upto 950px click on burger icon
    let smallScreenNav = window.matchMedia("(max-width:950px)");
    if(smallScreenNav.matches){
      burgerIcon.click();
    }
  }
}


/*
when scrolling, loading the document and clicking the add button
1- run observeSection function 
2- call the observe method in the IntersectionObserver class
3- observe method accepts the desired elemnt as target
4- use array method called find to return the targeted section that matches the dataset-nav-link of the a tag inside the li
5- check if the section isIntersecting add (your-active-class) to the target link
*/
window.addEventListener("scroll", observeSection);
window.addEventListener("load", observeSection);
addBtn.addEventListener("click",observeSection);
function observeSection() {
  const observeClass = new IntersectionObserver(
    function (sections) {
      sections.forEach((section) => {
        const navLinks = Array.from(document.querySelectorAll("#navbar__list li a"));
        //loop on each nav link and return the data-nav-link that matches the target.id
        const currentNavLink = navLinks.find((link) => {
          return link.dataset.navLink == section.target.id;
        });

        //if section is intersecting 
        if (section.isIntersecting) {
          //add yoyr active class to the section
          section.target.classList.add("your-active-class");
          //remove active class from all links before adding it to the relevant one
          navLinks.forEach((link) => link.classList.remove("active"));
          currentNavLink.classList.add("active");
        } 
        //if sections is not intersecting
        else {
          //remove active class from the section when it is not observed
          section.target.classList.remove("your-active-class");
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



/*
when clicking on the burger icon>>> toggle navbar visibility according to the active class on the burger menu 
1- if the burger has active class, it means the navbar menu also active so 
2- collapse the navbarmenu and the burger menu
3- else add active class to expand the navbar menu and to change the style of the burger icon 
*/
const burgerIcon = document.querySelector("#burger-icon");
const pageHeader = document.querySelector(".page__header")
burgerIcon.addEventListener("click" , toggleNavBarVisibility);
function toggleNavBarVisibility(){
  //if burger icon is expanded (navbar menu is also expanded)
  if(navBarMenu.classList.contains("active")){
    navBarMenu.classList.remove("active")
    burgerIcon.classList.remove("active")
    pageHeader.style.cssText = "background-color:#fff";
  //if burger icon is collapsed (navbar menu is also collapsed)
  }else{  
    navBarMenu.classList.add("active")
    burgerIcon.classList.add("active")
    pageHeader.style.cssText = "background-color:transparent";
  }
}


/*
to top functionality
1- toggle visibility through the toggleVisibilty function
2- scroll to top through totop function
*/
const toTopBtn = document.querySelector("#top-btn");
function toggleVisibilty(){
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 250) {
      toTopBtn.style.right = "10px";
    } else {
      toTopBtn.style.right = "-100%";
    }
  });
};
toggleVisibilty();

function toTop(){
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
toTop();