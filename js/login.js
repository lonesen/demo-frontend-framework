document.addEventListener("DOMContentLoaded", function() {
    const colorChangingText = document.getElementById("color-changing-text");

    setInterval(() => {
        colorChangingText.style.animation = "none"; // Reset animation
        void colorChangingText.offsetWidth; // Trigger reflow
        colorChangingText.style.animation = "colorChange 5s infinite"; // Restart animation
    }, 5000); // Repeat every 5 seconds
});
