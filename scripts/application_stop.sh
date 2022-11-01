#!/bin/bash

echo "Stopping application"
kill -9 $(lsof -i:5454 -t) || true