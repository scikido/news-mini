document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "da8cb35579b94a03954700a9b6b78a6a";
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const sortedArticles = sortArticlesByDate(data.articles);
      displayNews(sortedArticles);
    })
    .catch((error) => console.error("Error fetching news:", error));
});

function displayNews(articles) {
  const newsContainer = document.getElementById("news-container");

  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article");

    const titleElement = document.createElement("h2");
    titleElement.textContent = article.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = article.description;

    const dateElement = document.createElement("p");
    dateElement.textContent = formatDate(article.publishedAt);

    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    articleElement.appendChild(dateElement);

    newsContainer.appendChild(articleElement);
  });
}

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function sortArticlesByDate(articles) {
  return articles.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
}
