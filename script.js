const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

// Mobile navigation

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close menu after clicking a navigation link

    document.querySelectorAll("#navMenu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}


// =================================
// ROLE SELECTION
// =================================

document.querySelectorAll(".role-card").forEach(card => {

    card.addEventListener("click", (event) => {

        event.preventDefault();

        const role = card.dataset.role;

        alert(
            `You selected the ${role.toUpperCase()} portal.\nLogin functionality will be implemented next.`
        );

    });

});


// =================================
// PRIVAHAN ROUTE DATA FETCHING
// =================================

// Google Apps Script API URL

const API_URL = "https://script.google.com/macros/s/AKfycbwUSH3ij3tMkpCxOE17RWIAPmkVssa43hm9NysZCwY9PCGhH-F3eF9NND_fFa2IkhTc/exec";

const routeGrid = document.getElementById("routeGrid");
const routeCount = document.getElementById("routeCount");
const dataStatus = document.getElementById("dataStatus");


// =================================
// FETCH ROUTES FROM GOOGLE SHEETS
// =================================

async function fetchRoutes() {

    // Check whether route elements exist

    if (!routeGrid || !routeCount || !dataStatus) {
        console.error("Route section elements not found.");
        return;
    }

    try {

        dataStatus.textContent = "Connecting to server...";

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(
                "Server returned an error: " + response.status
            );
        }

        const result = await response.json();

        console.log("API Data:", result);
        console.log("Routes:", result.routes);

        if (!Array.isArray(result.routes)) {
            throw new Error("Invalid route data received.");
        }

        // Display routes on website

        displayRoutes(result.routes);

        routeCount.textContent =
            result.routes.length + " Routes";

        dataStatus.textContent =
            "Route information loaded successfully.";

    } catch (error) {

        console.error("Route fetching error:", error);

        routeGrid.replaceChildren();

        const errorBox = document.createElement("div");

        errorBox.className = "route-error";

        errorBox.textContent =
            "Unable to load routes. Please try again later.";

        routeGrid.appendChild(errorBox);

        routeCount.textContent = "Unavailable";

        dataStatus.textContent =
            "Unable to connect to transportation server.";

    }

}


// =================================
// DISPLAY ROUTES DYNAMICALLY
// =================================

function displayRoutes(routes) {

    routeGrid.replaceChildren();

    if (routes.length === 0) {

        routeGrid.textContent = "No routes available.";

        return;
    }

    routes.forEach(route => {

        const card = document.createElement("div");
        card.className = "route-card";


        // Route header

        const top = document.createElement("div");
        top.className = "route-top";

        const number = document.createElement("span");
        number.className = "route-number";
        number.textContent = route.routeId ?? "";

        const status = document.createElement("span");
        status.className = "route-status";
        status.textContent = route.status ?? "";

        top.append(number, status);


        // Route name

        const heading = document.createElement("h3");
        heading.textContent = route.routeName ?? "Unnamed Route";


        // Divider

        const divider = document.createElement("div");
        divider.className = "route-divider";


        // Assigned buses

        const busHeading = document.createElement("p");
        busHeading.className = "bus-heading";
        busHeading.textContent = "ASSIGNED BUSES";

        const busList = document.createElement("div");
        busList.className = "assigned-buses";

        const buses = Array.isArray(route.buses)
            ? route.buses
            : [];


        if (buses.length === 0) {

            const empty = document.createElement("p");

            empty.className = "no-bus";

            empty.textContent =
                "No bus currently assigned.";

            busList.appendChild(empty);

        } else {

            buses.forEach(bus => {

                const item = document.createElement("div");
                item.className = "bus-item";

                const icon = document.createElement("span");
                icon.className = "bus-icon";
                icon.textContent = "🚌";

                const details = document.createElement("div");
                details.className = "bus-details";

                const busNumber = document.createElement("strong");
                busNumber.textContent = bus.busNumber ?? "Unknown Bus";

                const category = document.createElement("span");
                category.textContent = bus.category || "All";

                details.append(busNumber, category);

                item.append(icon, details);

                busList.appendChild(item);

            });

        }


        // Add everything to route card

        card.append(
            top,
            heading,
            divider,
            busHeading,
            busList
        );

        routeGrid.appendChild(card);

    });

}


// =================================
// LOAD ROUTES WHEN PAGE OPENS
// =================================

fetchRoutes();
