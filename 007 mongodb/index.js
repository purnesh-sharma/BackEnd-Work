const {MongoClient} = require('mongodb');

const dbname = 'db_109_test';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const connect = async ()=>{
    await client.connect();
    const db = client.db(dbname);

    return db;
};

// single data incert
const insertData = async ()=>{
    const db = await connect();
    const collection = db.collection('users');

    const response = await collection.insertOne({
        name: "john",
        age: 30
    })
    console.log(response);
}

// insertData();


// Many data incert

const insertManyData = async ()=>{
    const db = await connect();
    const collection = db.collection('users');

    const response = await collection.insertMany([
        {
            name: "john",
            age: 30
        },
        {
            name:"smith",
            age:25
        },
        {
            name: "purnesh",
            age:20,
            contact:"purnesh@gmail.com"
        }
    ])
    console.log(response);
}

// insertManyData();

const readData = async ()=>{
    const db = await connect();
    const collection = db.collection('users');

    const response = await collection.find({}).toArray()
    console.log(response);
}
// readData();

const updateData = async ()=>{
    const db = await connect();
    const collection = db.collection('users');

    const response = await collection.updateOne(
        {
            name:'john'
        },
        {
            $set:{
                age:50,
                contact:"john@gmail.com"
            }
        }
    )
    console.log(response);
}

// updateData();

const deleteData = async ()=>{
    const db = await connect();
    const collection = db.collection('users');

    const response = await collection.deleteOne({age:30})
    console.log(response);
}

// deleteData();