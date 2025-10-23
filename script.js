/*------------------------------------------------------ nav-bar */
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-item");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    if (linkHref === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

/*------------------------------------------------------ date and time */

function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = now.toLocaleDateString("en-US", options);

  document.getElementById("clock").textContent = formattedTime;
  document.getElementById("date").textContent = formattedDate;
}

setInterval(updateClock, 1);
updateClock();

/*------------------------------------------------------ keyboard-arrow naigation */
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".social-links a");

  links.forEach((link, index) => {
    link.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = links[(index + 1) % links.length];
        next.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = links[(index - 1 + links.length) % links.length];
        prev.focus();
      }
    });
  });
});

/*------------------------------------------------------ form validation*/



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  // Select fields
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");

  
  const successMessage = document.getElementById("form-success");
  const errorMessage = document.getElementById("form-error");


  function showError(input, message) {
    const errorId = input.getAttribute("aria-describedby");
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.hidden = false;
    }
    input.classList.add("input-error");
  }


  function clearError(input) {
    const errorId = input.getAttribute("aria-describedby");
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.hidden = true;
    }
    input.classList.remove("input-error");
  }


  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();


    successMessage.hidden = true;
    errorMessage.hidden = true;
    [nameInput, emailInput, subjectInput, messageInput].forEach(clearError);

    let isValid = true;


    if (nameInput.value.trim() === "") {
      showError(nameInput, "Full name is required.");
      isValid = false;
    }


    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email is required.");
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    }

    if (subjectInput.value.trim() === "") {
      showError(subjectInput, "Subject is required.");
      isValid = false;
    }


    if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message must be at least 10 characters long.");
      isValid = false;
    }


    if (!isValid) {
      errorMessage.hidden = false;
      errorMessage.focus();
      return;
    }


    successMessage.hidden = false;
    form.reset();


    setTimeout(() => {
      successMessage.hidden = true;
    }, 5000);
  });
});
