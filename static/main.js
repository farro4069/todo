// Using local storage

// Listeners
let adding = document.getElementById('add-item-form');
let addItem = document.getElementById('newItem');

adding.addEventListener('submit', addNewTodo);

let filter = document.getElementById('filter'); 

// Initialize the html
function initialize() {
	getTodos();
	listTodos();
}

// constructor to add a new todo item
let todos = [];
function Todo(itemName) {
	this.name = itemName;
	this.completed = false;
}

// Add New Todo Item
function addNewTodo(itemName) {
	itemName.preventDefault();
	if(!newItem.value) {
		return false;
	} else {
		let t = new Todo(newItem.value);
		todos.push(t);
		saveTodos();
	}
	location.reload();
}


// Get Todo Item
function getTodo(index) {
	if(index.target.id == 'status'){
		statusTodo(index);
	} else {
		if(index.target.id == 'delete-item') {
		removeTodo(index);
		}
	}
}

// Change items status (toggle)
function statusTodo(index) {
	let li = index.target.parentElement;
	let ul = li.parentNode;
	let ind = Array.prototype.indexOf.call(ul.children,li);
	if(todos[ind].completed == false) {
		todos[ind].completed = true;
	} else {
		todos[ind].completed = false;
	}
	saveTodos();
	listTodos();
}

// Delete item by index
function removeTodo(index) {
	if(index.target.id == 'delete-item') {
		let li = index.target.parentElement;
		let ul = li.parentNode;
		let ind = Array.prototype.indexOf.call(ul.children,li);
		if(confirm('Are you sure you want to delete '+todos[ind].name+' ?')){
			todos.splice(ind, 1);
		}
		saveTodos();
		listTodos();
	}
}

// Save to local storage
function saveTodos() {
	let strTodos = JSON.stringify(todos);
	localStorage.setItem('todos', strTodos);
}

// get data from local storage
function getTodos() {
	let strTodos = localStorage.getItem('todos');
	todos = JSON.parse(strTodos);
	if(!todos) {
		todos = [];
	}
}


// Display
function listTodos(){
	let listCode = "";
	let stat = 'to do';
	for (let i in todos) {
		let todo = todos[i];
		let itemName = todo.name;
		let itemStatus = todo.completed;
		if(itemStatus) {
			stat = '&#10003;';
		} else { 
			stat = "";
		}
		listCode += "<li class='listItem' draggable='true'>"+itemName+"<button id='status'>"+stat+"</button><button id='delete-item'>&#10008;</button></li>";
	}
	todoList = document.getElementById("todoItems");
	todoList.innerHTML = listCode;
}

// Filter items
function filterItems(e) {
	let text = e.target.value.toLowerCase();
	let items = todoList.getElementsByTagName('li');
	Array.from(items).forEach(function(item){
		let itemName = item.firstChild.textContent;
		if(itemName.toLowerCase().indexOf(text) != -1){
			item.style.display = 'block';
		} else {
			item.style.display = 'none';
		}
	});
}

// Automatically load from local storage
window.onload = initialize();

// More listeners
todoList.addEventListener('click', getTodo);
filter.addEventListener('keyup', filterItems);


// Reordering by drag and drop
// initialize reordering array 
const newOrder = {newIndex: 0, oldIndex: 0};

// Event listener for drag events
const moved = document.getElementById('todoItems');

moved.addEventListener('dragstart', dragStart);
moved.addEventListener('dragenter', dragEnter);
moved.addEventListener('dragover', dragOver);
moved.addEventListener('dragleave', dragLeave);
moved.addEventListener('dragend', dragEnd);
moved.addEventListener('drop', dragDrop);

// Drag functions
function dragStart(event) {
	setTimeout(() => event.target.className += ' invisible', 200);
	let li = event.target;
	let ul = li.parentNode;
	let oldIndex = Array.prototype.indexOf.call(ul.children,li);
	newOrder.oldIndex = oldIndex;
}

function dragEnter(event) {
	event.preventDefault();
	event.target.className += ' invisible';
}

function dragOver(event) {
	event.preventDefault();
}

function dragLeave(event) {
	event.preventDefault();
	event.target.className = 'listItem';
}

function dragEnd(event) {
	event.preventDefault();
	event.target.className = 'listItem';
}

function dragDrop(event) {
	li = event.target;
	ul = li.parentNode;
	let newIndex = Array.prototype.indexOf.call(ul.children,li);

	newOrder.newIndex = newIndex;
	reorder();
}

// The reorder code for 'original Array'
function reorder() {
	const reorderArray = (newOrder, todos) => {
		const movedItem = todos.filter((item, index) => index === newOrder.oldIndex); 
		const remainingItems = todos.filter((item, index) => index !== newOrder.oldIndex);

		const reoderedItems = [
			...remainingItems.slice(0, newOrder.newIndex),
			...movedItem,
			...remainingItems.slice(newOrder.newIndex)
		];
		return reoderedItems;
	}
	todos = reorderArray(newOrder, todos);
	listTodos();
	saveTodos();
}
