import { ENDPOINTS } from '../config/endpoints.js';
import { likePost } from './countLikes.js';

async function loadPosts() {
    const feed = document.querySelector('.feed');
    if (!feed) {
        console.error('Контейнер .feed не найден');
        return;
    }

    feed.innerHTML = '<p>Загрузка постов...</p>';

    try {
        // ============================================================
        // ЗАДАНИЕ 4: удалённый источник
        // ============================================================
        const response = await fetch(ENDPOINTS.postsRemote);

        // ============================================================
        // ЗАДАНИЕ 5: локальный источник
        // Раскомментируйте строку ниже и закомментируйте fetch выше.
        // ============================================================
        //const response = await fetch(ENDPOINTS.postsLocal);

        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }

        const posts = await response.json();

        feed.innerHTML = '';
        renderPosts(posts, feed);
    } catch (error) {
        console.error('Не удалось загрузить посты:', error);
        feed.innerHTML = '<p style="color: red;">Ошибка загрузки постов.</p>';
    }
}

function renderPosts(posts, container) {
    // Новые сверху
    const sorted = [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    for (const post of sorted) {
        container.appendChild(createPostElement(post));
    }
}

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post';

    // --- Автор + аватар ---
    const header = document.createElement('header');
    header.className = 'post-header';

    if (post.avatar) {
        const avatar = document.createElement('img');
        avatar.className = 'post-avatar';
        avatar.src = post.avatar;
        avatar.alt = `Аватар ${post.author}`;
        avatar.width = 32;
        avatar.height = 32;
        header.appendChild(avatar);
    }

    const author = document.createElement('span');
    author.textContent = post.author;
    header.appendChild(author);
    article.appendChild(header);

    // --- Картинка (если есть) ---
    // В JSON только строка-URL (задание 6)
    if (post.image) {
        const img = document.createElement('img');
        img.className = 'post-image';
        img.src = post.image;
        img.alt = 'Изображение поста';
        img.loading = 'lazy';
        article.appendChild(img);
    }

    // --- Текст ---
    const text = document.createElement('p');
    text.textContent = post.text;
    article.appendChild(text);

    // --- Дата ---
    const time = document.createElement('time');
    time.dateTime = post.createdAt;
    time.textContent = formatDate(post.createdAt);
    article.appendChild(time);

    // --- Лайк ---
    const likeBtn = document.createElement('button');
    likeBtn.type = 'button';
    likeBtn.className = 'like-icon';
    likeBtn.setAttribute('aria-label', 'Like this post');
    likeBtn.innerHTML = '👍 <span>0</span>';
    likeBtn.addEventListener('click', () => likePost(likeBtn));
    article.appendChild(likeBtn);

    return article;
}

function formatDate(isoString) {
    const date = new Date(isoString);
    if (isNaN(date)) return isoString;
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

document.addEventListener('DOMContentLoaded', loadPosts);
