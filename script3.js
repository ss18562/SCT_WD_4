const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

let tasks = [];

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const date = document.getElementById('taskDate').value;

  if (title === "") return;

  const task = {
    id: Date.now(),
    title,
    desc,
    date,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task${task.completed ? ' completed' : ''}`;

    li.innerHTML = `
      <strong>${task.title}</strong>
      ${task.desc ? `<span>${task.desc}</span>` : ""}
      ${task.date ? `<small>🕒 ${new Date(task.date).toLocaleString()}</small>` : ""}
      <div class="task-controls">
        <button onclick="toggleComplete(${task.id})">${task.completed ? '↩ Undo' : '✅ Done'}</button>
        <button onclick="editTask(${task.id})">✏️ Edit</button>
        <button onclick="deleteTask(${task.id})">❌ Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit title:", task.title);
  const newDesc = prompt("Edit description:", task.desc || "");
  const newDate = prompt("Edit date/time (yyyy-mm-ddThh:mm):", task.date);

  if (newTitle !== null) task.title = newTitle.trim();
  if (newDesc !== null) task.desc = newDesc.trim();
  if (newDate !== null) task.date = newDate.trim();

  renderTasks();
}
