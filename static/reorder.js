// initialize reordering array 
const newOrder = {newIndex: 0, oldIndex: 0};

// Event listener for drag events
const moved = document.getElementById('itemItems');

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
	console.log(originalArray[oldIndex].name);
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
	console.log(newOrder);
	reorder();
}

// The reorder code for 'original Array'
function reorder() {
	const reorderArray = (newOrder, originalArray) => {
		const movedItem = originalArray.filter((item, index) => index === newOrder.oldIndex); 
		const remainingItems = originalArray.filter((item, index) => index !== newOrder.oldIndex);

		const reoderedItems = [
			...remainingItems.slice(0, newOrder.newIndex),
			...movedItem,
			...remainingItems.slice(newOrder.newIndex)
		];
		return reoderedItems;
	}
	originalArray = reorderArray(newOrder, originalArray)
	listOriginalArray()
}
