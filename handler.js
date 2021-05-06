'use strict';
const AWS= require('aws-sdk');
const db= new AWS.DynamoDB.DocumentClient()
const uuid=require('uuid/v4');

const postsTable= process.env.POSTS_TABLE;

function response(statusCode, message){
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

const formatResponse = function(statusCode, body) {
  const response = {
      statusCode: statusCode,
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
      },
      isBase64Encoded: false,
      body: JSON.stringify(body)
  };
  return response;
 };


//module.exports.createPost =async (event, callback) => {
//  const reqBody=  JSON.parse(event.body)
//  const post ={
//    id: uuid(),
//    userId: 1,
//    title: reqBody.title,
//    body: reqBody.body
//  };
//  const response= await addPost(post);
//  return formatResponse(200,response)

// };

// async function addPost(post){
//  db.put({
//    TableName: postsTable,
//    Item: post
//  })
//  return ('post is inserted');
// }

module.exports.createPost= async (event, context, callback) => {
  const reqBody= JSON.parse(event.body)
  console.log(reqBody)

  const post ={
    id: uuid(),
    userId: 1,
    title: reqBody.title,
    body: reqBody.body
  };
  const result =await db.put({
    TableName: postsTable,
    Item: post
  }).promise().then(() => {
    callback(null, response(201, post))
  })
  .catch(err => response(null,response(err.statusCode, err)));
  return formatResponse(200,result)
}
