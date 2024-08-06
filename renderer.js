/* renderer.js */

/*
document.getElementById('champion-btn').addEventListener('click', () => {
    try {

    } catch (error) {
        console.error(error);
    }
});  
*/

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