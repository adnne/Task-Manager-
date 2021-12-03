// Define UI var

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListener();

function loadEventListener() {
  // dom load event
   document.addEventListener('DOMContentLoaded',getTasks)
  // add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear task event
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks event
  filter.addEventListener("keyup", filterTasks);
}
// get tasks from ls
function getTasks(){
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task){
    // creat li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";

    // creat text node and append to li
    li.appendChild(document.createTextNode(task));

    // creat new link
    const link = document.createElement("a");

    // add class
    link.className = "delete-item secondary-content";

    // add icon html
    link.innerHTML = '<i class="fas fa-times-circle"></i>';
    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  })
}

// add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  } else {
    // creat li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";

    // creat text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // creat new link
    const link = document.createElement("a");

    // add class
    link.className = "delete-item secondary-content";

    // add icon html
    link.innerHTML = '<i class="fas fa-times-circle"></i>';
    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    storeTaskLC(taskInput.value);

    // clear input
    taskList.value = "";
  }

  e.preventDefault();
}

// store task
function storeTaskLC(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// remove from ls 
function removetaskfromls(taskItem){

  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task,index){
    if (taskItem.textContent === task) {
      tasks.splice(index,1);
    }
  })

  localStorage.setItem('tasks',JSON.stringify(tasks))
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove();
      // remove from ls

      removetaskfromls(e.target.parentElement.parentElement);
    }
  }
}

// clear Tasks
function clearTasks(e) {
  // taskList.innerHTML="";
  if (confirm("remove all tasks ?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  // clear from ls
  clearTasksfromLs();
}

function clearTasksfromLs (){
  localStorage.clear();
}

// filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
