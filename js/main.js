// ============================================
// 해피패스 (HappyPath) - B2B 브랜딩 웹사이트
// JavaScript 인터랙션 및 애니메이션
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 네비게이션 스크롤 효과
    // ============================================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        // 네비게이션 배경 변경
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to Top 버튼 표시
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // ============================================
    // 모바일 메뉴 토글
    // ============================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 햄버거 아이콘 애니메이션
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translateY(8px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translateY(-8px)' : 'none';
        });
    }
    
    // ============================================
    // 스무스 스크롤
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 해시 링크인 경우에만 처리
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // 모바일 메뉴 닫기
                    navMenu.classList.remove('active');
                    
                    // 스무스 스크롤
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Back to Top 버튼
    // ============================================
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // 통계 숫자 카운트 업 애니메이션
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps 기준
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    function checkStatsVisibility() {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateValue(stat, 0, target, 2000);
            });
        }
    }
    
    window.addEventListener('scroll', checkStatsVisibility);
    checkStatsVisibility(); // 초기 로드 시에도 체크
    
    // ============================================
    // 스크롤 애니메이션 (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll(`
        .about-card,
        .service-card,
        .timeline-item,
        .client-card,
        .why-card,
        .skill-item
    `);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // ============================================
    // 문의 폼 처리
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = {
                companyName: document.getElementById('companyName').value,
                name: document.getElementById('name').value,
                position: document.getElementById('position').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                serviceType: document.getElementById('serviceType').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // 콘솔에 데이터 출력 (실제로는 서버로 전송)
            console.log('문의 폼 데이터:', formData);
            
            // 로컬 스토리지에 저장 (데모용)
            const inquiries = JSON.parse(localStorage.getItem('happypath_inquiries') || '[]');
            inquiries.push(formData);
            localStorage.setItem('happypath_inquiries', JSON.stringify(inquiries));
            
            // 폼 숨기고 성공 메시지 표시
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // 3초 후 폼 초기화 및 다시 표시
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.style.display = 'none';
                
                // 성공 메시지 표시
                alert('문의가 성공적으로 전송되었습니다! 빠른 시일 내에 담당자가 연락드리겠습니다.');
            }, 3000);
        });
    }
    
    // ============================================
    // 폼 입력 유효성 검사
    // ============================================
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateInput(this);
            }
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        
        if (input.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        if (input.type === 'tel' && value) {
            const phoneRegex = /^[0-9-]+$/;
            isValid = phoneRegex.test(value);
        }
        
        if (isValid) {
            input.classList.remove('invalid');
            input.style.borderColor = '';
        } else {
            input.classList.add('invalid');
            input.style.borderColor = '#ef4444';
        }
        
        return isValid;
    }
    
    // ============================================
    // 현재 활성 섹션 하이라이트
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.color = 'var(--primary-color)';
                    } else {
                        link.style.color = '';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ============================================
    // 카드 호버 효과 강화
    // ============================================
    const cards = document.querySelectorAll('.about-card, .service-card, .client-card, .why-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ============================================
    // 타임라인 아이템 호버 효과
    // ============================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const content = this.querySelector('.timeline-content');
            if (content) {
                content.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
                content.style.transform = 'translateX(5px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const content = this.querySelector('.timeline-content');
            if (content) {
                content.style.boxShadow = '';
                content.style.transform = '';
            }
        });
    });
    
    // ============================================
    // 동적 콘텐츠 로딩 애니메이션
    // ============================================
    function addLoadingAnimation() {
        const contentSections = document.querySelectorAll('.section');
        
        contentSections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    addLoadingAnimation();
    
    // ============================================
    // 스크롤 인디케이터 숨김
    // ============================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        });
    }
    
    // ============================================
    // 버튼 클릭 효과
    // ============================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // CSS 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // 프로세스 스텝 진행 애니메이션
    // ============================================
    const processSteps = document.querySelectorAll('.process-step');
    let processAnimated = false;
    
    function animateProcessSteps() {
        if (processAnimated) return;
        
        const processSection = document.querySelector('.service-process');
        if (!processSection) return;
        
        const rect = processSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            processAnimated = true;
            processSteps.forEach((step, index) => {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    }
    
    // 프로세스 스텝 초기 스타일 설정
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateProcessSteps);
    animateProcessSteps();
    
    // ============================================
    // 콘솔 환영 메시지
    // ============================================
    console.log('%c해피패스 (HappyPath)', 'font-size: 24px; font-weight: bold; color: #1e40af;');
    console.log('%c검증된 품질보증, 신뢰할 수 있는 파트너', 'font-size: 14px; color: #10b981;');
    console.log('%c13년 경력의 QA 전문가가 이끄는 품질 혁신', 'font-size: 12px; color: #475569;');
    console.log('문의: contact@happypath.co.kr');
    
    // ============================================
    // 페이지 로드 완료
    // ============================================
    console.log('✅ 해피패스 웹사이트 로드 완료');
});

// ============================================
// 페이지 로드 시 애니메이션
// ============================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});