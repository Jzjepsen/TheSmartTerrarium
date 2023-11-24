# The Idea
<img width="661" alt="ProjectIdea" src="https://github.com/Jzjepsen/TheSmartTerrarium/assets/95351040/136e2eac-dc5a-46a3-b3fe-6edf5a07e726">


# First steps
Creating a script and running it. 
This script fakes some numbers, later to be changed to seem like analogous numbers, temperature and humidity only changing +/-1 at a time. 

## Step-by-step
First go into the repo:
`cd <project_directory>`

intall packages:
`npm install`
`npm install casual`
`npm install -g typescript`


compile typescript to javascript
`tsc dataGenerator.ts`

run file:
`node dataGenerator.js`

___
# Setting up the MQTT broker
Integrate MQTT functionality into a TypeScript script to send simulated terrarium data (temperature and moisture) to an MQTT broker.

## Steps Taken

### 1. Initialization of the MQTT Broker
Run the Mosquitto MQTT broker:

` brew services start mosquitto`

### 2. Updated TypeScript Script
The updated TypeScript Script is available in the file dataGenerator.ts

### 3. Compile and Run the TypeScript Script
Use the following commands:

`tsc yourScript.ts`
`node yourScript.js`

### 4. Testing & Validation
To Monitor Published Messages:

`mosquitto_sub -t "terrariumData"`


## Result

<img width="674" alt="resultVer1" src="https://github.com/Jzjepsen/TheSmartTerrarium/assets/95351040/b935f32c-b63f-4610-9cb2-31a1dc15da07">

# Starting the backend
After having created a backend ind MongoDB ( or similar), get the backend running. 

## Step-by-step
Install MongoDB (first enter the backend folder `cd backend`)
`npm install mongodb`

Compile db.ts and dataManager.ts
`tsc db.ts`
`tsc dataManager.ts`

Run the scripts (.js files) 
`node dataManager.js`

## Result
<img width="701" alt="Screenshot 2023-11-24 at 11 55 51" src="https://github.com/Jzjepsen/TheSmartTerrarium/assets/95351040/607423a7-d9b7-4116-b9c6-67866717ba24">





