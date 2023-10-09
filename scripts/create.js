const questionInput = document.querySelector('#question')
const answerInput = document.querySelector('#answer')
const form = document.querySelector('form')
const error = document.querySelector('#error-message')
const success = document.querySelector('#success-message')

form.addEventListener('submit', e => {
    e.preventDefault()

    if (!localStorage.getItem('quiz')) {
        const quiz = {
            questions: []
        }

        localStorage.setItem('quiz', JSON.stringify(quiz))
    }

    const quiz = JSON.parse(localStorage.getItem('quiz'))

    const hasLength = quiz.questions.length > 0 ? true : false

    if (questionInput.value === '' || answerInput.value === '') {
        error.style.display = 'block'

        setTimeout(() => {
            error.style.display = 'none'
        }, 4000)
        return
    } else {
        quiz.questions.push({
            id: hasLength ? quiz.questions[quiz.questions.length - 1].id + 1 : 1,
            text: questionInput.value,
            answer: answerInput.value
        })

        success.style.display = 'block'

        setTimeout(() => {
            success.style.display = 'none'
        }, 4000)
    }

    console.log(quiz)

    localStorage.setItem('quiz', JSON.stringify(quiz))
})