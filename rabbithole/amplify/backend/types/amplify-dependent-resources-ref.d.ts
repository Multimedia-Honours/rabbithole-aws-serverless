export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "rabbitholeAuth": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "HostedUIDomain": "string",
            "OAuthMetadata": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "s3rabbitholeclaims": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}