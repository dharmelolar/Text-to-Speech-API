const text = document.getElementById("text");
const submitBtn = document.getElementById("submit");
const voiceSelect = document.getElementById("select");

console.log("Web Speech API example");

let voices = [];
let currentVoice;
let synth;

if ("speechSynthesis" in window) {
  console.log("Web speech api supported");
  synth = window.speechSynthesis;
} else {
  console.log("Web speech api not supported");
}

const populateVoices = () => {
  voices = synth.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    let optionText = `${voice.name} (${voice.lang})`;
    if (voice.default) {
      optionText += " [default]";
    }
    option.label = optionText;
    option.value = voice.name;
    voiceSelect.appendChild(option);
  });
};

populateVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoices;
}

voiceSelect.addEventListener("change", (event) => {
  const selectedVoice = event.target.value;
  currentVoice = voices.find((element) => {
    if (element.name == selectedVoice) {
        return element;
    }
  })
});

submitBtn.addEventListener("click", () => {
    let output = text.value;
    const utterThis = new SpeechSynthesisUtterance(output);
    utterThis.voice = currentVoice;
    synth.speak(utterThis);
  });
