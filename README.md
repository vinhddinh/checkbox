## Getting Started

### The assessment questions are answered below, after install instructions.

### 1. Install Git and Node.js
Before you can run the project, you need to install Git and Node.js. You can download them from the following links:
- Install Git following GitHub's guide at https://github.com/git-guides/install-git  
- Install the latest LTS Version of Node.js at https://nodejs.org/en/download/
### 2. Clone the repository
Once you have installed both Git and Node.js: 
- Open where you want to store the repository
- Open PowerShell in that folder (Shift + Right Click -> Open PowerShell window here)
- Clone the repository by running the following command:
```
git clone https://github.com/vinhddinh/checkbox.git
```
### 3. Install dependencies
Now that you have cloned the repository, you need to install the dependencies. To do so, open the `checkbox` folder in PowerShell (Shift + Right Click -> Open PowerShell window here) and run the following command:
```
npm ci
```
### 4. Retrieve secrets
To login, you need to retrieve the secrets from the project owner. Once you have the secrets file, place it in the root of the project (the `checkbox` folder) and rename it to `.env`.
### 5. Set up the database
If you have the `.env` file, you can skip this step. Otherwise, you need to set up the database. To do so, you need a PostgreSQL connection. You can set one up by following the instructions at https://www.postgresqltutorial.com/install-postgresql/. Once you have a connection, put the connection string in the `.env` file in the root of the project (the `checkbox` folder) as follows:
```
DATABASE_URL=postgresql://...
```


To apply prisma migrations, run 
```
npx prisma migrate dev --preview-feature
```

### 6. Run the project
After everything has been installed, you can run the project by running the following command:
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deployment

The `main` branch is set up to automatically deploy to [checkbox.dinh.cc](https://checkbox.dinh.cc) using AWS CodePipeline to an AWS EC2 instance.
Please allow up to 5 minutes for the deployment to update.

## Assessment Questions

### 1. Create a working solution that showcases the above required user stories & addresses the risk identified
Name, description, due date, and create date are displayed in the checklist.  
The status is displayed by the background color of the due date. Overdue tasks are red, due tasks are yellow, and other tasks have no background color.
I also added a way for users to sign in with GitHub, and protect api endpoints with authentication.

### 2. Please describe how you will approach the should have user stories
Search and sort functions are implemented in the front end. the list of tasks are initially rendered serverside, and passed to the front end. The front end then filters and sorts the list of tasks. This ensures that the search function is instantly available to the user, and that the user does not have to wait for the server to respond. The search function is case insensitive, and searches the name and description of the tasks. This can become problematic as the database grows, as we would not return every single task in that case, but this should work almost instantaneously for upwards of 10000 total tasks.

### 3. Use React, Go & Postgres if possible, but feel free to use other technologies if you prefer
I used Next.js and PostgreSQL. I chose Next.js because it is a React framework that allows for server side rendering, which is useful for initial page load times. I chose PostgreSQL because it is a relational database that is easy to set up and use.

### 4. Further improvements you would make if you had more time
If I had more time, I would add a way to create groups, and invite others to groups. Groups would be able to share task lists, with different levels of visibility. Support for reccuring tasks would also be nice to have.
