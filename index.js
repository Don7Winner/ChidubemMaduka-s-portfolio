$(document).ready(function () {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    offset: 200,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100,
    once: true
  });
// DESKTOP SLIDETOGGLE 
  $('.nav-list-container').click(() => {
        $('.nav-list').slideToggle();
    });
  // Mobile menu toggle
  $("#close-bar").hide();
  $("#menu-bar").click(() => {
    $("#close-bar").show();
    $("#menu-bar").hide();
    $(".nav").show();
    $(".nav").addClass("active");
    $("body").addClass("no-scroll");
  });

  $("#close-bar").click(() => {
    $(".nav").removeClass("active");
    $("#close-bar").hide();
    $(".nav").hide();
    $("#menu-bar").show();
    $("body").removeClass("no-scroll");
  });

  // Close mobile menu on link click (for mobile devices)
  if ($(window).width() <= 768) {
    $(".list-item a").click(() => {
      $(".nav").removeClass("active");
      $("#close-bar").hide();
      $(".nav").hide();
      $("#menu-bar").show();
      $("body").removeClass("no-scroll");
    });
  }

  // Handle window resize for mobile menu behavior
  $(window).resize(function () {
    if ($(window).width() <= 768) {
      $(".list-item a").off("click").on("click", () => {
        $(".nav").removeClass("active");
        $("#close-bar").hide();
        $(".nav").hide();
        $("#menu-bar").show();
        $("body").removeClass("no-scroll");
      });
    } else {
      $(".list-item a").off("click");
      $(".nav").show();
    }
  });

  // Smooth scrolling for navigation links
  $('a[href*="#"]').not('[href="#"]').click(function (event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      event.preventDefault();
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 80
        }, 1000);
        return false;
      }
    }
  });

  // Contact form validation and EmailJS submission
  function validateInput(input, errorId, validationFn, errorMessage) {
    $(input).on("input", function () {
      const value = $(this).val().trim();
      const errorElement = $(errorId);
      if (validationFn(value)) {
        errorElement.text("");
        $(this).css("border-color", "#ffffff33");
      }
    });
  }

  const isNotEmpty = (value) => value.length > 0;
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  validateInput("#name", "#name-error", isNotEmpty, "Please enter your name");
  validateInput("#email", "#email-error", isValidEmail, "Please enter a valid email");
  validateInput("#subject", "#subject-error", isNotEmpty, "Please enter a subject");
  validateInput("#message", "#message-error", isNotEmpty, "Please enter a message");

  $("#contact-form").submit(function (e) {
    e.preventDefault();
    let params = {
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      subject: $("#subject").val().trim(),
      message: $("#message").val().trim(),
    };
    let isValid = true;

    if (!isNotEmpty(params.name)) {
      $("#name-error").text("Please enter your name");
      $("#name").css("border-color", "#ff4d4f");
      isValid = false;
    }
    if (!isValidEmail(params.email)) {
      $("#email-error").text("Please enter a valid email");
      $("#email").css("border-color", "#ff4d4f");
      isValid = false;
    }
    if (!isNotEmpty(params.subject)) {
      $("#subject-error").text("Please enter a subject");
      $("#subject").css("border-color", "#ff4d4f");
      isValid = false;
    }
    if (!isNotEmpty(params.message)) {
      $("#message-error").text("Please enter a message");
      $("#message").css("border-color", "#ff4d4f");
      isValid = false;
    }

    if (isValid) {
      emailjs.send("service_9baqwbd", "template_4fks0a7", params).then(
        function (response) {
          alert("Email Sent Successfully!");
          $("#contact-form")[0].reset();
          $(".error").text("");
          $("#contact-form input, #contact-form textarea").css("border-color", "#ffffff33");
        },
        function (error) {
          alert("Failed to send email. Please try again.");
          console.error("EmailJS Error:", error);
        }
      );
    }
  });

  // Animate skills progress bars on scroll
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $('.progress').each(function () {
              $(this).animate({
                width: $(this).attr('style').split(':')[1]
              }, 1000);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(skillsSection);
  }

  // Animate stat numbers on scroll
  const statsSection = document.querySelector('.appointment-stats');
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $('.stat-number').each(function () {
              const $this = $(this);
              const targetText = $this.text().replace(/[^0-9]/g, ''); // Extract number (e.g., "1+", "51+", "95%" -> "1", "51", "95")
              const target = parseInt(targetText, 10);
              const suffix = $this.find('.stat-suffix').text(); // Get suffix ("+", "%")
              
              // Set initial value to 1
              $this.text('1' + suffix);
              
              // Animate from 1 to target value
              $({ count: 1 }).animate(
                { count: target },
                {
                  duration: 2000,
                  easing: 'swing',
                  step: function () {
                    $this.text(Math.ceil(this.count) + suffix);
                  },
                  complete: function () {
                    $this.text(target + suffix); // Ensure final value is exact
                  }
                }
              );
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(statsSection);
  }
});