const toDoInput = document.getElementById("new-todo");
const toDoLabel = document.querySelector("label");
const toDoList = document.querySelector(".tasks");
const newTaskForm = document.querySelector(".create-new");
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
  
  // check if completed checkbox for newTask is checked
  const completed = newTask.firstChild


  toDoList.appendChild(newTask);
  toDoList.insertBefore(newTask, toDoList.children[0]);
  newTaskForm.reset();
  countTasks();
});

function createNewTask(taskDesc){
  let task = document.createElement("div");
  let checkBox = document.createElement("input");
  let description = document.createElement("p");
  let closeButton = document.createElement("a");
  
  task.classList.add("task")
  checkBox.type = "checkbox";
  description.textContent = taskDesc;
  closeButton.href = "#";
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", (e)=>deletetask(e.target))

  task.appendChild(checkBox);
  task.appendChild(description);
  task.appendChild(closeButton);

  return task;
}

function deletetask(elem){
  toDoList.removeChild(elem.parentNode);
  countTasks()
}

function countTasks(){
  let remTask = 0;
  let childrens = toDoList.childNodes;

  childrens.forEach(chi => {
    const completed = chi.firstChild;
    const closeButt = chi.lastChild;

    chi.addEventListener("mouseover", () => {
      closeButt.textContent = "X";
    });

    chi.addEventListener("mouseout", () => {
      closeButt.textContent = "";
    });

    if (!completed.checked) {
      remTask += 1;
    }

    completed.addEventListener('click', e => {
      if(!completed.checked){
        remTask += 1;
        chi.classList.remove("completed-task");
      } else {
        remTask -= 1;
        chi.classList.add("completed-task");
      }
      countTasks()
    });

  })

  tasksRemaining.textContent = remTask;
}

function allTasks(){
  const tasks = toDoList.childNodes;
  tasks.forEach(task => {
    task.style.display = "flex";
  });
}

function activeTasks(){
  const tasks = toDoList.childNodes;
  tasks.forEach(task => {
    if (task.firstChild.checked) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  });
}

function completedTasks(){
  const tasks = toDoList.childNodes;
  tasks.forEach(task => {
    if (task.firstChild.checked) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

function clearCompletedTasks(){
  const tasks = toDoList.childNodes;
  tasks.forEach(task => {
    if (task.classList.contains("completed-task")) {
      toDoList.removeChild(task);
    }
  });
}

function changeTheme(){
  if(document.querySelector("body").className == "dark-theme"){
    document.querySelector("body").className = "light-theme"
  } else {
    document.querySelector("body").className = "dark-theme"
  }
}