import './style.css'
import initialData from '../data/brands.json'

const contentArea = document.getElementById('content-area');
const searchInput = document.getElementById('searchInput');

let allData = initialData;

// Initialize
function init() {
  try {
    render(allData);
  } catch (error) {
    console.error(error);
    contentArea.innerHTML = `<p class="error">Error loading brand data. Please try again later.</p>`;
  }
}

// Render Function
function render(data) {
  contentArea.innerHTML = '';

  if (data.length === 0) {
    contentArea.innerHTML = '<p class="no-results">No brands found.</p>';
    return;
  }

  data.forEach((categoryObj, index) => {
    // Skip empty categories after filtering
    if (categoryObj.brands.length === 0) return;

    const section = document.createElement('section');
    section.className = 'category-section';

    const titleIdx = document.createElement('h2');
    titleIdx.className = 'category-title';
    titleIdx.textContent = categoryObj.name;

    const grid = document.createElement('div');
    grid.className = 'brands-grid';

    categoryObj.brands.forEach(brand => {
      const card = document.createElement('div');
      card.className = 'brand-card';

      card.innerHTML = `
        <div>
          <h3 class="brand-name">${brand.name}</h3>
          <p class="brand-desc">${brand.description || 'No description available.'}</p>
        </div>
        <a href="${brand.website}" target="_blank" rel="noopener noreferrer" class="visit-btn">
          Visit Website
        </a>
      `;
      grid.appendChild(card);
    });

    section.appendChild(titleIdx);
    section.appendChild(grid);
    contentArea.appendChild(section);

    // Insert Ad Banner (In-Feed) every 2 categories
    if ((index + 1) % 2 === 0 && index !== data.length - 1) {
      const adContainer = document.createElement('div');
      adContainer.className = 'ad-container in-feed';
      adContainer.innerHTML = `
        <span class="ad-label">Advertisement</span>
        <!-- In-Feed Ad Slot -->
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-format="fluid"
             data-ad-layout-key="-fb+5w+4e-db+86"
             data-ad-client="ca-pub-7578183786785959"
             data-ad-slot="1234567890"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      `;
      contentArea.appendChild(adContainer);
    }
  });
}

// Search Logic
searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();

  const filteredData = allData.map(cat => {
    const filteredBrands = cat.brands.filter(brand => {
      return brand.name.toLowerCase().includes(term) ||
        (brand.description && brand.description.toLowerCase().includes(term));
    });

    // Also include if category name matches? Optional. 
    // Let's keep it simple: filter brands, if category matches show all? 
    // Usually user searches for brand or category.
    // If category matches, show all brands in that category.

    if (cat.name.toLowerCase().includes(term)) {
      return cat; // Return full category if name matches
    }

    return {
      ...cat,
      brands: filteredBrands
    };
  }).filter(cat => cat.brands.length > 0);

  render(filteredData);
});

init();
