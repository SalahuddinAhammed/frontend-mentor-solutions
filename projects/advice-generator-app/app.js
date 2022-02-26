alert("If you are on Firefox, please disable cache for best experience");

const cardEl = document.querySelector(".card");
const labelCardId = document.querySelector(".card__id");
const labelCardTitle = document.querySelector(".card__title");
const btnGenerateAdvice = document.querySelector(".btn-generate-advice");

const randomAdviceFetchURL = "https://api.adviceslip.com/advice";
cardEl.style.display = "none";

async function getAdvice(fetchURL) {
  const response = await fetch(fetchURL);
  if (response.status === 200) {
    const adviceObj = await response.json();
    setHTML(adviceObj);
  } else {
    alert("Cannot load resources");
  }
}

getAdvice(randomAdviceFetchURL);

function setHTML(adviceObj) {
  const {
    slip: { id, advice },
  } = adviceObj;

  labelCardId.innerText = id;
  labelCardTitle.innerHTML = `<q>${advice}</q>`;

  cardEl.style.display = "block";
}

btnGenerateAdvice.addEventListener("click", () => {
  getAdvice(randomAdviceFetchURL);
});
