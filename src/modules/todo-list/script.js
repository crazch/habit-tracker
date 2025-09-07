const getElements = () => {
  return {
    menuBtn: document.querySelector(".menu-btn"),
    pageTitle: document.querySelector(".page-title"),
    moreBtn: document.querySelector(".more-btn"),

    addTaskInput: document.getElementById("add-task"),
    addTaskDateBtn: document.querySelector(".add-task-date"),
    addTaskPriority: document.querySelector(".add-task-priority"),

    tabContainer: document.querySelector(".tab-container"),
    taskListEl: document.querySelector(".task-list"),
    listTitle: document.querySelector(".list-title"),
    totalTask: document.querySelector(".total-task"),
    completedTaskListEl: document.querySelector(".completed-task-list"),

    taskEditorContainer: document.querySelector(".task-editor-container"),
    editorCheckbox: document.getElementById("task-complete"),
    editorDateBtn: document.querySelector(".date-btn"),
    priorityEditorBtn: document.querySelector(".priority-btn"),
    editorTaskTitle: document.getElementById("editor-task-title"),
    textEditor: document.querySelector(".text-editor-area"),
    taskCreationDate: document.querySelector(".created-by"),
    taskLastEditDate: document.querySelector(".last-edited"),

    addPriorityContainer: document.querySelector(".add-priority"),
    priorityOptions: document.querySelectorAll(".add-priority .priorities div"),
  };
};

const state = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  activeTask: null,
  selectedPriority: "",
};

const loadTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

let elements;
const init = () => {
  elements = getElements();
  state.tasks = loadTasks();
  attachEvents(elements);
  renderTaskList();
};

const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, "");
};

const createTask = (title, priority = "") => {
  return {
    id: `${removeSpecialChars(title)
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}`,
    title: removeSpecialChars(title),
    date: "",
    description: "",
    priority,
    hasCompleted: false,
  };
};

const addTask = () => {
  if (!elements.addTaskInput.value) return;

  const taskObj = createTask(
    elements.addTaskInput.value,
    state.selectedPriority
  );

  state.tasks.push(taskObj);
  saveTasks(state.tasks);
  renderTaskList();

  elements.addTaskInput.value = "";
  state.selectedPriority = "";
  elements.addTaskPriority.textContent = "Logo";
};

// Extract one-task renderer
const renderTaskItem = (task, elements) => {
  const { id, title, date, priority, hasCompleted } = task;

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

  const taskContentEl = taskDiv.querySelector(".task-content");
  const checkboxEl = taskContentEl.querySelector('input[type="checkbox"]');

  // Apply priority color
  let priorityColor;
  switch (priority) {
    case 0:
      priorityColor = "gray";
      break;
    case 1:
      priorityColor = "green";
      break;
    case 2:
      priorityColor = "orange";
      break;
    case 3:
      priorityColor = "red";
      break;
    default:
      priorityColor = "#ddd";
  }
  taskContentEl.style.borderLeft = `4px solid ${priorityColor}`;
  checkboxEl.style.borderColor = priorityColor;
  if (checkboxEl.checked) {
    checkboxEl.style.backgroundColor = priorityColor;
  }

  // Prevent label mis-click
  const labelEl = taskDiv.querySelector("label");
  if (labelEl) {
    labelEl.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLInputElement)) e.preventDefault();
    });
  }

  // Checkbox behaviour

  checkboxEl.addEventListener("click", (e) => e.stopPropagation());
  checkboxEl.addEventListener("change", () => {
    const found = state.tasks.find((t) => t.id === id);
    if (found) {
      found.hasCompleted = checkboxEl.checked;
      saveTasks(state.tasks);
      renderTaskList();
    }
  });

  // Open Editor
  taskDiv.addEventListener("click", (e) => {
    if (e.target instanceof HTMLInputElement) return;
    state.activeTask = state.tasks.find((t) => t.id === id);
    if (state.activeTask) {
      elements.taskEditorContainer.classList.add("open");
      elements.editorTaskTitle.textContent = state.activeTask.title;
      elements.textEditor.value = state.activeTask.description;
    }
  });

  return taskDiv;
};

const renderTaskList = () => {
  elements.taskListEl.innerHTML = "";
  elements.completedTaskListEl.innerHTML = "";

  state.tasks.forEach((task) => {
    const taskEl = renderTaskItem(task, elements);
    if (task.hasCompleted) {
      taskEl.classList.add("completed");
      elements.completedTaskListEl.appendChild(taskEl);
    } else {
      elements.taskListEl.appendChild(taskEl);
    }
  });
};

const attachEvents = (elements) => {
  // Priority section
  elements.priorityOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      state.selectedPriority = index;
      elements.addPriorityContainer.style.display = "none";
      elements.addTaskPriority.textContent = "!".repeat(index + 1);
    });
  });

  // Auto-save editor description
  elements.textEditor.addEventListener("input", () => {
    if (state.activeTask) {
      state.activeTask.description = elements.textEditor.value;
      saveTasks(state.tasks);
    }
  });

  // Animation open/close function
  elements.taskEditorContainer
    .querySelector(".close-editor")
    .addEventListener("click", () =>
      elements.taskEditorContainer.classList.remove("open")
    );

  // Enter to add task
  elements.addTaskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Toggle priority panel
  elements.addTaskPriority.addEventListener("click", () => {
    elements.addPriorityContainer.style.display =
      elements.addPriorityContainer.style.display === "block"
        ? "none"
        : "block";
  });
};

document.addEventListener("DOMContentLoaded", init);
