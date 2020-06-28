const minInput = document.querySelector('#min');
      const maxInput = document.querySelector('#max');
      const resultDiv = document.querySelector('.result');
      const audioControl = document.querySelector('audio');
      const button = document.querySelector('button');
      let infinityTimer;
      let timeoutTimer;
      minInput.value = 1;
      maxInput.value = 100;
      function getValue() {
        let min = Number(minInput.value) || 1;
        let max = Number(maxInput.value) || 100;
        if (min > max) {
          min = 1;
          max = 100;
        }
        minInput.value = min;
        maxInput.value = max;
        return { min, max };
      }

      function disabledElements() {
        button.setAttribute('disabled', true);
      }

      function enableElements() {
        button.removeAttribute('disabled');
      }

      function showResult() {
        const { min, max } = getValue();
        const result = Math.round(Math.random() * (max + 1 - min) + min);
        resultDiv.innerHTML = result + '';
      }

      function showLoading() {
        clearInterval(infinityTimer);
        audioControl.currentTime = Math.round(Math.random() * 20);
        audioControl.play();

        infinityTimer = setInterval(() => {
          showResult();
        }, 30);

        setTimeout(() => {
          clearInterval(infinityTimer);
          audioControl.pause();
          audioControl.currentTime = 0;
          enableElements();
        }, 3000);
      }

      function handleClick() {
        disabledElements();
        showLoading();
      }