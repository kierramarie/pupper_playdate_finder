import axios from 'axios';

export const state = () => {
    return {
        username: "",
        password: "",
        email: "",
        parentName: "",
        petName: "",
        parentBirthday: "",
        petBirthday: "",
        bio: "",
        city: "",
        valtio: ""
    }
}

export const getters = {
    getLocation (state) {
        return state.city + ", " + state.valtio
    }
}

export const mutations = {
    setUsername (state, newUsername) {
        state.username = newUsername;
    },

    setPassword (state, newPassword) {
        state.password = newPassword;
    },

    setEmail (state, newEmail) {
        state.email = newEmail;
    },

    setParentName (state, newParentName) {
        state.parentName = newParentName;
    },

    setPetName (state, newPetName) {
        state.petName = newPetName;
    },

    setParentBirthday (state, newParentBirthday) {
        state.parentBirthday = newParentBirthday;
    },

    setPetBirthday (state, newPetBirthday) {
        state.petBirthday = newPetBirthday;
    },

    setCity (state, newCity) {
        state.city = newCity;
    },

    setState(state, newValtio) {
        state.valtio = newValtio;
    },

    setBio (state, newBio) {
        state.bio = newBio;
    }

}

export const actions = {
    async register ({ dispatch, state }) {
        let data = {}
        data = {
            username: state.username,
            password: state.password,
            email: state.email,
            parentName: state.parentName,
            petName: state.petName,
            parentBirthday: state.parentBirthday,
            petBirthday: state.petBirthday,
            bio: state.bio,
            city: state.city, 
            state: state.valtio
        }
        const res = await axios.post('/api/users', data)
        if (res.status === 201) {
            dispatch('users/login', { 
                username: state.username, 
                password: state.password
            }, {root:true})
            dispatch('reset')
        }
    },

    reset ({commit}) {
        commit('setUsername',"")
        commit('setPassword',"")
        commit('setEmail',"")
        commit('setParentName',"")
        commit('setPetName',"")
        commit('setParentBirthday',"")
        commit('setPetBirthday',"")
        commit('setBio',"")
        commit('setCity',"")
        commit('setState',"")
    }
}