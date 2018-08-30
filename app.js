const apiKey = 'f62d20e67c43410a8d2f05809185275c';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#updateSumber');
const defaultSource = 'the-washington-post';

window.addEventListener('load', async e => {	
	updateBerita();
	await updateSumber();
	sourceSelector.value = defaultSource;

	sourceSelector.addEventListener('change', e => {
		updateBerita(e.target.value);
	});

	if ('serviceWorker' in navigator) {
		try {
			navigator.serviceWorker.register('sw.js');
			console.log('SW was registered');			
		} catch(error) {
			console.log('SW was error');			
		}
	} 
});


async function updateBerita() {
	const response = await fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiKey}`);
	const json = await response.json();

	main.innerHTML = json.articles.map(createArticle).join('\n');
}

async function updateSumber() {	
	const res = await fetch(`https://newsapi.org/v2/sources?language=en&apiKey=f62d20e67c43410a8d2f05809185275c`);
	const json = await res.json();

	sourceSelector.innerHTML = json.sources.map(source => `<option value="${source.id}">${source.name}</option>`).join('\n');
}

function createArticle(article) {
  return `
    <div class="article">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
      </a>
    </div>
  `;
}