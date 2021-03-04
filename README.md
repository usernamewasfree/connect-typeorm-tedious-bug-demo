Minium project to demonstrate issue with connect-typeorm library and tedious
Install Docker: https://docs.docker.com/get-docker/
Go to db folder execute command "docker-compose up" (make sure the port in server/ormconfig.json and db/docker-compose.yml match)
Go to the Server folder run npm install
run npm start
after hitting http://localhost:3000/ you should encounter an error saying "QueryFailedError: Error: Validation failed for parameter '0'. Value must be between -2147483648 and 2147483647, inclusive."
The error is from the mssql tedious library as it property type of ExpiredAt is an INT and not a string or big int.
To debug go to server/node_modules/mssql/node_modules/tedious/lib/request.js. The validateParameters function on line 179 is where the error thrown (specifically line 185)