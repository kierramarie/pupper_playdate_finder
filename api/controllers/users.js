const users = require('../database/users')
const liked = require('../database/liked')

module.exports = function (pool) {
	return {
		async createUser (req, res) {
			const { username, password, parentName, petName, parentBirthday, petBirthday, bio, email, city, state } = req.enforcer.body
			const userId = await users.createUser(pool, username, password, parentName, petName, parentBirthday, petBirthday, bio, email, city, state)
			if (userId) {
				res.set('location', '/api/users/' + userId)
					.enforcer
					.status(201)
					.send()
			} else {
				res.enforcer.status(409).send()
			}
		},

		async updateUser (req, res) {
			const data = req.enforcer.body
			const { userId } = req.enforcer.params

			const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let user = await users.getUser(client, userId)
				if (user === undefined) {
					res.enforcer.status(404).send()
				} else if (user.user_id !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await users.updateUser(client, userId, data)
					res.enforcer.status(200).send()
				}
				await client.query('COMMIT')
			} catch (e) {
				await client.query('ROLLBACK')
				throw e
			} finally {
				client.release()
			}
		},

		async deleteUser (req, res) {
			const {user_id} = req.enforcer.params
            let success = await users.deleteUser(pool, user_id)
            if (success === 1) {
                res.enforcer.status(204).send()
            }
            else {
                res.enforcer.status(500).send()
            }
		},

		async getNearbyUsers (req, res) {
			const { userId, city, state } = req.enforcer.body
			let returnedUsers = await users.getNearbyUsers(pool, city, state, userId)
			if (returnedUsers === undefined) {
				res.enforcer.status(400).send()
			}
			else {
				const result = await liked.alreadySeen(pool, userId)
				result.forEach(like => {
					returnedUsers = returnedUsers.filter(other => other.user_id != like.liked_user_id)
				});
				res.enforcer.status(200).send(returnedUsers)
			}
		},

		async getUser(req, res) {
			const {userId} = req.enforcer.params
			let returnedUser = await users.getUser(pool, userId)
			if (returnedUser === undefined) {
				res.enforcer.status(400).send()
			}
			else {
				res.enforcer.status(200).send(returnedUser)
			}
		},

		async uploadPicture (req, res) {

		},

		async deletePicture (req, res) {

		}
	}
}