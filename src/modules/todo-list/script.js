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
const taskListEl = document.querySelector(".task-list");
const listTitle = document.querySelector(".list-title");
const totalTask = document.querySelector(".total-task");
const completedTaskListEl = document.querySelector(".completed-task-list");

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
let activeTask = null;

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
    priority: "",
    hasCompleted: false,
  };

  taskData.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(taskData));
  renderTaskList();
};

const renderTaskList = () => {
  taskListEl.innerHTML = "";
  completedTaskListEl.innerHTML = "";

  taskData.forEach(
    ({ id, title, date, description, priority, hasCompleted }) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task-tab";
      taskDiv.id = id;

      taskDiv.innerHTML = `
    <div class="task-content">
      <label>
        <input type="checkbox" ${hasCompleted ? "checked" : ""} />
        <span class="task-title">${title}</span>
      </label>
      <span class="task-time">${date}</span>
    </div>
  `;

      const labelEl = taskDiv.querySelector("label");
      if (labelEl) {
        labelEl.addEventListener("click", (e) => {
          if (!(e.target instanceof HTMLInputElement)) {
            e.preventDefault();
          }
        });
      }

      if (hasCompleted) {
        taskDiv.classList.add("completed");
        completedTaskListEl.appendChild(taskDiv);
      } else {
        taskListEl.appendChild(taskDiv);
      }

      const checkbox = taskDiv.querySelector('input[type="checkbox"]');
      checkbox.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      checkbox.addEventListener("change", () => {
        const task = taskData.find((t) => t.id === id);
        if (task) {
          task.hasCompleted = checkbox.checked;
          localStorage.setItem("tasks", JSON.stringify(taskData));
          renderTaskList();
        }
      });

      // Attach event listener here
      taskDiv.addEventListener("click", (e) => {
        if (e.target instanceof HTMLInputElement) return;
        activeTask = taskData.find((task) => task.id === id);
        if (activeTask) {
          taskEditorContainer.classList.add("open"); // SHOW hidden editor
          editorTaskTitle.textContent = activeTask.title; // Title
          textEditor.value = activeTask.description;
        }
      });
    }
  );
  textEditor.addEventListener("input", () => {
    if (activeTask) {
      activeTask.description = textEditor.value;
      localStorage.setItem("tasks", JSON.stringify(taskData));
    }
  });
};

// Animation open/close function
document
  .querySelector(".close-editor")
  .addEventListener("click", () =>
    taskEditorContainer.classList.remove("open")
  );

// Enter to add task
addTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
