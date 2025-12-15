const form = document.getElementById("form");
const inputs = document.querySelectorAll(".input");
const bookmarks = document.querySelector(".bookmarks");
const spans = document.querySelectorAll(".error");
let bookmarksArray = [];

const handleSubmit = (e) => {
  e.preventDefault();
  if (inputs[0].value != "" && inputs[1].value != "") {
    const data = {
      id: new Date().getTime(),
      name: inputs[0].value,
      link: inputs[1].value,
    };
    bookmarksArray.push(data);
    renderBookmarks();
    hiddenErrorMessage();
  } else {
    showErrorMessage(["Please add a name", "Please add a link"]);
  }
};

const renderBookmarks = () => {
  bookmarks.innerHTML = "";
  bookmarksArray.forEach((data) => {
    const bookmarkElement = document.createElement("div");
    bookmarkElement.classList.add("bookmark");
    bookmarkElement.dataset.id = data.id;
    bookmarkElement.innerHTML = `
        <a href="${data.link}" target="_blank" rel="noreferrer noopener">${data.name}</a>
        <button class="delete" type="button">Remove</button>
    `;
    bookmarks.appendChild(bookmarkElement);
  });

  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", deleteBookmark);
  });
};

const deleteBookmark = (e) => {
  const idToDelete = e.target.parentElement.dataset.id;
  bookmarksArray = bookmarksArray.filter((data) => data.id != idToDelete);
  renderBookmarks();
};

const showErrorMessage = (messages) => {
  hiddenErrorMessage();
  spans.forEach((span, index) => {
    if (inputs[index].value === "") {
      span.textContent = messages[index];
    }
  });
};

const hiddenErrorMessage = () => {
  spans.forEach((span) => {
    if (span.textContent != "") {
      span.textContent = "";
    }
  });
};

form.addEventListener("submit", handleSubmit);
