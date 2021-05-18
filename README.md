## Photoshare

A Full stack instagram clone developed using NodeJS,Express,MongoDB, React, 

Functionalities include:

* The ability for users to create a post
* The ability for users to like a post
* The ability for users to comment on a post
* The ability for users to follow and unfollow other others
* The ability for an authenticated user to delete a post 

## Tech

* **Frontend**: React
* **State management**: Redux
* **Server state**: React- query
* **Routing**: React Router
* **Backend**: Express
* **Database**: MongoDB
* **Image hosting**: Cloudinary


## Installation

Clone the project

```bash
  git clone https://github.com/kelwaffi/Photoshare
```
## setup
 ### Install dependencies
run this command in both the client and server directory
```bash
  npm install
```
### Environment Variables

To run this project, you will need to add the following environment variables to your .env file
- MONGO_URI= // mongodb://localhost:27017/instaclone
- JWT_SECRET= // random string: 
- CLOUDINARY_API_KEY= // Cloudinary API key
- CLOUDINARY_API_SECRET= // Cloudinary API secret
- CLOUDINARY_CLOUD_NAME= // Cloudinary cloud name
- EMAIL_SERVICE= // Smtp-relay.example.com
- EMAIL_PASSWORD= // Password
- Base_URL= // http://localhost:3000

