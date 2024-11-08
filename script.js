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
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            blocksContainer.removeChild(block);
            toggleSortButton();
        };
        
        // Создаем SVG элемент
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("class", "bi bi-trash");
        svg.setAttribute("viewBox", "0 0 16 16");
        
        // Создаем первый путь
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z");
        
        // Создаем второй путь
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("fill-rule", "evenodd");
        path2.setAttribute("d", "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z");
        
        // Добавляем пути в SVG
        svg.appendChild(path1);
        svg.appendChild(path2);
        
        // Добавляем SVG в кнопку
        deleteButton.appendChild(svg);
        
        // Теперь deleteButton можно добавить в контейнер или на страницу
        

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
