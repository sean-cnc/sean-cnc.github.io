document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav button, nav a:not(.button)');

    function removeActiveStates() {
        buttons.forEach(button => button.classList.remove('active'));
    }

    function setActiveOnScroll() {
        let scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                removeActiveStates();
                let activeButton = document.querySelector(`nav a[href="#${section.id}"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveOnScroll);

    function activateLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('onclick')?.includes(sectionId)) {
                link.classList.add('active');
            }
        });
    }

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('nav button').forEach(button => {
        button.addEventListener('click', function() {
            let targetSection = this.getAttribute('onclick').split("'")[1];
            document.getElementById(targetSection). scrollIntoView({ behavior: 'smooth' });
        });
    });
});




function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
