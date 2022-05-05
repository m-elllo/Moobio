
(function() {

    // Number of bars displayed
    const numberOfBars = 34;

    // Retrieve audio element and assigned to const 'audio'
    const audio = document.querySelector("audio");
    
    // Create audio context
    const ctx = new AudioContext();
    
    // Create audio source
    const audioSource = ctx.createMediaElementSource(audio);

    // Create audio analyzer
    const analyzer = ctx.createAnalyser();

    // Connect the source to the analyzer, then back to the context destination
    audioSource.connect(analyzer);
    audioSource.connect(ctx.destination);

    // Print analyze frequencies
    const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(frequencyData);
    console.log("frequencyData", frequencyData);

    // Get visualizer container
    const visualizerContainer = document.querySelector(".visualizer-container");


    // Create set of pre-defined bars
    for (let i = 0; i < numberOfBars; i++) {
        const bar = document.createElement("DIV");
        bar.setAttribute("id", "bar" + i);
        bar.setAttribute("class", "visualizer-containerbar");
        visualizerContainer.appendChild(bar);

    }

    // renderFrame function adjusts bar heights according to the frequency data
        function renderFrame() {

    // Update frequency data array with the latest frequency data
        analyzer.getByteFrequencyData(frequencyData);

        for (let i = 0; i < numberOfBars; i++) {

            // fd is the frequency data (value between 0 and 255)
            const index = (i + 10) * 5;
            const fd = frequencyData[index];

            // Fetch bar DIV element
            const bar = document.querySelector("#bar" + i);
            if(!bar) {
                continue;
            }

            const barHeight = Math.max(4, fd || 0);
            bar.style.height = barHeight + "px";
        }
            // At the next animation frame, call itself
            window.requestAnimationFrame(renderFrame);
    
    }

    renderFrame();

    audio.volume = 0.55;
    audio.play();

}) ();



