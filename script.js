document.addEventListener('DOMContentLoaded', () => {
    // Gestion du Carrousel / Onboarding
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.getElementById('next-btn');
    const onboardingScreen = document.getElementById('onboarding-screen');
    const appContent = document.getElementById('app-content');

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Modifier le texte du bouton sur la dernière slide
        if (index === slides.length - 1) {
            nextBtn.textContent = "Accéder à l'application";
        } else {
            nextBtn.textContent = "Suivant";
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        } else {
            // Masquer l'onboarding et afficher l'application principale
            onboardingScreen.classList.add('hidden');
            appContent.classList.remove('hidden');
        }
    });

    // Navigation par onglets dans l'application
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const viewSections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').replace('#', '');

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            viewSections.forEach(section => {
                if (section.id === `view-${targetId}`) {
                    section.classList.remove('hidden');
                    section.classList.add('active');
                } else {
                    section.classList.add('hidden');
                    section.classList.remove('active');
                }
            });
        });
    });
});
