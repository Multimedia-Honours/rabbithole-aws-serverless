/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:edc80b21-bda7-4cdb-ad44-bc0ee0873aaf",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_cVEXwpZpc",
    "aws_user_pools_web_client_id": "6g3dihf3l0ngh9oedtnqaap9r8",
    "oauth": {
        "domain": "rabbithole-staging.auth.us-east-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:4200/chat/",
        "redirectSignOut": "http://localhost:4200/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_user_files_s3_bucket": "rabbithole-claims203631-staging",
    "aws_user_files_s3_bucket_region": "us-east-1",
    "aws_dynamodb_all_tables_region": "us-east-1",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "user-staging",
            "region": "us-east-1"
        }
    ],
    "aws_cloud_logic_custom": [
        {
            "name": "userAPI",
            "endpoint": "https://y6qh64r00g.execute-api.us-east-1.amazonaws.com/staging",
            "region": "us-east-1"
        },
        {
            "name": "rabbitholeuserAPI",
            "endpoint": "https://fo3r141w60.execute-api.us-east-1.amazonaws.com/staging",
            "region": "us-east-1"
        }
    ]
};


export default awsmobile;
