(function () {
  const COMMENTS_FILE = 'comments_initial.json';
  const TARGET_POST_URL = 'https://webhook.site/'; // reemplaza con tu URL
  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  const alertArea = document.getElementById('alert-area');
  const commentsList = document.getElementById('comments-list');
  const form = document.getElementById('comment-form');
  const authorInput = document.getElementById('author');
  const commentInput = document.getElementById('commentText');

  function showAlert(type, message, timeout = 4000) {
    alertArea.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
    if(timeout){
      setTimeout(() => {
        const alertEl = bootstrap.Alert.getOrCreateInstance(alertArea.querySelector('.alert'));
        try{ alertEl.close(); }catch(e){}
      }, timeout);
    }
  }

  function renderComment(comment) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<strong>${comment.author}</strong> <small class="text-muted">${new Date(comment.timestamp).toLocaleString()}</small><br>${comment.commentText}`;
    commentsList.appendChild(li);
  }

  function loadInitialComments() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', COMMENTS_FILE, true);
    xhr.responseType = 'json';
    xhr.onload = function(){
      if(xhr.status >=200 && xhr.status <300){
        const data = xhr.response;
        data.forEach(renderComment);
      } else {
        showAlert('danger', 'Error cargando comentarios iniciales.');
      }
    };
    xhr.onerror = function(){
      showAlert('danger', 'Error de red al cargar comentarios iniciales.');
    };
    xhr.send();
  }

  function postComment(comment, callback){
    const xhr = new XMLHttpRequest();
    const fullUrl = CORS_PROXY + TARGET_POST_URL;
    xhr.open('POST', fullUrl, true);
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    xhr.onload = function(){
      if(xhr.status >=200 && xhr.status<300){
        callback(null,xhr);
      } else {
        callback(new Error(`Respuesta no OK: ${xhr.status}`), xhr);
      }
    };
    xhr.onerror = function(){
      callback(new Error('Error de red durante POST'), xhr);
    };
    try{
      xhr.send(JSON.stringify(comment));
    } catch(err){
      callback(err);
    }
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const comment = {
      author: authorInput.value.trim(),
      commentText: commentInput.value.trim(),
      timestamp: new Date().toISOString()
    };
    if(!comment.author || !comment.commentText) return;

    postComment(comment, function(err){
      if(err){
        showAlert('danger','Error al enviar comentario.');
      } else {
        renderComment(comment);
        showAlert('success','Comentario enviado.');
        form.reset();
      }
    });
  });

  loadInitialComments();
})();