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

const hoveredWithDragOpacity = "0.7"

var draggedCharacteristic;
var hoveredWithDragCharacteristic;
var characteristicBaseColor;

function refreshTask() {
    let definitions = Array.from(document.getElementsByClassName("definition"));
    definitions.forEach(definition => {
        let characteristics = Array.from(definition.getElementsByClassName("characteristic"));
        characteristics.forEach(characteristic => {
            characteristic.remove();
        });
    });

    let dropTargets = Array.from(document.getElementsByClassName("dropTarget"));
    let termsIndex = [];
    let termIndex = 0;
    while (termIndex < 5) {
        let random = getRandomInt(data.length);
        if (!termsIndex.includes(random)) {
            termsIndex.push(random);
            termIndex++;
        }
    }

    characteristicsHTML = [];
    for (let dropTargetIndex = 0; dropTargetIndex < dropTargets.length; dropTargetIndex++) {
        dropTargets[dropTargetIndex].id = data[termsIndex[dropTargetIndex]].id;
        dropTargets[dropTargetIndex].innerHTML = data[termsIndex[dropTargetIndex]].term;

        characteristics = [];
        for (let definitionIndex = 0; definitionIndex < Math.min(3, data[termsIndex[dropTargetIndex]].characteristics.length); definitionIndex++) {
            let random = getRandomInt(data[termsIndex[dropTargetIndex]].characteristics.length);
            if (!characteristics.includes(random)) {
                characteristics.push(random);
            }
        }

        characteristics.forEach(characteristic => {
            characteristicsHTML.push('<div draggable="true" class="characteristic" id="' + data[termsIndex[dropTargetIndex]].id + '">' + data[termsIndex[dropTargetIndex]].characteristics[characteristic] + '</div>');
        });
    }

    shuffle(characteristicsHTML);
    characteristicsContainer = document.getElementById("characteristicsContainer");
    characteristicsContainer.innerHTML = ""
    characteristicsHTML.forEach(characteristicHTML => {
        characteristicsContainer.innerHTML = characteristicsContainer.innerHTML + characteristicHTML;
    });
}

window.onload = function () {
    refreshTask();
    characteristicBaseColor = document.getElementsByClassName("characteristic")[0].style.backgroundColor;

    document.getElementById("refresh").addEventListener("click", refreshTask);

    document.addEventListener("dragstart", function (event) {
        draggedCharacteristic = event.target;
        draggedCharacteristic.style.opacity = hoveredWithDragOpacity;
        draggedCharacteristic.style.backgroundColor = characteristicBaseColor;
    });

    document.addEventListener("drag", function (event) {

    });

    document.addEventListener("dragend", function (event) {
        event.target.style.opacity = "1";
    });

    document.addEventListener("dragenter", function (event) {
        if (event.target.className == "dropTarget") {
            event.target.style.opacity = hoveredWithDragOpacity
        }
        if (event.target.className == "characteristic") {
            hoveredWithDragCharacteristic = event.target;
            hoveredWithDragCharacteristic.style.opacity = hoveredWithDragOpacity;
        }
    });

    document.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    document.addEventListener("dragleave", function (event) {
        if (event.target.className == "dropTarget") {
            event.target.style.opacity = "1";
        }
        if (event.target.className == "characteristic") {
            hoveredWithDragCharacteristic.style.opacity = "1";
        }
    });

    document.addEventListener("drop", function (event) {
        event.preventDefault();
        let targetDiv = event.target;
        if (targetDiv.className == "dropTarget") {
            targetDiv.style.opacity = 1;
            targetDiv.parentElement.appendChild(draggedCharacteristic);
            draggedCharacteristic = null;
        }
        else if (targetDiv.className == "definition") {
            targetDiv.appendChild(draggedCharacteristic);
            draggedCharacteristic = null;
        }
        else if (targetDiv.className == "characteristic") {
            targetDiv.style.opacity = 1;
            let targetDivParent = targetDiv.parentElement;

            if (targetDivParent.className == "definition") {
                draggedCharacteristic.parentElement.appendChild(targetDiv);

                targetDivParent.appendChild(draggedCharacteristic);
                draggedCharacteristic = null;
            }
            else {
                document.getElementById("characteristicsContainer").appendChild(draggedCharacteristic);
            }
        }
        else {
            document.getElementById("characteristicsContainer").appendChild(draggedCharacteristic);
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
                    if (characteristic.id == definition.getElementsByClassName("dropTarget")[0].id) {
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