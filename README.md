# Landing Page Project

## Table of Contents
* [Development](#development)
    * [HTML modifications](#html)
    * [CSS modifications](#css)
    * [JS modifications](#js)
* [Dependencies](#dependencies)

## Development
### HTML
no drastic changes has been made to the original html file, in addition to what was provided, i just added some markup to help me with this project, the added markup:
1. in the navbar, i added a button to add new section dynamically using JS.
2. I added button to scroll to top with feature to change visibility according to the scollY property in JS.
3. linked external JS script to the html file.

### CSS
I kept everything as it is in the original file except:
1. I have changed the background linear gradient of *your-active-class*.
2. added class active to the list items inside the *navbar__listnavbar__list*.

### JS
in order to make evrything dynamic, i created the following functions:
- [x] *addNewContent* to add new section when clicking the *add new section* button.
- [x] *addNavLinks* to add links to the *navbar__listnavbar__list* according to the number of sections created.
- [x] *toggleVisibilty* and *toTop* functions to handle the visibility and the scrolling mechanism after scrolling so far down from the navbar.
- [x] *observeSection* function to observe the section element in focus when scrolling.

## Dependencies
- HTML5 
- CSS3
- JS[ES6]
- JS[IntersectionObserver]API