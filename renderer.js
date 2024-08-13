
document.addEventListener('DOMContentLoaded', async () => {
    const championsArray = await window.api.fetchChampions();
    const input = document.getElementById('champ-input');
    const datalist = document.getElementById('champ__suggestion-list');
    const countersContainer = document.getElementById('champ-counters');
    const button = document.getElementById('champion-btn');
    
    // Function to update datalist with champions
    function updateDataList(champs) {
        datalist.innerHTML = '';
        champs.forEach(champ => {
            const option = document.createElement('option');
            option.value = champ;
            datalist.appendChild(option);
        });
    }

    // Function to handle user input
    async function handleUserInput(champ) {
        // Sanitize the champion name
        const sanitizedChamp = champ.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        const baseUrl = `https://u.gg/lol/champions/${sanitizedChamp}/counter`;

        const counters = await window.api.fetchCounters(baseUrl);
        countersContainer.innerHTML = '';
        counters.forEach(counter => {
            const div = document.createElement('div');
            div.textContent = counter;
            countersContainer.appendChild(div);
        })
    }

    // Event listener for input
    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        const filteredNames = championsArray.filter(champ => champ.toLowerCase().includes(query));
        updateDataList(filteredNames);
    });

    // Handle input selection
    input.addEventListener('change', async () => {
        const selectedChamp = input.value;
        if (championsArray.includes(selectedChamp)) {
            handleUserInput(selectedChamp)
        }
    });

    // Event listener for button click to display counters
    button.addEventListener('click', async () => {
        const selectChamp = input.value;
        if (championsArray.includes(selectChamp)) {
            await handleUserInput(selectChamp);
        } else {
            countersContainer.innerHTML = 'Please select a valid champion name!'
        }
    })
});

/*
    Testing data coming from IPC handler

document.addEventListener('DOMContentLoaded', () => {
    console.log('Renderer script loaded.');

    window.api.fetchChampions()
        .then(champions => {
            console.log('Champions received:', champions);
        })
        .catch(error => {
            console.error('Error fetching champions:', error)
        });
            
});
*/
