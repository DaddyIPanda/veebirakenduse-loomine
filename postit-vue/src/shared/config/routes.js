// Paths of the pages, in one place: the router and the pages that
// link to each other. Pages cannot import from src/app (imports only go
// down the layers), which is why the paths live in shared.
export const ROUTES = Object.freeze({
  home: '/',
  add: '/add-post',
  login: '/login',
})
