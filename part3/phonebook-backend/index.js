require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');

const app = express();

app.use(express.json());
morgan.token('body', function (req) { return JSON.stringify(req.body); });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}
};

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(persons => {
			if (persons) {
				res.json(persons);
			} else {
				response.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.get('/info', (req, res, next) => {
	Person.countDocuments({})
		.then(count => {
			res.send(
				`
                <p>Phonebook has info for ${count} people.</p>
                <p>${new Date()}</p>
                `
			);
		})
		.catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
	const body = req.body;

	const person = new Person({
		name: body.name,
		number: body.number
	});

	person.save()
		.then(savedNote => res.json(savedNote));
});

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number
	};

	if (!body.name) {
		return res.status(400).json({ error: 'name missing' });
	} else if (!body.number) {
		return res.status(400).json({ error: 'number missing' });
	}

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then(person => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch(error => next(error));

	// or:
	// .then(updatedPerson => res.json(updatedPerson))
	// .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(person => {
			if (person) {
				res.status(204).end();
			} else {
				res.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});