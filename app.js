const formSearch = document.querySelector('.form-search')
const todosContainer = document.querySelector('.todos-container')
const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')

const addTodo = (value, index) => {

   value = value.slice(0,25)

    if (value.length) {
        todosContainer.innerHTML += `
            <li data-todo-id=${index} class="list-group-item d-flex justify-content-between align-items-center">
                <span>${value}</span>
                <i class="far fa-trash-alt delete" data-delete-id=${index}></i>
            </li>`
    }
}

formAddTodo.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.add.value.trim()

    const index = todosContainer.children.length

    addTodo(inputValue, index)

    event.target.reset()
})

const removeTodo = clickedElement => {

    const todoItemDataset = `[data-todo-id="${clickedElement.dataset.deleteId}"]`

    if (clickedElement.dataset.deleteId) {
        todosContainer.querySelector(todoItemDataset).remove()
    }

}

todosContainer.addEventListener('click', event => {
    const clickedElement = event.target
    removeTodo(clickedElement)
})

inputSearchTodo.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()

    const todos = Array.from(todosContainer.children)

    const manipulateClass = (element, classToAdd, classToRemove) => {
        element.classList.add(classToAdd)
        element.classList.remove(classToRemove)
    }

    const isMatchedTodo = todo => todo.textContent.toLowerCase().includes(inputValue)

    const showTodo = todo => manipulateClass(todo, 'd-flex', 'hidden')

    const hideTodo = todo => manipulateClass(todo, 'hidden', 'd-flex')

    todos.forEach(todo => {
        if ( ! isMatchedTodo(todo) ) {
            hideTodo(todo)
            return 
        }
        showTodo(todo)
    })

})