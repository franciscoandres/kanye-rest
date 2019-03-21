const quoteHtml = document.querySelector('#quote');
const screen = document.querySelector('#screen');

function isLoading (yes) {
  return yes ? quoteHtml.innerHTML = 'Loading...' : quoteHtml.innerHTML = '';
}

function appendError (response) {
  quoteHtml.innerHTML = ''; // dirty line code
  const error = document.createElement('p');
  error.classList.add('padding-0250', 'br-4', 'bg-red', 'fc-white');
  error.textContent = response;
  return quoteHtml.appendChild(error);
}

function appendQuote (object) {
  quoteHtml.innerHTML = ''; // more dirty line code
  const quote = document.createElement('h1');
  const span = document.createElement('span');
  span.classList.add('bg-black', 'fc-white', 'padding-0250', 'lh-title');
  span.textContent = object.quote;
  quote.appendChild(span);
  return quoteHtml.appendChild(quote);
}

function getQuote () {
  isLoading(true);
  return new Promise(async (resolve, reject) => {
    try {
      const request = await fetch('https://api.kanye.rest/');
      const response = await request.json();
      isLoading(false);
      resolve(appendQuote(response));
    } catch (error) {
      reject(appendError(error));
    }
  });
}

screen.addEventListener('click', async () => await getQuote());

(async () => {
  await getQuote();
})();

