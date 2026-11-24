# SnatchPost

SnatchPost is a responsive single-page feed application built with **Vue 3**, **Vue Router**, **Vuex**, and **Vite**.

This project was developed for the Web Application Development course at the University of Tartu.

## Features

- Loads posts from local JSON files in pages.
- Automatically loads more posts while scrolling or through a load-more button.
- Updates and persists like counts in the browser's `localStorage`.
- Allows users to create a new post with text and a local image.
- Includes login, signup, and add-post pages.
- Closes the profile menu when clicking outside it.
- Adapts to mobile and desktop screen sizes.

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Vue 3
- Vue Router
- Vuex
- Vite
- JSON

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── posts/
│       ├── page-1.json
│       ├── page-2.json
│       └── page-3.json
└── postit-vue/
    └── src/
        ├── app/              # App setup, router, and store
        ├── pages/            # Home, add-post, login, and signup pages
        ├── widgets/          # Header, footer, and reset-likes widget
        └── shared/           # Components, styles, and shared configuration
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Post feed |
| `/add-post` | Create a post |
| `/login` | Log in |
| `/signup` | Create an account |

## Run Locally

### Requirements

- Node.js
- npm

### Installation and development server

```bash
npm install
npm run dev
```

Vite prints the local server address in the terminal. It is usually `http://localhost:5173/`.

## Build

```bash
npm run build
```

The production files are generated in the `dist/` directory.

Preview the production build:

```bash
npm run preview
```

## Deploy to GitHub Pages

The project uses `/veebirakenduse-loomine/` as its base path. To build and publish it, run:

```bash
npm run deploy
```

This command builds the application and publishes the contents of `dist/` to the `gh-pages` branch.

## Post Data

The first data page is loaded from `public/posts/page-1.json` when the Vuex store is created. Additional pages are loaded dynamically from `posts/page-N.json`.

The page size and post data addresses are configured in:

```text
postit-vue/src/shared/config/endpoints.js
```

Like counts are stored in the browser under the key `snatchpost-like-counts`.

## CSS Selectors

The project demonstrates the use of different CSS selector types:

| Selector Type    | Example                    | Purpose                                                           |
| ---------------- | -------------------------- | ----------------------------------------------------------------- |
| Pseudo-class     | `.site-header nav a:hover` | Changes navigation link styling on hover.                         |
| Descendant       | `.site-header nav a`       | Selects navigation links inside the header.                       |
| Child            | `.post > p`                | Selects paragraphs that are direct children of a post.            |
| Adjacent sibling | `.post-image + p`          | Selects a paragraph immediately following a post image.           |
| General sibling  | `.post p ~ .like-icon`     | Selects a like icon preceded by a paragraph with the same parent. |

## Limitations

This is a frontend demo: login and signup do not provide real authentication, and posts are not sent to or stored in a database. Newly created posts remain available until the page is refreshed. Like counts are stored in `localStorage`.
