// Resolves a file in public/ against the deploy base
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`
