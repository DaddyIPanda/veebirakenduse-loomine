# SnatchPost

A responsive three-page web application developed using **HTML5, CSS3, and Vanilla JavaScript** for the Web Application Development course at the University of Tartu.

The project has evolved from a static website into a more interactive application featuring dynamic content rendering, modular JavaScript, an interactive profile dropdown, and JSON-based data fetching.

## Features

- **Dynamic Content Rendering** – Posts are fetched from a local JSON file and dynamically added to the DOM using the Fetch API and `DocumentFragment`.
- **Modular JavaScript** – Application logic is separated into dedicated modules for post rendering, like functionality, and dropdown interactions.
- **Interactive Profile Dropdown** – Displays user information and a logout link. The menu closes when clicking outside of it and includes smooth CSS animations.
- **Like Buttons** – Clicking a like button increases the displayed count for the corresponding post.
- **Image Handling** – Post images are loaded using URLs stored as strings in the JSON data. Image elements are created only when a valid URL is available.
- **Material Symbols** – Google Material Symbols are used for the profile icon.
- **Responsive Design** – Flexbox and CSS media queries adapt the layout to different screen sizes, including hiding side panels on mobile devices.

## Project Structure

```text
SnatchPost/
└── app/
    ├── pages/
    │   ├── index.html          # Home page (dynamic feed)
    │   ├── addPost.html        # Add Post form
    │   └── login.html          # Login form
    │
    └── shared/
        ├── assets/             # Local images (if any)
        │
        ├── config/
        │   └── endpoints.js    # API and JSON endpoint configuration
        │
        ├── data/
        │   └── posts.json      # Local JSON data
        │
        ├── scripts/
        │   ├── loadPosts.js    # Fetching and rendering posts
        │   ├── countLikes.js   # Like button functionality
        │   └── dropdown.js     # Profile dropdown interactions
        │
        └── styles/
            ├── base.css        # Reset and global typography
            ├── headerfooter.css# Header, footer, and dropdown styles
            ├── feed.css        # Post feed layout and cards
            ├── forms.css       # Login and Add Post forms
            ├── utilities.css   # Helper classes
            └── responsive.css  # Responsive layouts and media queries
```

## Getting Started

### Prerequisites

- Python 3
- A modern web browser

### Running Locally

Since the project uses **ES Modules** (`import` / `export`) and the **Fetch API**, opening `index.html` directly through the `file://` protocol will not work correctly because of browser security restrictions.

A local development server is required.

1. Open a terminal in the project root directory.

2. Start the Python HTTP server:

   ```bash
   python -m http.server 8000
   ```

3. Open the application in your browser:

   [http://localhost:8000/app/pages/index.html](http://localhost:8000/app/pages/index.html)

## Data Configuration

The application currently uses a local `posts.json` file to provide consistent data during development and testing.

The available endpoints are configured in:

```text
app/shared/config/endpoints.js
```

To switch between local and remote data sources, update the endpoint used in `app/shared/scripts/loadPosts.js`:

- `ENDPOINTS.postsLocal` – Local JSON file (default).
- `ENDPOINTS.postsRemote` – Remote endpoint.

## CSS Selectors

The project demonstrates the use of different CSS selector types:

| Selector Type    | Example                    | Purpose                                                           |
| ---------------- | -------------------------- | ----------------------------------------------------------------- |
| Pseudo-class     | `.site-header nav a:hover` | Changes navigation link styling on hover.                         |
| Descendant       | `.site-header nav a`       | Selects navigation links inside the header.                       |
| Child            | `.post > p`                | Selects paragraphs that are direct children of a post.            |
| Adjacent sibling | `.post-image + p`          | Selects a paragraph immediately following a post image.           |
| General sibling  | `.post p ~ .like-icon`     | Selects a like icon preceded by a paragraph with the same parent. |

## Manual Testing

The following checks can be performed to verify the application's functionality:

- Navigate between all three pages using the navigation links.
- Check hover effects on navigation links and the profile icon.
- Open and close the profile dropdown by clicking the profile icon.
- Verify that the dropdown closes when clicking outside of it.
- Click like buttons and confirm that the displayed count increases.
- Verify that posts are dynamically rendered on the home page.
- Confirm that post images load correctly.
- Test login form validation with empty fields and invalid email addresses.
- Inspect the layout at desktop and mobile screen sizes using browser developer tools.
- Confirm that side panels are hidden on mobile screens.
- Validate all HTML files using the [W3C HTML Validator](https://validator.w3.org/).

## Project Limitations

SnatchPost is a **frontend-only application** developed for educational purposes.

Although content rendering and user interactions are dynamic, the project does not include:

- Real user authentication.
- Actual image or file uploads.
- Backend integration or database storage.
- Persistent storage for likes or newly created posts.

These features are outside the scope of the current assignment.

---

**Technologies:** HTML5 · CSS3 · Vanilla JavaScript · JSON · Python HTTP Server

**Course:** Web Application Development
**University:** University of Tartu
