# Switch 2 API

Scrapes usage data out of the switch 2 user portal and stores in MongoDB. 
API server is used to support Dashboard with JSON data from MongoDB.

## Usage

#### Run MongoDB
- Run `docker-compose up`

#### Run API server
- Run `cd api`
- Rename `.env.sample` to `.env` and change to your Switch2 `username` and `password`
- Run `npm install && npm satrt` to run API server
- Access `http://localhost:5000/api/updateusage` in your browser to get the data from Switch2 portal

#### Run Usage Dashboard
- Run `cd dashboard`
- Run `npm install && npm satrt` to run your dashboard on 