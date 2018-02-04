Home assignment for Yojee's Front-end Developer technical test
By: Dao The Phuc

1. Installation and Run
* To build: run "npm install"
* To run: "npm start"
* App is hosted at "localhost:3000"

2. Technology used
* This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

* react-leaflet for the Map components


3. Project structure
* This project was designed using the Container Component pattern. Each container in the "containers" folder handles
 data fetching and processing before rendering its corresponding component. (The "MapComponent" is named as such to avoid
 conflict with react-leaflet's component called "Map").

* The "utils" folder contains an "ApiCalls.js" file to handle external API calls, a "LocalLoad.js" file to handle loading data
from local file, and a "Utility.js" that contains utility functions used across the page.


* Component Hierarchy
  - App
    - CountryList
    - MapComponent
    - UserList

* States
  - 6 states are stored in the App Component. These states are passed down the child components as props and updated using
callbacks.
  - The UserListContainer and CountryListContainer have their own extra state for error handling to prevent failure in a
single component from crashing the entire page.

4. Other notes
* The CountryListContainer tries to load the list of all countries with their latitude and longitude using an external API.
If the API call fails, the container will try to load the list from the internal file in "data" folder.

* The results displayed on this application might be imperfect. This is due to GitHub's UI for setting a profile's location
using textbox instead of a drop-down menu with fixed options. As a result, the most-followed user might save his/her location as "USA" but
selecting "United States of America" on the drop-down won't return that profile.

* The Map Component uses the latitude and longitude of a country (fetched from the external API) to render the marker.
One special case, the "United States Minor Outlying Islands", has no specific latitude or longitude. Hence, a special
error message is displayed for this case.


----------End of document----------------