
document.addEventListener('DOMContentLoaded', async () => {
    const championsArray = await window.api.fetchChampions();
    const input = document.getElementById('champ-input');
    const datalist = document.getElementById('champ__suggestion-list');
    const countersContainer = document.getElementsByClassName('champ-counters');
    
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
    function handleUserInput(champ) {
        const counters = await window.api.fetchCounters(champ);
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
    input.addEventListener('change', () => {
        const selectedChamp = input.value;
        if (championsArray.includes(selectedChamp)) {
            handleUserInput(selectedChamp)
        }
    });
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
