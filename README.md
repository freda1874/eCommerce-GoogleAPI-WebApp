# Shopful Software Development Project
## GitHub Repo Work flow

### Main
The main branch is the most protected branch and will only be updated from development branch, when a major WORKING update is complete. The main branch will be working at all times. 

### Development and Task Branches
For each task and sprint, the user will branch off of the most recent development branch and title it "US##-Task###". Each US/Task branch can updated as the user works on the task. When the task for the user story is complete a pull request will be created asking to merge the task branch to the devleopment branch. The development branch will be protected so the pull request must be reviewed by someone else before it is accepted.

This system will ensure that each branch is accurately documented and protected. Main will always be the latest full working version of the software and the development branch will allow us to commit to the project without ruining or breaking the current software version.

**Example:**
1. US01-Task01 - User(s) add commits until Task is complete
2. Create a pull request to merge into Devleopment
3. The pull request is reviewed by another memeber
4. The member accepts the pull request and the Task branch is merged into the Devleopment branch
5. At the end of the sprint, the working Devleopment branch with all the new features will have a pull request to merge into main. This request will also be reviewed and approved allowing the development branch to merge into main.
6. Main will be the version shown to the sponsor and clients as it will have the latest, most stable featuers.


## Client/Sponsor
Nadia Hosseinzadeh - hello@appyyo.com

## Team Members
Phuoc Le - pmle3@asu.edu

Blake Caldwell - bmcaldw2@asu.edu

Akhil Mathews - ajmathe2@asu.edu

Matthew Ormsby - mdormsby@asu.edu

Zack Moore - zcmoore1@asu.edu

## Description
The description of the Shopful project can be found within the Project Document, found [here](https://docs.google.com/document/d/1CMmxpAynUwVWEdh715tassI19XTYXqxh/edit)[^1]

## Setting up the local environment[^2]
**Backend**
1. go to the backend folder from being in the work folders directory in the terminal on VSC, then enter “cd backend”
2. enter “npm install react”
3. enter "npm install mongodb@4.1" - This is for the driver that allows the Node.js application to reach the MongoDB server
4. enter “npm install express”
5. enter “npm install axios”
6. enter “npm install mongoose”
7. enter “npm install dotenv”
8. enter “npm install selenium-webdriver”
9. enter “npm install react-geocode”
10. enter “npm install connect-timeout”
11. enter "npm install nodemon"
12. Set up ".env" file and MongoDB
13. enter "npm i dependencies' - This ensures all previous systems have the required dependencies installed. Otherwise you may get errors when trying to run the following line
14. enter “npm run dev”

** Note: "npm install" will also install all the required packages. This command installs a package and any packages that it depends on. If the package has a package-lock, or an npm shrinkwrap file, or a yarn lock file, the installation of dependencies will be driven by that, respecting the following order of precedence: package-lock.json

** Note: There have been bugs in some releses of images-scraper (https://www.npmjs.com/package/images-scraper). Version 6.4.5 is working with our project.  

To install use: "npm install images-scraper".

To determine the version of the 'images-scraper' package, use: "npm view images-scraper version". 

**Frontend**
1. Open a new terminal & go to the frontend folder from being in the work folders directory in the terminal on VSC, then enter “cd frontend”
2. enter “npm install react”
3. enter “npm install react-icons”
4. enter “npm install react-geocode”
5. enter “npm start”

After completing these steps, the front end should be running from locahost:3000 while the backend runs on localhost:4000. 

You need to have a valid google api key & a valid mongoDB link from your .env file.

** Note: "npm install" will also install all the required packages. This command installs a package and any packages that it depends on. If the package has a package-lock, or an npm shrinkwrap file, or a yarn lock file, the installation of dependencies will be driven by that, respecting the following order of precedence: package-lock.json

## Running the application
**Backend**

enter “npm run dev” - This method runs the code in nodemon and allows the server to be restarted when files are updated

enter “npm start” - This method runs the code in regular Node.js and will not restart when crashing

**Frontend**

enter “npm start”

After completing these steps, the front end should be running from locahost:3000 while the backend runs on localhost:4000. 

You need to have a valid google api key & a valid mongoDB link from your .env file.

## API keys
GOOGLE_API_KEY= ```This key will have to be generated individually as a credit card is required to gain access to the APIs. Make sure the API key has the following enabled: Geolocation, Places, and Maps.```

MongoDB = ```mongodb+srv://SER401-GROUP5:C5W1Vc6CxvoFP2Rx@ser401-402.5czv7bf.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp``` [^3]

### MongoDB Access Information
```Username: SER401-GROUP5```

```Password: C5W1Vc6CxvoFP2Rx```

NOTE: This is for a connection to the server, not the hosting website!

[^1]: If you do not have access to this file please contact Matthew Ormsby to have them share it with you.
[^2]: This information is being pulled from "team6_readme" found in the Shopful-20230912T233035Z-001\Shopful\Project Documents\team6_final_delivery\final_delivery directory
[^3]: Make sure to install the corect driver so the code can reach the MongoDB server


