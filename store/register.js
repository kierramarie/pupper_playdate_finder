export const state = () => {
    return {
        username: "",
        password: "",
        email: "",
        parentName: "",
        petName: "",
        parentBirthday: "",
        petBirthday: "",
        location: "",
        bio: "",
        tags: []
    }
}

export const getters = {
    getTags (state) {
        return state.tags.sort();
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
        state.parentName = newPetName;
    },

    setParentBirthday (state, newParentBirthday) {
        state.parentName = newParentBirthday;
    },

    setPetBirthday (state, newPetBirthday) {
        state.parentName = newPetBirthday;
    },

    setLocation (state, newLocation) {
        state.parentName = newLocation;
    },

    setBio (state, newBio) {
        state.parentName = newBio;
    },

    setTags (state, newTags) {
        state.parentName = newTags;
    },
    
    addTag (state, newTag) {
        state.tags.push(newTag);
    }

}

export const actions = {
    async register ({ commit, state }) {
        const res = await axios.post('/api/users', {
            username: state.username,
            password: state.password,
            email: state.email,
            parentName: state.parentName,
            petName: state.petName,
            parentBirthday: state.parentBirthday,
            petBirthday: state.petBirthday,
            location: state.location,
            bio: state.bio,
            tags: state.getters.getTags 
        })
        if (res.status === 200) {
            this.$store.dispatch('users/login', {
                username: this.state.username,
                password: this.state.password
          })
        }
    }
}