// header nav buttons
const documentElement = document.documentElement;
const menuButton = document.querySelector(`#menu-button`);
const increaseTextSize = document.querySelector(`#font-size-button`);
const toggleThemeButton = document.querySelector(`#toggle-theme-button`);
const storedTheme = localStorage.getItem('theme');

const initTheme = () => {
  if (localStorage.getItem('theme') === "dark-theme") {
    localStorage.setItem('theme', 'dark-theme');
    documentElement.classList.replace("light-theme", "dark-theme");
    // toggle theme button in menu
    toggleThemeButton.innerHTML = `<i class="fa-solid fa-toggle-on"></i>`;
  } else {
    localStorage.setItem('theme', 'light-theme');
    documentElement.classList.replace("dark-theme", "light-theme");
    // toggle theme button in menu
    toggleThemeButton.innerHTML = `<i class="fa-solid fa-toggle-off"></i>`;
  }
}

// event listener for opening menu
menuButton.addEventListener("click", event => {
  document.querySelector("header").classList.toggle("open");
});

increaseTextSize.addEventListener("click", event => {
  // get computed font size from root
  const docFontSize = parseInt(window.getComputedStyle(documentElement).getPropertyValue('font-size'));
  // if root font size is not greater than 1.25rem increase size
  ((docFontSize / 16) < 1.25) ? documentElement.style = `font-size: ${(docFontSize + 1) / 16 + "rem"}` : ``;
});

toggleThemeButton.addEventListener("click", () => {

  // toggle theme
  localStorage.getItem('theme') === 'dark-theme' ? localStorage.setItem('theme', 'light-theme') : localStorage.setItem('theme', 'dark-theme');

  // render theme
  initTheme();
});

// render theme stored in local storage on page load
initTheme();