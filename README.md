# PromptSaver

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

PromptSaver is a web application designed to help you manage and store prompts for AI image generation tools like Midjourney, ImageFX, Stable Diffusion, and others. Never lose track of your creative prompts again! With PromptSaver, you can:

*   Organize prompts into projects.
*   Build prompts using modular parts (subject, props, art style, etc.).
*   Dynamically add or remove prompt parts.
*   Preview the full generated prompt.
*   Associate images generated from prompts.
*   Export prompt data to Google Sheets for easy storage and sharing.

## Features

*   **Project-Based Organization:** Keep your prompts organized by project.
*   **Modular Prompt Building:** Create complex prompts by combining different parts.
*   **Dynamic Prompt Parts:** Easily add or remove parts as needed.
*   **Full Prompt Preview:** See the complete prompt before using it in an AI image generator.
*   **Image Association:** Link generated images to their corresponding prompts.
*   **Google Sheets Export:** Export your prompt data (including project name, parts, full prompt, and image links) to a Google Sheet.
*   **(Future) User Authentication:** Securely manage your prompts with user accounts.
*   **(Future) Image Uploads:** Directly upload and store images within the application.

## Tech Stack

*   **Frontend:**
    *   React
    *   Axios (for API requests)
    *   ...(Other frontend libraries you might add later)
*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB (Atlas)
    *   Google Sheets API
*   **Database:** MongoDB Atlas

## Prerequisites

Before running the application, make sure you have the following installed:

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   MongoDB Atlas account (and a cluster set up)
*   Google Cloud Platform account (for Google Sheets API credentials, if you implement that feature)

## Installation & Setup

1. **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd promptsaver
    ```

2. **Backend Setup:**

    *   Navigate to the `server` directory:

        ```bash
        cd server
        ```

    *   Install backend dependencies:

        ```bash
        npm install
        ```

    *   Create a `.env` file in the `server` directory and add your MongoDB Atlas connection string:

        ```
        MONGO_URI=mongodb+srv://<yourUsername>:<yourPassword>@cluster0.mongodb.net/<yourDatabaseName>?retryWrites=true&w=majority
        ```

        Replace placeholders with your actual credentials. Refer to the "Connecting to the Database" section below for more details.

3. **Frontend Setup:**

    *   Navigate to the `client` directory:

        ```bash
        cd ../client
        ```

    *   Install frontend dependencies:

        ```bash
        npm install
        ```

## Connecting to the Database (MongoDB Atlas)

1. **Create a MongoDB Atlas Account and Cluster:** If you don't have one, sign up for a free MongoDB Atlas account and create a cluster.
2. **Get Your Connection String:**
    *   In your Atlas dashboard, go to your cluster's overview page.
    *   Click the "Connect" button.
    *   Choose "Connect your application."
    *   Select "Node.js" as the driver and the appropriate version.
    *   Copy the connection string.
3. **Set up Network Access:**
    *   In Atlas, go to "Network Access" under "Security."
    *   Add your current IP address or an IP range to allow connections from your development machine (or server). For testing, you can add `0.0.0.0/0` to allow connections from anywhere, but this is less secure for production.
4. **Add the connection string to your .env file.**

## Running the Application

1. **Start the Backend Server:**

    *   Open a terminal and navigate to the `server` directory:

        ```bash
        cd promptsaver/server
        ```

    *   Start the server:

        ```bash
        node server.js
        ```

        The backend should start running on `http://localhost:5000` (or the port specified in your `.env` file).

2. **Start the Frontend Development Server:**

    *   Open another terminal and navigate to the `client` directory:

        ```bash
        cd promptsaver/client
        ```

    *   Start the development server:

        ```bash
        npm start
        ```

        The React development server should start running on `http://localhost:3000`.

## Usage

1. Open your web browser and go to `http://localhost:3000` to access the PromptSaver application.
2. Enter a project name in the header.
3. Start building your prompt by adding parts (subject, props, art style, etc.) in the "Prompt Builder" section.
4. See the full prompt dynamically update in the "Prompt Preview."
5. Click "Save Project" to save the current project and its associated prompt to the database.
6. (Future) Upload or link images generated from your prompts in the "Image Association" section.
7. (Future) Click "Export to Google Sheets" to export your prompt data to a Google Sheet.

## Contributing

Contributions are welcome! If you'd like to contribute to PromptSaver, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/your-bug-fix-name`
3. Make your changes and commit them with clear commit messages.
4. Push your branch to your forked repository.
5. Create a pull request to the `main` branch of the original repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

*   [MongoDB](https://www.mongodb.com/)
*   [Express.js](https://expressjs.com/)
*   [React](https://reactjs.org/)
*   [Node.js](https://nodejs.org/)

---

**Customize:**

*   **`your-repository-url`:** Replace this with the actual URL of your Git repository.
*   **Placeholders in `MONGO_URI`:**  Make sure to replace the placeholders in the connection string with your actual MongoDB Atlas credentials.
*   **Future Features:** I've marked some features as "(Future)" because they are not yet implemented. You can remove or modify these as you develop them.
*   **Deployment Instructions:** You can add a "Deployment" section later when you have instructions on how to deploy the application to a server.
*   **Screenshots:** Add screenshots of your application to make the README more visually appealing. You can place them in a separate folder (e.g., `screenshots`) and link them in the README. Example:

    ```markdown
    ![Project List View](screenshots/project-list.png)
    ```

*   **GIFs:** Consider adding GIFs that demonstrate how to use the application.

This comprehensive README will help users and potential contributors understand your project, set it up, and use it effectively!
