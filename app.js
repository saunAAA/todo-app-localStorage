let task = {
  id: uuidv4(),
  index: 0,
  name: 'test',
  startTime: Date.now(),
  endTime: Date.now() + 600,
  duration: 300,
  status: 'standby', //active, done
};
let task2 = {
  id: uuidv4(),
  index: 0,
  name: 'test2',
  startTime: Date.now(),
  endTime: Date.now() + 600,
  duration: 500,
  status: 'standby', //active, done
};
let tasks = [];

const onReadAll = () => {
  tasks = JSON.parse(localStorage.getItem('todos'));
};

const onUpdateAll = () => {
  localStorage.setItem('todos', JSON.stringify(tasks));
};

const onDeleteAll = () => {
  localStorage.removeItem('todos');
  tasks = [];
};

//onAdd: fuege Daten dem lokalstorage hinzu
const onAdd = (task) => {
  tasks.push(task);
  onUpdateAll();
};

//onUpdate:
const onUpdate = (task) => {
  tasks.splice(
    tasks.findIndex((todo) => todo.id === task.id),
    1,
    task
  );
  onUpdateAll();
};
//onDelete:
const onDelete = (task) => {
  tasks = tasks.filter((todo) => todo.id != task.id);
  onUpdateAll();
};

const renderTable = () => {
  tasks.map((task) => {
    const tableRow = document.getElementById('table');
    tableRow.innerHTML += `<tr class="mdc-data-table__row">
    <th class="mdc-data-table__cell" scope="row">${task.name}</th>
    <td class="mdc-data-table__cell">${task.status}</td>
    <td class="mdc-data-table__cell">${task.duration}</td>
  </tr>`;
  });
};

//----Code----
onReadAll();
onDeleteAll();
onAdd(task);
onAdd(task2);
renderTable();
