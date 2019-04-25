import apicache from 'apicache'
import { AsyncRouter } from 'express-async-router'
import { transporter } from '../mailer'
import { Exercise, Workout } from '../models'

export default (ctx) => {
	
let cache = apicache.middleware
const api = AsyncRouter()

api.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
	next()
})

	api.all('/', () => ({ version: '0.3' }))


/* Authentication Routes */

	api.all('/validate', ctx.middlewares.Auth.validate)
	api.post('/signup', ctx.middlewares.Auth.signup)
	api.post('/login', ctx.middlewares.Auth.login)

	/* Exercises Routes */

	api.get('/exercises(/:id)?', async (req, res) => {
		let id = req.params.id
		if (id) {
		const exercise = await Exercise.findAll({
			where: { id },
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		})
		res.status(200).send(exercise)
	} else {
		const exercise = await Exercise.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		})
		res.status(200).send(exercise)
	}

})
	api.post('/exercises', async (req, res) => {
		if (req.body.name) {
			const exercise = await Exercise.build({
				name: req.body.name,
				description: req.body.description,
				goal: req.body.goal,
			})

			exercise.save().then().catch(
				(e) => {
					console.log(e.message)
				})

			res.status(200).send({ message: `exercise successfully created at ${new Date()}` })
		} else {
			res.status(400).send({message: 'improper params'})
		}

	})

	api.put('/exercises/:id', async (req, res) => {
		let id = req.params.id
		let { goal, description, name } = req.body
		let message = `exercise successfully updated at ${new Date()}`

		if (id && name && goal && description) { Exercise.update(
			{ name, goal, description },
			{ returning: true, where: { id } }
		)
		.then(([ rowsUpdate, [updated] ]) => {
		})
	.catch((err) => {
			console.log(err)
		})
		res.status(200).send({ message })
	} else {
		message = `bad request`
		res.status(400).send({ message })
	}
	})

	api.delete('/exercises/:id', async (req, res) => {
		let id = req.params.id
		Exercise.destroy({
			where: {
				id
			}
		})
	})

/* Workouts Routes*/

	api.get('/workouts(/:uuid)?', async (req, res) => {
			let id = req.params.id
			let uuid = req.params.uuid
			if (id) {
		const workouts = await Workout.findAll({
			where: { id },
			attributes: { exclude: ['updatedAt'] },
		})
			res.status(200).send(workouts)
		} else {
		const workouts = await Workout.findAll({
			where: { userId: uuid },
			attributes: { exclude: ['updatedAt'] },
			include: {model: Exercise}
		})
			res.status(200).send(workouts)			
		}

	})
	
	api.post('/workouts', async (req, res) => {
		let { eid, uid, description, trainer } = req.body
		if (req.body.started && req.body.ended) {
			const workout = await Workout.build({
				start_time: req.body.started,
				end_time: req.body.ended,
				calories_burnt: req.body.calories_burnt,
				trainer,
				description,
				exerciseId : eid,
				userId: uid
			})

			workout.save().then().catch(
				(e) => {
					console.log(e.message)
					res.status(400).send({message: e.message})
				})

			res.status(200).send({ message: `workout successfully created at ${new Date()}` })
		} else {
			res.status(400).send({message: 'improper params'})
		}

	})

	api.put('/workouts/:id', async (req, res) => {
		let id = req.params.id
		let { eid, uid, description, name } = req.body
		let message = `workout successfully updated at ${new Date()}`

		if (name  && eid && uid) { Workout.update(
			{ name, goal, description },
			{ returning: true, where: { id } }
		)
		.then(([ rowsUpdate, [updated] ]) => {
		})
	.catch((err) => {
			console.log(err)
		})
		res.status(200).send({ message })
	} else {
		message = `bad request`
		res.status(400).send({ message })
	}
	})

	api.delete('/workouts/:id', async (req, res) => {
		let id = req.params.id
		Workout.destroy({
			where: {
				id
			}
		})
	})

	/* Share */

	api.post('/share', async (req, res) => {
		let email = req.body.email
		let message = `did great workout`
		var mailOptions = {
			from: 'fitness tracker',
			to: email,
			subject: 'chekout my fit',
			text: message
		}
		if (email) {
		try {
			let info = await transporter.sendMail(mailOptions)
			console.log(info.response)
		} catch (err) {
			console.log(err)
		}
	}
})
	return api
}