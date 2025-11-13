const PRODUCTS_FILE = 'products.json';

const productList = document.getElementById('product-list');
const filterCategory = document.getElementById('filter-category');
const filterBrand = document.getElementById('filter-brand');
const sortPrice = document.getElementById('sort-price');
const alertArea = document.getElementById('alert-area');

let products = [];

function showAlert(type, message, timeout=4000){
  alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
  if(timeout){
    setTimeout(() => {
      const alertEl = bootstrap.Alert.getOrCreateInstance(alertArea.querySelector('.alert'));
      try{ alertEl.close(); } catch(e){}
    }, timeout);
  }
}

function renderProducts(list){
  productList.innerHTML = '';
  if(list.length === 0){
    productList.innerHTML = '<p class="text-muted">No hay productos que mostrar.</p>';
    return;
  }
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'col-md-4';
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.imageUrl}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">${p.description}</p>
          <p class="mb-1"><strong>Precio:</strong> $${p.price.toFixed(2)}</p>
          <p class="mb-1"><strong>Categoría:</strong> ${p.category}</p>
          <p class="mb-0"><strong>Marca:</strong> ${p.brand}</p>
        </div>
      </div>
    `;
    productList.appendChild(div);
  });
}

function populateFilters(){
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    filterCategory.appendChild(opt);
  });

  brands.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b;
    opt.textContent = b;
    filterBrand.appendChild(opt);
  });
}

function applyFiltersAndSort(){
  let filtered = [...products];
  const cat = filterCategory.value;
  const brand = filterBrand.value;
  const sort = sortPrice.value;

  if(cat) filtered = filtered.filter(p => p.category === cat);
  if(brand) filtered = filtered.filter(p => p.brand === brand);
  if(sort === 'asc') filtered.sort((a,b)=> a.price - b.price);
  if(sort === 'desc') filtered.sort((a,b)=> b.price - a.price);

  renderProducts(filtered);
}

function loadProducts(){
  fetch(PRODUCTS_FILE)
    .then(res => {
      if(!res.ok) throw new Error('Error cargando products.json');
      return res.json();
    })
    .then(data => {
      products = data;
      populateFilters();
      renderProducts(products);
    })
    .catch(err => {
      console.error(err);
      showAlert('danger','No se pudieron cargar los productos.');
    });
}

filterCategory.addEventListener('change', applyFiltersAndSort);
filterBrand.addEventListener('change', applyFiltersAndSort);
sortPrice.addEventListener('change', applyFiltersAndSort);

loadProducts();