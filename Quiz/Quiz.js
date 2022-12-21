(function Quiz() {
    fetch('http://127.0.0.1:5500//JSON/Quiz.json')
        .then(res => res.json())
        .then(questions => {

            let quesInd = 0;
            let selected_ans;
            let question = document.querySelector('.question');
            let options = document.querySelector('.options');
            let submit_btn = document.querySelector('.submit');
            let correctansCount = 0;
            let wrongansCount = 0;
            let Total = 0;

            let resulsDiv = document.querySelector('.results');
            let gameScreen = document.querySelector('.game')


            function playagain() {
                quesInd = 0;
                Total = 0;
                correctansCount = 0;
                wrongansCount = 0;
                showQuestions(quesInd);
            }

            function toggleGameScreen() {
                gameScreen.style.display = gameScreen.style.display == "none" ? "flex" : "none"
                resulsDiv.style.display = resulsDiv.style.display == "flex" ? "none" : "flex"
            }


            function showQuestions(quesno) {
                selected_ans = null;
                question.textContent = `${quesno + 1} ) ` + questions[quesno].question;

                options.innerHTML = questions[quesno].answers.map((item, index) =>
                    `<div class="option">
                        <input name="quizoption" type="radio" id=${index} value=${item.iscorrect} />
                        <label for=${index}>${item.answer}</label>
                    </div>`
                ).join("")

                selectOptions()

            }

            function selectOptions() {
                options.querySelectorAll('input').forEach(inpt => {
                    inpt.addEventListener('click', (el) => {
                        selected_ans = el.target.value;
                    })
                })
            }

            submit_btn.addEventListener('click', () => {

                if (selected_ans == null) return window.alert("plz select atleast one option")

                quesInd++;

                if (selected_ans == "true") correctansCount++, Total += 10;
                else wrongansCount++

                if (quesInd === questions.length) return showResults();

                showQuestions(quesInd);

            })

            let scoreCount = document.querySelector('.scoreCount');
            let incorrectCount = document.querySelector('.incorrectCount')
            let correctCount = document.querySelector('.correctCount');

            const showResults = () => {
                scoreCount.textContent = Total;
                incorrectCount.textContent = wrongansCount;
                correctCount.textContent = correctansCount;
                toggleGameScreen();
            }

            let playagain_btn = document.querySelector('.playagain');
            playagain_btn.addEventListener('click', () => {
                playagain();
                toggleGameScreen();
            })

            showQuestions(quesInd);

        })
})()
