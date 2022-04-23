const chats = require('../database/chats')

module.exports = function (pool) {
	return {
        async getUserChats(req, res) {
            const {user_id} = req.enforcer.body
            let returnedChats = await chats.getChats(pool, user_id)
            if (returnedChats === undefined) {
                res.enforcer.status(200).send([])
            }
            else {
                res.enforcer.status(200).send(returnedChats)
            }
        },

        async getChat(req, res) {
            const {chat_id} = req.enforcer.params
            let returnedChat = await chats.getChat(pool, chat_id)
            if (returnedChat === undefined) {
                res.enforcer.status(200).send([])
            }
            else {
                res.enforcer.status(200).send(returnedChat)
            }
        },

        async sendMessage(req, res) {
            const {chat_id} = req.enforcer.params
            const {user1_messages, user2_messages} = req.enforcer.body 
                const data  = {user1_messages: user1_messages, user2_messages: user2_messages}
                const result = await chats.updateChat(pool, chat_id, data)
                if (result !== undefined) {
                    res.status(200).send()
                }
                else {
                    res.status(500).send()
                }
        },

        async createChat(req, res) {

        },

        async updateChat(req, res) {

        },

        async deleteChat(req, res) {
            const {chat_id} = req.enforcer.params
            let success = await chats.deleteChat(pool, chat_id)
            if (success === 1) {
                res.enforcer.status(204).send()
            }
            else {
                res.enforcer.status(500).send()
            }
        }
    }
}