document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('.section');
	const loader = document.getElementById('loading');
	// Show a specific section and hide others
	function showSection(sectionId) {
		sections.forEach(section => {
			section.style.display = 'none';
		});
		const target = document.getElementById(sectionId);
		if (target) {
			target.style.display = 'block';
			target.scrollIntoView({
				behavior: 'smooth'
			});
		}
	}
	const menuItems = document.querySelectorAll("nav li a");
	menuItems.forEach(item => {
		item.addEventListener("mouseenter", () => {
			const match = item.getAttribute("onclick") ?.match(/'([^']+)'/);
			if (match) {
				const section = document.getElementById(match[1]);
				if (section ?.classList.contains("section-hover-zoom")) {
					section.classList.add("zoomed");
				}
			}
		});
		item.addEventListener("mouseleave", () => {
			const match = item.getAttribute("onclick") ?.match(/'([^']+)'/);
			if (match) {
				const section = document.getElementById(match[1]);
				if (section ?.classList.contains("section-hover-zoom")) {
					section.classList.remove("zoomed");
				}
			}
		});
	});
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
	// Filter by vehicle type (two-wheeler, four-wheeler, both)
	const vehicleTypeDropdown = document.getElementById("vehicle-filter");
	if (vehicleTypeDropdown) {
		vehicleTypeDropdown.addEventListener("change", () => {
			const selected = vehicleTypeDropdown.value;
			const cards = document.querySelectorAll(".ev-card");
			cards.forEach(card => {
				const type = card.getAttribute("data-type");
				card.style.display = (selected === "both" || selected === type) ? "block" : "none";
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
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
	// Contact form handler
	function handleFormSubmit(event) {
		event.preventDefault();
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
				form.reset();
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
		alert("🎉 Registration successful!");
		const homeSection = document.getElementById("home");
		if (homeSection) {
			showSection("home");
			homeSection.scrollIntoView({
				behavior: "smooth"
			});
		}
	}

	function handleLogin(event) {
		event.preventDefault();
		alert("✅ Logged in successfully!");
		const homeSection = document.getElementById("home");
		if (homeSection) {
			showSection("home");
			homeSection.scrollIntoView({
				behavior: "smooth"
			});
		}
	}
	// Make functions available globally
	window.showSection = showSection;
	window.filterVehicles = filterVehicles;
	window.navigateToBrand = navigateToBrand;
	window.handleFormSubmit = handleFormSubmit;
	window.handleLogin = handleLogin;
});
