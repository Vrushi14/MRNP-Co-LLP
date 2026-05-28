#!/bin/bash

# MongoDB Database Setup/Verification Script

echo "Checking MongoDB connection..."
if command -v mongosh &> /dev/null
then
    mongosh --eval "db.adminCommand('ping')" || echo "Warning: Could not connect to local MongoDB. Please make sure MongoDB is running on port 27017."
elif command -v mongo &> /dev/null
then
    mongo --eval "db.adminCommand('ping')" || echo "Warning: Could not connect to local MongoDB. Please make sure MongoDB is running on port 27017."
else
    echo "MongoDB CLI tool ('mongosh' or 'mongo') not found. Please ensure MongoDB server is running at mongodb://127.0.0.1:27017"
fi

echo "Database verification complete!"
