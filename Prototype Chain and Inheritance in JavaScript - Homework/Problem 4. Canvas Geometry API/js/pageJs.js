var specialHtmlElements = [];

function onChange(){
    var currentShape = document.getElementById("shape").value;

    var elementsToReset = document.querySelectorAll("input[type=text]");

    var i = 0;

    for(i = 0; i < elementsToReset.length; i += 1){
        elementsToReset[i].value = defaultStatus;
    }

    if(specialHtmlElements.length > 0) {
        for (i = 0; i < specialHtmlElements.length; i += 1) {
            specialHtmlElements[i].style.display = "none";
        }
    }

    switch(currentShape){
        case "Triangle":
            specialHtmlElements[0].style.display = "block";
            specialHtmlElements[1].style.display = "block";
            break;
        case "Circle":
            specialHtmlElements[2].style.display = "block";
            break;
        case "Rectangle":
            specialHtmlElements[3].style.display = "block";
            break;
        case "Line":
            specialHtmlElements[0].style.display = "block";
            break;
        case "Point":
            break;
        case "Segment":
            specialHtmlElements[0].style.display = "block";
            break;
    }
}

function addItem(){
    var currentShape = document.getElementById("shape").value;
    var selectedColor = document.getElementById("color").value;

    if(checkForEmptyFields(document.getElementById("positionX").value,
            document.getElementById("positionY").value) === true) {
        var x1 = parseInt(document.getElementById("positionX").value);
        var y1 = parseInt(document.getElementById("positionY").value);

        switch (currentShape) {
            case "Triangle":
                if(checkForEmptyFields(document.getElementById("x2").value,
                        document.getElementById("y2").value, document.getElementById("x3").value,
                        document.getElementById("y3").value) === true) {
                    var x2 = parseInt(document.getElementById("x2").value);
                    var y2 = parseInt(document.getElementById("y2").value);

                    var x3 = parseInt(document.getElementById("x3").value);
                    var y3 = parseInt(document.getElementById("y3").value);

                    GeometryAPI.addItem(currentShape, [x1, y1, x2, y2, x3, y3, selectedColor]);
                } else{
                    alert("All input fields must be filled.");
                }
                break;
            case "Circle":
                if(checkForEmptyFields(document.getElementById("radius").value) === true) {
                    var radius = parseInt(document.getElementById("radius").value);

                    GeometryAPI.addItem(currentShape, [x1, y1, radius, selectedColor]);
                } else{
                    alert("All input fields must be filled.");
                }
                break;
            case "Rectangle":
                if(checkForEmptyFields(document.getElementById("width").value,
                        document.getElementById("height").value) === true) {
                    var width = parseInt(document.getElementById("width").value);
                    var height = parseInt(document.getElementById("height").value);

                    GeometryAPI.addItem(currentShape, [x1, y1, width, height, selectedColor]);
                } else{
                    alert("All input fields must be filled.");
                }
                break;
            case "Line":
                if(checkForEmptyFields(document.getElementById("x2").value,
                        document.getElementById("y2").value) === true) {
                    var x2 = parseInt(document.getElementById("x2").value);
                    var y2 = parseInt(document.getElementById("y2").value);

                    GeometryAPI.addItem(currentShape, [x1, y1, x2, y2, selectedColor]);
                } else{
                    alert("All input fields must be filled.");
                }
                break;
            case "Point":
                GeometryAPI.addItem(currentShape, [x1, y1, selectedColor]);
                break;
            case "Segment":
                if(checkForEmptyFields(document.getElementById("x2").value,
                        document.getElementById("y2").value) === true) {
                    var x2 = parseInt(document.getElementById("x2").value);
                    var y2 = parseInt(document.getElementById("y2").value);

                    GeometryAPI.addItem(currentShape, [x1, y1, x2, y2, selectedColor]);
                } else{
                    alert("All input fields must be filled.");
                }
                break;
        }
    } else {
        alert("All input fields must be filled.");
    }

    onChange();
}

function checkForEmptyFields(){
    var result = true;
    var i = 0;

    for(i; i < arguments.length; i += 1){
        if(arguments[i].trim().length === 0){
            result = false;
            break;
        }
    }

    return result;
}


window.onload = function () {
    specialHtmlElements.push(document.getElementById("x2y2"));
    specialHtmlElements.push(document.getElementById("x3y3"));
    specialHtmlElements.push(document.getElementById("circleInput"));
    specialHtmlElements.push(document.getElementById("rectangleInput"));

    onChange();
};

document.getElementById("shape").onchange = onChange;
document.getElementById("addItem").onclick = addItem;
document.getElementById("removeLastItem").onclick = GeometryAPI.removeItem;
document.getElementById("moveUp").onclick = GeometryAPI.moveItemUp;
document.getElementById("moveDown").onclick = GeometryAPI.moveItemDown;


setInterval(GeometryAPI.drawTheShapes, 60);
setInterval(GeometryAPI.displayShapesInfo, 60);