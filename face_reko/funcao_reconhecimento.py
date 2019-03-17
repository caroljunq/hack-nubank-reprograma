from __future__ import print_function

import boto3
from botocore.client import Config
import json
import decimal
from decimal import Decimal
import threading
import sys, traceback



rekognition = boto3.client('rekognition')
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb', config=Config(max_pool_connections=30))
dynamodb_index_table = dynamodb.Table('rekognition_index')
dynamodb_results_table = dynamodb.Table('rekognition_results')


# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


# ------- Search faces in Rekognition collections ------- #
def search_faces(eTag, objectBucket, objectKey, collection):
    try:
        response = rekognition.search_faces_by_image(
            Image = {"S3Object": {"Bucket": objectBucket, "Name": objectKey}},
            CollectionId = collection,
            FaceMatchThreshold = 60
        )
        print("Searching face in collection "+collection)
        faceMatches = response['FaceMatches']

        if faceMatches:
            for face in faceMatches:
                faceId = face['Face']['FaceId']
                imageId = face['Face']['ImageId']
                similarity = str(face['Similarity'])

                print("FaceId is: "+faceId)
                print("ImageId is: "+imageId)
                print("Similarity is: "+similarity)
                print("eTag is: "+eTag)

                originalPath = search_dynamodb(faceId)
                print("received original path is: "+originalPath)
                update_dynamodb(eTag, faceId, imageId, similarity, collection, originalPath)

    except Exception as e:
        print(e)
        print('-' * 60)
        traceback.print_exc(file=sys.stdout)
        print('-' * 60)


# ------- Update DynamoDB item with results ------- #
def update_dynamodb(eTag, faceId, imageId, similarity, collection, originalPath):
    update_dynamodb = dynamodb_results_table.update_item(
        Key = {'object_id': eTag},
        UpdateExpression = "SET results = list_append(results, :faceData)",
        ExpressionAttributeValues = {
            ":faceData": [{"FaceId": faceId, "ImageId": imageId, "Similarity": similarity, "Collection": collection, "OriginalPath": originalPath}]
        }
    )
    print(json.dumps(update_dynamodb, cls=DecimalEncoder))



# ------- Create DynamoDB item ------- #
def create_dynamodb(eTag, objectBucket, objectKey):
    create_dynamodb = dynamodb_results_table.put_item(
       Item={
            'object_id': eTag,
            's3_bucket': str(objectBucket),
            'object_key': str(objectKey),
            'results': []
        }
    )
    print(json.dumps(create_dynamodb, cls=DecimalEncoder))


# ------- Search DynamoDB item ------- #
def search_dynamodb(faceId):
    search_dynamodb = dynamodb_index_table.get_item(
       Key={
            'face_id': faceId
        }
    )

    print("Searching in DynamoDB Index:")
    print(json.dumps(search_dynamodb, cls=DecimalEncoder))

    originalBucket = search_dynamodb['Item']['s3_bucket']
    originalKey = search_dynamodb['Item']['object_key']
    originalPath = originalBucket+'/'+originalKey

    return originalPath



# ------- Lambda function start ------- #
def lambda_handler(event, context):
    # Get object information
    eTag = event['Records'][0]['s3']['object']['eTag']
    objectKey = event['Records'][0]['s3']['object']['key']
    objectBucket = event['Records'][0]['s3']['bucket']['name']

    # Create the DynamoDB entry, so we can update it later
    create_dynamodb(eTag, objectBucket, objectKey)

    # Get collectionIDs from Rekognition
    collections = rekognition.list_collections()
    collections = collections['CollectionIds']

    # Start the multi-thread processing
    thread_list = []
    for collection in collections:
        print('Searching collection: ' + collection)
        t1 = threading.Thread(name='search_faces' + collection, target=search_faces, args=(eTag, objectBucket, objectKey, collection))
        thread_list.append(t1)

    for x in thread_list:
        x.start()

    for x in thread_list:
        x.join()


    return "All collections have been processed"
