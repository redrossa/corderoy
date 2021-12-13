# Corderoy

This is a Capstone project under the mentorship of Amazon.

## How to run development locally

1. Install and setup PostgreSQL
2. Create a Postgres database
3. Install `uuid-ossp` extension for the database
4. Create a `server-settings.json` file in the root directory with properties:
   ```json
   {
     "user": "<your Postgres username>",
     "pass": "<your Postgres user password>",
     "host": "<PostgreSQL database hostname>",
     "port": "<PostgreSQL database port>",
     "dbname": "<the name of the database created in step 2>"   
   }
   ```
5. In the project root directory, install the required python packages (you may want to setup a virtual environment first) with
   ```
   pip3 install Flask
   pip3 install Flask-SQLAlchemy
   pip3 install Flask-Migrate
   pip3 install psycopg2
   pip3 install requests
   ```
6. In the same directory, run the following commands in order:
   ```shell
   python3 -m flask db init
   python3 -m flask db migrate
   python3 -m flask db upgrade
   ```
7. Finally, in the same directory, run the server with
   ```shell
   python3 -m flask run
   ```
8. Go to `corderoy-react` directory and install all the react dependencies with
   ```shell
   npm install
   ```
9. In the same directory, run the react development server with
   ```shell
   npm run start
   ```