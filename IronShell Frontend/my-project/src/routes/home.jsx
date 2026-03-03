import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  beforeLoad: () => {
    // This instantly moves the user from /home to /
    throw redirect({
      to: '/',
    })
  },
})

