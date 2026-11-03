import { ENDPOINTS } from '../config/endpoints.js';
import { likePost } from './countLikes.js';

// Fetches the array of posts from the server.
async function fetchPosts() {
    // Use local data to avoid CORS issues during development.
    const response = await fetch(ENDPOINTS.postsLocal);
    // const response = await fetch(ENDPOINTS.postsRemote);

    // Check if the HTTP request was successful.
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

// Acts as the main entry point connecting data to the UI.
async function initApp() {
    const postsContainer = document.querySelector('.posts-list');
    
    // Always check if the target DOM element exists before using it.
    if (!postsContainer) {
        console.error('Container ".posts-list" was not found in the DOM.');
        return;
    }

    postsContainer.innerHTML = '<p>Loading posts...</p>';

    try {
        const posts = await fetchPosts();
        
        // Ensure the API actually returned an array to prevent crashes.
        if (!Array.isArray(posts)) {
            throw new Error('Data format is invalid. Expected an array of posts.');
        }

        postsContainer.innerHTML = ''; 
        renderPosts(posts, postsContainer);
        
    } catch (error) {
        console.error('Failed to load posts:', error);
        postsContainer.innerHTML = '<p class="error-msg" style="color:red;">Error loading posts. Check console for details.</p>';
    }
}

// Sorts the posts and renders them into the container.
function renderPosts(posts, container) {
    // Sort posts by date in descending order (newest first).
    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        
        // Prevent broken dates from crashing the sort function.
        const validA = isNaN(dateA) ? 0 : dateA;
        const validB = isNaN(dateB) ? 0 : dateB;

        return validB - validA;
    });

    // Use DocumentFragment to batch DOM updates and prevent page reflows.
    const fragment = document.createDocumentFragment();
    
    sortedPosts.forEach(post => {
        fragment.appendChild(createPostCard(post));
    });

    container.appendChild(fragment);
}

// Creates the DOM element for a single post card.
function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'post';

    // Build the post header (avatar and author name).
    const header = document.createElement('header');
    header.className = 'post-header';

    if (post.avatar) {
        const avatar = document.createElement('img');
        avatar.className = 'post-avatar';
        avatar.src = post.avatar;
        // Add a fallback name if the author field is missing.
        avatar.alt = `${post.author || 'User'}'s avatar`; 
        avatar.width = 32;
        avatar.height = 32;
        header.appendChild(avatar);
    }

    const authorName = document.createElement('span');
    authorName.textContent = post.author || 'Anonymous'; 
    header.appendChild(authorName);
    article.appendChild(header);

    // Render the image only if the post contains an image URL.
    if (post.image) {
        const img = document.createElement('img');
        img.className = 'post-image';
        img.src = post.image;
        img.alt = `Image posted by ${post.author || 'user'}`; 
        // Lazy loading improves performance for long pages.
        img.loading = 'lazy'; 
        article.appendChild(img);
    }

    // Set the post text, providing a fallback if the text is missing.
    const text = document.createElement('p');
    text.textContent = post.text || 'No content provided.'; 
    article.appendChild(text);

    article.appendChild(createLikeButton());

    // Set the post date and make it machine-readable for accessibility.
    const time = document.createElement('time');
    if (post.createdAt) {
        time.dateTime = post.createdAt; 
        time.textContent = formatDate(post.createdAt);
    } else {
        time.textContent = 'Unknown date';
    }
    article.appendChild(time);

    return article;
}

// Creates the "Like" button with its event listener.
function createLikeButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'like-icon';
    button.setAttribute('aria-label', 'Like this post');
    button.innerHTML = '👍 <span>0</span>';
    
    // This keeps HTML clean and separates logic from markup.
    button.addEventListener('click', () => likePost(button));
    
    return button;
}

// Converts an ISO date string into a human-readable format.
function formatDate(isoString) {
    const date = new Date(isoString);
    
    // Return the original string if the date is invalid.
    if (isNaN(date.getTime())) return isoString;
    
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Initialize the application once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', initApp);
