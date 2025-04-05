document.addEventListener('DOMContentLoaded', () => {
    const danceButton = document.getElementById('danceButton');
    const photos = document.querySelectorAll('.photo');
    const audio = document.getElementById('birthdaySong');

    // Toggle dance animation
    danceButton.addEventListener('click', () => {
        photos.forEach(photo => {
            photo.classList.toggle('dance-animation');
        });

        // Change button text
        if (danceButton.textContent.includes('Dance')) {
            danceButton.textContent = 'Stop Dancing 🛑';
            audio.play();
        } else {
            danceButton.textContent = 'Dance! 💃';
            audio.pause();
        }
    });

    // Add hover effect to photos
    photos.forEach(photo => {
        photo.addEventListener('mouseover', () => {
            photo.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        photo.addEventListener('mouseout', () => {
            photo.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});