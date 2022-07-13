# Thoughtful Automation Challenge

![LucidChart Diagram](assets/images/Thoughtful%20Automation.png?raw=true "LucidChart Diagram")
### High Level Overview: 
    - Infrastructure
        - [Serverless Framework](https://serverless.com)
        - [Lambda](https://aws.amazon.com/lambda)
        - [DynamoDB](https://aws.amazon.com/dynamodb/)
        - [DynamoDB Stream](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/streamsmain.html)
        - [Simple Email Service](https://aws.amazon.com/ses/)
        - [S3](https://aws.amazon.com/s3/)
        - [Cloudfront](https://aws.amazon.com/cloudfront/)
        - [React](https://reactjs.org/)
        - [Material UI](https://mui.com/)
    - Monorepo design pattern
        - using yarn workspaces to share modules
    - Tried to follow the functional programming paradigm as much as possible.

### Important Information
    - [url](http://client-dev-bucket.s3-website.us-east-2.amazonaws.com/)

### What I would do with more time
    - Hook in an auth provider to really authenticate and return back an actual access/secret token to make API more secure.
    - CICD implementation (github actions or something alike to actually deploy these services).
    - Would split up lambdas into their own individual microservices, but to save time I put them all together.
    - Integration tests
    - OpenAPI/Swagger documentation