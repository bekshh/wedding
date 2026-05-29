const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const weddingDate = new Date("2026-07-20T18:00:00+05:00");
const countdownElements = {
  days: document.querySelector('[data-countdown="days"]'),
  hours: document.querySelector('[data-countdown="hours"]'),
  minutes: document.querySelector('[data-countdown="minutes"]'),
  seconds: document.querySelector('[data-countdown="seconds"]'),
};

const pad = (value) => String(value).padStart(2, "0");

const updateCountdown = () => {
  const distance = Math.max(0, weddingDate.getTime() - Date.now());
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  countdownElements.days.textContent = pad(days);
  countdownElements.hours.textContent = pad(hours);
  countdownElements.minutes.textContent = pad(minutes);
  countdownElements.seconds.textContent = pad(seconds);
};

updateCountdown();
setInterval(updateCountdown, 1000);

const rsvpForm = document.querySelector(".rsvp-form");
const statusElement = document.querySelector(".form-status");

rsvpForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);
  const response = {
    guest: formData.get("guest"),
    attendance: formData.get("attendance"),
    message: formData.get("message"),
    sentAt: new Date().toISOString(),
  };

  localStorage.setItem("ayaulym-rauan-rsvp", JSON.stringify(response));
  statusElement.textContent = "Рахмет! Жауабыңыз сақталды.";
  rsvpForm.reset();
});
