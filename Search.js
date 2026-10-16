function restaurerSessionDashboard(user) {
            document.getElementById('display-username').innerText = user.prenom;
            document.getElementById('profile-full-name').innerText = `${user.prenom} ${user.nom} ${user.postnom}`;
            document.getElementById('profile-details-disp').innerText = `École: ${user.ecole} | ${user.sousDivision}, ${user.province}`;
            
            if (user.photo) {
                userPhotoUrl = user.photo;
                document.getElementById('dash-avatar-img').src = userPhotoUrl;
                document.getElementById('tab-user-avatar').src = userPhotoUrl;
            }

            showScreen('main-app');
            updateXPBar();
            fetchLiveNewsRDC();
            generateInfiniteQuizQuestion();
            
            initialiserRappelsEtude();
        }

        function showScreen(id) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            // AJOUT : animation liquide à l'entrée dans l'application
            if (id === 'main-app') { jouerAnimationLiquide(); }
        }

        // AJOUT : déclenche l'animation d'entrée (effet liquide + transparence)
        function activerRevelationDefilement() {
            if (!('IntersectionObserver' in window)) return;
            const io = new IntersectionObserver((entries) => {
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        en.target.classList.remove('reveal-pending');
                        io.unobserve(en.target);
                    }
                });
            }, { threshold: 0.08 });
            document.querySelectorAll('#main-app .authority-showcase, #main-app .section-title').forEach((el) => {
                if (el.dataset.rv) return;
                el.dataset.rv = '1';
                el.classList.add('reveal-pending');
                io.observe(el);
            });
        }

        function jouerAnimationLiquide() {
            activerRevelationDefilement();
            const intro = document.getElementById('liquid-intro');
            if (!intro) return;
            intro.classList.remove('play');
            void intro.offsetWidth;
            intro.classList.add('play');
            setTimeout(() => intro.classList.remove('play'), 2100);
        }

        function nextOnboarding() {
            currentStep++;
            if (currentStep >= onboardingImages.length) {
                showScreen('auth-screen');
            } else {
                updateOnboarding();
            }
        }

        function updateOnboarding() {
            const data = onboardingImages[currentStep];
            document.getElementById('onb-btn').innerText = data.btn;
            document.getElementById('onboarding-bg').style.backgroundImage = `url('${data.bg}')`;
            for(let i = 0; i < 3; i++) {
                document.getElementById(`dot-${i}`).classList.toggle('active', i === currentStep);
            }
        }

        function switchTab(tabId, index) {
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            
            document.getElementById(tabId).classList.add('active');
            if (index >= 0 && index < 5) {
                document.querySelectorAll('.nav-item')[index].classList.add('active');
            }
            
            if (tabId === 'tab-quiz') {
                generateInfiniteQuizQuestion();
            }
            window.scrollTo(0, 0);
        }

        function ouvrirPagePresidents() {
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.getElementById('tab-presidents-list').classList.add('active');
            window.scrollTo(0, 0);
        }

        function openLightbox(imgSrc) {
            document.getElementById('lightbox-img').src = imgSrc;
            document.getElementById('lightbox-modal').classList.add('active');
        }
        function closeLightbox() {
            document.getElementById('lightbox-modal').classList.remove('active');
        }

        function updateSubDivisions() {
            const provinceSelect = document.getElementById('user-province');
            const subDivSelect = document.getElementById('user-subdivision');
            const selectedProvince = provinceSelect.value;

            subDivSelect.innerHTML = '<option value="">Sélectionnez votre sous-division</option>';

            if (subdivisionsData[selectedProvince]) {
                subdivisionsData[selectedProvince].forEach(sub => {
                    const opt = document.createElement('option');
                    opt.value = sub;
                    opt.textContent = sub;
                    subDivSelect.appendChild(opt);
                });
            }
        }

        // CORRECTION : la photo est maintenant réduite/compressée avant d'être enregistrée,
        // sinon elle dépassait la limite du localStorage et bloquait la validation.
        function previewAvatar(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = new Image();
                    img.onload = function() {
                        const maxSize = 300;
                        let w = img.width, h = img.height;
                        if (w > h) { if (w > maxSize) { h = Math.round(h * maxSize / w); w = maxSize; } }
                        else { if (h > maxSize) { w = Math.round(w * maxSize / h); h = maxSize; } }
                        const canvas = document.createElement('canvas');
                        canvas.width = w;
                        canvas.height = h;
                        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                        userPhotoUrl = canvas.toDataURL('image/jpeg', 0.7);
                        document.getElementById('profile-avatar-img').src = userPhotoUrl;
                    };
                    img.onerror = function() {
                        userPhotoUrl = e.target.result;
                        document.getElementById('profile-avatar-img').src = userPhotoUrl;
                    };
                    img.src = e.target.result;
                }
                reader.onerror = function() {
                    console.error("Erreur de chargement de l'image");
                }
                reader.readAsDataURL(file);
            }
        }

        function verifyPhoneRDC() {
            const phone = document.getElementById('rdc-phone').value.trim();
            if (phone.length < 9) {
                alert("Veuillez saisir un numéro de téléphone RDC valide à 9 chiffres.");
                return;
            }
            showScreen('profile-screen');
        }

        function finishProfile(e) {
            e.preventDefault();
            const nom = document.getElementById('user-name').value;
            const postnom = document.getElementById('user-postnom').value;
            const prenom = document.getElementById('user-firstname').value;
            const ecole = document.getElementById('user-school').value;
            const province = document.getElementById('user-province').value;
            const subdivision = document.getElementById('user-subdivision').value;
            const phone = document.getElementById('rdc-phone').value;

            const userData = {
                nom: nom,
                postnom: postnom,
                prenom: prenom,
                nomComplet: `${nom} ${postnom} ${prenom}`,
                ecole: ecole,
                province: province,
                sousDivision: subdivision,
                telephone: `+243${phone}`,
                photo: userPhotoUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                dateInscription: new Date().toISOString()
            };

            // CORRECTION : sauvegarde protégée (try/catch) pour que l'inscription se valide toujours
            try {
                let inscrits = JSON.parse(localStorage.getItem('educ_inscrits_rdc') || '[]');
                inscrits.push(userData);
                localStorage.setItem('educ_inscrits_rdc', JSON.stringify(inscrits));
            } catch (err) {
                console.error("Stockage liste inscrits impossible :", err);
            }

            try {
                localStorage.setItem('educ_utilisateur_connecte', JSON.stringify(userData));
            } catch (err) {
                console.error("Stockage session impossible, nouvel essai sans photo :", err);
                try {
                    const userSansPhoto = Object.assign({}, userData, { photo: '' });
                    localStorage.setItem('educ_utilisateur_connecte', JSON.stringify(userSansPhoto));
                } catch (err2) {
                    console.error("Stockage session impossible :", err2);
                }
            }

            restaurerSessionDashboard(userData);
            
            demanderPermissionNotifications();
        }

        function deconnecterUtilisateur() {
            if (confirm("Voulez-vous vraiment vous déconnecter de votre compte ?")) {
                localStorage.removeItem('educ_utilisateur_connecte');
                location.reload();
            }
        }

        function ouvrirPanneauCreateur() {
            const code = prompt("Entrez le code secret créateur :");
            if (code === "MNL") {
                const inscrits = JSON.parse(localStorage.getItem('educ_inscrits_rdc') || '[]');
                let listeStr = `=== UTILISATEURS INSCRITS (${inscrits.length}) ===\n\n`;
                inscrits.forEach((u, i) => {
                    listeStr += `${i+1}. ${u.nomComplet} | École: ${u.ecole} | Tél: ${u.telephone} | Province: ${u.province}\n`;
                });
                alert(listeStr);
            } else if (code !== null) {
                alert("Code erroné.");
            }
        }

        function demanderPermissionNotifications() {
            if (!("Notification" in window)) {
                alert("Votre navigateur ne prend pas en charge les notifications.");
                return;
            }

            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    alert("Super ! Les notifications de rappel pour la Nouvelle Citoyenneté et l'étude sont activées.");
                    envoyerNotificationInstantanee("EDUC National", "Bien joué ! Vos rappels d'étude sont désormais configurés.");
                } else {
                    alert("Les notifications ont été refusées. Vous pouvez les réactiver dans les paramètres de votre navigateur.");
                }
            });
        }

        function envoyerNotificationInstantanee(titre, corps) {
            if (Notification.permission === "granted") {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification(titre, {
                            body: corps,
                            icon: 'logoo.png',
                            badge: 'logoo.png'
                        });
                    });
                } else {
                    new Notification(titre, {
                        body: corps,
                        icon: 'logoo.png'
                    });
                }
            }
        }

        function initialiserRappelsEtude() {
            if (window.educPlanifierRappels) { window.educPlanifierRappels(); }
            return;
            const intervalleRappelMS = 4 * 60 * 60 * 1000;
            
            setInterval(() => {
                const messagesRappel = [
                    "C'est l'heure d'étudier ! Révisez votre module de Nouvelle Citoyenneté pour gagner +150 XP 🇨🇩",
                    "Manassé IA vous attend pour un nouveau quiz éducatif. Venez tester vos connaissances !",
                    "Maintenez votre série d'apprentissage ! Ouvrez l'application EDUC National dès maintenant."
                ];
                const messageAleatoire = messagesRappel[Math.floor(Math.random() * messagesRappel.length)];
                
                envoyerNotificationInstantanee("Rappel d'Étude - EDUC National", messageAleatoire);
            }, intervalleRappelMS);
        }

        function generateInfiniteQuizQuestion() {
            if (!manasseQuestionBank.length) return;
            const baseItem = manasseQuestionBank[Math.floor(Math.random() * manasseQuestionBank.length)];
            let options = [baseItem.correct, ...baseItem.wrongs];
            
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }

            currentActiveQuestion = {
                question: baseItem.q,
                options: options,
                correctAnswer: baseItem.correct
            };

            renderQuizUI();
        }

        function renderQuizUI() {
            document.getElementById('quiz-q-text').innerText = currentActiveQuestion.question;
            const container = document.getElementById('quiz-options-list');
            container.innerHTML = '';
            
            document.getElementById('quiz-feedback').style.display = 'none';
            document.getElementById('quiz-feedback').className = 'quiz-feedback-box';
            document.getElementById('next-q-btn').style.display = 'none';

            currentActiveQuestion.options.forEach((optText) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option-btn';
                btn.innerHTML = `<span>${optText}</span><i class="fa-regular fa-circle" style="color: var(--text-muted);"></i>`;
                btn.onclick = () => validateAnswerChoice(btn, optText);
                container.appendChild(btn);
            });
        }

        function validateAnswerChoice(selectedButton, chosenText) {
            const allButtons = document.querySelectorAll('.quiz-option-btn');
            allButtons.forEach(b => b.disabled = true);

            const isCorrect = (chosenText === currentActiveQuestion.correctAnswer);
            const feedbackBox = document.getElementById('quiz-feedback');

            if (isCorrect) {
                selectedButton.classList.add('correct');
                selectedButton.querySelector('i').className = 'fa-solid fa-circle-check';
                selectedButton.querySelector('i').style.color = 'var(--success-green)';
                feedbackBox.innerText = "Excellente réponse ! Manassé IA valide. +50 XP";
                feedbackBox.className = 'quiz-feedback-box success';
                addXP(50);
            } else {
                selectedButton.classList.add('incorrect');
                selectedButton.querySelector('i').className = 'fa-solid fa-circle-xmark';
                selectedButton.querySelector('i').style.color = 'var(--error-red)';

                allButtons.forEach(b => {
                    if (b.innerText.trim() === currentActiveQuestion.correctAnswer.trim()) {
                        b.classList.add('correct');
                        b.querySelector('i').className = 'fa-solid fa-circle-check';
                        b.querySelector('i').style.color = 'var(--success-green)';
                    }
                });

                feedbackBox.innerText = "Incorrect. Manassé IA a mis en évidence la bonne réponse ci-dessus.";
                feedbackBox.className = 'quiz-feedback-box error';
            }

            document.getElementById('next-q-btn').style.display = 'block';
        }

        function loadNextInfiniteQuestion() {
            generateInfiniteQuizQuestion();
        }

        function addXP(amount) {
            userXP += amount;
            if (userXP > 1000) userXP = 1000;
            updateXPBar();
        }

        function updateXPBar() {
            const maxXP = 1000;
            const percentage = Math.round((userXP / maxXP) * 100);
            document.getElementById('xp-fill').style.width = percentage + '%';
            document.getElementById('user-xp-percent').innerText = percentage + '%';
            document.getElementById('user-xp-text').innerText = `${userXP} / ${maxXP} XP`;
        }

        async function fetchLiveNewsRDC() {
            const container = document.getElementById('live-news-container');
            
            // Intégration de l'API NewsData.io avec filtrage sur l'Éducation Nationale et la RDC
            const apiKey = (window.EDUC_CONFIG && window.EDUC_CONFIG.NEWSDATA_KEY) || "";
            const newsApiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=Education%20nationale%20Congo%20RDC&language=fr`;
            
            try {
                const response = await fetch(newsApiUrl);
                const data = await response.json();
                
                if (data.status === 'success' && data.results && data.results.length > 0) {
                    container.innerHTML = '';
                    data.results.slice(0, 8).forEach((item) => {
                        const date = item.pubDate ? new Date(item.pubDate).toLocaleDateString('fr-FR') : 'RDC News';
                        
                        // Image fallback si aucune n'est disponible
                        const imageUrl = item.image_url ? item.image_url : 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80';
                        
                        const descriptionText = item.description ? item.description.substring(0, 110) + '...' : 'Actualité officielle concernant l\'Éducation nationale et la citoyenneté en RDC.';

                        const card = `
                            <div class="news-card">
                                <img src="${escHtml(imageUrl)}" alt="${escHtml(item.title)}" class="news-card-img" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80';">
                                <span style="font-size: 0.75rem; color: var(--primary-blue); font-weight: 700;"><i class="fa-solid fa-flag"></i> Éducation & Citoyenneté RDC</span>
                                <h4 style="font-size: 0.95rem; font-weight: 700; margin: 4px 0; color: var(--text-dark);">${escHtml(item.title)}</h4>
                                <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${escHtml(descriptionText)}</p>
                                <div style="display:flex; justify-content:space-between; align-items:center; font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">
                                    <span><i class="fa-regular fa-clock"></i> ${date}</span>
                                    <a href="${escHtml(item.link)}" target="_blank" style="color: var(--primary-blue); font-weight: 700; text-decoration: none;">Lire la suite →</a>
                                </div>
                            </div>
                        `;
                        container.innerHTML += card;
                    });
                } else {
                    container.innerHTML = `<div class="news-card"><p style="font-size: 0.85rem; color: var(--text-muted);">Aucune nouvelle actualité disponible pour le moment.</p></div>`;
                }
            } catch (err) {
                console.error("Erreur NewsData API :", err);
                container.innerHTML = `
                    <div class="news-card">
                        <span style="font-size: 0.75rem; color: var(--primary-blue); font-weight: 700;">Éducation RDC</span>
                        <h4 style="font-size: 0.95rem; font-weight: 700; margin: 4px 0;">Ministère de l'Éducation Nationale</h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted);">Suivez les activités récents et décisions du Ministère de l'Éducation Nationale et Nouvelle Citoyenneté de la RDC.</p>
                    </div>
                `;
            }
        }
    </script>

    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker enregistré avec succès !', reg))
            .catch(err => console.log('Erreur lors de l’enregistrement du Service Worker :', err));
        });
      }
    </script>
    <script>
      /* Chargement en arrière-plan (ordre garanti). L'application s'affiche d'un seul coup quand tous ses éléments sont prêts. */
      (function () {
        var H = document.documentElement;
        function pret() { if (H.classList.contains('educ-pret')) return; H.classList.add('educ-pret'); try { window.dispatchEvent(new Event('educ-pret')); } catch (e) {} }
        window.educPret = pret;
        /* Porte d'affichage : tant que l'application est ouverte mais que les cartes, dossiers et la capsule ne sont pas tous là, on attend (6 s maximum) */
        var ta = 0, gi = setInterval(function () {
          var a = document.getElementById('main-app'); if (!a) return;
          var act = a.classList.contains('active'); if (act) ta++;
          var manque = act && !(document.getElementById('dos-grid') && document.getElementById('pat-fl') && document.getElementById('cap-hero'));
          H.classList.toggle('educ-attente', !!manque && ta < 60);
          if (!manque && act && ta > 3) { pret(); }
          if (ta >= 60) clearInterval(gi);
        }, 100);
        /* Appareil modeste : verre allégé. On le détecte par la mémoire, puis par la fluidité réelle (images par seconde). */
        try { if (localStorage.getItem('educ_lite') === '1' || (navigator.deviceMemory && navigator.deviceMemory <= 2)) H.classList.add('educ-lite'); } catch (e) {}
        window.addEventListener('educ-pret', function () {
          try {
            if (H.classList.contains('educ-lite') || !window.requestAnimationFrame) return; var n = 0, t0 = 0;
            (function boucle(t) { if (!t0) t0 = t; n++; if (t - t0 < 1800) { requestAnimationFrame(boucle); return; } var fps = n / ((t - t0) / 1000);
              if (fps < 38) { H.classList.add('educ-lite'); try { localStorage.setItem('educ_lite', '1'); } catch (e) {} } })(0);
          } catch (e) {}
        });
        /* Économie : on met toutes les animations en pause quand l'application n'est pas visible */
        document.addEventListener('visibilitychange', function () { H.classList.toggle('educ-pause', document.hidden); });
        /* Bulles de verre */
        try {
          var app = document.getElementById('main-app');
          if (app) for (var b = 0; b < 9; b++) {
            var d = document.createElement('div'), s = 28 + Math.round(Math.random() * 70);
            d.className = 'glass-bubble'; d.style.width = d.style.height = s + 'px'; d.style.left = Math.round(Math.random() * 92) + '%';
            d.style.animationDuration = (16 + Math.random() * 18).toFixed(1) + 's'; d.style.animationDelay = '-' + (Math.random() * 20).toFixed(1) + 's';
            d.style.setProperty('--dx', Math.round(-60 + Math.random() * 120) + 'px'); app.appendChild(d);
          }
        } catch (e) {}
        ['questions-facile.js', 'questions-difficile.js', 'questions-pro.js', 'quiz.js', 'news.js', 'notifications.js', 'search.js', 'savoirs.js', 'scenes.js', 'patriote.js', 'quotidien.js', 'brevet.js', 'carte.js'].forEach(function (src) {
          var el = document.createElement('script'); el.src = src; el.async = false; document.body.appendChild(el);
        });
      })();
    </script>
</body>
</html>
