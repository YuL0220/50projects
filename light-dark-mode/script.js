const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// Dark or light images 
function imageMode(color) {
    image1.src = `img/undraw_make_it_rain_${color}.svg`;
    image2.src = `img/undraw_experience_design_${color}.svg`;
    image3.src = `img/undraw_team_up_${color}.svg`;
}
// Dark Mode Function
function darkMode() {
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    imageMode('dark')
}

// Light Mode Function
function lightMode() {
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%';
    textBox.style.backgroundColor = 'rgb(0 0 0  / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    imageMode('light')
}
// Switch Theme Dyanmically
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        darkMode();
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light');
        lightMode();
    }
}
// Event Listener
toggleSwitch.addEventListener('change', switchTheme)

// check local storage for theme 
const currentTheme = localStorage.getItem('theme');
console.log(currentTheme);
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode();
    }
}