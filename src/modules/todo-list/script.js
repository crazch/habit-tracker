// Header
const menuBtn = document.querySelector(".menu-btn");
const pageTitle = document.querySelector(".page-title");
const moreBtn = document.querySelector(".more-btn");

// Add Task Input
const addTaskInput = document.getElementById("add-task");
const addTaskDateBtn = document.querySelector(".add-task-date");
const addTaskPriority = document.querySelector(".add-task-priority");

// Tab Container
const tabContainer = document.querySelector(".tab-container");
const taskTab = document.querySelector(".task-tab");
const listTitle = document.querySelector(".list-title");
const totalTask = document.querySelector(".total-task");

// Task Tab
const taskTabCheckbox = document.getElementById("task-tab-checkbox");
const taskTabTitle = document.querySelector(".task-title");
const taskTabTime = document.querySelector(".task-time");

// Task Editor Panel
const taskEditorContainer = document.querySelector(".task-editor-container");
const editorCheckbox = document.getElementById("task-complete");
const editorDateBtn = document.querySelector(".date-btn");
const priorityEditorBtn = document.querySelector("priority-btn");
const editorTaskTitle = document.getElementById("editor-task-title");
const textEditor = document.querySelector(".text-editor-area");

const taskCreationDate = document.querySelector(".created-by");
const taskLastEditDate = document.querySelector(".last-edited");

const taskData = JSON.parse(localStorage.getItem("tasks")) || [];
const currentTask = {};

const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, "");
};

const addTask = () => {
  const taskObj = {
    id: `${removeSpecialChars(addTaskInput.value)
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}`,
    title: `${removeSpecialChars(addTaskInput.value)}`,
    date: ``,
    description: "",
  };

  taskData.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(taskData));
  renderTaskList();
};

const renderTaskList = () => {
  tabContainer.innerHTML = "";

  taskData.forEach(({ id, title, date, description }) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-tab";
    taskDiv.id = id;

    taskDiv.innerHTML = `
    <div class="task-content">
      <label>
        <input type="checkbox" />
        <span class="task-title">${title}</span>
      </label>
      <span class="task-time">${date}</span>
    </div>
  `;

    // Attach event listener here
    taskDiv.addEventListener("click", () => {
        // SHOW hidden editor
        // DISPLAY Task Details in Editor
    });

    tabContainer.appendChild(taskDiv);
  });
};

addTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});