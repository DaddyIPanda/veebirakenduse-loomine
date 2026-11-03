// Wait for the HTML to fully load before running the script.
document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('profileBtn');
    const dropdown = document.getElementById('profileDropdown');

    // Ensure both elements exist on the page to prevent JavaScript errors.
    if (profileBtn && dropdown) {
        
        // Toggle the menu visibility when the profile button is clicked.
        profileBtn.addEventListener('click', (event) => {
            // Prevent the link from jumping to the top of the page.
            event.preventDefault();
            dropdown.classList.toggle('show');
        });

        // Close the menu if the user clicks anywhere outside of it.
        document.addEventListener('click', (event) => {
            // Check if the clicked area is neither the button nor the menu itself.
            if (!profileBtn.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
});
