import './style/main.css';
import deleteImage from './img/delete.svg';

import {
  addTodo, clearAllComplele, checkTodo, updateDescription, refreshPage,
  getMoreButton,
} from './utils.js';

const myWrapper = document.getElementById('list-wrapper');
const todoInput = document.getElementById('todo-input');

document.getElementById('refresh').addEventListener('click', () => refreshPage());

todoInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addTodo(e.target.value);
  }
});

const todos = JSON.parse(localStorage.getItem('todos'))
  ? JSON.parse(localStorage.getItem('todos'))
  : [];
todos.forEach((todo) => {
  const listItem = document.createElement('li');
  listItem.classList.add('list-item');
  const itemContent = document.createElement('input');
  const checkBox = document.createElement('input');
  const moreIcon = document.createElement('img');
  const myContentWrapper = document.createElement('div');
  myContentWrapper.classList.add('ct-wrapper');
  getMoreButton(moreIcon, deleteImage, todo.index);
  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = todo.completed;
  itemContent.style.textDecoration = todo.completed ? 'line-through' : 'none';
  itemContent.classList.add('todoinput');
  itemContent.disabled = true;
  listItem.addEventListener('click', () => {
    itemContent.disabled = false;
  });
  itemContent.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      updateDescription(todo.index, e.target.value);
    }
  });
  checkBox.addEventListener('change', () => {
    const completed = checkTodo(todo.completed);
    todo.completed = completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    window.location.reload();
  });
  itemContent.classList.add('p-todo-desck');
  itemContent.value = todo.description;
  myContentWrapper.appendChild(checkBox);
  myContentWrapper.appendChild(itemContent);
  listItem.appendChild(myContentWrapper);
  listItem.appendChild(moreIcon);
  myWrapper.append(listItem);
});

const listItemBottom = document.createElement('li');
listItemBottom.classList.add(...['list-item', 'item-bottom']);
const paragraphCleanAllCompleted = document.createElement('p');
paragraphCleanAllCompleted.classList.add('p-bottom');
paragraphCleanAllCompleted.innerHTML = 'Clear all completed';
listItemBottom.appendChild(paragraphCleanAllCompleted);

paragraphCleanAllCompleted.addEventListener('click', clearAllComplele);

myWrapper.appendChild(listItemBottom);
