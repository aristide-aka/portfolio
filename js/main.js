/* ── Navigation active au scroll ── */
(function () {
    const links = document.querySelectorAll('.nav-link');
    if (!links.length) return;

    const sections = Array.from(links)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);
    if (!sections.length) return;

    const setActive = (id) => {
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) setActive(entry.target.id);
        });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
})();

/* ── Animation des barres de compétences ── */
(function () {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const target = bar.dataset.width || '0%';
                requestAnimationFrame(() => {
                    setTimeout(() => { bar.style.width = target; }, 80);
                });
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => {
        bar.dataset.width = bar.style.width || '0%';
        bar.style.width = '0%';
        observer.observe(bar);
    });
})();

/* ── Fade-in au scroll ── */
(function () {
    const items = document.querySelectorAll('.fade-in');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach(item => observer.observe(item));
})();

/* ── Formulaire de contact ── */
(function () {
    document.querySelectorAll('form[id="contactForm"]').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;

            btn.textContent = 'Envoi en cours…';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.textContent = 'Message envoyé ✓';
                form.reset();
                setTimeout(() => {
                    btn.textContent = original;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    });
})();
