document.addEventListener("DOMContentLoaded", function() {
  const buttonsContainer = document.querySelector(".buttons");
  const resultInput = document.getElementById("result");
  const historyContent = document.createElement("div");
  const historyTitle = document.createElement("div");
  const historyContainer = document.createElement("div");
  const clearHistoryButton = document.createElement("button");

  historyContent.classList.add("history-content");
  historyTitle.classList.add("history-title");
  historyTitle.textContent = "History";
  historyContainer.classList.add("history-container");
  clearHistoryButton.textContent = "Clear History";
  clearHistoryButton.classList.add("clear-history-button");
  historyContainer.appendChild(historyTitle);
  historyContainer.appendChild(historyContent);
  historyContainer.appendChild(clearHistoryButton);

  document.body.appendChild(historyContainer);


  const history = getCookie("calculatorHistory");
  if (history) {
    historyContent.innerHTML = history;
  }

  const buttons = [
    "C", "DEL", "7", "8",
    "9", "+", "4", "5",
    "6", "-", "1", "2",
    "3", "*", "0", ".",
    "=", "/"
  ];

  buttons.forEach(function(button) {
    const btnElement = document.createElement("div");
    btnElement.textContent = button;
    btnElement.classList.add("button");
    buttonsContainer.appendChild(btnElement);

    if (button === "C" || button === "DEL") {
      btnElement.classList.add("wide-button");
    }

    btnElement.addEventListener("click", function() {
      if (button === "=") {
        try {
          const input = resultInput.value;
          let result;

          if (input.includes("/0")) {
            throw new Error("Division by zero");
          } else {
            result = eval(input);
          }

          if (!isNaN(result)) {
            resultInput.value = result;
            const historyItem = document.createElement("div");
            historyItem.textContent = input + " = " + result;
            historyContent.appendChild(historyItem);

            setCookie("calculatorHistory", historyContent.innerHTML);
          } else {
            resultInput.value = "Error";
          }
        } catch (error) {
          if (error instanceof SyntaxError) {
            resultInput.value = "Syntax Error";
          } else if (error instanceof EvalError) {
            resultInput.value = "Eval Error";
          } else if (error.message === "Division by zero") {
            resultInput.value = "Error: Division by zero";
          } else {
            resultInput.value = "Error";
          }
        }
      } else if (button === "C") {
        resultInput.value = "";
      } else if (button === "DEL") {
        resultInput.value = resultInput.value.slice(0, -1);
      } else {
        resultInput.value += button;
      }
    });
  });

  function setCookie(name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=Sun, 13 Apr 2070 22:22:23 GMT`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }

  clearHistoryButton.addEventListener("click", function() {
    historyContent.innerHTML = "";
    setCookie("calculatorHistory", "");
  });
});
