const columns = document.querySelectorAll('.column');
const taskLists = document.querySelectorAll('.task-list');
const stateOutput = document.getElementById('stateOutput');

let tasks = [
  {
    id: 'task-1',
    title: 'Crear estructura HTML',
    description: 'Preparar las columnas y tarjetas iniciales.',
    status: 'todo'
  },
  {
    id: 'task-2',
    title: 'Aplicar estilos CSS',
    description: 'Diseñar tablero, columnas y feedback visual.',
    status: 'todo'
  },
  {
    id: 'task-3',
    title: 'Implementar dragstart',
    description: 'Transferir datos de la tarea con dataTransfer.',
    status: 'todo'
  },
  {
    id: 'task-4',
    title: 'Permitir reordenación',
    description: 'Insertar tarjetas según la posición del cursor.',
    status: 'todo'
  },
  {
    id: 'task-5',
    title: 'Mostrar estado interno',
    description: 'Actualizar el JSON interno tras cada movimiento.',
    status: 'todo'
  }
];

let draggedTaskId = null;
const indicator = document.createElement('div');
indicator.className = 'drop-indicator';

renderBoard();

function renderBoard() {
  taskLists.forEach(list => list.innerHTML = '');

  tasks.forEach(task => {
    const taskElement = crearElementoTarea(task);
    document.getElementById(task.status).appendChild(taskElement);
  });

  actualizarEstado();
}

function crearElementoTarea(task) {
  const article = document.createElement('article');
  article.className = 'task';
  article.draggable = true;
  article.dataset.id = task.id;

  article.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <small>Estado: ${traducirEstado(task.status)}</small>
  `;

  article.addEventListener('dragstart', event => {
    draggedTaskId = task.id;
    article.classList.add('dragging');

    const data = {
      id: task.id,
      status: task.status
    };

    event.dataTransfer.setData('application/json', JSON.stringify(data));
    event.dataTransfer.effectAllowed = 'move';
  });

  article.addEventListener('dragend', () => {
    draggedTaskId = null;
    article.classList.remove('dragging');
    indicator.remove();
    columns.forEach(column => column.classList.remove('drag-over'));
  });

  return article;
}

columns.forEach(column => {
  column.addEventListener('dragover', event => {
    event.preventDefault();
    column.classList.add('drag-over');

    const taskList = column.querySelector('.task-list');
    const afterElement = obtenerElementoPosterior(taskList, event.clientY);

    if (afterElement == null) {
      taskList.appendChild(indicator);
    } else {
      taskList.insertBefore(indicator, afterElement);
    }
  });

  column.addEventListener('dragleave', event => {
    if (!column.contains(event.relatedTarget)) {
      column.classList.remove('drag-over');
    }
  });

  column.addEventListener('drop', event => {
    event.preventDefault();

    const rawData = event.dataTransfer.getData('application/json');

    if (!rawData) {
      return;
    }

    const transferredTask = JSON.parse(rawData);
    const newStatus = column.dataset.status;
    moverTarea(transferredTask.id, newStatus, indicator);

    indicator.remove();
    column.classList.remove('drag-over');
  });
});

function obtenerElementoPosterior(container, y) {
  const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return {
        offset,
        element: child
      };
    }

    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function moverTarea(taskId, newStatus, indicatorElement) {
  const movedTask = tasks.find(task => task.id === taskId);

  if (!movedTask) {
    return;
  }

  movedTask.status = newStatus;

  const taskList = document.getElementById(newStatus);
  const taskIdsInDom = [...taskList.querySelectorAll('.task')]
    .map(taskElement => taskElement.dataset.id)
    .filter(id => id !== taskId);

  const indicatorIndex = [...taskList.children].indexOf(indicatorElement);
  const idsBeforeIndicator = [...taskList.children]
    .slice(0, indicatorIndex)
    .filter(element => element.classList.contains('task'))
    .map(element => element.dataset.id)
    .filter(id => id !== taskId);

  const insertIndex = idsBeforeIndicator.length;

  const otherTasks = tasks.filter(task => task.id !== taskId);
  const sameStatusTasks = otherTasks.filter(task => task.status === newStatus);
  const otherStatusTasks = otherTasks.filter(task => task.status !== newStatus);

  sameStatusTasks.splice(insertIndex, 0, movedTask);

  tasks = [
    ...otherStatusTasks.filter(task => task.status === 'todo'),
    ...sameStatusTasks.filter(task => task.status === 'todo'),
    ...otherStatusTasks.filter(task => task.status === 'progress'),
    ...sameStatusTasks.filter(task => task.status === 'progress'),
    ...otherStatusTasks.filter(task => task.status === 'done'),
    ...sameStatusTasks.filter(task => task.status === 'done')
  ];

  renderBoard();
}

function traducirEstado(status) {
  const estados = {
    todo: 'Tareas por hacer',
    progress: 'En progreso',
    done: 'Finalizado'
  };

  return estados[status];
}

function actualizarEstado() {
  stateOutput.textContent = JSON.stringify(tasks, null, 2);
}
