const answers = Array.from(document.getElementsByClassName('answer'));
let current = 0;
let points = 0;
// get questions and answers
let jsonData;
fetch('js/questions.json')
.then(response => response.json())
.then(Data => {
    jsonData = Data;
    changeQuestion();
});

const changeQuestion = () => {
    if (current != 0) {
        document.getElementById('question').textContent = jsonData[current].question;
        answers.forEach(element => changeAnswer(element));
    }
    else {
        document.getElementById('question').textContent = jsonData[current].question;
        answers.forEach(element => changeAnswer(element));
    }
}

const changeAnswer = element => {
    const answer = answers.indexOf(element);
    element.textContent = jsonData[current].answers[answer];
};

const isRightAnswer = element => {
    const rightAnswerIndex = jsonData[current].right - 1;
    if (element.textContent == jsonData[current].answers[rightAnswerIndex]) {
        element.style.backgroundColor = 'green';
        current++;
        points++;
    }
    else {
        element.style.backgroundColor = 'red';
        const rightAnswer = answers.filter(value => value.textContent == jsonData[current].answers[rightAnswerIndex]);
        rightAnswer[0].style.backgroundColor = 'green';
        current++;
    }
    if (current < 5) {
        setTimeout(() => {
            fadeOutQuiz();
            setTimeout(() => {
                changeQuestion();
                answers.forEach(element => element.style.backgroundColor = 'white')
                fadeIn();
            }, 200);
        }, 2000);
    }
    else {
        setTimeout(() => {
            fadeOutQuiz();
            setTimeout(() => {
                document.getElementById('quizList').style.display = 'none';
            }, 900);
        }, 2000);
    }
};

const fadeOutStart = () => {
    document.getElementById('startPage').style.animation = 'fadeOut 0.9s';
    setTimeout(() => {
        document.getElementById('startPage').style.display = 'none';
    }, 900);
};

const fadeIn = () => {
    document.getElementById('quizList').style.animation = 'fadeIn 0.9s';
    setTimeout(() => {
        document.getElementById('quizList').style.display = 'block';
    }, 900);
};

const fadeOutQuiz = () => {
    document.getElementById('quizList').style.animation = 'fadeOut 0.9s';
};

document.getElementById('startButton').addEventListener('click', () => {
    fadeOutStart();
    fadeIn();
});

answers.forEach(function(element){
    element.addEventListener('click', function() {
        isRightAnswer(this);
        if (current == 5) {
            document.getElementById('points').textContent = `${points}/5`;
            setTimeout(() => {
                if (points < 3) {
                    document.getElementById('Congrats').children[1].textContent = 'Try Again Next Time!';
                    document.getElementById('Congrats').children[0].style.display = 'none';
                }
                document.getElementById('Congrats').style.animation = 'fadeIn 0.9s';
                setTimeout(() => {
                    document.getElementById('Congrats').style.display = 'block';
                }, 900);
            }, 2200);
        }
    });
});