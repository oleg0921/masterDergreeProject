export async function loadSection(section) {
    try {
        if(section==='calculation') return
        let response = await fetch(`html/${section}.html`);
        if (!response.ok) {
            response = await fetch(`html/notFound.html`);
        }

        const content = await response.text();
        const contentContainer = document.getElementById('content');
        contentContainer.innerHTML = content;
        contentContainer.style.display = 'block';

        if (section === 'settings') {
            initializeSettingsEvents();
        }
    } catch (error) {
        console.error("Помилка при завантаженні секції:", error);
    }
}

function initializeSettingsEvents() {
    const inputOption = document.getElementById('inputOption');
    const fileInput = document.getElementById('fileInput');

    if (inputOption) {
        inputOption.addEventListener('change', function () {
            fileInput.disabled = this.value !== 'local';
        });
    }
}
