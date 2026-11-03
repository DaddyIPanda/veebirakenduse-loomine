// Counts are kept only for the current page visit.
function likePost(button) {
    const likes = button.querySelector("span");
    if (likes) {
        const currentCount = Number(likes.textContent);
        const safeCount = isNaN(currentCount) ? 0 : currentCount;
        likes.textContent = String(safeCount + 1);
    }
}
