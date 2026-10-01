const elements = document.querySelectorAll(
    ".title_team, .team-card"
);

const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });

});

elements.forEach(function(element) {
    observer.observe(element);
});