const answerArea = document.querySelector('#answers')
const questionArea = document.querySelector('#questions')
const resultsArea = document.querySelector('#results')

const renderQuiz = () => {
    const quiz = JSON.parse(localStorage.getItem('quiz'))

    let output1 = ''
    let output2 = ''

    quiz.questions.forEach(question => {
        output1 += `
            <p draggable="true" class="question" id=${question.id}>${question.answer}</p>
        `

        output2 += `<p class="answer" data-itemid=${question.id}>${question.text}</p>`
    })

    answerArea.innerHTML = output1
    questionArea.innerHTML = output2
}

renderQuiz()

const dragstart_handler = e => {
    e.dataTransfer.setData("text/plain", e.target.id)
    e.dataTransfer.effectAllowed = "move"
}

// const dragend_handler = e => {
//     console.log(e.target.id)
// }

const dragover_handler = e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
}

const drop_handler = e => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    const el = document.getElementById(id)
    if (e.target.getAttribute('data-itemid') === id) {
        e.target.innerHTML = ''
        e.target.append("That's correct!")
        e.target.style.color = 'green'
        e.target.setAttribute('data-iscorrect', true)
    } else {
        e.target.innerHTML = ''
        e.target.append("That is incorrect!")
        e.target.style.color = 'red'
        e.target.setAttribute('data-iscorrect', false)
    }

    let questionsAnswered = 0
    let questionsCorrect = 0
    questionArea.childNodes.forEach(node => {
        if(node.hasAttribute('data-iscorrect') && node.getAttribute('data-iscorrect') === 'true') {
            questionsAnswered += 1
            questionsCorrect += 1
        }

        if (node.hasAttribute('data-iscorrect') && node.getAttribute('data-iscorrect') !== 'true') {
            questionsAnswered += 1
        }
    })

    resultsArea.innerHTML = `
        <p>Questions Answered: ${questionsAnswered}</p>
        <p>Percent Correct: ${((questionsCorrect / questionsAnswered) * 100).toFixed(2)}%</p>
    `

    e.dataTransfer.clearData()
}

// questionArea.addEventListener('dragover', dragover_handler)
// questionArea.addEventListener('drop', drop_handler)

document.querySelectorAll('.answer').forEach(a => {
    a.addEventListener('dragover', dragover_handler)
    a.addEventListener('drop', drop_handler)
})

document.querySelectorAll('.question').forEach(q => {
    q.addEventListener('dragstart', dragstart_handler)
    // q.addEventListener('dragend', dragend_handler)
})