# PromptVault

![PromptVault Logo](client/public/promptvault_logo.jpg)

PromptVault is a modern web application for managing and organizing AI prompts. It provides an intuitive interface for creating, storing, and exporting prompts with support for image references.

## Features

- 🎨 **Modern UI with Dark/Light Mode**
  - Clean, responsive design
  - Theme persistence
  - Smooth transitions

- 📝 **Prompt Management**
  - Create and organize prompts
  - Drag and drop reordering
  - Real-time preview
  - Project-based organization

- 🖼️ **Image Support**
  - Drag and drop image upload
  - Multiple image formats (PNG, JPG, GIF, WebP)
  - Image preview grid
  - Image reference management

- 📤 **Export Options**
  - Text (.txt) export
  - JSON format with images
  - Markdown with embedded images
  - Quick copy to clipboard

## Tech Stack

- **Frontend**
  - React
  - Material-UI
  - React Beautiful DND
  - Axios

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dowells-mike/prompt-vault.git
   cd prompt-vault
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```

3. Create a .env file in the server directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`

## Usage

1. **Create a Project**
   - Click "Add Project"
   - Enter project name
   - Add prompt parts

2. **Add Images**
   - Drag and drop images
   - Or click to select files
   - View in preview grid

3. **Export**
   - Choose export format
   - Download or copy to clipboard
   - Include images if needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

Mike Dowells - [@dowee.y](https://www.instagram.com/dowee.y/)

- Email: mikedowells150@gmail.com
- LinkedIn: [dowells-mike](https://www.linkedin.com/in/dowells-mike)
- GitHub: [@dowells-mike](https://github.com/dowells-mike)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors
- Built with React and Material-UI
- MongoDB for database
- Express for backend
