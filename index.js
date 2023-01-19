import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-img-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const modalCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadios.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener("click", renderCat)
modalCloseBtn.addEventListener("click", closeModal)

function highlightCheckedOption(event){
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios){
        radio.classList.remove("highlight")
    }
    
    document.getElementById(event.target.id).parentElement.classList.add("highlight")
    
}
function closeModal() {
    memeModal.style.display = "none"
}
function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `<img 
                                class="cat-img" 
                                src="./images/${catObject.image}"
                                alt="${catObject.alt}">`

    memeModal.style.display = "flex"
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1 ){
        return catsArray[0]
    } else {
        const randomCatIndex = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomCatIndex]
    }
}

function getMatchingCatsArray(){
    
    if (document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            if (isGif){
                
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif

            } else{

                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }

}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionRadios(cats){
    const emotions = getEmotionsArray(cats)
    let radioItems = ""
    for (let emotion of emotions){
        radioItems +=   `<div class="radio">
                            <input
                                type="radio"
                                id = "${emotion}"
                                value = "${emotion}"
                                name = "emotions"
                                >
                                <label for="${emotion}">${emotion}</label>
                        </div>`
    }
    emotionRadios.innerHTML += radioItems
}

renderEmotionRadios(catsData)


// function getEmotionsArray(cats){
//     const emotionsArray = []
//     for (let i = 0; i < cats.length; i++){
//         for (let j = 0; j < cats[i].emotionTags.length; j++){
//             emotionsArray.push(cats[i].emotionTags[j])
//         }
//     }
//     console.log(emotionsArray)
// }










