# Worldmap
web app to present infos about countries etc.

Gives the user the possibility to mark visited countries and to add countries to a personal wishlist and move countries between wishlist and visited list. There is also a small countries-capitals-quiz to check the knowledge.

To run the app go to main folder (Worldmap) and type in command line: json-server --watch db.json --port 3004 and later, in another cmd line tab, type in: npm start

The app uses external API to get countries info, uses react-simple-maps library to present the data on the map and json-server to keep users data (wishlist and visited countries list).

