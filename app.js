const form = document.querySelector(".meme-form");
const urlInput = document.querySelector("#url");
const topText = document.querySelector("#top-text");
const botText = document.querySelector("#bot-text");
const section = document.querySelector(".memes");

const warning = () => {
  const ul = document.querySelector("ul");
  const newLi = document.createElement("li");
  newLi.innerText =
    "Find the picture you want, right click on it and select copy image address, then paste in the input";
  newLi.style.lineHeight = 1.5;
  newLi.style.color = "red";
  newLi.style.backgroundColor = "white";

  urlInput.removeEventListener("click", warning);

  ul.prepend(newLi);

  setTimeout(() => {
    newLi.remove();
  }, 3000);
};

urlInput.addEventListener("click", warning);

const addMemeListeners = (meme) => {
  let removeP;

  meme.addEventListener("mouseenter", (e) => {
    if (e.target === meme && !removeP) {
      const lastP = meme.querySelector("p:nth-of-type(2)");
      removeP = document.createElement("p");
      removeP.className = "remove";
      removeP.innerText = "REMOVE MEME";
      meme.insertBefore(removeP, lastP);
    }

    meme.addEventListener("mouseleave", () => {
      if (removeP) {
        removeP.remove();
        removeP = null;
      }
    });

    meme.addEventListener("click", () => {
      meme.remove();
    });
  });
};

const createMeme = (url, tText, bText) => {
  const newMeme = document.createElement("div");
  newMeme.setAttribute("class", "meme");
  newMeme.style.backgroundImage = `url('${url}')`;
  urlInput.value = "";

  const pTop = document.createElement("p");
  pTop.setAttribute("class", "top-text");
  pTop.innerText = tText;
  topText.value = "";

  const pBot = document.createElement("p");
  pBot.innerText = bText;
  pBot.setAttribute("class", "bottom-text");
  botText.value = "";

  newMeme.append(pTop, pBot);

  addMemeListeners(newMeme);

  return newMeme;
};
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const meme = createMeme(urlInput.value, topText.value, botText.value);

  section.append(meme);
});