// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const navMenu = document.getElementById("navMenu")

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
    })

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      }
    })
  }

  // Navigation smooth scrolling
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const header = document.querySelector("header") || document.querySelector("nav")
        const headerHeight = header ? header.offsetHeight : 80
        const offsetTop = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // CV Download functionality
  const downloadCVBtn = document.getElementById("downloadCV")

  if (downloadCVBtn) {
    downloadCVBtn.addEventListener("click", () => {
      const cvUrl = "assets/Jasmine_CV.pdf"
      const link = document.createElement("a")
      link.href = cvUrl
      link.download = "Jasmine_CV.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      showDownloadMessage()
    })
  }

  function showDownloadMessage() {
    const message = document.createElement("div")
    message.textContent = "CV download started!"
    message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #9d65c6;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
            animation: slideIn 0.3s ease;
        `

    if (!document.querySelector("#downloadAnimation")) {
      const style = document.createElement("style")
      style.id = "downloadAnimation"
      style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `
      document.head.appendChild(style)
    }

    document.body.appendChild(message)

    setTimeout(() => {
      message.style.animation = "slideOut 0.3s ease"
      setTimeout(() => {
        if (message.parentNode) {
          document.body.removeChild(message)
        }
      }, 300)
    }, 3000)
  }

  // Portfolio pagination functionality
  const portfolioGrid = document.getElementById("portfolioGrid")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  if (portfolioGrid && portfolioItems.length > 0) {
    let currentPage = 0
    let itemsPerPage = 3
    let totalPages = Math.ceil(portfolioItems.length / itemsPerPage)

    function getItemsPerPage() {
      const screenWidth = window.innerWidth
      if (screenWidth <= 480) return 1
      else if (screenWidth <= 768) return 2
      else return 3
    }

    function updatePortfolioDisplay() {
      const startIndex = currentPage * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      portfolioItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
          item.style.display = "block"
          item.style.opacity = "0"
          item.style.transform = "translateY(20px)"

          setTimeout(
            () => {
              item.style.transition = "opacity 0.5s ease, transform 0.5s ease"
              item.style.opacity = "1"
              item.style.transform = "translateY(0)"
            },
            (index - startIndex) * 100,
          )
        } else {
          item.style.display = "none"
        }
      })

      if (prevBtn && nextBtn) {
        prevBtn.disabled = currentPage === 0
        nextBtn.disabled = currentPage === totalPages - 1
        prevBtn.style.opacity = currentPage === 0 ? "0.5" : "1"
        nextBtn.style.opacity = currentPage === totalPages - 1 ? "0.5" : "1"
      }
    }

    function handleResponsiveChange() {
      const newItemsPerPage = getItemsPerPage()
      if (newItemsPerPage !== itemsPerPage) {
        itemsPerPage = newItemsPerPage
        totalPages = Math.ceil(portfolioItems.length / itemsPerPage)
        currentPage = Math.min(currentPage, totalPages - 1)
        updatePortfolioDisplay()
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
          const currentItems = Array.from(portfolioItems).slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage,
          )

          currentItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.transition = "opacity 0.3s ease, transform 0.3s ease"
              item.style.opacity = "0"
              item.style.transform = "translateY(-20px)"
            }, index * 50)
          })

          setTimeout(() => {
            currentPage++
            updatePortfolioDisplay()
          }, 300)
        }
      })
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
          const currentItems = Array.from(portfolioItems).slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage,
          )

          currentItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.transition = "opacity 0.3s ease, transform 0.3s ease"
              item.style.opacity = "0"
              item.style.transform = "translateY(-20px)"
            }, index * 50)
          })

          setTimeout(() => {
            currentPage--
            updatePortfolioDisplay()
          }, 300)
        }
      })
    }

    itemsPerPage = getItemsPerPage()
    totalPages = Math.ceil(portfolioItems.length / itemsPerPage)
    updatePortfolioDisplay()

    // Handle window resize
    window.addEventListener("resize", handleResponsiveChange)
  }

  // Active navigation highlighting
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
        })

        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add("active")
        }
      }
    })
  })

  // Skill circles animation
  const skillCircles = document.querySelectorAll(".skill-circle")
  const skillSection = document.querySelector(".skills")

  skillCircles.forEach((circle) => {
    circle.style.setProperty("--percentage", "0deg")
    circle.classList.add("skill-ready")
  })

  const animateSkills = () => {
    if (skillSection) {
      const rect = skillSection.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

      if (!isVisible) {
        skillSection.classList.remove("animated")
        skillCircles.forEach((circle) => {
          circle.style.setProperty("--percentage", "0deg")
        })
      } else if (isVisible && !skillSection.classList.contains("animated")) {
        skillSection.classList.add("animated")

        skillCircles.forEach((circle, index) => {
          setTimeout(() => {
            const percentage = Number.parseInt(circle.getAttribute("data-percentage"))
            const targetDegrees = (percentage / 100) * 360

            let currentDegrees = 0
            const duration = 2000
            const startTime = performance.now()

            const animateProgress = (currentTime) => {
              const elapsedTime = currentTime - startTime
              const progress = Math.min(elapsedTime / duration, 1)

              const easeOutCubic = 1 - Math.pow(1 - progress, 3)
              currentDegrees = targetDegrees * easeOutCubic

              circle.style.setProperty("--percentage", `${currentDegrees}deg`)

              if (progress < 1) {
                requestAnimationFrame(animateProgress)
              } else {
                circle.style.setProperty("--percentage", `${targetDegrees}deg`)
              }
            }

            requestAnimationFrame(animateProgress)
          }, index * 300)
        })
      }
    }
  }

  window.addEventListener("scroll", animateSkills)
  setTimeout(animateSkills, 500)

  // Parallax effect for sparkles
  const sparkles = document.querySelectorAll(".sparkle")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    sparkles.forEach((sparkle, index) => {
      const speed = (index + 1) * 0.3
      sparkle.style.transform = `translateY(${rate * speed}px)`
    })
  })

  // Portfolio item hover effects
  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      if (this.style.display !== "none") {
        this.style.transform = "translateY(-10px) scale(1.02)"
      }
    })

    item.addEventListener("mouseleave", function () {
      if (this.style.display !== "none") {
        this.style.transform = "translateY(0) scale(1)"
      }
    })
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      } else {
        entry.target.style.opacity = "0"
        entry.target.style.transform = "translateY(30px)"
      }
    })
  }, observerOptions)

  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  })

  // About section animations
  const aboutSection = document.querySelector(".about-combined")
  if (aboutSection) {
    const aboutMeSection = aboutSection.querySelector(".about-me-section")
    const whatIDoSection = aboutSection.querySelector(".what-i-do-section")

    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === aboutMeSection) {
            setTimeout(() => {
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateX(0)"
            }, 200)
          } else if (entry.target === whatIDoSection) {
            setTimeout(() => {
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateX(0)"
            }, 600)
          }
        } else {
          if (entry.target === aboutMeSection) {
            entry.target.style.opacity = "0"
            entry.target.style.transform = "translateX(-30px)"
          } else if (entry.target === whatIDoSection) {
            entry.target.style.opacity = "0"
            entry.target.style.transform = "translateX(30px)"
          }
        }
      })
    }, observerOptions)

    if (aboutMeSection) {
      aboutMeSection.style.opacity = "0"
      aboutMeSection.style.transform = "translateX(-30px)"
      aboutMeSection.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      aboutObserver.observe(aboutMeSection)
    }

    if (whatIDoSection) {
      whatIDoSection.style.opacity = "0"
      whatIDoSection.style.transform = "translateX(30px)"
      whatIDoSection.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      aboutObserver.observe(whatIDoSection)
    }
  }
})
