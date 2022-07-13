# Thoughtful Automation Challenge

### A wonderful demonstration of serverless based microservices, event driven architecture, and a simple react application.
## Links
* [thoughtful.jordanmax.io](http://thoughtful.jordanmax.io)
* [S3 Link](http://client-dev-bucket.s3-website.us-east-2.amazonaws.com/)
## High Level Overview
* [Serverless Framework](https://serverless.com)
* [Lambda](https://aws.amazon.com/lambda)
* [DynamoDB](https://aws.amazon.com/dynamodb/)
* [DynamoDB Stream](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/streamsmain.html)
* [Simple Email Service](https://aws.amazon.com/ses/)
* [S3](https://aws.amazon.com/s3/)
* [Cloudfront](https://aws.amazon.com/cloudfront/)
* [React](https://reactjs.org/)
* [Material UI](https://mui.com/)
* [Monorepo design pattern](https://semaphoreci.com/blog/what-is-monorepo)
* [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
* [Functional Programming Paradigm](https://en.wikipedia.org/wiki/Functional_programming#:~:text=In%20computer%20science%2C%20functional%20programming,by%20applying%20and%20composing%20functions)

## Infrastructure
![LucidChart Diagram](assets/images/lucid.png?raw=true "LucidChart Diagram")

## What I would do with more time
* Hook in an auth provider to really authenticate and return back an actual access/secret token to make API more secure.
* CICD implementation (github actions or something alike to actually deploy these services).
* Would split up lambdas into their own individual microservices, but to save time I put them all together.
* Integration tests
* OpenAPI/Swagger documentation
## Kanban Board
![Kanban Board](assets/images/kanban.png?raw=true "Kanban Board")
