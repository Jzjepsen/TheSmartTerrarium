import * as casual from 'casual';

let temperature = casual.integer(20, 35); // Initial temperature  
let moisture = casual.integer(50, 100); // Initial moisture  

setInterval(() => {
    // Determine if the temperature and moisture should go up or down  
    let tempChange = casual.integer(-1, 1);
    let moistureChange = casual.integer(-1, 1);

    // Update temperature and moisture  
    temperature = Math.max(20, Math.min(35, temperature + tempChange));
    moisture = Math.max(50, Math.min(100, moisture + moistureChange));

    const data = {
        temperature: temperature,
        moisture: moisture
    };

    console.log(JSON.stringify(data));
}, 100);  
