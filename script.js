const toDoInput = document.getElementById("new-todo");
const toDoLabel = document.querySelector("label");
const toDoList = document.querySelector(".tasks");
const newTaskForm = document.querySelector(".create-new");
const allTasks = document.querySelectorAll("div.task");
const tasksRemaining = document.getElementById("tasks-remaining");


toDoInput.addEventListener('focusin', () => {
  toDoLabel.textContent = "Currently typing";
});

toDoInput.addEventListener('focusout', () => {
  toDoLabel.textContent = "Create new todo";
});

newTaskForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  let desc = e.target["new-todo"].value;
  let newTask = createNewTask(desc);
  toDoList.appendChild(newTask);
  toDoList.insertBefore(newTask, toDoList.children[0]);
  newTaskForm.reset();
  countTasks();
});

function createNewTask(taskDesc){
  let task = document.createElement("div");
  let checkBox = document.createElement("input");
  let desc = document.createElement("p");
  let closeButton = document.createElement("a");

  task.classList.add("task")
  checkBox.type = "checkbox";
  desc.textContent = taskDesc;
  closeButton.href = "#";
  closeButton.style.display = "hidden";
  closeButton.textContent = "X";
  closeButton.addEventListener("click", (e)=>deletetask(e.target))

  task.appendChild(checkBox);
  task.appendChild(desc);
  task.appendChild(closeButton);

  return task;
}

function deletetask(elem){
  toDoList.removeChild(elem.parentNode);
}

function countTasks(){
  let remTask = 0;
  let childrens = toDoList.childNodes;
  childrens.forEach(chi => {
    if (!chi.firstChild.checked) {
      remTask += 1;
    }

    chi.firstChild.addEventListener('click', e=>{
      if(!e.target.checked){
        remTask += 1;
      } else {
        remTask -= 1;
      }
      countTasks()
    })
  })

  tasksRemaining.textContent = remTask;
}