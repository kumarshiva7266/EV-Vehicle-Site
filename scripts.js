document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const loader = document.getElementById('loading');

    // Show a specific section and hide others
    const showSection = (sectionId) => {
        showLoading();
        setTimeout(() => {
            sections.forEach(section => {
                section.style.display = 'none';
            });

            const target = document.getElementById(sectionId);
            if (target) target.style.display = 'block';
            hideLoading();
        }, 700);
    };

    // Filter vehicle cards by category (e.g., city, budget, range)
    const filterVehicles = (category) => {
        showLoading();
        setTimeout(() => {
            const vehicleCards = document.querySelectorAll('.vehicle-card');
            vehicleCards.forEach(card => {
                const matches = card.dataset.category === category || category === 'all';
                card.style.display = matches ? 'block' : 'none';
            });
            hideLoading();
        }, 700);
    };

    // New: Filter by vehicle type (two-wheeler, four-wheeler, both)
    const vehicleTypeDropdown = document.getElementById("vehicle-filter");
    if (vehicleTypeDropdown) {
        vehicleTypeDropdown.addEventListener("change", () => {
            const selected = vehicleTypeDropdown.value;
            const cards = document.querySelectorAll(".ev-card");

            cards.forEach(card => {
                const type = card.getAttribute("data-type");

                if (selected === "both" || selected === type) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // Show loader
    const showLoading = () => {
        if (loader) loader.style.display = 'block';
    };

    // Hide loader
    const hideLoading = () => {
        if (loader) loader.style.display = 'none';
    };

    // Navigate to brand-specific page
    const navigateToBrand = (brandId) => {
        showLoading();
        setTimeout(() => {
            window.location.href = `brands/${brandId}.html`;
        }, 700);
    };

    // Smooth scroll for internal links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form handler
    function handleFormSubmit(event) {
        event.preventDefault(); // stop the default form redirect

        const form = event.target;
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert("✅ Form submitted successfully!");
                form.reset(); // clear form after success
            } else {
                alert("❌ There was a problem submitting the form.");
            }
        }).catch(error => {
            alert("❌ Error: " + error.message);
        });

        return false;
    }

    function handleRegister(event) {
        event.preventDefault();
    
        // You can collect form values or validate here if needed
        alert("🎉 Registration successful!");
    
        // Scroll to home or show home section
        const homeSection = document.getElementById("home");
        if (homeSection) {
            showSection("home");
            homeSection.scrollIntoView({ behavior: "smooth" });
        }
    }
    

    // 🔐 Login form handler: Scroll to #home after Sign In
    function handleLogin(event) {
        event.preventDefault();

        // You can also do validation or auth check here
        alert("✅ Logged in successfully!");

        // Redirect to home section
        const homeSection = document.getElementById("home");
        if (homeSection) {
            showSection("home"); // If using section-based navigation
            homeSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
        }
    }

    // Make functions available globally
    window.showSection = showSection;
    window.filterVehicles = filterVehicles;
    window.navigateToBrand = navigateToBrand;
    window.handleFormSubmit = handleFormSubmit;
    window.handleLogin = handleLogin;
});
