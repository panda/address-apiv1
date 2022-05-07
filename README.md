# address-apiv1
A basically proof of concept using Express to serve a REST API for reading json data from an endpoint

Neat features:
1. Query with a partial address string and receive all matching addresses in the data-set.
2. Add new addresses to the data set.
3. Modify existing addresses.
4. Delete existing addresses.

To keep the test data clean, I have decided not to write changes to the file as this serves as a proof of concept. If you restart the container or reboot the app it will drop any changes made to the data set.


## Application Configuration
Currently in this version of the app, we are only able to change the port the application is running on. By default this value is set to 8080 but uses a environment variable labeled `$PORT` if you want to change it.

If you are cloning this repo locally or attempting to modify it I highly recommend taking advantage of the `package.json.scripts`   
For production: `npm run production`    
For development (using nodemon!): `npm run dev` 

## Endpoints
```
'GET /' -> 'Hello World'
'GET /api/v1/address' -> 'List of all addresses from data set'
'GET /api/v1/address/<line1>' -> 'List specific address from the field "line1".
'POST /api/v1/address' -> 'Create a new address following this schema:'
'
    {
        "line1": "1600 Holloway Ave", : required string
        "line2": "APT 433",           : optional string
        "city": "San Francisco",      : required string
        "state": "CA",                : required string
        "zip": "94132"                : required string (max len 5)
    }
'
'PUT /api/v1/address/<line1>' -> 'Modify an existing address following this schema:'
'
    {
        "line1": "1600 Holloway Ave", : required string
        "line2": "APT 433",           : optional string
        "city": "San Francisco",      : required string
        "state": "CA",                : required string
        "zip": "94132"                : required string (max len 5)
    }
'
'DELETE /api/v1/address/<line1>' -> 'Delete an existing address from the field "line1".'
```

You can make requests to the programs like `cURL` or `Postman`  

An example using `cURL` can be seen with: `curl http://localhost:8080/api/v1/address`   

As a teaser, if you wanted to get a better `cURL` output. I highly recommend looking into a program called `jq` and pipe it in with `cURL` 
`curl http://localhost:8080/api/v1/address | jq .`
## Docker
There will be a docker file that you will be able to build and then run to get the app running in any environment that has docker installed.

Some commands to help you build/debug your docker container:
```
docker build . -t <your username>/lob-apiv1
docker run lob-apiv1
docker ps
docker logs <id>
```

## Things to consider
There is no authentication for this API, as it only serves mock data for people who want to use it. If there is ever a V2 of this API, there will be a lot of things to consider and improve on!  
