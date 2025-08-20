# Drama Varna Ticketing App

Drama Varna Ticketing App is a single-page application for booking tickets for plays. It contains of:
* a public area 
=> where **guests** can browse all registered plays in theater
* a private area 
=> where **users** can book plays for a specific amount of tickets, rate plays and check their profile
=> where **admins** can create, edit and delete plays

The app has a RESTful API provided by the Angular workshop for Angular course 2025. It has been modified to fit the project's needs.

## Installation
1. Clone the repository: git clone https://github.com/dianasimeonova56/drama-varna-online-booking
2. Run server (it is hosted on http://localhost:3000) - in new terminal
```bash
cd ticketing-app/Rest-api
npm start
```
3. Install dependencies: 
```bash
cd ticketing-app/src
npm install
```
4. Start application
```bash
ng serve
```

## Admin User
To have an admin user, run the seed script or import admin.json into the users collection.
```bash
cd ticketing-app/Rest-api/seeds
```
Credentials: email: admin@gmail.com, password: didi123.

## Features
* Home Page - Welcome page with a swiper of images along with a button to access the catalog of plays. Below it are fetched the upcoming plays from the catalog.

* Catalog (Plays) - Page with all created plays. Portrayed are Upcoming Plays and Past Plays (view can be switched by clicking the switch button). On top of the page there is a search bar for name, director and date + hour if we want to look for a specific play.
=> Each play is portrayed by the Play Item component that renders the image, title, month, day, hour, place and additional information for the specific play. Along with that, there is a "Details" button that redirects to a page for the details of the play.

* Play Details: Page that portrays all information for a play - image, title, month, day, hour, place, description, director. Depending on the current role of the user we can:
=> Book Ticket (if the show has not passed/is sold out) - User;
=> Rate play - User (a play can be rated only once per user);
=> Edit/Delete - Admin;

* Book Play - When booking a play, the user is redirected to a page to book a specific amount of tickets. The available seats for the play are portrayed, they CANNOT be surpassed when booking tickets. After success, user is redirected to a confirmation page with a link to the page "My Bookings" where tickets can be found.

* My Bookings - A page that renders all the bookings a specific user has made. In each component of a booking there is information about the play along with a button "Show tickets/Hide tickets" to toggle between the visibility of the tickets for the booking.

* My Profile - Page with info about the current user. The user can edit their profile - username and email. There is information about the amount of bookings made along with a button redirecting to page "My Bookings".
=> An admin can show all created plays with two buttons available - Show Play (redirect to details) and Delete Booking shortcut.

* UI Responsiveness - the application has been made to be as responsive as possible - play/booking items are resized, header switches to hamburger menu on small screen, etc.

* Error handling - error interceptor sets messages if an error has been recieved from the backend. Messages are shown with Error service. It is possible to set the messages from frontend too on any error. In Reactive Forms, validation is implemented on fields.

## Used
- Angular 
- TypeScript
- RxJS (Observables, tap, map)
- Angular Router (dynamic routing, redirecting)
- Reactive Forms (validation, grouping)
- Angular Animations (page transitions applied to whole application, item animations - mobile navigation, tooltips)
- Fa Icons (switch between plays in Catalog, in Admin page for Delete/Show Play, Stars for rating plays)
- Angular Materials (tooltips, spinner)
- Directive (show button if play is upcoming, hide button if play has passed)
- Pipe (format date of play to distribute elements in the play item for styling)
- Interceptor (error interceptor to catch errors from the backend)
- Guards (Auth Guard - if user is logged in, Guest Guard - if user is a guest, Role Guard - check user role for specific pages)
- REST API (Angular Workshop 2025, modified)

