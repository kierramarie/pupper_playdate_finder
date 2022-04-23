const liked = require('../database/liked')
const chats = require('../database/chats')
const users = require('../database/users')

module.exports = function (pool) {
	return {
		async likeUser (req, res) {
            const { user_id, liked_user_id } = req.enforcer.body
            const result = await liked.likeUser(pool, user_id, liked_user_id)
            if (result === 1) {
                const match = await liked.checkMatch(pool, liked_user_id, user_id)
                if (match === 1) {
                    const user1 = await users.getUser(pool, user_id)
                    const user2 = await users.getUser(pool, liked_user_id)
                    const chat_id = await chats.createChat(pool, user_id, liked_user_id, user1.pet_name, user2.pet_name)
                    
                    let user1_chats = user1.chats
                    if (user1_chats === undefined || user1_chats === null||user1_chats.length === 0) { 
                        user1_chats = [{ chat_id: chat_id, num: 1}]
                    }
                    else {
                        user1_chats.push({ chat_id: chat_id, num: 1})
                    }
                    await users.updateUser(pool, user_id, { 
                        chats: user1_chats
                    })

                    let user2_chats = user2.chats
                    if (user2_chats === undefined || user2_chats === null||user2_chats.length === 0) { 
                        user2_chats = [{ chat_id: chat_id, num: 2}]
                    }
                    else {
                        user2_chats.push({ chat_id: chat_id, num: 1})
                    }
                    await users.updateUser(pool, liked_user_id, { 
                        chats: user2_chats
                    })
                    res.status(200).send({matched: true})
                }
                else {
                    res.status(200).send({ matched: false })
                }
            }
            else {
                res.status(500).send()
            }
        },

        async dislikeUser (req, res) {
            const { user_id, disliked_user_id } = req.enforcer.body
            const result = await liked.dislikeUser(pool, user_id, disliked_user_id)
            if (result === 1) {
                res.status(200).send()
            }
            else {
                res.status(500).send()
            }
        },

        async deleteLiked(req, res) {
            const {id} = req.enforcer.params
            let success = await liked.deleteLiked(pool, id)
            if (success === 1) {
                res.enforcer.status(204).send()
            }
            else {
                res.enforcer.status(500).send()
            }
        }
    }
}