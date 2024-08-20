let harvestCount = 0;
let coinCount = 0;

function plantCrop(plot) {
    const crops = ['wheat', 'corn'];
    const currentCrop = plot.getAttribute('data-crop');

    if (currentCrop === '') {
        const randomCrop = crops[Math.floor(Math.random() * crops.length)];
        plot.setAttribute('data-crop', randomCrop);
        plot.setAttribute('data-growth', '1'); // Start growth at stage 1
        plot.innerHTML = randomCrop.charAt(0).toUpperCase() + randomCrop.slice(1);

        // Ensure any previous animation is removed
        plot.style.animation = 'none';

        // Start growing the crop
        growCrop(plot);
        console.log(`${randomCrop} has been planted here`);
    }
}

function growCrop(plot) {
    let growthStage = parseInt(plot.getAttribute('data-growth'));

    if (growthStage < 3) { // Max growth stage is 3
        setTimeout(() => {
            growthStage++;
            plot.setAttribute('data-growth', growthStage.toString());

            if (growthStage === 3) {
                // Reapply animation for the fully grown stage
                plot.style.animation = 'none'; // Reset animation
                void plot.offsetWidth; // Trigger reflow
                plot.style.animation = 'flash 1s infinite'; // Apply animation
            }

            growCrop(plot); // Continue growing until fully grown
        }, 2000); // Adjust time as needed for each growth stage
    }
}

function harvestCrops() {
    const plots = document.querySelectorAll('.plot');
    plots.forEach(plot => {
        if (plot.getAttribute('data-growth') === '3') { // Harvest only fully grown crops
            harvestCount++;

            // Convert crops to coins based on the crop type
            const cropType = plot.getAttribute('data-crop');
            if (cropType === 'wheat') {
                coinCount += 2; // Example: wheat gives 2 coins
            } else if (cropType === 'corn') {
                coinCount += 3; // Example: corn gives 3 coins
            }

            plot.setAttribute('data-crop', '');
            plot.setAttribute('data-growth', '0');
            plot.innerHTML = '';
            plot.style.backgroundColor = '#8bc34a'; // Reset to original color
            plot.style.border = '2px solid #4caf50'; // Reset border color
            plot.style.animation = 'none'; // Stop flashing effect
        }
    });

    // Update the UI to show the harvested crops and gold coins
    document.getElementById('harvest-count').innerText = `Harvested Crops: ${harvestCount}`;
    document.getElementById('coin-count').innerText = `Gold Coins: ${coinCount}`;
}
