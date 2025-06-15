#!/bin/bash
# Initialize InfluxDB with organization, bucket, and user token

influx setup -u admin -p admin123 --org my-org --bucket my-bucket --token my-secret-token -f
