import axios from 'axios';

export const state = () => {
    return {
        userId: getUserFromCookie(),
        user: {}
    }
}

export const mutations = {
    setUser (state, user) {
        state.user = user
    },

    setUserId(state, userId) {
        state.userId = userId
    }
}

export const getters = {
}

export const actions = {
    async login ({ commit, dispatch }, { username, password }) {
        const res = await axios.post('/api/authentication/login', {
            username,
            password
        })
        if (res.status === 200) {
            const u = await dispatch('retrieveUser')
            commit('setUserId', getUserFromCookie())
            this.$router.push('/')
        }
    },

    async logout ({ commit }) {
        const res = await axios.put('/api/authentication/logout')
        if (res.status === 200) {
            commit("setUserId", null)
            commit('setUser', null)
            this.$router.push('/login')
        }
    },

    async retrieveUser ({state, commit}) {
        if (state.user === undefined || state.user === {} || state.user === null) {
            let str = 'api/users/' + getUserFromCookie()
            const res = await axios.get(str)
            if (res.status === 200) {
                let data = res.data;
                commit('setUser', data)
            }
        }
        return state.user
    }
}

// Check if the user cookie is set and if so get the cookie value.
// This cookie is set in addition to the session cookie when the user
// authenticated, but this cookie is made accessible to the browser's
// JavaScript.
function getUserFromCookie () {
    const re = new RegExp("user=%22([^;]+)%22") 
    const value = re.exec(document.cookie)
    return value != null ? unescape(value[1]) : null
}