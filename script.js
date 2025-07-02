const URL = "https://teachablemachine.withgoogle.com/models/liz-08qWt/";
const MODEL_URL = URL + "model.json";
const METADATA_URL = URL + "metadata.json";

let model, webcam, labelContainer;

async function init() {
  model = await tmImage.load(MODEL_URL, METADATA_URL);
  const flip = true;
  webcam = new tmImage.Webcam(320, 240, flip);
  await webcam.setup();
  await webcam.play();
  
  document.getElementById("webcam").appendChild(webcam.canvas);
  document.getElementById("overlay").getContext("2d");
  
  labelContainer = document.getElementById("label");
}

async function classifyLoop() {
  while (true) {
    webcam.update();
    const prediction = await model.predict(webcam.canvas);
    const sorted = prediction.sort((a, b) => b.probability - a.probability);
    labelContainer.innerText = sorted[0].className;
    await tmImage.nextFrame();
  }
}

document.getElementById("start-btn").addEventListener("click", async () => {
  await init();
  classifyLoop();
  document.getElementById("start-btn").style.display = "none";
});
