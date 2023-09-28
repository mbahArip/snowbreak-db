# Snowbreak-db

<p align="center">
  <img src="public/img/banner.webp" alt="Banner">
</p>

Game database for **Snowbreak: Containment Zone**.
It contains all the information about the game, such as operatives, weapons, and logistics.

## Status
This project will be on hold.  
Because all string data that contains dynamic value (Like damage, cooldown, etc) seems like it stored on their server.  
Until i found out how I can get the value, I'm gonna working on another project. (If you know how to get the string dynamic value, please create a new issue or contact me at discord @mbaharip)

## Consuming the API

The API is available at `https://snowbreak-db.mbaharip.com/api/v1/`  
Rate limit is **250 requests per minute**.

> All endpoints are prefixed with `/api/v1/`  
> Spaces in the URL are replaced with dashes (`-`). (Example: `fritia/little sunshine` becomes `fritia/little-sunshine`)  
> Special characters in the URL are removed. (Example: `acacia/[redacted]` becomes `acacia/redacted`)

### Operatives

- `GET /operatives` - Get all operatives. Will return an array of simplified operative data.
- `GET /operatives/:name` - Get operatives by name. Will return an array of simplified operative data if there are multiple operatives with the same name.
- `GET /operatives/:name/:title` - Get specific operative by name and title. Will return detailed data of the operative. (Example: `/acacia/redacted`, `/acacia/kaguya`)

### Weapons

Still in development.

### Logistics

Still in development.

## Deploying your own instance

You can use `Vercel` to deploy your own instance of this API.  
(You can also use other hosting services, but this guide will only cover Vercel)

- Fork this repository
- Create a new project in Vercel
- Connect your forked repository to the project
- Deploy the project
- Done!

## Contributing

You can contribute to this project by adding new data or fixing existing data.

### Adding new data

To add new data, you can create a new file in the `db/:category` directory.  
Inside each directory already a `_template` folder that you can use as a template.  
After you're done, you can create a pull request to this repository.  
I'll review the data before merging it to the main branch.

### Fixing existing data

If you find any errors in the data, you can create a pull request to this repository to fix it.
Or you can create an issue pointing out the error, and I'll fix it as soon as possible.
