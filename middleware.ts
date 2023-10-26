export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/api/auth', '/objetivos', '/seguimiento', '/entregas'],
}
