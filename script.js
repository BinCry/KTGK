var menuButton = document.querySelector('.menu-toggle');
var menu = document.querySelector('.nav-links');
var navigationLinks = document.querySelectorAll('.nav-links a');
var backToTop = document.querySelector('.back-to-top');
var sections = document.querySelectorAll('main > section');
var contactForm = document.querySelector('.contact-form');

function closeMenu() {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Mở menu');
}

menuButton.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
});

document.querySelectorAll('a[href^="#"]:not(.empty-link)').forEach(function (link) {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        menuButton.focus();
    }
});

document.addEventListener('click', function (event) {
    if (!event.target.closest('.navigation')) closeMenu();
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 767) closeMenu();
});

document.querySelectorAll('.empty-link').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();
    });
});

function updateNavigation() {
    backToTop.classList.toggle('visible', window.scrollY > 250);
    var currentSection = sections[0].id;
    var offset = document.querySelector('.site-header').offsetHeight + 60;
    sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= offset) currentSection = section.id;
    });
    navigationLinks.forEach(function (link) {
        var isActive = link.getAttribute('href') === '#' + currentSection;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
}

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

function validateField(field) {
    field.setCustomValidity('');
    if (!field.value.trim()) {
        field.setCustomValidity('Vui lòng điền đầy đủ thông tin.');
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        field.setCustomValidity('Vui lòng nhập địa chỉ email hợp lệ.');
    }
}

contactForm.querySelectorAll('[required]').forEach(function (field) {
    field.addEventListener('input', function () { validateField(field); });
    field.addEventListener('change', function () { validateField(field); });
});

contactForm.addEventListener('submit', function (event) {
    contactForm.querySelectorAll('[required]').forEach(function (field) {
        field.value = field.value.trim();
        validateField(field);
    });
    if (!contactForm.checkValidity()) {
        event.preventDefault();
        contactForm.reportValidity();
    }
});
