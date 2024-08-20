 const fileMapping = {
            'India': 'https://crawlers-one.vercel.app/Country/India%20Forest/india.html',
            'Russia': 'https://crawlers-one.vercel.app/Country/Russia%20Forest/Russia.html',
            'Canada': 'https://crawlers-one.vercel.app/Country/Canada%20Forest/Canada.html',
            'Brazil': 'https://crawlers-one.vercel.app/Country/Brazil%20Forest/Brazil.html',
            'USA': 'https://crawlers-one.vercel.app/Country/USA%20forest/USA.html',
            'China': 'https://crawlers-one.vercel.app/Country/China%20Forest/China.html',
            'Australia': 'https://crawlers-one.vercel.app/Country/Australia%20forest/Australia.html',
            'Jim Corbett NP': 'https://crawlers-one.vercel.app/Country/India%20Forest/Forests/Corbett.html',
            'Deccan forests': 'https://crawlers-one.vercel.app/Country/India%20Forest/Forests/Deccan-forest.html',
            'Kaziranga National Park': ' https://crawlers-one.vercel.app/Country/India%20Forest/Forests/Kaziranga.html',
            'Sundarbans': 'https://crawlers-one.vercel.app/Country/India%20Forest/Forests/sundarbun.html',
            'Western Ghats': 'https://crawlers-one.vercel.app/Country/India%20Forest/Forests/Wester_Ghats.html',
            'Daintree forest': 'https://crawlers-one.vercel.app/Country/Australia%20forest/Forests/Daintree.html',
            'Gondwana forest': 'https://crawlers-one.vercel.app/Country/Australia%20forest/Forests/Gondwana.html ',
            'Otway forest': 'https://crawlers-one.vercel.app/Country/Australia%20forest/Forests/otway.html',
            'Tasmania': 'https://crawlers-one.vercel.app/Country/Australia%20forest/Forests/tasmania.html ',
            'Amazon forests': 'https://crawlers-one.vercel.app/Country/Brazil%20Forest/forest/Amazon%20forests.html',
            'Cachoeria da Neblina': 'https://crawlers-one.vercel.app/Country/Brazil%20Forest/forest/Cachoeria-da-Neblina.html',
            'Floresta da Tijuka': 'https://crawlers-one.vercel.app/Country/Brazil%20Forest/forest/floresta-da-tijuka.html',
            'Parque de Sinopa': 'https://crawlers-one.vercel.app/Country/Brazil%20Forest/forest/Parque-de-sinopa.html',
            'Acadian Forest': 'https://crawlers-one.vercel.app/Country/Canada%20Forest/forest/Acadian.html',
            'Boreal Forest': 'https://crawlers-one.vercel.app/Country/Canada%20Forest/forest/Boreal.html',
            'Columbia Forest': 'https://crawlers-one.vercel.app/Country/Canada%20Forest/forest/Columbia.html',
            'Lakes': 'https://crawlers-one.vercel.app/Country/Canada%20Forest/forest/Lakes.html',
            'Montane forest': 'https://crawlers-one.vercel.app/Country/Canada%20Forest/forest/Montane.html',
            'Broad Leaf Forest': 'https://crawlers-one.vercel.app/Country/China%20Forest/forest/Broad-leaf-forest.html',
            'Changbai Mountain forest': 'https://crawlers-one.vercel.app/Country/China%20Forest/forest/Changbai-mountain-mixed-forest.html',
            'Sichuan subtropical forest': 'https://crawlers-one.vercel.app/Country/China%20Forest/forest/Sichuan-subtropical-forest.html',
            'Tibetian Forest': 'https://crawlers-one.vercel.app/Country/China%20Forest/forest/Tibetian-plateau-forest.html',
            'Caucasus Forest': 'https://crawlers-one.vercel.app/Country/Russia%20Forest/Forest/Caucasus.html',
            'Sayan Mountain Forests': 'https://crawlers-one.vercel.app/Country/Russia%20Forest/Forest/Sayan-Mountains-Forests-Russia.html',
            'Taiga Boreal Forests': 'https://crawlers-one.vercel.app/Country/Russia%20Forest/Forest/Taiga-Boreal.html',
            'Everglade Forest': 'https://crawlers-one.vercel.app/Country/USA%20forest/Forest/Everglade.html',
            'Olympic National Forest': 'https://crawlers-one.vercel.app/Country/USA%20forest/Forest/Olympic_Nationalpark.html',
            'Smoky Mountain Forests': 'https://crawlers-one.vercel.app/Country/USA%20forest/Forest/SmokyMountain.html',
            'Tonagass National Park': 'https://crawlers-one.vercel.app/Country/USA%20forest/Forest/Tongass_Nationalpark.html'
        };

        const availableKeywords = Object.keys(fileMapping);
        const resultsBox = document.querySelector(".result-box");
        const inputBox = document.getElementById("input-box");
        const searchButton = document.getElementById("search-button");

        let selectedIndex = -1;

        inputBox.onkeyup = function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                return;
            }

            let result = [];
            let input = inputBox.value.trim();
            if (input.length) {
                result = availableKeywords.filter((keyword) => {
                    return keyword.toLowerCase().includes(input.toLowerCase());
                });
            }
            display(result);

            if (!result.length) {
                resultsBox.innerHTML = '';
            }
        };

        inputBox.addEventListener("keydown", function(event) {
            const items = resultsBox.querySelectorAll("li");

            if (event.key === "ArrowDown") {
                if (selectedIndex < items.length - 1) {
                    selectedIndex++;
                    updateSelection(items);
                }
            } else if (event.key === "ArrowUp") {
                if (selectedIndex > 0) {
                    selectedIndex--;
                    updateSelection(items);
                }
            } else if (event.key === "Enter") {
                event.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    inputBox.value = items[selectedIndex].innerHTML;
                    resultsBox.innerHTML = '';
                }
                handleSearch();
            }
        });

        function updateSelection(items) {
            items.forEach((item, index) => {
                if (index === selectedIndex) {
                    item.classList.add("selected");
                    inputBox.value = item.innerHTML;
                } else {
                    item.classList.remove("selected");
                }
            });
        }

        function display(result) {
            selectedIndex = -1; // Reset selected index
            const content = result.map((list) => {
                return `<li onclick="selectInput(this)">${list}</li>`;
            }).join('');

            resultsBox.innerHTML = `<ul>${content}</ul>`;
        }

        function selectInput(list) {
            inputBox.value = list.innerHTML;
            resultsBox.innerHTML = '';
        }

        function handleSearch() {
            const input = inputBox.value.trim();
            const lowercaseInput = input.toLowerCase();
            
            const matchingKey = Object.keys(fileMapping).find(key => key.toLowerCase() === lowercaseInput);
            
            if (matchingKey) {
                window.location.href = fileMapping[matchingKey];
            } else {
                console.log("No matching page found for " + input);
                alert("No matching page found for " + input);
            }
        }

        searchButton.addEventListener("click", handleSearch);
