

// 스와이퍼
var swiper = new Swiper(".top-Swiper", {
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  speed:600,
  autoplay: {
    delay: 5000,
    disableOnInteraction:false
  },
  allowTouchMove: true,
  simulateTouch: true,
  threshold: 30,
  pagination: {
    el: ".top-swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const fill = document.querySelector('.swiper-pagination-progressbar-fill');
const currentEl = document.querySelector('.current');
const totalEl = document.querySelector('.total');
const realSlides = document.querySelectorAll(
  '.top-Swiper .swiper-slide:not(.swiper-slide-duplicate)'
);
const realTotal = realSlides.length;
totalEl.textContent = realTotal;
function updateProgress() {
  const currentIndex = swiper.realIndex;
  const lastIndex = realTotal - 1;
  const percent = currentIndex / lastIndex;
  fill.style.transformOrigin = 'left';
  fill.style.transform = `scaleX(${percent})`;
  currentEl.textContent = currentIndex + 1;
}
updateProgress();
swiper.on('slideChange', updateProgress);

// 배너 스와이퍼
let bannerSwiper = null;
function initBannerSwiper() {
  const width = window.innerWidth;
  if (width <= 800 && !bannerSwiper) {
    bannerSwiper = new Swiper(".banner-Swiper", {
      loop: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction:true
      },
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: ".banner-pagination",
        type: "fraction",
      }
    });
  }
  if (width > 800 && bannerSwiper) {
    bannerSwiper.destroy(true, true);
    bannerSwiper = null;
  }
}

initBannerSwiper();
window.addEventListener("resize", initBannerSwiper);


// 리뷰스와이퍼

const swiper2 = new Swiper(".review-swiper", {
  loop:true,
  autoplay: {
    delay: 10000,
    disableOnInteraction:true
  },
  loopFillGroupWithBlank: true,
  grabCursor:true,
  pagination: {
    el: ".review-pagination",
    clickable: true,
        renderBullet: function(index, className) {
      const realSlides = this.slides.filter(
        s => !s.classList.contains("swiper-slide-blank") &&
             !s.classList.contains("swiper-slide-invisible-blank")
      );
      const group = this.params.slidesPerGroup || 1;
      const totalPages = Math.ceil(realSlides.length / group);
      if (index >= totalPages) return "";

      return `<span class="${className}">${index + 1}</span>`;
    }
  },
  breakpoints: {
    0: {slidesPerView: 1,slidesPerGroup: 1},
    800: {slidesPerView: 2,slidesPerGroup: 2},
    955: {slidesPerView: 3,slidesPerGroup: 3},
    1400: {slidesPerView: 4,slidesPerGroup: 4},
    1700: {slidesPerView: 5,slidesPerGroup: 5}
  }
});
swiper2.on("slideChange", () => {
  const slideIndex = swiper2.realIndex;
  const group = swiper2.params.slidesPerGroup;
  const pageIndex = Math.floor(slideIndex / group);
  const bullets = swiper2.pagination.bullets;
  bullets.forEach((b, i) => {
    b.classList.toggle("swiper-pagination-bullet-active", i === pageIndex);
  });
});
// 헤더

const headBanner = document.querySelector('.head-banner');
const headwrap = document.querySelector('.head-wrap')
const gnbInner = document.querySelector('.gnb-inner')
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  if (scrolled >= 100) {
    headBanner.classList.add('hide');
    headwrap.classList.add('scrolled')
    gnbInner.classList.add('scrolled')
  } else {
    headBanner.classList.remove('hide');
    headwrap.classList.remove('scrolled')
    gnbInner.classList.remove('scrolled')
  }
});

const gnb = document.querySelector('.gnb')
const gnbBtn = document.querySelector('.gnb-btn')
const gnbWrap = document.querySelector('.gnb-wrap')
const gnbCloseBtn = document.querySelector('.gnb-btn-close')

gnb.addEventListener('click', () => {
  gnbBtn.classList.toggle('active')
  gnbCloseBtn.classList.toggle('active')
  gnbWrap.classList.toggle('show')
})
function Gnbtoggle() {
  if (window.innerWidth >= 800) {
    gnbBtn.classList.add('active');
    gnbCloseBtn.classList.remove('active');
    gnbWrap.classList.remove('show');
  }
}

window.addEventListener('load', Gnbtoggle);
window.addEventListener('resize', Gnbtoggle);

let mobileMenu = document.querySelectorAll('.accordian-menu')
mobileMenu.forEach(i => {
  let title = i.querySelector('.accordian-title')
  let content = i.querySelector('.accordian-content')

  title.addEventListener('click', function () {
    const isActive = i.classList.contains('active')

    mobileMenu.forEach(ii => {
      if (ii !== i) {
        ii.classList.remove('active')
        ii.querySelector('.accordian-content').classList.remove('active')
        ii.querySelector('.accordian-title').classList.remove('active')
      }
    })

    if (!isActive && content) {
      i.classList.add('active')
      title.classList.add('active')
      content.classList.add('active')
    }
  })
})

const menu = document.querySelectorAll('.menu > ul > li')
menu.forEach(li => {
  const sub = li.querySelector('.sub');

  if (!sub) return;
  li.addEventListener('mouseenter', () => {
    sub.classList.add('active')
  });
  li.addEventListener('mouseleave', () => {
    sub.classList.remove('active')
  });
});


// 리뷰 팝업

const reviewModal = document.getElementById("reviewModal");
const closeBtn = document.querySelector(".review-close");

let detailSwiper = null;
const thumbs = document.querySelectorAll(".review-imgWrap");

const counter = document.querySelector(".review-pagination-counter");
const reviewcurrentEl = counter?.querySelector(".reviewcurrent");
const reviewtotalEl = counter?.querySelector(".reviewtotal");
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", (e) => {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    e.preventDefault();
    reviewModal.classList.add("show");
    if (detailSwiper) detailSwiper.destroy(true, true);
    const isMobile = window.innerWidth <= 800;
    detailSwiper = new Swiper(".review-detail-swiper", {
      allowTouchMove: isMobile,
      initialSlide: index,
      loop: false,
      keyboard: false,
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: ".review-next",
        prevEl: ".review-prev"
      }
    });
     if (counter) {
      reviewtotalEl.textContent = detailSwiper.slides.length;
      reviewcurrentEl.textContent = detailSwiper.realIndex + 1;
      detailSwiper.on("slideChange", () => {
        reviewcurrentEl.textContent = detailSwiper.realIndex + 1;
      });
    }
  });
});
const prevBtn = document.querySelector(".review-prev");
const nextBtn = document.querySelector(".review-next");
closeBtn.addEventListener("click", () => {
  reviewModal.classList.remove("show");
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
});
reviewModal.addEventListener("click", (e) => {
  if (e.target === reviewModal) reviewModal.classList.remove("show");
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
});


// 버튼영역

const scrollItems = document.querySelectorAll(".show-on-scroll");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollItems.forEach(el => {
      el.style.opacity = "1";
      el.style.pointerEvents = "auto";
    });
  } else {
    scrollItems.forEach(el => {
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    });
  }
});
document.querySelector(".btn-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn-bottom");
  if (btn) {
    btn.addEventListener("click", () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
    });
  }
});