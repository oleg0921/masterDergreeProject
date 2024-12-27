import { loadSection } from './sections.js';

export function addButtonEventListeners() {
    document.querySelectorAll('.button-group button').forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-section');
            loadSection(section);
            updateActiveButton(button);
        });
    });
}

function updateActiveButton(activeButton) {
    document.querySelectorAll('.button-group button').forEach(button => {
        button.classList.remove('active');
        button.style.opacity = '0.7';
    });
    activeButton.classList.add('active');
    activeButton.style.opacity = '1';
}