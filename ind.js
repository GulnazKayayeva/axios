let url = 'http://localhost:3001/users'
let users = []

function react() {

    axios.get(url)
        .then(res => {
            if (res.status === 200 || res.status === 201) {

                reload(res.data)
            }
        })
        .catch(err => console.log(err))
}

react()

let body = document.querySelector('body')
let it = document.createElement('div')
let it2 = document.createElement('div')
let it3 = document.createElement('div')
let p = document.createElement('div')
let p2 = document.createElement('div')
let h1 = document.createElement('h1')
let form = document.forms.newper
let container = document.createElement('div')
let done_h1 = document.createElement('h2')
let done_h2 = document.createElement('h2')
let done_h3 = document.createElement('h2')
let cont1 = document.createElement('div')
let cont2 = document.createElement('div')
let cont3 = document.createElement('div')

done_h1.innerHTML = 'Люди до 25'
done_h2.innerHTML = 'Люди до 50'
done_h3.innerHTML = 'Остальные'
cont1.classList.add('newww')
cont2.classList.add('newww')
cont3.classList.add('newww')
cont1.append(done_h1)
cont2.append(done_h2)
cont3.append(done_h3)
container.append(cont1, cont2, cont3)
container.classList.add('cont')
it.classList.add('ass')
it2.classList.add('ass')
it3.classList.add('ass')
body.prepend(h1)
h1.innerHTML = 'Users'


form.onsubmit = (event) => {
    event.preventDefault()

    let user = {
        id: Math.random(),
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })

    if (form.firstChild.nextSibling.value.length === 0) {
        form.firstChild.nextSibling.classList.add('invalid')
    } else {
        form.firstChild.nextSibling.classList.remove('invalid')
        form.firstChild.nextSibling.value = ''
        form.firstChild.nextSibling.nextSibling.nextSibling.value = ''
        axios.post(url, user)
        react()
    }

}


let reload = (arr) => {
    it.innerHTML = ''
    it2.innerHTML = ''
    it3.innerHTML = ''
    console.log(arr);
    for (let item of arr) {

        let newTask = `<div class="newTask" data-id = '${item.id}'>
                        <div class="box" >
                        <h4>${item.name}</h4>
                        <img src="./done.svg" class = 'btn'>
                        </div>
                        <div class = 'age'>
                        <div class = 'ag' style="margin: 10px 0px 0px;">${item.age}</div>
                        </div>
                        </div>`

        if (item.age <= 25 && item.age > 0) {
            it.innerHTML += newTask
            cont1.append(it)
        } else if (item.age < 50 && item.age > 25) {
            it2.innerHTML += newTask
            cont2.append(it2)
        } else {
            it3.innerHTML += newTask
            cont3.append(it3)
        }


    }

    let btns = document.querySelectorAll('.btn')

    btns.forEach(del => {
        del.onclick = () => {
            let id = event.target.parentNode.parentNode.getAttribute('data-id')
            console.log(event.target.parentNode.parentNode.getAttribute('data-id'));
            axios.delete(`${url}/${id}`)
                .then(res => {
                    if (res.status === 201 || res.status === 200) {
                        react()
                    }
                })
        }
    })

    let ages = document.querySelectorAll('.ag')


    ages.forEach(edit => {
        edit.onclick = () => {
            let parent = event.target.parentNode
            let id = event.target.parentNode.parentNode.getAttribute('data-id')

            console.log(event.target.parentNode.parentNode.getAttribute('data-id'));

            event.target.parentNode.innerHTML = `<input type="text" name="newAge" class="newAge" placeholder="Your Age">
            <button>ok</button>
            `
            let edit_btn = parent.lastChild.previousSibling
            console.log(parent.lastChild.previousSibling);
            let inp = parent.firstChild
            console.log(parent.firstChild);

            edit_btn.onclick = () => {
                console.log(inp.value);
                axios.patch(`${url}/${id}`, { age: `${inp.value}` })
                    .then(res => {
                        if (res.status === 201 || res.status === 200) {
                            react()
                        }
                    })
            }
        }
    })
}

body.append(container)
console.log(users);