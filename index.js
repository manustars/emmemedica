// JavaScript per la gestione del menu hamburger

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const navigationMenu = document.getElementById('navigation-menu');

    if (menuButton && navigationMenu) {
        // Inizializza lo stato del menu
        function setMenuState() {
            if (window.innerWidth < 768) {
                navigationMenu.classList.remove('open');
                navigationMenu.classList.remove('flex');
                navigationMenu.classList.remove('flex-col');
                navigationMenu.classList.add('hidden');
            } else {
                navigationMenu.classList.remove('hidden');
                navigationMenu.classList.remove('open');
                navigationMenu.classList.remove('flex');
                navigationMenu.classList.remove('flex-col');
                navigationMenu.style.display = '';
                // Forza la visualizzazione della navbar in desktop
                navigationMenu.style.visibility = 'visible';
                navigationMenu.style.opacity = '1';
            }
        }
        setMenuState();
        window.addEventListener('resize', setMenuState);

        menuButton.addEventListener('click', function() {
            if (window.innerWidth >= 768) return; // Non fare nulla su desktop
            if (navigationMenu.classList.contains('hidden')) {
                navigationMenu.classList.remove('hidden');
                // Forza reflow per permettere la transizione su apertura
                void navigationMenu.offsetHeight;
                navigationMenu.classList.add('open');
                navigationMenu.classList.add('flex');
                navigationMenu.classList.add('flex-col');
            } else {
                navigationMenu.classList.remove('open');
                setTimeout(() => {
                    // Solo su mobile nascondi
                    if (window.innerWidth < 768) {
                        navigationMenu.classList.add('hidden');
                        navigationMenu.classList.remove('flex');
                        navigationMenu.classList.remove('flex-col');
                    }
                }, 400); // deve corrispondere alla durata della transizione CSS
            }
        });

        // Chiudi il menu quando si clicca su un link (utile su mobile)
        const navLinks = navigationMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Scroll personalizzato per compensare l'altezza dell'header sticky
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const header = document.querySelector('header');
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8; // 8px extra per aria
                        window.scrollTo({
                            top: targetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                if (window.innerWidth < 768 && navigationMenu.classList.contains('open')) {
                    navigationMenu.classList.remove('open');
                    setTimeout(() => {
                        navigationMenu.classList.add('hidden');
                        navigationMenu.classList.remove('flex');
                        navigationMenu.classList.remove('flex-col');
                    }, 400);
                }
            });
        });
    }


    // Carousel: dissolvenza + pan orizzontale (Ken Burns)
    const images = [
        "img/studio/01_(53).jpg",
        "img/studio/01_(54).jpg",
        "img/studio/01_(55).jpg"
    ];
    let current = 0;
    const imgEl = document.getElementById('carousel-img');

    function restartPan() {
        imgEl.classList.remove('carousel-pan');
        void imgEl.offsetWidth;
        imgEl.classList.add('carousel-pan');
    }

    if (imgEl) {
        imgEl.classList.add('carousel-fade');
        setTimeout(() => { imgEl.classList.add('show'); restartPan(); }, 10);

        setInterval(() => {
            imgEl.classList.remove('show');
            setTimeout(() => {
                current = (current + 1) % images.length;
                imgEl.src = images[current];
                imgEl.classList.add('show');
                restartPan();
            }, 400);
        }, 9000);
    }

    // --- TEAM DINAMICO ---
    fetch('team.json')
        .then(response => response.json())
        .then(team => {
            const container = document.getElementById('team-container');
            if (!container) return;
            container.innerHTML = '';
            team.forEach((membro, idx) => {
                const div = document.createElement('div');
                div.className = `flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200 transform hover:scale-102 transition duration-500 ease-in-out animate-fadeInUp delay-${(idx+1)*100}`;
                div.innerHTML = `
                    <img src="${membro.img}" alt="${membro.nome}" class="w-44 h-44 rounded-full mb-6 object-cover border-5 border-blue-500 shadow-lg">
                    <h3 class="text-2xl font-bold text-blue-800">${membro.nome}</h3>
                    <p class="text-gray-700 font-medium text-lg mb-3">${membro.ruolo}</p>
                    <p class="text-base text-gray-600 leading-relaxed">${membro.descrizione}</p>
                `;
                container.appendChild(div);
            });
        });

    // --- MODALE PRIVACY / TERMINI ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle   = document.getElementById('modal-title');
    const modalBody    = document.getElementById('modal-body');
    const modalClose   = document.getElementById('modal-close');

    function openModal(jsonFile) {
        fetch(jsonFile)
            .then(r => r.json())
            .then(data => {
                modalTitle.textContent = data.titolo;
                modalBody.innerHTML = data.sezioni.map(s => `
                    <div>
                        <h3 class="font-semibold text-blue-800 mb-2">${s.titolo}</h3>
                        <p class="whitespace-pre-line">${s.testo}</p>
                    </div>
                `).join('');
                modalOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
    }

    function closeModal() {
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    document.getElementById('link-privacy')?.addEventListener('click', e => { e.preventDefault(); openModal('privacy-policy.json'); });
    document.getElementById('link-termini')?.addEventListener('click', e => { e.preventDefault(); openModal('termini-condizioni.json'); });
    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', e => { if (e.target === modalOverlay || e.target.classList.contains('modal-backdrop')) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // --- BANNER COOKIE ---
    const cookieBanner = document.getElementById('cookie-banner');

    function showCookieBanner() {
        if (!localStorage.getItem('cookie-consent')) {
            cookieBanner.classList.remove('hidden');
        }
    }

    document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'accepted');
        cookieBanner.classList.add('hidden');
    });
    document.getElementById('cookie-decline')?.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'declined');
        cookieBanner.classList.add('hidden');
    });
    document.getElementById('cookie-privacy-link')?.addEventListener('click', e => { e.preventDefault(); openModal('privacy-policy.json'); });

    setTimeout(showCookieBanner, 800);

    // --- SERVIZI DINAMICI ---
    fetch('servizi.json')
        .then(response => response.json())
        .then(servizi => {
            const serviziContainer = document.getElementById('servizi-container');
            if (!serviziContainer) return;
            serviziContainer.innerHTML = '';
            servizi.forEach((servizio, idx) => {
                const div = document.createElement('div');
                div.className = `bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out border border-blue-300 transform hover:-translate-y-2 animate-scaleIn delay-${(idx+1)*100}`;
                div.innerHTML = `
                    <h3 class="text-xl font-semibold text-blue-800 mb-4">${servizio.titolo}</h3>
                    <p class="text-gray-700 leading-relaxed">${servizio.descrizione}</p>
                `;
                serviziContainer.appendChild(div);
            });
        });
});
