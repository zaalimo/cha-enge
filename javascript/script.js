// Wait for the HTML elements to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Select elements by their explicit IDs
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');

    // Track state (true = open/visible, false = closed/collapsed)
    let isOpen = true;

    /**
     * Opens the left sidebar by expanding its width
     */
    function openSidebar() {
        isOpen = true;
        
        // Expand the container size 
        if (sidebar) {
            sidebar.classList.remove('w-0');
            sidebar.classList.add('w-64');
        }
        
        // Show dark background dimming filter ONLY on small mobile viewports
        if (overlay && window.innerWidth < 1024) {
            overlay.classList.remove('hidden');
        }
    }

    /**
     * Closes the left sidebar by collapsing its width to absolute zero
     */
    function closeSidebar() {
        isOpen = false;
        
        // Collapse the container size down completely
        if (sidebar) {
            sidebar.classList.remove('w-64');
            sidebar.classList.add('w-0');
        }
        
        // Always hide the mobile background dark layer when closed
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    /**
     * Toggles the sidebar visibility state based on current open variable
     */
    function toggleSidebar() {
        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    /**
     * Initializer function to check the starting viewport scale on page load
     */
    function initLayout() {
        if (window.innerWidth < 1024) {
            closeSidebar(); // Hide on small device viewports by default
        } else {
            openSidebar();  // Keep expanded alongside dashboard layout on desktop
        }
    }

    // Initialize layout settings immediately on load
    initLayout();

    // Safely attach event listeners after verification checks
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click bubbling interference
            toggleSidebar();
        });
    } else {
        console.error("Sidebar Error: Could not find an element with id='sidebar-toggle'. Ensure your button matches this ID.");
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Optional: Dynamic listener to handle user window resizing in real-time
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && !isOpen) {
            openSidebar();
        } else if (window.innerWidth < 1024 && isOpen) {
            closeSidebar();
        }
    });
});


//just for the sake of testing the code