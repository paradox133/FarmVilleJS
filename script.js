let harvestCount = 0;

function plantCrop(plot) {
    const crops = ['wheat', 'corn'];
    const currentCrop = plot.getAttribute('data-crop');

    if (currentCrop === '') {
        const randomCrop = crops[Math.floor(Math.random() * crops.length)];
        plot.setAttribute('data-crop', randomCrop);
        plot.innerHTML = randomCrop.charAt(0).toUpperCase() + randomCrop.slice(1);
    }
}

function harvestCrops() {
    const plots = document.querySelectorAll('.plot');
    plots.forEach(plot => {
        if (plot.getAttribute('data-crop') !== '') {
            harvestCount++;
            plot.setAttribute('data-crop', '');
            plot.innerHTML = '';
            plot.style.backgroundColor = '#8bc34a'; // Reset to original color
        }
    });

    document.getElementById('harvest-count').innerText = `Harvested Crops: ${harvestCount}`;
}
