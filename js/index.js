document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidenav = document.querySelector(".sidenav1");
    const closeBtn = document.querySelector(".sidenav1 .close-btn");

    menuToggle.addEventListener("click", function () {
        sidenav.classList.add("active");
    });

    closeBtn.addEventListener("click", function () {
        sidenav.classList.remove("active");
    });
});

document.querySelectorAll('.nav-links a').forEach(link => {
link.addEventListener('touchstart', function () {
this.classList.add('mobile-hover');
setTimeout(() => this.classList.remove('mobile-hover'), 500);
});
});

// Enable touch "hover" effect for sidenav1 list items
document.querySelectorAll('.sidenav1 ul li').forEach(item => {
item.addEventListener('touchstart', function () {
this.classList.add('touch-hover');
setTimeout(() => this.classList.remove('touch-hover'), 500); // Remove after a short delay
});
});

// Mapping search keywords to URLs
const searchableItems = {
"home": "index.html",
"about": "about_tech.html",
"services": "services_tech.html",
"contact": "contact_tech.html",
"graphic design": "tech_blog/graphic_design_blog.html",
"web development": "tech_blog/web_dvp_blog.html",
"cybersecurity": "tech_blog/index.html",
"top most blog": "#Top Most Blogs",
"trending topics": "#What Is Trending",
"team developers": "#Team Developers",
"welcome page": "#Welcome Page",
"about us": "#About Us",
"cyber security services": "#Cyber Security",
"back-end development": "tech_blog/web_design_blog_part2.html",
"front-end development": "tech_blog/web_dvp_blog.html",
"understanding cybersecurity": "tech_blog/index.html",
"ransomware threats": "tech_blog/cybertrend_blog_part2.html",
"web design": "#Web Design",
"visual powerhouse": "#Visual Powerhouse",
"contact us": "#Contact Me",
"about us": "#About Me",
"footer": "#Footer",

};

function liveSearch() {
const input = document.getElementById("searchInput").value.toLowerCase();
const resultsBox = document.getElementById("searchResults");
resultsBox.innerHTML = "";

if (input === "") {
    resultsBox.style.display = "none";
    return;
}

const filtered = Object.keys(searchableItems).filter(key => key.includes(input));

if (filtered.length > 0) {
    filtered.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;
        div.style.padding = "10px";
        div.style.cursor = "pointer";
        div.onmouseover = function() { this.style.backgroundColor = "#f0f0f0"; };
        div.onmouseout = function() { this.style.backgroundColor = "white"; };
        div.onclick = function() {
            window.location.href = searchableItems[item];
        };
        resultsBox.appendChild(div);
    });
    resultsBox.style.display = "block";
} else {
    const div = document.createElement("div");
    div.textContent = "No results found.";
    div.style.padding = "10px";
    div.style.color = "gray";
    resultsBox.appendChild(div);
    resultsBox.style.display = "block";
}
}

function handleSearch() {
const input = document.getElementById("searchInput").value.trim().toLowerCase();
const searchableKeys = Object.keys(searchableItems).map(k => k.toLowerCase());

if (searchableKeys.includes(input)) {
    const matchedKey = Object.keys(searchableItems).find(key => key.toLowerCase() === input);
    window.location.href = searchableItems[matchedKey];
} else {
    searchInPage(input);
}
}

// --- REAL Page Search and Highlight ---
function searchInPage(word) {
if (!word) return;

// Clear previous highlights
const highlights = document.querySelectorAll('mark.highlighted');
highlights.forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize(); // Merge text nodes
});

let found = false;

const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
const regex = new RegExp(word, 'gi');

while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentNode && !["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.parentNode.nodeName)) {
        const matches = [...node.textContent.matchAll(regex)];
        if (matches.length > 0) {
            found = true;
            const frag = document.createDocumentFragment();
            let lastIndex = 0;
            matches.forEach(match => {
                const before = node.textContent.substring(lastIndex, match.index);
                const matched = node.textContent.substring(match.index, match.index + word.length);
                if (before) frag.appendChild(document.createTextNode(before));
                const mark = document.createElement('mark');
                mark.className = 'highlighted';
                mark.textContent = matched;
                frag.appendChild(mark);
                lastIndex = match.index + word.length;
            });
            const after = node.textContent.substring(lastIndex);
            if (after) frag.appendChild(document.createTextNode(after));
            node.parentNode.replaceChild(frag, node);
        }
    }
}

if (found) {
    const firstHighlight = document.querySelector('.highlighted');
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
} else {
    const resultsBox = document.getElementById("searchResults");
    resultsBox.innerHTML = '<div style="padding: 10px; color: gray;">Word not found on page.</div>';
    resultsBox.style.display = "block";
}
}

document.getElementById("searchInput").addEventListener("keyup", liveSearch);

function searchInPage(word) {
    if (!word) return;

    // Clear previous highlights
    const highlights = document.querySelectorAll('mark.highlighted');
    highlights.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize(); // Merge text nodes
    });

    let found = false;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const regex = new RegExp(word, 'gi');

    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.parentNode && !["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.parentNode.nodeName)) {
            const matches = [...node.textContent.matchAll(regex)];
            if (matches.length > 0) {
                // -- moved found = true here after match is confirmed --
                const frag = document.createDocumentFragment();
                let lastIndex = 0;
                matches.forEach(match => {
                    const before = node.textContent.substring(lastIndex, match.index);
                    const matched = node.textContent.substring(match.index, match.index + word.length);
                    if (before) frag.appendChild(document.createTextNode(before));
                    const mark = document.createElement('mark');
                    mark.className = 'highlighted';
                    mark.textContent = matched;
                    frag.appendChild(mark);
                    lastIndex = match.index + word.length;
                });
                const after = node.textContent.substring(lastIndex);
                if (after) frag.appendChild(document.createTextNode(after));
                node.parentNode.replaceChild(frag, node);

                found = true; // ✅ Correctly mark it after highlighting
            }
        }
    }

    const resultsBox = document.getElementById("searchResults");
    resultsBox.innerHTML = "";
    if (found) {
        const firstHighlight = document.querySelector('.highlighted');
        if (firstHighlight) {
            firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        resultsBox.style.display = "none"; // Hide the box if search is successful
    } else {
        resultsBox.innerHTML = '<div style="padding: 10px; color: gray;">Word not found on page.</div>';
        resultsBox.style.display = "block";
    }
}


document.getElementById('subscribeBtn').addEventListener('click', async function () {
    const emailInput = document.getElementById('subscribeEmail');
    const spinner = document.getElementById('subscribeSpinner');
    const successMessage = document.getElementById('subscribeSuccess');

    if (!emailInput.value) {
        alert('Please enter your email.');
        return;
    }

    spinner.style.display = 'inline-block'; // Show spinner

    try {
        const response = await fetch('https://formspree.io/f/xyzabcde', {  // <-- put YOUR Formspree link
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: new FormData(document.getElementById('subscribeForm'))
        });

        if (response.ok) {
            emailInput.value = ''; // Clear the field
            successMessage.style.display = 'block'; // Show success message
            setTimeout(() => {
                successMessage.style.display = 'none'; // Hide after 5 seconds
            }, 5000);
        } else {
            alert('Failed to subscribe. Please try again.');
        }
    } catch (error) {
        alert('Error occurred. Please try again.');
    }

    spinner.style.display = 'none'; // Hide spinner
});
