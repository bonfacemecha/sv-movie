Savannah TV - Movie Web App
===========================

**Savannah TV** is a modern movie discovery platform built with Vue 3, Vite, and Firebase Authentication. Discover your next favorite movie, explore detailed information, and enjoy a seamless user experience.

Demo
----

You can check out the live demo of the app here:\
**[Savannah TV Demo](https://sv-movie.netlify.app/)**

Features
--------

-   Browse movies by category and popularity.

-   View detailed information about each movie.

-   Search for movies.

-   Pagination and smooth scroll functionality.

-   Firebase Authentication for user sign-up, login, and authentication.

-   Responsive design for all screen sizes.

Screenshots
-----------

### Dashboard

Here’s a quick look at the **Dashboard Page**, where you can explore the latest and most popular movies.
![Movie Dashboard](https://github.com/bonfacemecha/sv-movie/raw/development/public/images/dashboard.png)

### Movie Details

The **Movie Details Page** allows you to dive deeper into each movie’s information, including ratings, plot, and cast.

![Movie Details](https://github.com/bonfacemecha/sv-movie/raw/development/public/images/siglemv.png)

### Login 

The **Login Page** allows you to log in to the web app using either your email/password or Google Authentication.
![Login Page](https://github.com/bonfacemecha/sv-movie/raw/development/public/images/login.png)



Project Setup
-------------

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Install Dependencies

To get started, install the necessary dependencies:

 ```bash
npm install
```
### Firebase Setup

You will need a Firebase project for Firebase Authentication to work. To integrate Firebase Auth, follow these steps:

1.  **Go to Firebase Console**: Create a Firebase project here.

2.  **Enable Firebase Authentication**:

    -   In your Firebase console, go to **Authentication**.

    -   Enable the authentication providers you need (e.g., Google, Email/Password).

3.  **Install Firebase SDK**:

```bash

npm install firebase

```

4.  **Configure Firebase** in your app by creating a `firebase.js` file under the `src` folder with your Firebase project credentials:

javascript

```bash

`import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };`
```
1.  **Set up Firebase Auth methods** (like sign-in, sign-out, etc.) in your components.

* * * * *

### Development Server

Run the following command to start the development server and enjoy hot-reloading:

bash

CopyEdit

`npm run dev`

Your app will be available at `http://localhost:3000`.

### Build for Production

Once you're ready to deploy, build the app for production:

```bash
npm run build
```
This will create a minified version of your app in the `dist/` folder.

### Run Unit Tests with [Vitest](https://vitest.dev/)

If you have unit tests, you can run them with:


```bash
npm run test:unit
```

* * * * *

API Integration
---------------

### Movie Data API

The app fetches movie data via a REST API (such as The Movie Database API or a custom backend). To integrate your REST API:

1.  **API Configuration**: Store your API key in `.env` for security:



```bash
VITE_API_KEY=your_api_key_here`
```


* * * * *

Technology Stack
----------------

-   **Vue 3**: Progressive JavaScript framework for building user interfaces.

-   **Vite**: Next-generation build tool that's fast and efficient.

-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

-   **Flowbite**: A UI component library that complements Tailwind CSS.

-   **Vue Router**: For navigating between different pages (Movie Dashboard, Details, Search).

-   **Vitest**: A testing framework for running unit tests.

-   **Firebase Authentication**: For user sign-up, login, and authentication.

-   **Axios**: For making HTTP requests to the Movie API.

* * * * *

License
-------

This project is licensed under the MIT License.

* * * * *

### Notes:

1.  **Demo Link**: You can try the live demo of the app at **[Savannah TV Demo](https://sv-movie.netlify.app/)**.

2.  **Firebase**: If you want to integrate Firebase Authentication, follow the setup instructions carefully to enable sign-in methods and configure Firebase in the app.

3.  **REST API**: Replace the API service code with your movie API endpoint or custom backend if you're using something different.