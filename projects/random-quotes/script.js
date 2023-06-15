const quoteEle = document.querySelector(".quote");
const getQuoteBtn = document.querySelector("#button");
const url = "https://api.api-ninjas.com/v1/quotes"
const apiKey = "y7iT90JkKMxrz7IySsfmUQ==iVKW53QTQvEMsz30";

quoteEle.innerHTML = `<div class="loading-img">
<img src="../../img/spinner.svg" alt="">
</div>`;
getQuoteBtn.disabled = true;

const getRandomQuote = async (url, api) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": api,
    },
  });
  const data = await response.json();
  let quote = `
  <p>
    <i class="fa-solid fa-quote-left"></i>
    <span>${data[0].quote}</span>
    <i class="fa-solid fa-quote-right"></i>
  </p>
  <div class="author">
    <span></span>
    <span>${data[0].author}</span>
  </div>
`;
  quoteEle.innerHTML = quote;
  getQuoteBtn.disabled = false
};

getRandomQuote(url, apiKey);
getQuoteBtn.addEventListener("click", () => {
  getQuoteBtn.disabled = true;
  quoteEle.innerHTML = `
  <div class="loading-img">
    <img src="../../img/spinner.svg" alt="">
  </div>`;
  getRandomQuote(url, apiKey);
});
