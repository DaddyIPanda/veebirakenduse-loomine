// Counts are kept only for the current page visit.
function likePost(button) {
    const likes = button.querySelector("span");
    likes.textContent = Number(likes.textContent) + 1;
}
