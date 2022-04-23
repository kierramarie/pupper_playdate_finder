const uuid = require('uuid').v4

exports.createChat = async function (client, user_id, liked_user_id, user1_name, user2_name) {
    const chat_id = uuid()
    const { rowCount } = await client.query({
        name: 'create-chat',
        text: 'INSERT INTO chats (chat_id, user_id1, user_id2, user1_name, user2_name, user1_messages, user2_messages) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING',
        values: [
            chat_id, 
            user_id, 
            liked_user_id,
            user1_name, 
            user2_name,
            [],
            []

        ]
    })
    return rowCount > 0 ? chat_id : undefined
}

exports.addMessage = async function (client, chat_id, num, messages) {
    const { rows } = await client.query({
        name: 'update-chat',
        text: 'UPDATE users SET user' + num + '_messages=$1 WHERE chat_id=$2 RETURNING *',
        values: [
            JSON.stringify(messages),
            chat_id
        ]
    })
}

exports.getChats = async function (client, userId) {
    const { rows } = await client.query({
        name: 'get-chats',
        text: 'SELECT * FROM chats WHERE user_id1=$1 OR user_id2=$1',
        values: [userId]
    })
    return rows.length > 0 ? rows : undefined
}

exports.getChat = async function (client, chat) {
    const { rows } = await client.query({
        name: 'get-chat',
        text: 'SELECT * FROM chats WHERE chat_id=$1',
        values: [chat]
    })
    return rows.length > 0 ? rows[0] : undefined
}

exports.updateChat = async function (client, chat_id, data) {
    const { user1_messages, user2_messages, user1_name, user2_name } = data
    const values = []
    const sets = []

    if (user1_messages !== undefined) {
        values.push(JSON.stringify(user1_messages))
        sets.push('user1_messages=$' + values.length)
    }

    if (user2_messages !== undefined) {
        values.push(JSON.stringify(user2_messages))
        sets.push('user2_messages=$' + values.length)
    }

    if (user1_name !== undefined) {
        values.push(user1_name)
        sets.push('user1_name=$' + values.length)
    }

    if (user2_name !== undefined) {
        values.push(user2_name)
        sets.push('user2_name=$' + values.length)
    }

    values.push(chat_id)
    const { rows } = await client.query({
        name: 'update-chat',
        text: 'UPDATE chats SET ' + sets.join(', ') + ' WHERE chat_id=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows.length === 1 ? rows[0] : undefined
}

exports.deleteChat = async function (client, chat_id) {
    const { rowCount } = await client.query({
        name: 'delete-chat',
        text: 'DELETE FROM chats WHERE chat_id=$1',
        values: [chat_id]
    })
    return rowCount
}