// Keeps the remote and local post data URLs in one shared configuration.
export const ENDPOINTS = {
    postsRemote: 'https://jsonhost.com/json/94dbc58ab090aff0e16f39d3372da973',
    postsPage: (page) => `${import.meta.env.BASE_URL}posts/page-${page}.json`,
    postsPageSize: 5,
}
