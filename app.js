// select element from the dom

const text = document.getElementById("text");
const submitBtn = document.getElementById("submit");
const voiceSelect = document.getElementById("select");

//  declare empty variables

let voices = [];
let currentVoice;

// check for browser support

if ("speechSynthesis" in window) {
  console.log("Web speech API supported");
} else {
  console.log("Web speech API is not supported");
}

submitBtn.addEventListener("click", () => {
  let output = text.value;
  const utterThis = new SpeechSynthesisUtterance(output);
  utterThis.voice = currentVoice;
  speechSynthesis.speak(utterThis);
});

// declare a function that retrieves all the voices available in the API

const populateVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    let optionText = `${voice.name} (${voice.lang})`;
    if (voice.default) {
      optionText += " [default]";
    }
    option.textContent = optionText;
    option.value = voice.name;
    voiceSelect.appendChild(option);
  });
};
populateVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

voiceSelect.addEventListener("change", (event) => {
  const selectedVoice = event.target.value;
  currentVoice = voices.find((element) => {
    if (element.name === selectedVoice) {
      return element;
    }
  });
});
