class Todo {
    constructor(data, templateSelector) {
      this._data = data;
      this._templateElement = document.querySelector(templateSelector);
    }
  
    _addDeleteButtonListener() {
      this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    }
  
    _setDueDate(todoDate) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }
  
    _generateCheckboxEl() {
      this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
      this._todoLabel = this._todoElement.querySelector(".todo__label");
      this._todoCheckboxEl.checked = this._data.completed;
      this._todoCheckboxEl.id = `todo-${this._data.id}`;
      this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    }
  
    _setEventListeners() {
      this._todoCheckboxEl.addEventListener("change", () => {
        this._data.completed = !this._data.completed;
        if (this._data.completed) {
          this._todoElement.classList.add("completed");
        } else {
          this._todoElement.classList.remove("completed");
        }
      });
      this._todoDeleteBtn.addEventListener("click", () => {
        this._todoElement.remove();
      });
    }
  
    getView() {
      this._todoElement = this._templateElement.content
        .querySelector(".todo")
        .cloneNode(true);
  
      const todoNameEl = this._todoElement.querySelector(".todo__name");
      const todoDate = this._todoElement.querySelector(".todo__date");
  
      todoNameEl.textContent = this._data.name;
  
      this._setDueDate(todoDate);
      this._addDeleteButtonListener();
      this._generateCheckboxEl();
      this._addDeleteButtonListener();
      this._setEventListeners();
  
      return this._todoElement;
    }
  }
  
  export default Todo;