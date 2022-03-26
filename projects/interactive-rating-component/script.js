const ratingOptionEls = document.querySelectorAll(".rating__option");
const btnRatingSubmit = document.querySelector(".rating__submit");
const thanksEl = document.querySelector(".thanks");
const ratingEl = document.querySelector(".rating");
const labelThanksUserRating = document.querySelector(".thanks__user-rating");

let ratingByUser;

function giveThankYou() {
  if (!ratingByUser) return alert("Please select a rating");
  ratingEl.style.display = "none";
  thanksEl.style.display = "block";
  labelThanksUserRating.textContent = ratingByUser;
}

ratingOptionEls.forEach((ratingOptionEl) => {
  ratingOptionEl.addEventListener("click", (e) => {
    ratingOptionEls.forEach((r) => {
      r.classList.remove("rating__option--active");
    });
    e.target.classList.add("rating__option--active");
    ratingByUser = e.target.textContent;
  });
});

btnRatingSubmit.addEventListener("click", giveThankYou);
