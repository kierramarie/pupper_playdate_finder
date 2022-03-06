export default function({ redirect, store }) {
    const isAuthenticated = store.state.users.user ? true : false
    if (!isAuthenticated) {
      redirect({ name: 'login' })
    }
  }