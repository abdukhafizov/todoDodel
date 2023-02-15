let cont = document.querySelector('.container')
let modalBg = document.querySelector('.modal-bg')
let modal = document.querySelector('.modal')
let saveChanges = modal.querySelector('#saveChange')
let inputChange = modal.querySelector('input')
let form = document.forms.reminders
let todos = [
    {
        id: Math.random(),
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        isDone: false,
        task: "todo home task"
    },
]

form.onsubmit = (event) => {
    event.preventDefault();

    let task = {
        id: Math.random(),
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        isDone: false,
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value
    })


    todos.push(task);
    reload(todos, cont)
}


function reload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let itemDiv = document.createElement('div')
        let col = document.createElement('div')
        let del = document.createElement('button')
        let title = document.createElement('span')
        let time = document.createElement('span')
        let edit = document.createElement('button')

        itemDiv.classList.add('item')
        col.classList.add('col')
        del.classList.add('delete')
        title.classList.add('title')
        time.classList.add('time')
        edit.classList.add('edit')

        title.innerHTML = item.task
        time.innerHTML = item.time

        itemDiv.append(col, del, edit)
        col.append(title, time)
        place.append(itemDiv)


        
       

        del.onclick = () => {
            let realy = confirm('вы правда хотите удалить задачу ' + item.task + "?")

            if (realy) {
                itemDiv.classList.add('fade')
                setTimeout(() => {
                    todos = todos.filter(el => el.id !== item.id)
                    reload(todos, cont)
                }, 700);
            }
        }
        edit.onclick = () => {
            openEditeModal(item)
        }

        title.onclick = () => {
            item.isDone = !item.isDone
            if (item.isDone) {
                itemDiv.classList.add('done')
            } else {
                itemDiv.classList.remove('done')
            }
        }
    }

}

reload(todos, cont)

function openEditeModal(item) {
    callAnimation('open')
    inputChange.value = item.task

    saveChanges.onclick = () => {
        item.task = inputChange.value
        reload(todos, cont)
        callAnimation('close')
    } 
}

function callAnimation(cmd) {
    if (cmd == 'open') {
        modalBg.style.display = "block"
        modal.style.display = "flex"

        setTimeout(() => {
            modal.style.opacity = "1"
            modalBg.style.opacity = "1"
        }, 200);
    } else {
        modal.style.opacity = "0"
        modalBg.style.opacity = "0"

        setTimeout(() => {
            modalBg.style.display = "none"
            modal.style.display = "none"
        }, 200);
    }

    let closeBtn = document.querySelector(".close")
    
    closeBtn.onclick = () => {
         modal.style.opacity = '0'
            modalBg.style.opacity = "0"
    
        setTimeout(() => {
            modal.style.display = 'none'
            modalBg.style.display = "none"
        }, 200)
    }

}