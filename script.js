const URL = "https://teachablemachine.withgoogle.com/models/liz-08qWt/";
let model;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  console.log("Model Loaded");
}

document.getElementById("imageUpload").addEventListener("change", async function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const imgElement = document.getElementById("preview");
  imgElement.src = URL.createObjectURL(file);
  imgElement.onload = async () => {
    const prediction = await model.predict(imgElement);
    const best = prediction.sort((a, b) => b.probability - a.probability)[0];
    document.getElementById("label").innerText = best.className;
  };
});

init();
