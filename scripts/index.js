const answerArea = document.querySelector('#answers')
const questionArea = document.querySelector('#questions')

const renderQuiz = () => {
    const quiz = JSON.parse(localStorage.getItem('quiz'))

    let output = ''

    quiz.questions.forEach(question => {
        output += `
            <p draggable="true" class="question" id=${question.id}>${question.answer}</p>
        `
    })

    answerArea.innerHTML = output
}

renderQuiz()

const dragstart_handler = e => {
    e.dataTransfer.setData("text/plain", e.target.id)
    e.dataTransfer.effectAllowed = "move"
}

const dragover_handler = e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
}

const drop_handler = e => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    const el = document.getElementById(id)
    e.target.appendChild(el)
    e.dataTransfer.clearData()
}

questionArea.addEventListener('dragover', dragover_handler)
questionArea.addEventListener('drop', drop_handler)

document.querySelectorAll('.question').forEach(q => {
    q.addEventListener('dragstart', dragstart_handler)
})