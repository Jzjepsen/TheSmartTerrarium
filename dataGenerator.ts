import * as casual from 'casual';

setInterval(() => {
    const temperature = casual.integer(20, 35); // range for terrarium temperature in Celsius  
    const moisture = casual.integer(50, 100); // range for terrarium moisture in percentage  

    const data = {
        temperature: temperature,
        moisture: moisture
    };

    console.log(JSON.stringify(data));
}, 10000);  
