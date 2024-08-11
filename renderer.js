
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