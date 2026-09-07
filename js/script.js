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

// ==============================
// 초대장 공유
// ==============================

const shareButton = document.querySelector("#share-button");

shareButton.addEventListener("click", async () => {
    const shareData = {
        title: "어린 양의 혼인 잔치",
        text: "어린 양의 혼인 잔치, 당신을 초대합니다.",
        url: window.location.href
    };

    // 모바일 등 Web Share API 지원 환경
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            // 사용자가 공유창을 닫은 경우에는 별도 처리하지 않음
            if (error.name !== "AbortError") {
                console.error("공유에 실패했습니다.", error);
            }
        }

        return;
    }

    // Web Share API를 지원하지 않는 환경
    try {
        await navigator.clipboard.writeText(window.location.href);

        const originalText = shareButton.textContent;

        shareButton.textContent = "초대장 링크가 복사되었습니다.";

        setTimeout(() => {
            shareButton.textContent = originalText;
        }, 2000);

    } catch (error) {
        console.error("링크 복사에 실패했습니다.", error);
        alert("초대장 링크를 복사하지 못했습니다.");
    }
});