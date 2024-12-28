let completedTasks = 0;
let totalTasks = 0;

function createNewTask() {
  const taskTitle = document.getElementById("title-textbox").value;
  const taskDescription = document.getElementById("description-textbox").value;
  //handle this later
  if (taskTitle == "") {
    window.alert("Please enter the Title!");
    return;
  }

  const task = {
    task: taskTitle,
    description: taskDescription,
    completed: false,
  };

  fetch("http://localhost:8080/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((respose) => respose.json())
    .then((data) => {
      addTaskToRightPanel(data.task, data.description, data.id, data.completed);
      totalTasks++;
      updateCounts();
    })
    .catch((error) => console.error("Error while creating "));
  document.getElementById("title-textbox").value = "";
  document.getElementById("description-textbox").value = "";
}

function addTaskToRightPanel(taskTitle, taskDescription, id, completed) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.id = id;

  const taskTitleElement = document.createElement("span");
  taskTitleElement.classList.add("task-title");
  taskTitleElement.textContent = taskTitle;

  if (completed) {
    taskTitleElement.innerHTML = `<strike>${taskTitle}</strike>`;
    completedTasks++;
  }

  const taskButtonsDiv = document.createElement("div");
  taskButtonsDiv.classList.add("task-buttons");

  const infoBtn = document.createElement("button");
  infoBtn.classList.add("info-btn");
  const infoImg = document.createElement("img");
  infoImg.src = "../assets/images/info-icon.png";
  infoImg.alt = "Description";
  infoBtn.appendChild(infoImg);

  const completedBtn = document.createElement("button");
  completedBtn.classList.add("completed-btn");
  const completedImg = document.createElement("img");
  completedImg.src = "../assets/images/icons8-checkmark-24.png";
  completedImg.alt = "Done";
  completedBtn.appendChild(completedImg);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  const deleteImg = document.createElement("img");
  deleteImg.src = "../assets/images/trash-2-24.ico";
  deleteImg.alt = "Delete";
  deleteBtn.appendChild(deleteImg);

  taskButtonsDiv.appendChild(infoBtn);
  taskButtonsDiv.appendChild(completedBtn);
  taskButtonsDiv.appendChild(deleteBtn);

  taskDiv.appendChild(taskTitleElement);
  taskDiv.appendChild(taskButtonsDiv);

  infoBtn.addEventListener("click", () => {
    createModalTitleAndDescription(taskTitle, taskDescription);
  });

  completedBtn.addEventListener("click", () => {
    const isCompleted = taskTitleElement.innerHTML.includes("<strike>");
    fetch(`http://localhost:8080/todo/${id}?completed=${!isCompleted}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !isCompleted }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        if (updatedTask.completed) {
          taskTitleElement.innerHTML = `<strike>${taskTitle}</strike>`;
          completedTasks++;
        } else {
          taskTitleElement.innerHTML = taskTitle;
          completedTasks--;
        }
        updateCounts();
      })
      .catch((error) => console.error("Error:", error));
  });

  deleteBtn.addEventListener("click", () => {
    const confirmDelete = window.confirm("Are you sure you want to Delete ?");
    if (confirmDelete) {
      fetch(`http://localhost:8080/todo/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          taskDiv.remove();
          totalTasks--;
          if (taskTitleElement.innerHTML.includes("<strike>")) {
            completedTasks--;
          }
          updateCounts();
        })
        .catch((error) => console.error("Error:", error));
    }
  });

  document.getElementById("right-container").prepend(taskDiv);
}

function updateCounts() {
  const completedElement = document.getElementById("completed");
  const totalTasksElement = document.getElementById("total-tasks");

  completedElement.textContent = `Completed: ${completedTasks}`;
  totalTasksElement.textContent = `Total Tasks: ${totalTasks}`;

  completedElement.classList.add("animate-text");
  totalTasksElement.classList.add("animate-text");
  setTimeout(() => {
    completedElement.classList.remove("animate-text");
    totalTasksElement.classList.remove("animate-text");
  }, 500);
}

function createModalTitleAndDescription(title, description) {
  // const existingModal = document.querySelector(".modal-overlay");
  // if (existingModal) {
  //   existingModal.remove();
  // }
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = title;

  const modalDescription = document.createElement("p");
  modalDescription.textContent = description;

  const closeModal = document.createElement("button");
  closeModal.textContent = "Close";
  closeModal.addEventListener("click", () => {
    modalOverlay.remove();
  });

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalDescription);
  modalContent.appendChild(closeModal);

  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

function loadTasks() {
  fetch("http://localhost:8080/todo")
    .then((response) => response.json())
    .then((tasks) => {
      tasks.forEach((task) => {
        addTaskToRightPanel(
          task.task,
          task.description,
          task.id,
          task.completed
        );
        totalTasks++;
        // if (task.completed) {
        //   completedTasks++;
        // }
      });
      updateCounts();
    })
    .catch((error) => console.error("Error:", error));
}
document.addEventListener("DOMContentLoaded", loadTasks);
