window.onload = function() {
    const strategy = document.getElementById("strategy");
    const button = document.getElementById("button");

    const Strategies = [
        "Fuck",
        "Shit",
        "Bitch",
        "Ass",
        "Dogshit",
        "Pussy",
        "Damn",
        "Bastard",
        "Bullshit",
        "Fucker",
        "Prick",
        "Beast",
        "Monster",
        "Thingy",
        "Crap",
        "Junk",
        "Piece",
        "Wavefuck",
        "Flowshit",
        "Sparkass",
        "Edgefuck",
        "Lineass",
        "Formshit",
        "Shapeshit",
        "Clusterfuck",
        "Shitgroup",
        "Packshit",
        "Herdshit",
        "Flockfuck",
        "Swarmshit",
        "Massfuck",
        "Pileofshit",
        "Heapshit",
        "Stackshit",
        "Fieldshit",
        "Planeshit",
        "Pointfuck",
        "Spotshit",
        "Markass",
        "Signshit",
        "Tonefuck",
        "Colorfuck",
        "Hueass",
        "Tintshit",
        "Shadeass",
        "Lightshit",
        "Darkshit",
        "Softass",
        "Hardass",
        "Brightshit",
        "Dimshit",
        "Warmass",
        "Coolass",
        "Deepfuck",
        "Shallowshit",
        "Sharpass",
        "Smoothass",
        "Roughshit",
        "Cleanass",
        "Dirtyshit",
        "Newshit",
        "Oldass",
        "Firstfuck",
        "Lastshit",
        "Nextshit",
        "Pastass",
        "Futureshit",
        "Nearshit",
        "Farass",
        "Highass",
        "Lowshit",
        "Openass",
        "Closedshit",
        "Fuckyes",
        "Nopefuck",
        "Maybeshit",
        "Oncefuck",
        "Againshit",
        "Alwaysfuck",
        "Nevershit",
        "Complexshit"
    ];

    let lastIndex = -1;

    function getNewWord() {
        if (!strategy) return;
        
        // Find a random index, ensuring it's different from the last one if possible
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * Strategies.length);
        } while (randomIndex === lastIndex && Strategies.length > 1);
        
        lastIndex = randomIndex;
        const newWord = Strategies[randomIndex];

        // Apply a smooth fade out and scale down animation
        strategy.style.opacity = "0";
        strategy.style.transform = "translateY(8px) scale(0.98)";
        strategy.style.filter = "blur(4px)";

        setTimeout(() => {
            strategy.innerHTML = newWord;
            // Fade and scale back in
            strategy.style.opacity = "1";
            strategy.style.transform = "translateY(0) scale(1)";
            strategy.style.filter = "blur(0)";
        }, 150);
    }

    // Set initial word
    getNewWord();

    // Attach click handler to the button
    if (button) {
        button.onclick = getNewWord;
    }
};