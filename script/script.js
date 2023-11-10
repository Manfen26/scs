const form = document.querySelector("form"),
  input = document.querySelector(".input"),
  progressArea = document.querySelector(".main__progress-area"),
  uploadedArea = document.querySelector(".main__uploaded-area"),
  result = document.querySelector(".main__result-data"),
  url = "https://b533-37-214-25-244.ngrok.io"; // server host

form.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", ({ target }) => {
  let file = target.files[0];
  if (file) {
    let fileName = file.name;
    if (fileName.length >= 12) {
      let splitName = fileName.split(".");
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
});

const progressHTML = (name, percent) => {
  progressArea.innerHTML = "";
  let progress = `
    <li class="progress__row row">
        <img class="file" src="./img/file.svg" alt="File">
        <div class="progress__content content">
            <div class="progress__details">
                <span class="details__name">${name} &#8226; Uploading</span>
                <span class="details__percent">${percent}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${percent}%"></div>
            </div>
        </div>
    </li>
    `;
  progressArea.innerHTML = progress;
};

const uploadedHTML = (name) => {
  progressArea.innerHTML = "";
  let uploaded = `
    <li class="uploaded__row row">
        <div class="uploaded__content content">
            <img class="file" src="./img/file.svg" alt="File">
            <div class="uploaded__details">
                <span class="details__name">${name} &#8226; Uploaded</span>
            </div>
        </div>
        <img class="arrow" src="./img/arrow.svg" alt="Arrow">
    </li>
    `;
  uploadedArea.innerHTML = uploaded;
};

const resetText = () => {
  result.innerHTML = "";
  uploadedArea.innerHTML = "";
  progressArea.innerHTML = "";
};

function uploadFile(name) {
  resetText();
  progressHTML(name, 20);
  const data = new FormData(form);
  const options = {
    method: "POST",
    body: data,
  };
  progressHTML(name, 100);
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      let result_data = "";
      if (data.error === undefined) {
        result_data = data.result;
      } else {
        result_data = data.error;
      }
      result.innerHTML = result_data;
    })
    .catch((error) => {
      const result_data = "The server is disabled";
      result.innerHTML = result_data;
    });
  uploadedHTML(name);
}
