# 🍕 SliceHub

SliceHub is a modern, full-stack pizza ordering web application. Built with React and Vite, it allows users to: 1. customize their perfect pizza 2. manage a global cart, securely check out 3. view their personal order history via a personalized dashboard.

## Features

* **Interactive Pizza Builder:** 
* **Global Cart System:** 
* **User Authentication:**
* **Protected Routes:** 
* **Order History:**
* **Responsive Design:**

## 🛠️ Tech Stack

* **Frontend Framework:** React 18 (Usinge Vite)
* **Routing:** React Router v6
* **State Management:** React Context API (`AuthContext`, `CartContext`)
* **Styling:** Tailwind CSS
* **Backend / Database:** Firebase (Authentication & Cloud Firestore)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js installed on your machine.
* npm
  ```sh
  npm install npm@latest -g

Installation

    Clone the repository
    Bash

    git clone [https://github.com/your-username/slicehub.git](https://github.com/your-username/slicehub.git)

    Navigate into the directory
    Bash

    cd slicehub

    Install NPM packages
    Bash

    npm install

    Configure Firebase

        Create a project on Firebase.

        Enable Authentication (Email/Password) and Firestore Database.

        Replace the config object in src/firebase.js with your own project's Firebase configuration keys.

    Start the development server
    Bash

    npm run dev

📁 Project Structure

    /src/components - Reusable UI elements (Navbar, Footer, ProtectedRoute)

    /src/context - Global state managers (AuthContext, CartContext)

    /src/pages - Main route views (Home, PizzaBuilder, Cart, Dashboard, Login, Register)

    firebase.js - Database and authentication initialization logic