var draggedTerm;
var hoveredWithDragTerm;

window.onload = function () {
    document.addEventListener("dragstart", function (event) {
        draggedTerm = event.target;
        event.target.style.opacity = "0.5";
    });

    document.addEventListener("drag", function (event) {
    });

    document.addEventListener("dragend", function (event) {
        event.target.style.opacity = "1";
    });

    document.addEventListener("dragenter", function (event) {
        if (event.target.className == "droptarget") {
            event.target.style.backgroundColor = "rgb(220, 220, 220)";
        }
        if (event.target.className == "term") {
            hoveredWithDragTerm = event.target;
            hoveredWithDragTerm.style.opacity = "0.7";
        }
    });

    document.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    document.addEventListener("dragleave", function (event) {
        if (event.target.className == "droptarget") {
            event.target.style.backgroundColor = "rgb(255, 255, 255)";
        }
        if (event.target.className == "term") {
            hoveredWithDragTerm.style.opacity = "1";
        }
    });

    document.addEventListener("drop", function (event) {
        event.preventDefault();
        let targetDiv = event.target;
        if (targetDiv.className == "droptarget") {
            targetDiv.style.backgroundColor = "rgb(255, 255, 255)";
            targetDiv = targetDiv.parentElement.parentElement;
            if (targetDiv.childElementCount != 1) {
                let childP = targetDiv.getElementsByClassName("term")[0];
                document.getElementById("answer").appendChild(childP.parentElement);
            }
            targetDiv.appendChild(draggedTerm.parentElement);
            draggedTerm = null;
        }
        else if (targetDiv.className == "term") {
            targetDiv.style.opacity = 1;
            let targetDivParent = targetDiv.parentElement.parentElement;

            if (targetDivParent.className == "definition") {
                draggedTerm.parentElement.parentElement.appendChild(targetDiv.parentElement);

                targetDivParent.appendChild(draggedTerm.parentElement);
                draggedTerm = null;
            }
        }
        else {
            document.getElementById("answer").appendChild(draggedTerm.parentElement);
        }
    });

    document.getElementById("check").addEventListener("click", function () {
        let definitions = document.getElementsByClassName("question");
        let terms = document.getElementById("result");
        for (let index = 0; index < questions.length; index++) {
            const element = questions[index];
            let childP = element.getElementsByTagName("p")[0];
            let question = element.childNodes[0].textContent;
            let answer = childP != undefined ? childP.innerText : "no answer";
            resultP.append(`${question} : ${answer} ; `);
        }
    });
}