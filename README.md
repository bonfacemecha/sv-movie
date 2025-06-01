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
![Movie Dashboard](https://github.com/bonfacemecha/sv-movie/tree/development/public/images/dashboard.png)

### Movie Details

**Movie Details Page** allows you to dive deeper into each movie’s information, including ratings, plot, and cast.
![Movie Details](https://github.com/bonfacemecha/sv-movie/tree/development/public/images/singlemv.png)

### Login 

**Login  Page** allows you to login to the web using either password/email or Google Auth.
![Login Page](https://github.com/bonfacemecha/sv-movie/tree/development/public/images/login.png)

Project Setup
-------------

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Install Dependencies

To get started, install the necessary dependencies:

bash

CopyEdit

`npm install`

### Firebase Setup

You will need a Firebase project for Firebase Authentication to work. To integrate Firebase Auth, follow these steps:

1.  **Go to Firebase Console**: Create a Firebase project here.

2.  **Enable Firebase Authentication**:

    -   In your Firebase console, go to **Authentication**.

    -   Enable the authentication providers you need (e.g., Google, Email/Password).

3.  **Install Firebase SDK**:

    bash

    CopyEdit

    `npm install firebase`

4.  **Configure Firebase** in your app by creating a `firebase.js` file under the `src` folder with your Firebase project credentials:

javascript

CopyEdit

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

bash

CopyEdit

`npm run build`

This will create a minified version of your app in the `dist/` folder.

### Run Unit Tests with [Vitest](https://vitest.dev/)

If you have unit tests, you can run them with:

bash

CopyEdit

`npm run test:unit`

* * * * *

API Integration
---------------

### Movie Data API

The app fetches movie data via a REST API (such as The Movie Database API or a custom backend). To integrate your REST API:

1.  **API Configuration**: Store your API key in `.env` for security:

bash

CopyEdit

`VITE_API_KEY=your_api_key_here`

1.  **API Service**: Create an API service file to manage fetching data from the API:

javascript

CopyEdit

`// src/services/movieService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_API_KEY
  }
});

export const fetchMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page }
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};`

1.  **Movie Details API**: Similarly, you can fetch details for a specific movie:

javascript

CopyEdit

`export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};`

* * * * *

Project Structure
-----------------

The project is organized as follows:

bash

CopyEdit

`src/
├── assets/           # Images, icons, and other media
├── components/       # Reusable components (Navbar, MovieCard, etc.)
├── views/            # Different page views (Dashboard, MovieDetails, etc.)
├── layouts/          # Layouts for different page structures (MainLayout, AuthLayout, etc.)
├── store/            # Vuex or Pinia store for app state
├── router/           # Vue Router setup for page navigation
├── services/         # API integration and service functions (Movie API, Firebase, etc.)
└── firebase/         # Firebase authentication and setup`

### Layouts

In the `layouts/` folder, you can organize the page structures for different types of pages (e.g., Auth pages and Main pages). Example:

-   **MainLayout.vue**: Used for pages like the Dashboard and Movie Details.

-   **AuthLayout.vue**: Used for Login/Sign-up pages to provide a different layout with minimal distractions.

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