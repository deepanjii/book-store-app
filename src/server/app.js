const cors = require("cors");
const dotnev = require("dotenv");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
// const { rootSchema } = require("./schema/root.schema");
const { dbRootSchema } = require("./schema/dbroot.schema");

dotnev.config();
const port = Number(process.env.SERVER_PORT);
const app = express();
app.use(cors());
const { DB_NAME, DB_USER, DB_PASS } = process.env;

const databaseUri = `mongodb+srv://${DB_USER}:${DB_PASS}@gql-book-store-app.yimlp.mongodb.net/${DB_NAME}`;

mongoose.connect(databaseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the mongoose database");
}).catch((error) => {
  console.log("DB Connection error", error);
  process.exit(1);
});

app.use("/graphql", graphqlHTTP({
  // schema: rootSchema,
  schema: dbRootSchema,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});