const hoveredWithDragOpacity = "0.7"

var draggedCharacteristic;
var hoveredWithDragCharacteristic;

function refresh() {
    //document.getElementById("first").
}

window.onload = function () {

    refresh();

    document.getElementById("refresh").addEventListener("click", refresh);

    document.addEventListener("dragstart", function (event) {
        draggedCharacteristic = event.target;
        event.target.style.opacity = hoveredWithDragOpacity;
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
            targetDiv.style.opacity = "1";
            targetDiv.parentElement.appendChild(draggedCharacteristic);
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
        }
        else {
            document.getElementById("answer").appendChild(draggedCharacteristic);
        }
    });

    document.getElementById("check").addEventListener("click", function () {
        let definitions = document.getElementsByClassName("definition");
        for (let index = 0; index < definitions.length; index++) {
            let definition = definitions[index];
            let characteristic = definition.getElementsByClassName("characteristic")[0];
            if (characteristic != null) {
                if (characteristic.id == definition.id) {
                    characteristic.style.backgroundColor = "rgb(200, 255, 200)";
                }
                else {
                    characteristic.style.backgroundColor = "rgb(255, 200, 200)";
                }
            }
        }
    });
}