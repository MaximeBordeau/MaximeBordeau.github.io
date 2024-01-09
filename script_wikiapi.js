const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector('.search-result')

form.addEventListener("submit", handleSubmit);
input.addEventListener('search', handleSubmit);


function handleSubmit(e) {
  e.preventDefault();

  if (!input.value === "") {
    errorMsg.textContent = "Veuillez rechercher un terme.";
    return;
  } else {
    errorMsg.textContent = "";
    wikiApiCall(input.value);
  }
}

async function wikiApiCall(searchInput) {
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
  );

  const data = await response.json();

  createCards(data.query.search);
  showArrow(data);
}


function createCards(data) {
  if (!data.length) {
    errorMsg.textContent = "Veuillez rechercher un terme.";
    return;
  }
  data.forEach(el => {
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = `
    <h3 class = 'result-title'> <a href=${url} target='_blank'>${el.title}</a></h3><a href=${url} class='result-link' target='_blank'>${url}</a><br><span class='result-snippet'>${el.snippet}</span><br>
    `
    
    resultsDisplay.appendChild(card);

  })
}

function showArrow() {
    const footer = document.getElementById('footer')
    if (resultsDisplay) {
        footer.classList.add('visible');


    }

}
