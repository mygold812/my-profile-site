// ==========================================
// 다크모드 토글
// ==========================================
const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

// localStorage에서 다크모드 설정 복구
function initDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        html.classList.add('dark');
        updateDarkModeIcon(true);
    } else {
        html.classList.remove('dark');
        updateDarkModeIcon(false);
    }
}

// 다크모드 아이콘 업데이트
function updateDarkModeIcon(isDark) {
    if (isDark) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

// 다크모드 토글 버튼 이벤트
darkModeToggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    updateDarkModeIcon(isDark);
});

// ==========================================
// 모바일 메뉴
// ==========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// 모바일 메뉴 항목 클릭 시 메뉴 닫기
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ==========================================
// 스크롤 시 요소 페이드인
// ==========================================
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // 한 번만 실행
            }
        });
    }, {
        threshold: 0.1, // 요소가 10% 보이면 트리거
        rootMargin: '0px 0px -50px 0px'
    });

    // fade-in-element 클래스 모두에 옵저버 등록
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach(el => observer.observe(el));
}

// ==========================================
// 상단으로 이동 버튼
// ==========================================
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 초기값: 숨기기
scrollToTopBtn.style.display = 'none';

// ==========================================
// 네비게이션 스크롤 링크
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            // 부드러운 스크롤은 CSS의 scroll-behavior: smooth로 처리됨
        }
    });
});

// ==========================================
// 페이지 로드 시 초기화
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initIntersectionObserver();

    // 페이지 로드 후 히어로 섹션 요소들도 페이드인
    const heroElements = document.querySelectorAll('#hero .fade-in-element, #hero h1, #hero p');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
    });
});

// ==========================================
// 추가 기능: 네비게이션 활성화 상태 표시 (선택사항)
// ==========================================
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                navLinks.forEach(l => l.classList.remove('text-indigo-600', 'dark:text-indigo-400'));
                link.classList.add('text-indigo-600', 'dark:text-indigo-400');
            }
        }
    });
});
