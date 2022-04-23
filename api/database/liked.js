exports.likeUser = async function (client, user_id, liked_user_id) {
    const { rowCount } = await client.query({
        name: 'like-user',
        text: 'INSERT INTO liked (user_id, liked_user_id, is_liked) VALUES ($1, $2, true) ON CONFLICT DO NOTHING',
        values: [
            user_id, 
            liked_user_id
        ]
    })
    return rowCount
}

exports.checkMatch = async function (client, user_id, other_id) {
    const { rowCount } = await client.query({
        name: 'check-match',
        text: 'SELECT * FROM liked WHERE user_id = $1 AND liked_user_id = $2 AND is_liked = true',
        values: [ 
            user_id,
            other_id
        ]
    })
    return rowCount
}

exports.alreadySeen = async function (client, user_id) {
    const { rows } = await client.query({
        name: 'already-seen',
        text: 'SELECT * FROM liked WHERE user_id = $1',
        values: [ 
            user_id
        ]
    })
    return rows
}

exports.deleteLiked = async function (client, id) {
    const { rowCount } = await client.query({
        name: 'delete-user',
        text: 'DELETE FROM liked WHERE id=$1',
        values: [id]
    })
    return rowCount
}

exports.dislikeUser = async function (client, user_id, disliked_user_id) {
    const { rowCount } = await client.query({
        name: 'dislike-user',
        text: 'INSERT INTO liked (user_id, liked_user_id, is_liked) VALUES ($1, $2, false) ON CONFLICT DO NOTHING',
        values: [
            user_id, 
            disliked_user_id
        ]
    })
    return rowCount
}