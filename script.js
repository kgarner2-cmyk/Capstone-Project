function applySkillFilter() {
    const input = document.getElementById('skill-search') || document.querySelector('.focus-card input[type="text"]');
    const items = document.querySelectorAll('#skills-list li, .diagnostic-card ul li');
    const consoleOutput = document.getElementById('filter-console') || document.querySelector('.focus-card .diagnostic-console');

    if (!input) return;

    const filterValue = input.value.trim().toLowerCase();
    let visibleCount = 0;

    items.forEach(item => {
        const skillData = (item.getAttribute('data-skill') || '').toLowerCase();
        const textContent = item.textContent.toLowerCase();

        if (filterValue === '' || skillData.includes(filterValue) || textContent.includes(filterValue)) {
            item.style.display = 'list-item';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    if (consoleOutput) {
        if (filterValue === '') {
            consoleOutput.textContent = 'Active Filter: None (Showing all competencies)';
        } else {
            consoleOutput.textContent = `Active Filter: "${filterValue}"\nMatching competencies found: ${visibleCount}`;
        }
    }
}

function clearSkillFilter() {
    const input = document.getElementById('skill-search') || document.querySelector('.focus-card input[type="text"]');
    const items = document.querySelectorAll('#skills-list li, .diagnostic-card ul li');
    const consoleOutput = document.getElementById('filter-console') || document.querySelector('.focus-card .diagnostic-console');

    if (input) {
        input.value = '';
    }

    items.forEach(item => {
        item.style.display = 'list-item';
    });

    if (consoleOutput) {
        consoleOutput.textContent = 'Active Filter: None (Showing all competencies)';
    }
}

function runDiagnostic() {
    const ticketSelect = document.getElementById('ticket-select');
    const outputConsole = document.getElementById('diagnostic-output') || document.getElementById('diagnostic-console');

    if (!ticketSelect || !outputConsole) return;

    const selectedVal = ticketSelect.value;
    let resultText = '';

    if (selectedVal === 'dns' || selectedVal === '402') {
        resultText = `\n[EXECUTING SCRIPT FOR TICKET #402]\n` +
                     `> Executing nslookup intranet.company.local...\n` +
                     `Server:  UnKnown\nAddress:  192.168.1.1\n` +
                     `*** UnKnown can't find intranet.company.local: Non-existent domain\n` +
                     `[DIAGNOSTIC]: DNS Server unreachable. Flushing DNS cache (ipconfig /flushdns)... Done.\n` +
                     `[RESULT]: Fallback DNS 8.8.8.8 assigned. Domain resolved successfully.`;
    } else if (selectedVal === 'ip' || selectedVal === '403') {
        resultText = `\n[EXECUTING SCRIPT FOR TICKET #403]\n` +
                     `> Executing ipconfig /renew...\n` +
                     `Windows IP Configuration:\n` +
                     `An error occurred while renewing interface Ethernet: IP Address conflict detected on network.\n` +
                     `[DIAGNOSTIC]: Releasing old lease (ipconfig /release)... Released.\n` +
                     `[RESULT]: Requesting fresh DHCP offer... New IP Assigned: 192.168.1.142.`;
    } else if (selectedVal === 'ad' || selectedVal === '404') {
        resultText = `\n[EXECUTING SCRIPT FOR TICKET #404]\n` +
                     `> Executing search-aduser -account locked...\n` +
                     `User: jdoe_sales\nStatus: Account Lockout (3 failed password attempts)\n` +
                     `[DIAGNOSTIC]: Running AD Powershell module: Unlock-ADAccount -Identity "jdoe_sales"\n` +
                     `[RESULT]: Account successfully unlocked. Temporary password reset notification sent.`;
    }

    if (outputConsole.textContent.trim().startsWith('> Waiting for diagnostic execution') || outputConsole.textContent.trim() === 'Waiting for diagnostic execution...') {
        outputConsole.textContent = resultText + "\n----------------------------------------";
    } else {
        outputConsole.textContent += resultText + "\n----------------------------------------";
    }

    outputConsole.scrollTop = outputConsole.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-active');
        });
    }

    const skillInput = document.getElementById('skill-search') || document.querySelector('.focus-card input[type="text"]');
    if (skillInput) {
        skillInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applySkillFilter();
            }
        });
    }
});