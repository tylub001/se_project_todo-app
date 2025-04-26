import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, todoCounter);
   return todo.getView();
  
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const todoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const id = uuidv4();
    const newTodo = {
      id,
      name: inputValues.name,
      date: new Date(inputValues.date),
      completed: false,
    };
    const todoElement = generateTodo(newTodo);
    section.addItem(todoElement);
    todoCounter.updateTotal(true);

    todoPopup.close();
  },
  validator: newTodoValidator,
});

todoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  todoPopup.open();
});
