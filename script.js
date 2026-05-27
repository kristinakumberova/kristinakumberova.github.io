document.addEventListener('DOMContentLoaded', () => {

  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    fadeElements.forEach((el) => observer.observe(el));
  } else {
    fadeElements.forEach((el) => el.classList.add('visible'));
  }

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  const aiNodes = document.querySelectorAll('.ai-node[data-panel-target]');
  const aiPanels = document.querySelectorAll('.ai-panel');

  if (aiNodes.length && aiPanels.length) {
    const activatePanel = (targetKey) => {
      aiNodes.forEach((n) => {
        const isActive = n.dataset.panelTarget === targetKey;
        n.classList.toggle('active', isActive);
        n.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      aiPanels.forEach((p) => {
        const panelKey = p.id.replace('panel-', '');
        p.classList.toggle('hidden', panelKey !== targetKey);
      });
    };

    aiNodes.forEach((node) => {
      node.addEventListener('click', () => {
        activatePanel(node.dataset.panelTarget);
      });
    });

    const handleHash = () => {
      if (window.location.hash === '#tento-web') {
        activatePanel('tento-web');
        const target = document.getElementById('panel-tento-web');
        if (target) {
          requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
  }

  const tabButtons = document.querySelectorAll('[role="tab"][data-tab]');
  const activeClasses = ['border-accent', 'text-accent'];
  const inactiveClasses = ['border-transparent', 'text-text-muted', 'hover:text-text-primary', 'transition-colors'];

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;
      const tablist = btn.closest('[role="tablist"]');
      if (!tablist) return;
      const container = tablist.parentElement;

      tablist.querySelectorAll('[role="tab"]').forEach((b) => {
        activeClasses.forEach((c) => b.classList.remove(c));
        inactiveClasses.forEach((c) => b.classList.add(c));
        b.setAttribute('aria-selected', 'false');
      });
      activeClasses.forEach((c) => btn.classList.add(c));
      inactiveClasses.forEach((c) => btn.classList.remove(c));
      btn.setAttribute('aria-selected', 'true');

      container.querySelectorAll('.tab-panel').forEach((panel) => {
        panel.classList.add('hidden');
      });
      const target = document.getElementById(targetId);
      if (target) target.classList.remove('hidden');
    });
  });

  const marsBtn = document.getElementById('mars-run-btn');
  const marsLog = document.getElementById('mars-log');

  if (marsBtn && marsLog) {
    const debate = [
      {
        agent: 'Author',
        role: 'navrhuje',
        text: 'Tabs v Card 1 řeší too-long-card problem. Recruiter scrolluje méně, dostane se k workflow rychleji.',
        color: 'text-accent',
      },
      {
        agent: 'Reviewer',
        role: 'oponuje',
        text: 'Default tab skryje 3 ze 4 sekcí. 10sekundový scan recruitera = vidí jen Mechaniku. Workflow a Portabilita zůstávají hidden = ztracený signál.',
        color: 'text-red-600',
      },
      {
        agent: 'Meta',
        role: 'rozhoduje',
        text: 'Reviewer má pravdu, ale problém je řešitelný: default = nejhustší tab (Mechanika), visible tab labels fungují jako menu — recruiter vidí, co je k dispozici, i kdyby neklikl. Tabs jsou industry standard, žádný a11y blocker. Decision: SHIP s mitigací.',
        color: 'text-text-primary',
        bold: true,
      },
    ];

    const typingSpeed = 14;
    const interMessageDelay = 350;
    let isRunning = false;

    const typeText = (target, text) => new Promise((resolve) => {
      let i = 0;
      const tick = () => {
        if (i < text.length) {
          target.textContent += text.charAt(i++);
          setTimeout(tick, typingSpeed);
        } else {
          resolve();
        }
      };
      tick();
    });

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    const runDemo = async () => {
      if (isRunning) return;
      isRunning = true;
      marsBtn.disabled = true;
      marsBtn.classList.add('opacity-50', 'cursor-not-allowed');
      marsLog.innerHTML = '';

      for (const msg of debate) {
        const row = document.createElement('div');
        row.className = 'flex flex-col md:flex-row md:gap-3 leading-relaxed';
        const boldClass = msg.bold ? 'font-bold' : 'font-semibold';
        row.innerHTML = `
          <div class="flex gap-2 shrink-0 md:w-44 mb-1 md:mb-0">
            <span class="${msg.color} ${boldClass}">${msg.agent}</span>
            <span class="text-text-muted">${msg.role}:</span>
          </div>
          <span class="text-text-primary flex-1"></span>
        `;
        marsLog.appendChild(row);
        const textTarget = row.querySelector('span.flex-1');
        await typeText(textTarget, msg.text);
        await wait(interMessageDelay);
      }

      const done = document.createElement('p');
      done.className = 'pt-3 mt-3 border-t border-border-soft text-xs text-text-muted italic';
      done.textContent = '— end of debate — klikni Spustit demo pro re-run';
      marsLog.appendChild(done);

      marsBtn.disabled = false;
      marsBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      marsBtn.querySelector('span').textContent = 'Spustit znovu';
      isRunning = false;
    };

    marsBtn.addEventListener('click', runDemo);
  }
});
