let colorsArray = [ "black", "gold", "cyan" ];
let firstClick = true;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function putStatus(genArray) {
    var index = 1;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const tile = document.querySelector(`[data-id='${index}']`);
            if (genArray[i][j] == 'dead') { tile.classList.add('cell-dead'); tile.classList.remove('cell-alive') }
            else if (genArray[i][j] == 'alive') { tile.classList.add('cell-alive'); tile.classList.remove('cell-dead') }
            else { tile.classList.remove('cell-alive'); tile.classList.remove('cell-dead') }

            index++;
        }
    }

}

function getStatus() {
    var genArray = new Array(rows);
    for (var i=0; i < rows; i++) {
        genArray[i]=new Array(cols);
    }

    var index = 1;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const tile = document.querySelector(`[data-id='${index}']`);
            if (tile.classList.contains('cell-dead')) { genArray[i][j] = 'dead'; }
            else if (tile.classList.contains('cell-alive')) { genArray[i][j] = 'alive'; }
            else { genArray[i][j] = 'error'; }

            index++;
        }
    }

    return genArray;
}

function beginProcess() {
    info.classList.add('hidden');
    tileContainer.classList.remove('hidden');
    tileContainer.classList.add('unclickable');
    // heading.textContent = `You've started it.`;

    let rows = document.getElementById('rowsInput').value;
    let cols = document.getElementById('colsInput').value;
    let image = document.getElementById('picture').value;

    tileContainer.style.background = `url( ${image} )`;

    buildCells(rows, cols);

    //this if statement logs the relative pattern that's active when the start button is first clicked
    // if(firstClick) {
    //     var index = 1;
    //     var pattern = [];
    //     for (let i = 0; i < rows; i++) {
    //         for (let j = 0; j < cols; j++) {
    //             const tile = document.querySelector(`[data-id='${index}']`);
    //             if (tile.classList.contains('cell-alive')) { pattern.push(index) }
    //             index++;
    //         }
    //     }
    //     console.log(makePatternAbsolute(pattern));
    //     firstClick = false; 
    // }
}

// clicking on a cell toggles whether it is dead or alive
function cellClick(tile) {
    tile.classList.toggle('cell-dead');
    tile.classList.toggle('cell-alive');
}

function makePatternRelative(absolutePattern) {
    var relativePattern = [];
    for(let i = 0; i < absolutePattern.length; i++) {
        let outPoint = cols*(absolutePattern[i][1]-1) + absolutePattern[i][0]
        relativePattern.push(outPoint);
    }
    return relativePattern;
}

function makePatternAbsolute(relativePattern) {
    var absolutePattern = [];
    for(let i = 0; i < relativePattern.length; i++) {
        var yPointOut = Math.floor(relativePattern[i]/cols) + 1;
        var xPointOut = relativePattern[i] - (cols*(yPointOut-1));
        var absolutePoint = [xPointOut, yPointOut]
        absolutePattern.push(absolutePoint);
    }
    return absolutePattern;
}

function buildCells(rows, cols) {
    const howMany=rows*cols;

    //let relativePattern = makePatternRelative(pentadecathlonPattern);

    //create the div tiles based on how many rows*cols there are
    for (let i = 1; i <= howMany; i++) {
        var div = document.createElement('div');
        div.classList.add('tile', 'tile-cell');
        div.setAttribute('data-id', i);
        div.addEventListener('click', () => {
            const tile = document.querySelector(`[data-id='${i}']`);
            cellClick(tile);
        })

        //if (relativePattern.includes(i)) {div.classList.add('cell-alive'); div.classList.remove('cell-dead')}

        tileContainer.appendChild(div);
    }

    // set grid-template-rows and grid-template-columns for CSS
    var tempString = '';
    for (let i = 1; i <=rows; i++) {
        tempString += '15px ';
    }
    tileContainer.style.gridTemplateRows = tempString;

    var tempString = '';
    for (let i = 1; i <=cols; i++) {
        tempString += '15px ';
    }
    tileContainer.style.gridTemplateColumns = tempString;
}

startButton.addEventListener('click', beginProcess);
// window.onload = buildCells;