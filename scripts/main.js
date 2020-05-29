const arrayDiv = document.querySelector('#array');
const inputSize = document.querySelector('#size-slider');
let array = [];

function print() {
    array.forEach(dNode => {
        console.log(dNode.number);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function getRand() {
    return (Math.floor(Math.random()*100) % 100) + 1;
}

function DataNode (number) {
    this.number = number;
    this.span = document.createElement('span');
    this.span.classList.add('element');
    this.span.style.height = number*5 + 'px';
    this.toggleHighlight = function() {
        this.span.classList.toggle("highlighted");
    };
    this.setHeight = function() {
        this.span.style.height = (this.number)*5 + 'px';
    };
}

function swapNodes(a, b) {
    temp = a.number;
    a.number = b.number;
    b.number = temp;
    a.setHeight();
    b.setHeight();
}

function generateNew() {
    size = inputSize.value;
    const width = arrayDiv.clientWidth / size;
    arrayDiv.innerHTML = "";
    array = [];
    for(i = 0;i < size;i++) {
        dNode = new DataNode(getRand());
        dNode.span.style.width = width + "px";
        arrayDiv.appendChild(dNode.span);
        array.push(dNode);
    }
}

async function selectionSort() {
    for(i = 0;i < array.length;i++) {
        var min = i;
        for(j = i + 1;j < array.length;j++) {
            array[j].toggleHighlight();
            await sleep(1);
            if(array[min].number > array[j].number)
                min = j;
            array[j].toggleHighlight();
        }
        if(min != i)
            swapNodes(array[i], array[min]);
    }
}

async function bubbleSort() {
    for(i = 0;i < array.length;i++) {
        for(j = 0;j < array.length - i- 1;j++) {
            array[j].toggleHighlight();
            await sleep(1);
            array[j].toggleHighlight();
            if(array[j].number > array[j + 1].number) 
                swapNodes(array[j], array[j + 1]);
        }
    }
}

async function insertionSort() {
    for(i = 1;i < array.length;i++) {
        var key = array[i].number;
        j = i - 1;
        while(j >= 0 && array[j].number > key) {
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

(document.querySelector('#gen-button')).onclick = generateNew;
(document.querySelector('#sort-button')).onclick = insertionSort;