// header nav buttons
const documentElement = document.documentElement;
const menuButton = document.querySelector(`#menu-button`);
const increaseTextSize = document.querySelector(`#font-size-button`);
const toggleTheme = document.querySelector(`#toggle-theme-button`);

menuButton.addEventListener("click", event => {
  document.querySelector("header").classList.toggle("open");
});

increaseTextSize.addEventListener("click", event => {
  // get computed font size from root
  const docFontSize = parseInt(window.getComputedStyle(documentElement).getPropertyValue('font-size'));
  // if root font size is not greater than 1.5rem increase size
  ((docFontSize / 16) < 1.5) ? documentElement.style = `font-size: ${(docFontSize + 1) / 16 + "rem"}` : ``;
});







toggleTheme.addEventListener("click", event => {

  const toggleButton = event.currentTarget;
  // toggle dark-theme and light-theme
  if (documentElement.classList.contains("light-theme")) {
    localStorage.setItem('theme', 'dark-theme');
    documentElement.classList.replace("light-theme", "dark-theme");
    // toggle theme button in menu
    toggleButton.innerHTML = `<i class="fa-solid fa-toggle-on"></i>`;
  } else {
    localStorage.setItem('theme', 'light-theme');
    documentElement.classList.replace("dark-theme", "light-theme");
    // toggle theme button in menu
    toggleButton.innerHTML = `<i class="fa-solid fa-toggle-off"></i>`;
  }
  console.log(localStorage.getItem('theme'));
});

const initTheme = () => {
  console.log(localStorage.getItem('theme'));


  if (localStorage.getItem('theme') === "dark-theme") {
    localStorage.setItem('theme', 'dark-theme');
    documentElement.classList.replace("light-theme", "dark-theme");
    // toggle theme button in menu
    toggleTheme.innerHTML = `<i class="fa-solid fa-toggle-on"></i>`;
  } else {
    localStorage.setItem('theme', 'light-theme');
    documentElement.classList.replace("dark-theme", "light-theme");
    // toggle theme button in menu
    toggleTheme.innerHTML = `<i class="fa-solid fa-toggle-off"></i>`;
  }










}

initTheme();
