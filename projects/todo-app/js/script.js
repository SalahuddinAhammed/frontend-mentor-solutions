import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const newTodo = document.querySelector(".todo__new-todo");
const inputNewTodo = document.querySelector(".todo__new-todo-input");
const todoWrapperEl = document.querySelector(".todo-wrapper");
const newTodoIcon = document.querySelector(".todo__icon--new-todo");
const btnClearCompleted = document.querySelector(
  ".container--todo__clear-completed"
);
const btnsTodoSort = document.querySelectorAll(".container--todo__sort");
const btnThemeSwitcher = document.querySelector(".header__theme-switcher");

const lightOrDarkTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.classList.add("dark-mode");
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const newColorScheme = event.matches ? "dark" : "light";
      if (newColorScheme === "light") {
        document.documentElement.classList.remove("dark-mode");
      } else {
        document.documentElement.classList.add("dark-mode");
      }
    });
};

lightOrDarkTheme();

let todos = JSON.parse(localStorage.getItem("todos")) || [];
localStorage.setItem("todos", JSON.stringify(todos));

const updateLocalStorage = (task, options) => {
  todos = JSON.parse(localStorage.getItem("todos"));
  if (task === "deleteTodo" || task === "completeTodo") {
    const targetedTodo = event.target.closest(".todo");
    if (task === "completeTodo") {
      todos.forEach((todo) => {
        if (todo.id === targetedTodo.getAttribute("data-id")) {
          todo.status === "uncompleted"
            ? (todo.status = "completed")
            : (todo.status = "uncompleted");
        }
      });
    } else {
      targetedTodo.style.display = "none";
      todos = todos.filter(
        (todo) => todo.id !== targetedTodo.getAttribute("data-id")
      );
    }
  } else if (task === "createTodo") {
    todos.push({
      id: uuidv4(),
      title: options.title,
      status: event.target
        .closest(".todo__new-todo")
        .classList.contains("todo__new-todo--completed")
        ? "completed"
        : "uncompleted",
    });
  } else if (task === "clearCompleted") {
    todos = todos.filter((todo) => todo.status !== "completed");
  } else {
    alert("Something wrong happened!");
  }
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateHTML = () => {
  todoWrapperEl.innerHTML = "";
  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    const html = `<div class="todo ${
      todo.status === "completed" ? "todo--completed" : ""
    }" data-id=${todo.id}>
    <div class="todo__icon-wrapper">
      <div class="todo__icon">
        <img
          src="./images/icon-check.svg"
          alt="check icon"
          class="todo__icon-image"
        />
      </div>
    </div>
    <p class="todo__title">${todo.title}</p>
    <div class="todo__delete">
      <img src="./images/icon-cross.svg" alt="Cross icon" />
    </div>
  </div>`;
    todoWrapperEl.insertAdjacentHTML("afterbegin", html);
  });
  const btnsTodoDelete = document.querySelectorAll(".todo__delete");
  const btnsTodoIcon = document.querySelectorAll(".todo__icon");

  if (btnsTodoDelete) {
    btnsTodoDelete.forEach((btnTodoDelte) => {
      btnTodoDelte.addEventListener("click", (event) => {
        updateLocalStorage("deleteTodo");
        countUncompletedTodo();
      });
    });
  }

  if (btnsTodoIcon) {
    btnsTodoIcon.forEach((btnTodoIcon) => {
      btnTodoIcon.addEventListener("click", (event) => {
        const targetedTodo = event.target.closest(".todo");
        targetedTodo.classList.toggle("todo--completed");
        updateLocalStorage("completeTodo");
        countUncompletedTodo();
      });
    });
  }
};

generateHTML();

const addTodo = () => {
  const textNewTodo = inputNewTodo.value;
  if (!textNewTodo) return;
  updateLocalStorage("createTodo", { title: textNewTodo });
  generateHTML();
};

newTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
  inputNewTodo.value = "";
  countUncompletedTodo();
});

btnClearCompleted.addEventListener("click", () => {
  updateLocalStorage("clearCompleted");
  generateHTML();
  countUncompletedTodo();
});

const countUncompletedTodo = () => {
  let uncompletdTodoNumber = 0;
  const labelUncompletedTodo = document.querySelector(
    ".contianer--todo__number"
  );
  JSON.parse(localStorage.getItem("todos")).forEach((todo) => {
    if (todo.status === "uncompleted") {
      uncompletdTodoNumber++;
    }
  });
  labelUncompletedTodo.textContent = uncompletdTodoNumber;
};

countUncompletedTodo();

btnsTodoSort.forEach((btnTodoSort) => {
  btnTodoSort.addEventListener("click", (e) => {
    btnsTodoSort.forEach((btnTodoSort) => {
      btnTodoSort.classList.remove("container--todo__sort--active");
    });
    e.target.classList.add("container--todo__sort--active");
    const sortOption = e.target.getAttribute("data-sort");
    todoWrapperEl.setAttribute("data-sort", sortOption);
  });
});

newTodoIcon.addEventListener("click", (event) => {
  event.target
    .closest(".todo__new-todo")
    .classList.toggle("todo__new-todo--completed");
});

btnThemeSwitcher.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-mode");
});
