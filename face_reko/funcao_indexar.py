from __future__ import print_function

import boto3
from botocore.client import Config
import json
import sys, traceback


rekognition = boto3.client('rekognition')
s3 = boto3.resource('s3')
dynamodb = boto3.resource('dynamodb', config=Config(max_pool_connections=30))
dynamodb_table = dynamodb.Table('rekognition_index')


# ------- Create DynamoDB item ------- #
def insert_dynamodb(faceId, objectBucket, objectKey, imageId, collection):
    insert_dynamodb = dynamodb_table.put_item(
       Item={
            'face_id': faceId,
            's3_bucket': objectBucket,
            'object_key': objectKey,
            'image_id': imageId,
            'collection': collection
        }
    )


# ------- Index faces in Rekognition collections ------- #
def index_faces(objectBucket, objectKey, collection):
    try:
        response = rekognition.index_faces(
            Image = {"S3Object": {"Bucket": objectBucket, "Name": objectKey}},
            CollectionId = collection
        )
        print("Indexing face in collection "+collection)
        print(json.dumps(response))

        faceRecords = response['FaceRecords']

        for faceRecord in faceRecords:
            print("faceRecord is: ")
            print(faceRecord)
            imageId = faceRecord['Face']['ImageId']
            faceId = faceRecord['Face']['FaceId']
            insert_dynamodb(faceId, objectBucket, objectKey, imageId, collection)


    except Exception as e:
        print(e)
        print('-' * 60)
        traceback.print_exc(file=sys.stdout)
        print('-' * 60)


# ------- Lambda function start ------- #
def lambda_handler(event, context):
    # Get object information
    objectKey = event['Records'][0]['s3']['object']['key']
    objectBucket = event['Records'][0]['s3']['bucket']['name']
    collection = event['Records'][0]['s3']['object']['key'].split('/')[1]

    index_faces(objectBucket, objectKey, collection)


    return "Faces indexed"
