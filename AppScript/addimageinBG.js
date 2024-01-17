function getInput(selector, multiple = false, regex = "*") {
  const mapKeys = ["data-q", "name", "id", "class"];
  let elm = [];
  for (const attr of mapKeys) {
    elm = document.querySelectorAll(
      `input:is([${attr}${regex}="${selector.toLowerCase()}"],[${attr}${regex}="${selector.toLowerCase()}"])`
    );
    // console.log(`[${attr}${regex}="${selector}"]`);
    if (elm.length) {
      break;
    }
  }

  if (elm.length < 1) {
    elm = Array.from(document.querySelectorAll("label"));
    elm = elm
      .filter((label) => label.innerText.trim().includes(selector))
      .map((label) => {
        const elm = Array.from(
          label
            .closest(".form-field-container")
            ?.querySelectorAll("canvas,input")
        );
        return multiple ? elm : elm[0];
      });
  }
  return multiple ? elm.flat() : elm[0];
}

function fetchDataAndSetFields(contactId) {
  const url = `https://script.google.com/macros/s/AKfycbz_4r_gUY4f0dHDm7uX_CMsTLmzvhThcv1RuWPILMYCdrAzw07435195x_P1GhAVYdVmg/exec?contact_id=${contactId}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const identifiers = Object.keys(data);

      identifiers.forEach((item) => {
        try {
          const filteredElements = getInput(item);
          if (!filteredElements) {
            return console.log("get error: ", item);
          }

          const type = filteredElements.type;
          const signatureBtn =
            filteredElements.classList.contains("signature-button");

          if (type) {
            filteredElements.value = data[item] || "";
            filteredElements.dispatchEvent(new Event("input"));

            if (signatureBtn) {
              filteredElements.style.backgroundImage = data[item].url;
              const clearButton = filteredElements.nextElementSibling;
              if (
                clearButton &&
                clearButton.classList.contains("clear-button")
              ) {
                clearButton.style.display = "none";
              }
            }
          } else {
            const imageUrl = data[item].url;

            if (signatureBtn) {
              filteredElements.style.backgroundImage = `url('${imageUrl}')`;
              const clearButton = filteredElements.nextElementSibling;
              if (
                clearButton &&
                clearButton.classList.contains("clear-button")
              ) {
                clearButton.style.display = "none";
              }
            } else {
              const image = new Image();
              image.src = imageUrl;
              image.alt = item;
              image.className = "canvasImage";

              const divTag = document.createElement("div");
              divTag.className = "divTag";
              divTag.appendChild(image);

              filteredElements.parentElement.insertAdjacentElement(
                "afterend",
                divTag
              );
            }
          }
        } catch (err) {
          console.log(err, item);
        }
      });

      console.log("Fields Updated Successfully:", data);
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
}

// Usage example: Call this function when the GHL survey page loads
const contactId = new URLSearchParams(location.search).get("contact_id");
if (contactId) {
  fetchDataAndSetFields(contactId);
}
