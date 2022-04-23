import axios from 'axios';

export const state = () => {
    return {
        user: {},
        currentChatId: "",
        currentNum: -1,
        otherNum: -1,
        currentMessages: [],
        otherMessages: [],
        otherName: ""
    }
}

export const mutations = {
    setUser (state, user) {
        state.user = user
    },

    setCurrentChatId(state, id) {
        state.currentChatId = id
    },

    setCurrentNum(state, num) {
        state.currentNum = num
    },

    setCurrentMessages (state, chat) {
        state.currentMessages = chat
    },

    addCurrentMessage(state, message) {
        state.currentMessages.push(message)
    },

    setOtherMessages (state, messages) {
        state.otherMessages = messages
    },

    setOtherNum(state, otherNum) {
        state.otherNum = otherNum
    },

    setOtherName(state, otherName) {
        state.otherName = otherName
    }
}

export const getters = {
}

export const actions = {
    reset({commit}) {
        commit('setUser', {})
        commit('setCurrentChatId', "")
        commit('setCurrentNum', -1)
        commit('setOtherNum', -1)
        commit('setCurrentMessages', [])
        commit('setOtherMessages', [])
        commit('setOtherName',"")
    }

}