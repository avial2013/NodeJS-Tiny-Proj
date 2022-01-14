//Limit word check func
const strLimit = (str, limit) => {
    let L = str.split(" ")
    for (const word of L) {
        if (word.length > limit) return true
    }
    return false
}

const randId = () => {
    return parseInt(Math.random() * 9999)
}

// Client GET method:
let get = () => {

    // XMLHttpRequest - allow us to get data from URL, with method
    let req = new XMLHttpRequest(); // Request

    // open(method: string, url: string | URL): void
    req.open('GET', 'http://localhost:3000/lessons');

    //State of the XMLHTTPRequest
    req.onreadystatechange = () => {
        /*
            Holds the status of the XMLHttpRequest. Changes from 0 to 4:
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready   
        */
        if (req.readyState === 4) { // 4: request finished and response is ready 
            let lessonsList = JSON.parse(req.response) // Convert String to JSON 
            // Creating entry
            let entry = ''
            // entry += ``

            for (const lesson of lessonsList) {
                entry += `
                
                <div class="row mx-auto m-3">
                <div id="id" class="col-1">${lesson.id}</div>
                <div class="col-2">
                    <div class="row">
                        <div id="Rnbtn" class="col-2 "><img onclick="putRN('${lesson.id}')" src="https://img.icons8.com/material/24/000000/edit--v1.png"/></div>
                        <div id="RN" class="col-4">${lesson.rebiName}</div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="row">
                        <div id="Tbtn" class="col-2"><img onclick="putT('${lesson.id}')" src="https://img.icons8.com/material/24/000000/edit--v1.png"/></div>
                        <div id="T" class="col-4">${lesson.topic}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div id="Adbtn" class="col-2"><img onclick="putAd('${lesson.id}')" src="https://img.icons8.com/material/24/000000/edit--v1.png"/></div>
                        <div id="Ad" class="col-4">${lesson.address}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div id="DTbtn" class="col-2"><img onclick="putDT('${lesson.id}')" src="https://img.icons8.com/material/24/000000/edit--v1.png"/></div>
                        <div id="DT" class="col-4">${lesson.dateTime}</div>
                    </div>
                </div>
                <div class="col-1"><button onclick="deleteLesson('${Number(lesson.id)}')" type="button" class="btn btn-outline-danger">Delete</button></div>
                </div>
            `
            }
            //Sets data in HTML tag
            document.getElementById('lessonsTable').innerHTML = entry;
        }
    }
    req.send()
}



// Client POST method:
function post() {
    let QrebiName = document.getElementById("QrebiName").value
    let Qtopic = document.getElementById("Qtopic").value
    let Qaddress = document.getElementById("Qaddress").value
    let QdateTime = document.getElementById("QdateTime").value

    if (QrebiName === "" || Qtopic === "" || Qaddress === "" || QdateTime === "") {
        alert("You must fill in all fields...")
        return;
    }

    if (strLimit(QrebiName, 10)) {
        alert("A word in Rebi's name can contain 10 Chr Max")
        return;
    }
    if (strLimit(Qtopic, 15)) {
        alert("A word in Topic can contain 15 Chr Max")
        return;
    }
    if (strLimit(Qaddress, 20)) {
        alert("An word in Address can contain 20 Chr Max")
        return;
    }
    if (strLimit(QdateTime, 20)) {
        alert("A word in Date & Time can contain 20 Chr Max")
        return;
    }

    let req = new XMLHttpRequest(); // Request
    req.open('POST', 'http://localhost:3000/lessons/addLesson')

    req.onreadystatechange = () => {
        if (req.readyState === 4) get()
    }

    // Header for Request
    req.setRequestHeader('Content-type', 'application/json');

    // Define body
    req.send(JSON.stringify({
        "id": randId(),
        "rebiName": QrebiName,
        "topic": Qtopic,
        "address": Qaddress,
        "dateTime": QdateTime
    }))

    document.getElementById("QrebiName").value = ''
    document.getElementById("Qtopic").value = ''
    document.getElementById("Qaddress").value = ''
    document.getElementById("QdateTime").value = ''
}



// Client PUT methods:
let putRN = (param) => {
    let req = new XMLHttpRequest();
    let input = prompt("Enter the new Rebi's name")

    req.open("PUT", `http://localhost:3000/lessons/updateLesson/RN/${param}`)

    req.onreadystatechange = () => {
        if (req.readyState === 4) get()
    }
    req.setRequestHeader("Content-Type", "application/json")

    req.send(
        JSON.stringify({
            "newRebiName": input
        })
    )

}

let putT = (param) => {
    let req = new XMLHttpRequest();
    let input = prompt("Enter the new Topic of the lesson")

    req.open("PUT", `http://localhost:3000/lessons/updateLesson/T/${param}`)

    req.onreadystatechange = () => {
        if (req.readyState === 4) get()
    };

    req.setRequestHeader("Content-Type", "application/json")

    req.send(
        JSON.stringify({
            "newTopic": input,
        })
    )
}

let putAd = (param) => {
    let req = new XMLHttpRequest();
    let input = prompt("Enter the new Address you want to change too...")

    req.open("PUT", `http://localhost:3000/lessons/updateLesson/Ad/${param}`)

    req.onreadystatechange = () => {
        if (req.readyState === 4) get()
    };

    req.setRequestHeader("Content-Type", "application/json")

    req.send(
        JSON.stringify({
            "newAddress": input,
        })
    )
}

let putDT = (param) => {
    let req = new XMLHttpRequest();
    let input = prompt("Enter new Date & Starting time")

    req.open("PUT", `http://localhost:3000/lessons/updateLesson/DT/${param}`)

    req.onreadystatechange = () => {
        if (req.readyState === 4) get()
    };

    req.setRequestHeader("Content-Type", "application/json")
    req.send(
        JSON.stringify({
            "newDateTime": input,
        })
    )
}



// Client DELETE methods:
let deleteLesson = (id) => {
    let req = new XMLHttpRequest();
    req.open('DELETE', `http://localhost:3000/lessons/deleteLesson/${id}`)

    req.onreadystatechange = () => {
        if (req.readyState === 4) get()
    }

    req.send()
}