let base_url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const btn = document.querySelector('.btn');
const inputValue = document.querySelector('#inputValue')
const word = document.querySelector('.word')
const phonetics = document.querySelector('.phonetics')
const meaning = document.querySelector('.meaning')
const par_meaning = document.querySelector('.par_meaning')
const example = document.querySelector('.example')
const par_example = document.querySelector('.par_example')
const synonyms = document.querySelector('.synonyms')
const par_synonyms1 = document.querySelector('.par_synonyms1')
const par_synonyms2 = document.querySelector('.par_synonyms2')
const par_info = document.querySelector('.par_info')
const welcome = document.querySelector('.welcome')
const wType = document.querySelector('.wType')
const volume = document.getElementById('volume')
const no_audio = document.querySelector('.no_audio')
let audio
inputValue.addEventListener('keypress', func)
btn.addEventListener('click', btnFunc);

function func(e) {
    if (e.keyCode == 13) {
        btnFunc()
    }
}

function btnFunc() {

    let words = inputValue.value
    fetch(`${base_url}${words}`)
        .then(a => a.json())
        .then(b => {
            console.log(b);
            if (b.length >= 1) {
                word.innerText = b[0].word
                wType.innerText = b[0].meanings[0].partOfSpeech
                phonetics.innerText = `/${b[0].phonetic}/`
                meaning.innerText = 'Meaning'
                par_meaning.innerText = b[0].meanings[0].definitions[0].definition

                audio = new Audio(b[0].phonetics[0].audio);


                if (b[0].meanings[0].definitions[0].example == undefined) {
                    example.innerText = ''
                    par_example.innerText = ''
                } else {
                    example.innerText = 'Example'
                    par_example.innerText = b[0].meanings[0].definitions[0].example
                }

                if (b[0].meanings[0].synonyms[0] == undefined) {
                    synonyms.innerText = ''
                    par_synonyms1.innerText = ''
                } else {
                    synonyms.innerText = 'Synonym'
                    const random = Math.floor(Math.random() * b[0].meanings[0].synonyms.length)
                    par_synonyms1.innerText = b[0].meanings[0].synonyms[random]
                }
                if (b[0].phonetics[0].audio === '') {
                    console.log('hello');
                    no_audio.innerText = 'No audio!'
                    volume.classList.add('hidden')
                } else {
                    no_audio.innerText = ''
                    volume.classList.remove('hidden')
                }
                welcome.innerText = ''
                par_info.innerText = ''
            } else {
                welcome.innerText = 'No Word Found :('
                par_info.innerText = 'Check Typo'
                word.innerText = ''
                phonetics.innerText = ''
                meaning.innerText = ''
                par_meaning.innerText = ''
                example.innerText = ''
                par_example.innerText = ''
                synonyms.innerText = ''
                par_synonyms1.innerText = ''
                wType.innerText = ''
            }

            volume.addEventListener("click", () => {

                volume.style.color = "#4D59FB";
                audio.play();

                setTimeout(() => {
                    volume.style.color = "green";
                }, 800);
            }

            );
        })

}
