document.getElementById('menuButton').addEventListener('click', function () {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
});


const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const sortButtonContainer = document.getElementById('sortButtonContainer');
const sortButton = document.getElementById('sortButton');
const blocksContainer = document.getElementById('blocksContainer');

textInput.addEventListener('input', function () {
    if (textInput.value.trim()) {
        addButton.classList.remove('disabled');
        addButton.disabled = false;
    } else {
        addButton.classList.add('disabled');
        addButton.disabled = true;
    }
});

addButton.onclick = function () {
    const text = textInput.value.trim();

    if (text) {
        const block = document.createElement('div');
        block.className = 'block';

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        const spanesDiv = document.createElement('div');
        spanesDiv.className = 'spanes';

        const plusButton = document.createElement('button');
        plusButton.innerText = '+';
        plusButton.className = 'plus-button';
        plusButton.onclick = function () {
            scoreNode.innerText = parseInt(scoreNode.innerText) + 1;
        };

        const minusButton = document.createElement('button');
        minusButton.innerText = '-';
        minusButton.className = 'minus-button';
        minusButton.onclick = function () {
            scoreNode.innerText = Math.max(0, parseInt(scoreNode.innerText) - 1);
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerText = '';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            blocksContainer.removeChild(block);
            toggleSortButton();
        };

        buttonsDiv.appendChild(plusButton);
        buttonsDiv.appendChild(minusButton);
        buttonsDiv.appendChild(deleteButton);

        const textNode = document.createElement('span');
        textNode.className = 'name';
        textNode.innerText = text;

        // Создаем элемент для отображения счета
        const scoreNode = document.createElement('span');
        scoreNode.className = 'score';
        scoreNode.innerText = '0';

        // Создаем div для отображения текста "Баллов: "
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'score-div';
        scoreDiv.innerText = 'Баллов:  '; // Убираем scoreNode из innerText

        // Добавляем scoreNode в scoreDiv
        scoreDiv.appendChild(scoreNode);
        block.appendChild(spanesDiv); // spanesDiv должен быть создан ранее
        block.appendChild(buttonsDiv); // buttonsDiv должен быть создан ранее
        spanesDiv.appendChild(textNode); // textNode должен быть создан ранее
        spanesDiv.appendChild(scoreDiv);

        // Добавляем блок в контейнер
        blocksContainer.appendChild(block);

        textInput.value = '';
        addButton.classList.add('disabled');
        addButton.disabled = true;

        toggleSortButton();
    }
};
function toggleSortButton() {
    if (blocksContainer.children.length > 0) {
        sortButtonContainer.style.display = 'block'; // Показываем контейнер кнопки сортировки
        setTimeout(() => {
            sortButton.classList.add('show'); // Плавно показываем кнопку сортировки
            textInput.classList.add('move-up'); // Поле ввода отъезжает
        }, 10); // Небольшая задержка для плавного эффекта
    } else {
        sortButton.classList.remove('show'); // Убираем класс показа кнопки сортировки
        setTimeout(() => {
            sortButtonContainer.style.display = 'none'; // Скрываем контейнер кнопки сортировки
            textInput.classList.remove('move-up'); // Возвращаем поле ввода на место
        }, 500); // Задержка на время анимации
    }
}
sortButton.onclick = function () {
    const blocks = Array.from(blocksContainer.children);

    blocks.sort((a, b) => {
        const scoreA = parseInt(a.querySelector('.score').innerText);
        const scoreB = parseInt(b.querySelector('.score').innerText);
        return scoreB - scoreA; // Сортировка по убыванию
    });
    blocks.forEach(block => blocksContainer.appendChild(block));
};