const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

const db = mongoose.connect;

db('mongodb://127.0.0.1:27017/yelp-camp').then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('Connection error:', err);
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your author id
            author: '67f728678f562c0e8f41de8d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia vitae voluptatibus porro pariatur labore culpa ullam cupiditate qui, nesciunt, voluptate optio error itaque, assumenda eligendi debitis provident quibusdam quidem repudiandae!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
              },
            images: [
                {
                    url: 'https://res.cloudinary.com/disahqe1x/image/upload/v1744865951/YelpCamp/o1pxfembjx0cysksdp5o.jpg',
                    filename: 'YelpCamp/o1pxfembjx0cysksdp5o',
                },
                {
                    url: 'https://res.cloudinary.com/disahqe1x/image/upload/v1744612565/YelpCamp/epya3vgoymq9dtjb2046.jpg',
                    filename: 'YelpCamp/epya3vgoymq9dtjb2046'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})