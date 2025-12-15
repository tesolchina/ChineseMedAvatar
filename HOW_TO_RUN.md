# How to Run the TCM Communication Practice Platform

This is a static web application that can be run locally. Here are several methods:

## Method 1: Using Python (Recommended)

If you have Python installed:

1. Open PowerShell or Command Prompt in the project directory
2. Run one of these commands:

**Python 3:**
```powershell
python -m http.server 8000
```

**Python 2 (if Python 3 is not available):**
```powershell
python -m SimpleHTTPServer 8000
```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Method 2: Using Node.js (If Installed)

If you have Node.js installed:

1. Install http-server globally (first time only):
   ```powershell
   npm install -g http-server
   ```

2. Run the server:
   ```powershell
   http-server -p 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Method 3: Using VS Code Live Server Extension

If you're using Visual Studio Code:

1. Install the "Live Server" extension from the VS Code marketplace
2. Right-click on `index.html` in the file explorer
3. Select "Open with Live Server"
4. Your browser will automatically open with the application

## Method 4: Direct File Open (Limited Functionality)

You can simply double-click `index.html` or right-click and select "Open with" → your browser.

**Note:** Some features (especially iframes loading external content) may not work properly due to browser security restrictions when opening files directly (file:// protocol).

## Quick Start

The easiest method is **Method 1 (Python)** if you have Python installed:

```powershell
# Navigate to project directory (if not already there)
cd D:\Homework\Work\University\ChineseMedAvatar

# Start the server
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## Troubleshooting

- **Port already in use?** Try a different port (e.g., 8001, 8080)
- **Python not found?** Make sure Python is installed and added to PATH
- **CORS errors?** Make sure you're using a local server (Methods 1-3), not opening the file directly

## Project Files

- `index.html` - Main entry point
- `styles.css` - Styling
- `app.js` - Application logic
- `iframe-embeds/` - Individual scenario embed files


