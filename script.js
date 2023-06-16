const addBox = document.querySelector(".add-box"),
    popUpBox = document.querySelector(".popup-box"),
    popupTitle = document.querySelector("header p"),
    closeIcon = popUpBox.querySelector("header i"),
    addBtn = popUpBox.querySelector("form button"),
    titleTag = popUpBox.querySelector("input"),
    descriptionTag = popUpBox.querySelector("textarea");


const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const months = ["January", "Febuary", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
let isUpdate = false , updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popUpBox.classList.add("show");
})

closeIcon.addEventListener("click", () => {
    descriptionTag.value = "";
    titleTag.value = "";
    popUpBox.classList.remove("show");
})
showNotes = () => {
    document.querySelectorAll(".note").forEach((note) =>{
        note.remove()
    });
    notes.forEach((note , id) => {
        let li = `<li class="note">
            <div class="detail">
                <p class="note-title">${note.title}</p>
                <span class="content">${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="setting">
                    <i class="setting-icon uil uil-ellipsis-h" onclick="showMenu(this)"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${id}, '${note.title}', '${note.description}')"> <i class="uil uil-pen"  > </i> Edit </li>
                        <li onclick="deleteNote(${id})"> <i class="uil uil-trash" > </i> Delete </li>
                    </ul>
                </div>
            </div>
        </li>`;
        addBox.insertAdjacentHTML("afterend", li);
    });
}
showNotes();

updateNote=(noteId , noteTitle, noteDescription)=>{
    isUpdate = true;
    addBox.click();
    updateId = noteId;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
    titleTag.value = noteTitle;
    descriptionTag.value = noteDescription;

}

deleteNote=(noteId)=>{
    let DeleteAlert = confirm("Do you really want to delete this note")
    if (!DeleteAlert) {
        return;
    }
    notes.splice(noteId ,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();
}
 
showMenu = (ele) => {
    ele.parentElement.classList.add("show")
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != ele) {
            ele.parentElement.classList.remove("show");
        }
    });
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value.trim();
    let noteDescription = descriptionTag.value.trim();

    if (noteTitle || noteDescription) {

        let currentDate = new Date();
        let month = months[currentDate.getMonth()];
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDescription,
            date: `${month} ${day}, ${year}`
        };
        if(!isUpdate)
        {
            notes.push(noteInfo);
        }
        else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));

        closeIcon.click();
        showNotes();
    }
})