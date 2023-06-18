export const envValues = {
  isServer: typeof window === 'undefined',
  NODE_ENV: process.env.NODE_ENV,
}
