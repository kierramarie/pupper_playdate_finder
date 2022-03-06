const users = require('../database/users')

module.exports = function (pool) {
	return {
		async createUser (req, res) {
			const { username, password, parentName, petName, parentBirthday, petBirthday, bio, email, location, tags } = req.enforcer.body
			const userId = await users.createUser(pool, username, password, parentName, petName, parentBirthday, petBirthday, bio, email, location, tags)
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
			const { username } = req.enforcer.params
			try {
				await client.query('BEGIN')
				let user = await users.getUserByUsername(client, username)
				if (user === undefined) {
					res.enforcer.status(204).send()
				} else if (user.user_id !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await users.deleteUser(pool, user.id)
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

		async login (req, res) {

		},

		async logout (req, res) {

		},

		async uploadPicture (req, res) {

		},

		async deletePicture(req, res) {

		}	
	}
}