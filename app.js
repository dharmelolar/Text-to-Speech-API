const text = document.getElementById("text");
const submitBtn = document.getElementById("submit");
const voiceSelect = document.getElementById("select");

if ("speechSynthesis" in window) {
  console.log("Web speech api supported");
} else {
  console.log("Web speech api not supported");
}

submitBtn.addEventListener("click", () => {
//   const synth = window.speechSynthesis;
  let output = text.value;
  const utterThis = new SpeechSynthesisUtterance(output);
  // add this line of code
  utterThis.voice = currentVoice;
  speechSynthesis.speak(utterThis);
  // text.value = "";
});

let voices;
let currentVoice;

const populateVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    let optionText = `${voice.name} (${voice.lang})`;
    if (voice.default) {
      optionText += " [default]";
    }
    option.textContent = optionText;
    voiceSelect.appendChild(option);
  });
};

populateVoices();
speechSynthesis.onvoiceschanged = populateVoices;

voiceSelect.addEventListener("change", (event) => {
  const selectedVoice = event.target.value;
  currentVoice = voices[selectedVoice];
});
