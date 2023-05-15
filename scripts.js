function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const hoveredWithDragOpacity = "0.5";
const termsCount = 3;

var selectedCharacteristic;
var hoveredWithDragCharacteristic;
var characteristicBaseColor = "rgb(255, 255, 255)";

function refreshTask() {
    let definitions = Array.from(document.getElementsByClassName("definition"));
    definitions.forEach(definition => {
        let characteristics = Array.from(definition.getElementsByClassName("characteristic"));
        characteristics.forEach(characteristic => {
            characteristic.remove();
        });
    });

    let termsHTML = [];
    let termsIndex = [];
    let termIndex = 0;
    while (termIndex < termsCount) {
        let random = getRandomInt(data.length);
        if (!termsIndex.includes(random)) {
            termsHTML[termIndex] = '<div class="definition"><div class="term" id="' + data[random].id + '">' + data[random].term + '</div></div>';
            termsIndex.push(random);
            termIndex++;
        }
    }

    characteristicsHTML = [];
    for (let termIndex = 0; termIndex < termsIndex.length; termIndex++) {

        characteristics = [];
        for (let definitionIndex = 0; definitionIndex < Math.min(3, data[termsIndex[termIndex]].characteristics.length); definitionIndex++) {
            let random = getRandomInt(data[termsIndex[termIndex]].characteristics.length);
            if (!characteristics.includes(random)) {
                characteristics.push(random);
            }
        }

        characteristics.forEach(characteristic => {
            characteristicsHTML.push('<div draggable="true" class="characteristic" id="' + data[termsIndex[termIndex]].id + '">' + data[termsIndex[termIndex]].characteristics[characteristic] + '</div>');
        });
    }

    shuffle(termsHTML);
    shuffle(characteristicsHTML);
    termsContainer = document.getElementById("termsContainer");
    characteristicsContainer = document.getElementById("characteristicsContainer");
    termsContainer.innerHTML = "";
    characteristicsContainer.innerHTML = "";
    termsHTML.forEach(termHTML => {
        termsContainer.innerHTML = termsContainer.innerHTML + termHTML;
    });
    characteristicsHTML.forEach(characteristicHTML => {
        characteristicsContainer.innerHTML = characteristicsContainer.innerHTML + characteristicHTML;
    });
}
function selectCharacteristic(characteristic) {
    selectedCharacteristic = characteristic;
    selectedCharacteristic.style.opacity = hoveredWithDragOpacity;
    selectedCharacteristic.style.backgroundColor = characteristicBaseColor;
}
function unselectCharacteristic() {
    if (selectedCharacteristic != null) {
        selectedCharacteristic.style.opacity = "1";
        selectedCharacteristic = null;
    }
}
function hoverWithSelectedCharacteristic(hoverTarget) {
    hoveredWithDragCharacteristic = hoverTarget;
    hoveredWithDragCharacteristic.style.opacity = hoveredWithDragOpacity;
}
function unhoverWithSelectedCharacteristic() {
    if (hoveredWithDragCharacteristic != null) {
        hoveredWithDragCharacteristic.style.opacity = "1";
        hoveredWithDragCharacteristic = null;
    }
}
function attachCharacteristic(definition, characteristic) {
    definition.appendChild(characteristic);
    unselectCharacteristic();
}
function deattachCharacteristic(characteristic) {
    document.getElementById("characteristicsContainer").appendChild(characteristic);
    unselectCharacteristic();
}

window.onload = function () {
    refreshTask();

    Array.from(document.getElementsByClassName("characteristic")).forEach(characteristic => {
        characteristic.addEventListener("click", function (event) {
            unselectCharacteristic();
            selectCharacteristic(event.target);
        });
    });
    Array.from(document.getElementsByClassName("term")).forEach(term => {
        term.addEventListener("click", function (event) {
            attachCharacteristic(event.target.parentElement, selectedCharacteristic);
        });
    });

    document.getElementById("refresh").addEventListener("click", refreshTask);
    document.addEventListener("dragstart", function (event) {
        unselectCharacteristic();
        selectCharacteristic(event.target);
    });
    document.addEventListener("drag", function (event) {

    });
    document.addEventListener("dragend", function (event) {
        event.target.style.opacity = "1";
    });
    document.addEventListener("dragenter", function (event) {
        if (event.target.className == "term" || event.target.className == "characteristic") {
            hoverWithSelectedCharacteristic(event.target);
        }
    });
    document.addEventListener("dragover", function (event) {
        event.preventDefault();
    });
    document.addEventListener("dragleave", function (event) {
        if (event.target.className == "term" || event.target.className == "characteristic") {
            unhoverWithSelectedCharacteristic();
        }
    });
    document.addEventListener("drop", function (event) {
        event.preventDefault();
        unhoverWithSelectedCharacteristic();
        let targetDiv = event.target;
        if (targetDiv.className == "term") {
            attachCharacteristic(targetDiv.parentElement, selectedCharacteristic)
        }
        else if (targetDiv.className == "definition") {
            attachCharacteristic(targetDiv, selectedCharacteristic)
        }
        else if (targetDiv.className == "characteristic") {
            let targetDivParent = targetDiv.parentElement;
            if (targetDivParent.className == "definition") {
                attachCharacteristic(targetDivParent, selectedCharacteristic);
                deattachCharacteristic(targetDiv);
            }
            else {
                deattachCharacteristic(selectedCharacteristic);
            }
        }
        else {
            deattachCharacteristic(selectedCharacteristic);
        }
    });
    document.getElementById("check").addEventListener("click", function () {
        let definitionsHTMLCollection = document.getElementsByClassName("definition");
        let definitions = Array.from(definitionsHTMLCollection);
        definitions.forEach(definition => {
            let characteristicsHTMLCollection = definition.getElementsByClassName("characteristic");
            let characteristics = Array.from(characteristicsHTMLCollection);
            characteristics.forEach(characteristic => {
                if (characteristic != null) {
                    if (characteristic.id == definition.getElementsByClassName("term")[0].id) {
                        characteristic.style.backgroundColor = "rgb(200, 255, 200)";
                    }
                    else {
                        characteristic.style.backgroundColor = "rgb(255, 200, 200)";
                    }
                }
            })
        });
    });
}