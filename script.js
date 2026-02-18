// ------------------
// Mouse Trail
// ------------------
document.addEventListener("mousemove", e => {
    const trail = document.createElement("div");
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
    document.querySelector(".mouse-trail").appendChild(trail);

    setTimeout(() => trail.remove(), 600);
});


// ------------------
// TRUE Infinite Games Carousel
// ------------------
fetch("games.txt")
    .then(res => res.text())
    .then(data => {
        const lines = data.split("\n").filter(l => l.trim() !== "");
        const container = document.getElementById("gamesContainer");

        let games = [];

        for (let i = 0; i < lines.length; i += 3) {
            games.push({
                title: lines[i].replace(/[{}]/g, ""),
                img: lines[i + 1],
                link: lines[i + 2]
            });
        }

        // Create base cards
        games.forEach(game => {
            const card = createCard(game);
            container.appendChild(card);
        });

        // Duplicate until width is large enough
        let contentWidth = container.scrollWidth;
        const screenWidth = window.innerWidth;

        while (contentWidth < screenWidth * 2) {
            games.forEach(game => {
                const card = createCard(game);
                container.appendChild(card);
            });
            contentWidth = container.scrollWidth;
        }

        startInfiniteScroll(container);
    });

function createCard(game) {
    const card = document.createElement("a");
    card.href = game.link;
    card.className = "game-card";
    card.innerHTML = `
        <img src="${game.img}">
        <h3>${game.title}</h3>
    `;
    return card;
}


// ------------------
// Seamless Scroll Logic
// ------------------
function startInfiniteScroll(container) {
    let speed = 0.5; // adjust for faster/slower
    let scrollAmount = 0;

    function animate() {
        scrollAmount += speed;
        container.scrollLeft += speed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0;
        }

        requestAnimationFrame(animate);
    }

    container.parentElement.addEventListener("mouseenter", () => speed = 0);
    container.parentElement.addEventListener("mouseleave", () => speed = 0.5);

    animate();
}
