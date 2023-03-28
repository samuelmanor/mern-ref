const mongoose = require('mongoose');

// to use: % node mongo.js b2d6eAloLE3oSotI [name] [number]

const password = process.argv[2];

const url = 
    `mongodb+srv://samuelmmanor:${password}@cluster0.gtzeof4.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
});

if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    });
} else if (process.argv.length === 3) {
    console.log('phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        });
        mongoose.connection.close();
    });
};