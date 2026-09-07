// ==============================
// 섹션별 페이드 인
// ==============================

const sections = document.querySelectorAll("main section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

sections.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
});


// ==============================
// 맨 위로 이동하는 버튼
// ==============================

const topButton = document.querySelector("#top-button");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topButton.classList.add("is-visible");
    } else {
        topButton.classList.remove("is-visible");
    }
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

