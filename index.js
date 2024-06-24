import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

//Communicates with firebase project
const firebaseConfig = {
    databaseURL: "https://lead-tracker-2d365-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads") //Create a reference. Which database you're working with and the name of the reference. ref is a Firebase function used on line 2.


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function (snapshot) {

    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)  //Transform an Object into an array
        render(leads)  //Calls render function to list the leads
    }

}) //Get a snapshot of data using onValue. onValue sits and listesn to changes to the database, added, updated or deleted


deleteBtn.addEventListener("dblclick", function () {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function () {
    push(referenceInDB, inputEl.value) //Pushes the input value to the database. Reference goes before inputValue. push is a Firebase function used on line 2. 
    inputEl.value = ""

})