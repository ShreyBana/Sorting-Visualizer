const arrayDiv = document.querySelector("#array");
const inputSize = document.querySelector("#size-slider");
const sortForm = document.querySelector("form");
let array = [];

function print() {
	array.forEach((dNode) => {
		console.log(dNode.number);
	});
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRand(lowerLimit, upperLimit) {
	range = upperLimit - lowerLimit;
	return (Math.floor(Math.random() * range) % range) + lowerLimit;
}

function DataNode(number) {
	this.number = number;
	this.span = document.createElement("span");
	this.span.classList.add("element");
	this.span.style.height = number * 5 + "px";
	this.toggleHighlight = function () {
		this.span.classList.toggle("highlighted");
	};
	this.setHeight = function () {
		this.span.style.height = this.number * 5 + "px";
	};
}

function swapNodes(a, b) {
	var temp = a.number;
	a.number = b.number;
	b.number = temp;
	a.setHeight();
	b.setHeight();
}

function generateNew() {
	var size = inputSize.value;
	const width = arrayDiv.clientWidth / size;
	arrayDiv.innerHTML = "";
	array = [];
	for (i = 0; i < size; i++) {
		dNode = new DataNode(getRand(1, 100));
		dNode.span.style.width = width + "px";
		arrayDiv.appendChild(dNode.span);
		array.push(dNode);
	}
}

async function selectionSort() {
	for (i = 0; i < array.length; i++) {
		var min = i;
		for (j = i + 1; j < array.length; j++) {
			array[j].toggleHighlight();
			await sleep(1);
			if (array[min].number > array[j].number) min = j;
			array[j].toggleHighlight();
		}
		if (min != i) swapNodes(array[i], array[min]);
	}
}

async function bubbleSort() {
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array.length - i - 1; j++) {
			array[j].toggleHighlight();
			await sleep(1);
			array[j].toggleHighlight();
			if (array[j].number > array[j + 1].number)
				swapNodes(array[j], array[j + 1]);
		}
	}
}

async function insertionSort() {
	for (var i = 1; i < array.length; i++) {
		var key = array[i].number;
		var j = i - 1;
		while (j >= 0 && array[j].number > key) {
			array[j].toggleHighlight();
			await sleep(1);
			array[j].toggleHighlight();
			array[j + 1].number = array[j].number;
			array[j + 1].setHeight();
			j--;
		}
		array[j + 1].number = key;
		array[j + 1].setHeight();
	}
}

async function mergeSortHelper(l, r) {
	if (l < r) {
		var mid = l + Math.floor((r - l) / 2);
		await mergeSortHelper(l, mid);
		await mergeSortHelper(mid + 1, r);
		var size1 = mid - l + 1;
		var size2 = r - mid;
		let arr1 = [];
		let arr2 = [];
		for (i = l; i <= mid; i++) {
			array[i].toggleHighlight();
			await sleep(5);
			array[i].toggleHighlight();
			arr1[i - l] = array[i].number;
		}
		for (i = mid + 1; i <= r; i++) {
			array[i].toggleHighlight();
			await sleep(5);
			array[i].toggleHighlight();
			arr2[i - mid - 1] = array[i].number;
		}
		var i = 0;
		var j = 0;
		var k = l;
		while (i < size1 && j < size2) {
			await sleep(1);
			if (arr1[i] < arr2[j]) array[k].number = arr1[i++];
			else array[k].number = arr2[j++];
			array[k].setHeight();
			k++;
		}
		while (i < size1) {
			array[k].number = arr1[i++];
			array[k].setHeight();
			k++;
		}
		while (j < size2) {
			array[k].number = arr2[j++];
			array[k].setHeight();
			k++;
		}
	}
}

function mergeSort() {
	mergeSortHelper(0, array.length - 1);
}

async function partition(l, r) {
	var x = array[l].number;
	var i = l;
	for (var j = l + 1; j <= r; j++) {
		array[j].toggleHighlight();
		await sleep(1);
		array[j].toggleHighlight();
		if (array[j].number <= x) {
			i++;
			swapNodes(array[i], array[j]);
		}
	}

	swapNodes(array[i], array[l]);
	return i;
}

async function quickSortHelper(l, r) {
	if (l < r) {
		var pivot = await partition(l, r);
		quickSortHelper(l, pivot - 1);
		quickSortHelper(pivot + 1, r);
	}
}

function quickSort() {
	quickSortHelper(0, array.length - 1);
}

async function sort() {
	var value = sortForm["sorting-algo"].value;
	console.log(value);
	if (value == null) return;
	else if (value == 0) selectionSort();
	else if (value == 1) bubbleSort();
	else if (value == 2) insertionSort();
	else if (value == 3) mergeSort();
	else quickSort();
}

document.querySelector("#generator").onclick = generateNew;
document.querySelector("#sort").onclick = sort;
