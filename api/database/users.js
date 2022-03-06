const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4

exports.createUser = async function (client, username, password, parentName, petName, parentBirthday, petBirthday, bio, email, location, tags) {
    const userId = uuid()
    const salt = await bcrypt.genSalt(10)
    const { rowCount } = await client.query({
        name: 'create-user',
        text: 'INSERT INTO users (user_id, username, password, parent_name, pet_name, parent_birthday, pet_birthday, bio, email, location, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT DO NOTHING',
        values: [
            userId,
            username,
            await bcrypt.hash(password, salt),
            parentName, 
            petName, 
            parentBirthday, 
            petBirthday, 
            bio, 
            email, 
            location, 
            tags
        ]
    })
    return rowCount > 0 ? userId : undefined
}

exports.getUser = async function (client, userId) {
    const { rows } = await client.query({
        name: 'get-user-by-id',
        text: 'SELECT * FROM users WHERE user_id=$1',
        values: [userId]
    })
    return rows[0]
}

exports.getUserByUsername = async function (client, username) {
    const { rows } = await client.query({
        name: 'get-user-by-username',
        text: 'SELECT * FROM users WHERE username=$1',
        values: [username]
    })
    return rows[0]
}

exports.updateUser = async  function (client, userId, data) {
    // create dynamic query based on inputs
    const { username, password, parentName, petName, bio, email, location} = data
    const values = []
    const sets = []
    const salt = await bcrypt.genSalt(10)

    if (username !== undefined) {
        values.push(username)
        sets.push('username=$' + values.length)
    }

    if (password !== undefined) {
        values.push(await bcrypt.hash(password, salt))
        sets.push('password=$' + values.length)
    }

    if (parentName !== undefined) {
        values.push(parentName)
        sets.push('parent_name=$' + values.length)
    }

    if (petName !== undefined) {
        values.push(petName)
        sets.push('pet_name=$' + values.length)
    }

    if (bio !== undefined) {
        values.push(bio)
        sets.push('bio=$' + values.length)
    }

    if (email !== undefined) {
        values.push(email)
        sets.push('email=$' + values.length)
    }

    if (location !== undefined) {
        values.push(location)
        sets.push('location=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getUser(client, userId)

    values.push(userId)
    const { rows } = await client.query({
        name: 'update-user',
        text: 'UPDATE users SET ' + sets.join(', ') + ' WHERE user_id=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows[0]
}

exports.deleteUser = async function (client, userId) {
    const { rowCount } = await client.query({
        name: 'delete-user',
        text: 'DELETE FROM users WHERE user_id=$1',
        values: [userId]
    })
    return rowCount > 0
}