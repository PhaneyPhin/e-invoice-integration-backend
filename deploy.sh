#!/bin/bash
git pull --rebase origin main
docker build . -t app
docker compose up -d