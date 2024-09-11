//// Wordle
const 정답 = 'HAPPY';

let attempts = 0;
let index = 0;
let timer

function appStart() {
  const nextLine = () => {
    if (attempts === 6) return;
    attempts++;
    index = 0;
  }

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임종료!";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; background-color:yellow; width:200px; height:100px;";
    document.body.appendChild(div);
  }

  const gameover = () => {
    window.removeEventListener('keydown', handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterkey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const 입력한_글자 = block.innerHTML;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.background = '#6AA964';
        block.style.border = '2px solid #6AA964';
      }

      else if (정답.includes(입력한_글자)) {
        block.style.background = '#C9B458';
        block.style.border = '2px solid #C9B458';
      }
      else {
        block.style.background = '#787C7E';
        block.style.border = '2px solid #787C7E';
      }
      block.style.color = 'white';
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const hanedleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  }

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === 'Backspace') hanedleBackspace();
    else if (index === 5) {
      if (event.key === 'Enter') handleEnterkey();
      else return;
    }
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerHTML = key;
      index++;
    };
  }

  window.addEventListener('keydown', handleKeydown);
}

appStart();



//// Clock
const clock = () => {
  const date = new Date();

  function setTime() {
    const 시간 = new Date(new Date() - date)
    const 분 = 시간.getMinutes().toString().padStart(2, '0');
    const 초 = 시간.getSeconds().toString().padStart(2, '0');

    const timeDiv = document.querySelector('.time');
    timeDiv.innerHTML = `${분}:${초}`;
  }
  timer = setInterval(setTime, 1000);
};

clock();