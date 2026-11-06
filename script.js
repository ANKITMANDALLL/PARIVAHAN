
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

// Mobile navigation

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Close menu after clicking a navigation link

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

// Role selection (prototype only)

document.querySelectorAll(".role-card").forEach(card => {
    card.addEventListener("click", (event) => {
        event.preventDefault();

        const role = card.dataset.role;

        alert(
            `You selected the ${role.toUpperCase()} portal.\nLogin functionality will be implemented next.`
        );
    });
});
