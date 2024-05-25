document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'live_CdzizmEXqCGXEx8ufGDzcwdsWuQVhcKmtKceJl4HYCrbYpTv0Jk9MrfWXdCDBeLl'; // Ваш фактический ключ API
    const content = document.getElementById('content');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    const randomButton = document.getElementById('randomButton');
    const categorySelect = document.getElementById('categorySelect');

    // Load categories
    fetch(`https://api.thecatapi.com/v1/categories?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading categories:', error));

    // Load random cat
    randomButton.addEventListener('click', () => {
        fetchCatData(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`);
    });

    // Search cats
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            fetchCatData(`https://api.thecatapi.com/v1/images/search?limit=10&q=${query}&api_key=${API_KEY}`);
        }
    });

    // Load cats by category
    categorySelect.addEventListener('change', () => {
        const category = categorySelect.value;
        if (category === 'all') {
            fetchCatData(`https://api.thecatapi.com/v1/images/search?limit=10&api_key=${API_KEY}`);
        } else {
            fetchCatData(`https://api.thecatapi.com/v1/images/search?limit=10&category_ids=${category}&api_key=${API_KEY}`);
        }
    });

    // Fetch cat data from API
    function fetchCatData(url) {
        content.innerHTML = '<p>Loading...</p>';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                content.innerHTML = '';
                data.forEach(cat => {
                    const item = document.createElement('div');
                    item.className = 'item';
                    item.innerHTML = `
                        <img src="${cat.url}" alt="Cat Image">
                    `;
                    item.addEventListener('click', () => {
                        showCatDetails(cat);
                    });
                    content.appendChild(item);
                });
            })
            .catch(error => {
                content.innerHTML = '<p>Error loading data.</p>';
                console.error('Error fetching data:', error);
            });
    }
    // Initial load
    fetchCatData(`https://api.thecatapi.com/v1/images/search?limit=10&api_key=${API_KEY}`);
});


