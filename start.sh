#!/bin/sh

# npx prisma migrate deploy
npx prisma db push
node "server.js"
