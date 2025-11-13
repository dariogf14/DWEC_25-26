const userWidget = document.getElementById('user-widget');
const postsWidget = document.getElementById('posts-widget');
const spinner = document.getElementById('loading-spinner');
const alertArea = document.getElementById('alert-area');

const USER_URL = 'https://jsonplaceholder.typicode.com/users/1';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?userId=1';

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

function renderUser(user){
  userWidget.innerHTML = `
    <h5>${user.name}</h5>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Teléfono:</strong> ${user.phone}</p>
    <p><strong>Compañía:</strong> ${user.company?.name}</p>
    <p><strong>Sitio web:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
  `;
  userWidget.style.display = 'block';
}

function renderPosts(posts){
  const lastPosts = posts.slice(-3).reverse(); // últimos 3
  let html = '<h5>Últimos Posts</h5>';
  lastPosts.forEach(p => {
    html += `
      <div class="mb-3">
        <strong>${p.title}</strong>
        <p>${p.body}</p>
      </div>
    `;
  });
  postsWidget.innerHTML = html;
  postsWidget.style.display = 'block';
}

function loadData(){
  spinner.style.display = 'block';
  const userPromise = fetch(USER_URL).then(res=>{
    if(!res.ok) throw new Error('Error al cargar usuario');
    return res.json();
  });

  const postsPromise = fetch(POSTS_URL).then(res=>{
    if(!res.ok) throw new Error('Error al cargar posts');
    return res.json();
  });

  Promise.allSettled([userPromise, postsPromise])
    .then(results => {
      spinner.style.display = 'none';
      const [userRes, postsRes] = results;

      if(userRes.status === 'fulfilled'){
        renderUser(userRes.value);
      } else {
        userWidget.innerHTML = `<p class="text-danger">No se pudo cargar la información del usuario.</p>`;
        userWidget.style.display = 'block';
      }

      if(postsRes.status === 'fulfilled'){
        renderPosts(postsRes.value);
      } else {
        postsWidget.innerHTML = `<p class="text-danger">No se pudieron cargar los posts.</p>`;
        postsWidget.style.display = 'block';
      }

      if(userRes.status === 'rejected' && postsRes.status === 'rejected'){
        showAlert('danger','Error al cargar todos los datos.');
      }
    })
    .catch(err => {
      spinner.style.display = 'none';
      showAlert('danger','Error desconocido al cargar datos.');
      console.error(err);
    });
}

loadData();