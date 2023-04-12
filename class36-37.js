let isDone = "";
let tasks = [
  // { title: "buy sugar", isDone: false, createdAt: new Date() },
  // { title: "take the dog", isDone: false, createdAt: new Date() },
  // { title: "water the flowers", isDone: false, createdAt: new Date() },
  // { title: "clean the kitchen", isDone: false, createdAt: new Date() },
];

//functions by Crud:

// read
function getTasks() {
  return tasks;
}
// this function saves the current mode of the list, with whatever change that we do to its data. the 'return' that we put here, is what will show us how it is now. (if we log the other functions we will get undefined, because we didnt give it a return yet)
// question- so why don't we give each function a return?
//answer- we should and we will. we just have to know that this is what return does.

// create
function addTask(title) {
  tasks.push({ title, isDone: false, createdAt: new Date(), doesExist: true });
  return tasks[tasks.length - 1];
}

// addTask("do the homework")

// means- the name you give the tasks is the title of it, which joins to the list, at default mode of false and other info like date created.

// update
function changeStatus(index) {
  if (index < 0 || index > tasks.length - 1) {
    return null;
  } else tasks[index].isDone = !tasks[index].isDone;
  return tasks[index];
}
// console.log(changeStatus(2));

// means- take the isDone key of the n (third) object in 'tasks' array, and change its boolean value into its opposite.
// with balance that the index put is correct

// more explanations in the notebook.

// delete

function removeTask(index) {
  if (index < 0 || index > tasks.length - 1) {
    return null;
  } else return tasks.splice(index, 1);
}

// removeTask(2);

function changeExistence(index) {
  if (index < 0 || index > tasks.length - 1) {
    return null;
  } else tasks[index].doesExist = !tasks[index].doesExist;
  return tasks[index];
}

//class 38

//stages in rendering
//0)

//get necessary html elements by id:

const $button = document.getElementById("button");
const $input = document.getElementById("to-do-input");
const $theList = document.getElementById("theList");
const $delBtn = "";

// 1) bring 2 html 'components' to js, to be controlled as strings

// 'kol hacavod' messsage:

function renderEmptyListNotification() {
  return ` <div class="bg-light rounded text-center p-3">
  <h1 class="display-3 fw-bold">Kol Hacavod!</h1>
  <p>you have finished all your tasks</p>
</div>`;
}

// task list, according to its li's.
//flexible data to any li- id, label, checked/unchecked.
// (and then should be delete button)

function renderTaskItem(task, index) {
  if (task.doesExist==true) {
  return `<li class="list-group-item
 >

<input
  class="form-check-input me-1"
  type="checkbox"
  id="task-id-${index}"
  onchange= "changeStatus(${index})"
  ${task.isDone ? "checked" : ""}
/>
<label
  class="form-check-label 
   ${task.isDone ? "text-secondary text-decoration-line-through" : ""}"
  for="task-id-${index}"
  > ${task.title}
  </label
>
<button
id="delBtn-${index}"
type="button"
class="btn-close position-absolute end-0 stretched-link"
aria-label="Close"
onclick= "changeExistence(${index})"
></button>
</li>`;
} else {return ""}
}
function renderTaskList(tasks = []) {
  let html = `<ul class="list-group">`;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    html += renderTaskItem(task, i);
  }
  html += `</ul>`;

  return html;
}

//2) according to whether exists a task or more, decide if show the list or the congrats.

function renderTaskApp() {
  const theTasks = getTasks();
  $theList.innerHTML =
    theTasks.length > 0
      ? renderTaskList(theTasks)
      : renderEmptyListNotification();
}
renderTaskApp();

function handleAddTask() {
  addTask($input.value);

  $input.value = "";
  renderTaskApp();

  //delBtn:(not working yet)
  // only after 1 task exists you can get this button-
  //   let $delBtn = document.getElementById("delBtn");

  //   console.log($delBtn);

  //   $delBtn.addEventListener ("click", delTask)

  // function delTask () {
  // $theList.innerHTML= "";
  // }
}
//3- create events to buttons, to add tasks

$button.addEventListener("click", handleAddTask);
$input.addEventListener("keypress", alter);

function alter(e) {
  if (e.key === "Enter") {
    handleAddTask();
  }
}

//4 not really working

function handleStatusChange(index) {
  changeStatus(index);
}
