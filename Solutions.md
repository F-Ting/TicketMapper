# TicketMapper

This web application allows users to track their favourite personalities by viewing their current and future locations at any given time. It also provides users with further details about specific events, including the name, date, location and more. The initial view the user is presented with is the home page, where they have the option to sign-in with their account, sign-in as a guest or navigate to the sign-up page. After navigating to the sign-in page, the user is required to enter their preferred account credentials which they can later use to sign-in with for a more personalized experience. Upon signing-in, the user will be directed to the search page, where they can enter the name of a personality or event of their choice. A valid entry will take them to a page displaying a list of results that were retrieved from Ticketmaster, whereas an invalid entry will inform the user about the invalidity of their search query. From here, the user may choose to view a list of relevant events associated with a particular result, or follow an event of their liking. If they opt for the latter, the event will appear on their unique following page, until they decide to unfollow it. By selecting a result from the list, they will be able to view a list of events corresponding to the search result, in addition to a Google Map consisting of markers associated with each of them. In order to view additional information about an event, the user can click on the appropriate button. Finally, the user can sign-out and return to the home page by clicking on the button in the navigation bar. 

## Getting Started

These instructions will guide you on how to run the project on your local machine for development and testing.

```
npm install -g yarn
npm install -g nodemon
npm install -g concurrently
yarn install
yarn dev
```

## Built Using

* [React](https://reactjs.org/) 
* [MongoDB](https://www.mongodb.com/)
* [npm](https://www.npmjs.com/)
* [yarn](https://yarnpkg.com/en/)
* [Passport](http://www.passportjs.org/)
* [Ticketmaster API](https://developer.ticketmaster.com/)
* [Google Maps API](https://developers.google.com/maps/)

## Authors

* **DiFei Chen** - [F-Ting](https://github.com/F-Ting)
* **Farzan Haq** - [farzanhaq](https://github.com/farzanhaq)
* **Julian Zhang** - [JulianZhang97](https://github.com/JulianZhang97)
* **Murali Komaravolu** - [murali2006doha](https://github.com/murali2006doha)
