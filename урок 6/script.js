document.addEventListener("DOMContentLoaded", function() {
    const classInput = document.getElementById("classInput");
    const showPrototypeChainBtn = document.getElementById("showPrototypeChain");
    const outputDiv = document.getElementById("output");

    showPrototypeChainBtn.addEventListener("click", function() {
        const className = classInput.value.trim();
        outputDiv.innerHTML = ""; // Очищаем предыдущий вывод

        // Проверяем наличие класса в глобальном объекте window
        if (!(className in window) || typeof window[className] !== "function") {
            classInput.classList.add("error");
            outputDiv.textContent = "Недопустимое имя класса или функции!";
            return;
        }

        classInput.classList.remove("error");
        const prototypeChain = getPrototypeChain(window[className]);
        renderPrototypeChain(prototypeChain);
    });

    // Функция для получения цепочки прототипов
    function getPrototypeChain(obj) {
        const chain = [];
        let currentPrototype = Object.getPrototypeOf(obj);

        while (currentPrototype !== null) {
            chain.push(currentPrototype);
            currentPrototype = Object.getPrototypeOf(currentPrototype);
        }

        return chain;
    }

    // Функция для отображения цепочки прототипов
    function renderPrototypeChain(prototypeChain) {
        const ol = document.createElement("ol");

        prototypeChain.forEach((prototype, index) => {
            const li = document.createElement("li");
            const constructorName = prototype.constructor ? prototype.constructor.name : "[Без названия]";
            li.textContent = `Level ${index + 1}: ${constructorName}`;
            const enumerableProperties = Object.entries(Object.getOwnPropertyDescriptors(prototype))
                .filter(([key, descriptor]) => descriptor.enumerable)
                .map(([key, descriptor]) => `${key} (${typeof descriptor.value})`);

            if (enumerableProperties.length > 0) {
                const innerOl = document.createElement("ol");
                enumerableProperties.forEach(property => {
                    const innerLi = document.createElement("li");
                    innerLi.textContent = property;
                    innerOl.appendChild(innerLi);
                });
                li.appendChild(innerOl);
            }

            ol.appendChild(li);
        });

        outputDiv.appendChild(ol);
    }
});
