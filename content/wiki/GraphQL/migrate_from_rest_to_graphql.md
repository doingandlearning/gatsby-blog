# Migrate from Rest to GraphQL Workshop - Vladimir Novick 

Repo:[GitHub - vnovick/moving-from-rest-to-graphql: Moving from REST to GraphQL wor...](https://github.com/vnovick/moving-from-rest-to-graphql)

-   Lots of coding.
-   Everything is in the repo
-   Will be using breakout rooms
-   For each exercise make sure you checkout the other exercises
## Problems with REST
-   We are having to send a separate request for ever user that we need.
-   In the client code, we are consolidating the requests that we are making.
-   We are getting data we don't need on this particular request - overfetching
-   We need to versioned, documented and helpful API points

> All the steps we go through will be the same in making and executing a REST->GraphQL migration.

-   We were looking at the network tab, seeing the 4 network requests required by the page and then executing those same queries in an API client (or curl ;)). This was a total of 740kb.

## GraphQL query language

-   GraphQL gives you only a single endpoint that we send a query to. In the body of the request, we send the query and variables as an object.
-   On the server there is a specific type system, so we can get a schema description of our API. There is type strictness.
-   The data we get back is the same shape as the query we send.
-   We're getting a bit of an overview of how to construct a GraphQL query.
-   As well as queries, we have mutations - update, delete, side-effects.
-   There is also a concept called subscription which is for real time updates.
-   Variables are provided with a JSON object

Q: The exercise asked us to use a client like Postman/Insomnia to test out the endpoints, I know Gatsby has a visual playground for GraphQL but do these clients work with GraphQL?
A: Ah ha! It actually comes out of the box. GraphiQL.

Harald
Q: Can the documentation show what fields are required in a mutation?
A: It will when we are developing it locally, the web client shows the top level required (with an `!`).

## GraphQL endpoint setup
-   We managed to create a query that could create a post and author at the same time. To do this, we created the author with a known UUID and then used that UUID for the author id in the create post query. These could be handled in one post request.

-   We create the typeDefs and then the resolvers - the resolvers return type must match the
-   We don't have to use Express as Apollo is a server itself.
-   It is a pretty basic setup:
-   We define the typeDefs and the resolvers, we then new up a `new ApolloServer` those in and mock the schema and finally we run the server with `server.applyMiddleware({ app });`

## Design a GraphQL Schema by analyzing REST api
-   We have two endpoints.
-   We could separate out our typeDefs and resolvers either by domain or by function.
-   We can define a custom types (for posts, authors, etc.)

```js
const authorType = gql`
  type Author {
    id: ID!
    name: String
    avatarUrl: String
  }
```

## Implementing temporary resolvers for Queries
-   Like with our single endpoint, we will set up typeDefs and resolvers. We'll then need to setup.

-   Here we are going to put a GraphQL layer between our request and response. In the first instance, we will query the rest API points from the GraphQL resolvers and parse the data into the correct form.
-   This removes the multiple requests from our client but it moves it onto the server.

## Batch REST requests with REST Data Source
-   We can use the REST Data source to batch our sources so that we de-dupe requests.
-   When defining the ApolloServer we define dataSources property by supplying an extended instance of the base rest-data-source class.
-   In our resolvers, rather than fetching the data directly, we are going to get the data via the dataSources API we define.

## Migrate to the same data source
-   The next stage is to use a cache the results in an in-memory cache.
-   This will reduce the need for disc access

## Implement Mutations
-   This can be handled:

```js
  Mutation: {
    insertAuthor: async (\_, {input}, {dataSources}) => {
      return dataSources.postsJsonAPI.insertAuthor(input)
    },
  },
```
```js
  async insertAuthor(input) {
    const author = {
      id: uuidv4(),
      &#x2026;input,
    }
    await this.add(&rsquo;authors&rsquo;, author)
    return author
  }
```
```js
  async add(key, data) {
    const result = await this.readFromCache(key)
    result[key].push(data)
    writeFile(this.jsonDbPath, JSON.stringify(result, null, 2))
    await this.keyValueCache.set(CACHE<sub>KEY</sub>, result)
  }
```

-   ApolloServer can link into multiple datasources (REST, SQL, Redis, Memcached, ...)

## Things to look at next:

- Connectors
- Client side migration
- Go back over the repo and make sure I understand it
- Think about how this could be possible in a serverless environment

