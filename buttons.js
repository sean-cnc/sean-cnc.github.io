document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');  // Assuming all nav links are within 'a' tags and relevant to sections.

    function removeActiveStates() {
        navLinks.forEach(link => link.classList.remove('active')); // Corrected to reference navLinks
    }

    function setActiveOnScroll() {
        let scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                removeActiveStates();
                let activeButton = document.querySelector(`nav a[href="#${section.id}"]`); // Ensure this selector matches your HTML.
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveOnScroll);

    // Observing intersection to set active state
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                removeActiveStates(); // Remove all active states before setting a new one
                const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Setting up smooth scroll on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href').substring(1); // Get the section id from href attribute
            scrollToSection(targetId);
        });
    });
});

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
