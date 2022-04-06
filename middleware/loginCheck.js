export default function({ redirect, store }) {
    const isAuthenticated = store.state.users.userId != null && store.state.users.userId != "" ? true : false
    if (isAuthenticated) {
        redirect({ name: 'index' })
    }
  }