# Book Store App
## What does this do ?
A simple app that lets you add books to the existing collection and lets you view the details about the book
like its **title**, **genre** and **author**

## How does it look like ?

![DJBookStore](https://user-images.githubusercontent.com/11153724/126906605-1ce1a637-326a-430d-88b0-16b859d770f6.gif)

## How is this done ?
Well there are two parts to this app
1. A react based client
2. An express based server

## What libraries/frameworks were used ?
### BackEnd
- GraphQL
- Express
- MongoDB
### FrontEnd
- React
- Apollo Client

## What does the backend do ?
1. The express app acts as a server that receives query for the data that is being requested.
2. The actual data resides in a mongoDB server
3. The express app uses GraphQL as a middleware to process all the requests.
4. The GraphQL middleware has a schema setup to interact with the mongoDB and has the provision to enable relation between the data.
5. Using this schema it interacts with the backend and provides the requested data by combining information from the related tables, in our case author and book.

## What does the frontend do ?
1. The front end provides 3 sections in the UI
    - Book Collection section -  To display the collection of books available.
    - Add Book section - To add new books to the existing collection.
    - Book Information section - To display information about the selected books.
2. Based on the interaction done, the client generates a query and send requests to the server for the data using **Apollo Client**
3. The Apollo Client enables the client to generate graphQL queries to send request and provides the requested data back to the client for further processing.
