document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('profileBtn');
    const dropdown = document.getElementById('profileDropdown');

    if (profileBtn && dropdown) {
        
        profileBtn.addEventListener('click', (event) => {
            event.preventDefault();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!profileBtn.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
});
