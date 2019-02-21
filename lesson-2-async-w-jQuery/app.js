/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        function addImage(images){

            let htmlContent = '';

            if (images.results.length > 0) {
                const firstImage = images.results[0];
                htmlContent = `<figure>
                        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                        <figcaption>"${firstImage.description}" by ${firstImage.user.name}</figcaption>
                    </figure>`;
            } else {
                htmlContent = '<div class="error-no-image">No images available</div>';
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {Authorization: 'Client-ID b50d80c9704282139b456c159dede6de62843ec285273cc28d171861867d9c36'}
        }).done(addImage);

        function addArticles(data) {

            let htmlContent = '';

            if (data.response.docs.length > 0) {
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                        <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                    </li>`
                ).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No articles available</div>';
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=PWBQCT9yI5NgMunq93EA5dBGWeFqaYd0`
        }).done(addArticles);
    });
})();
