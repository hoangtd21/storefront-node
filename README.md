# Storefront API

## Description

App is designed to handle CRUD requests in an Express.js application.

## Usage

Install library: `npm install`

Run docker to connect postgres database: `docker run --name storefront -p 5432:5432 -e POSTGRES_PASSWORD=12345 - d postgres`

Run migrate to create database: `npm run migrate`

Connect DB by psql: `psql -h 127.0.0.1 -U postgres postgres`

Start app: `npm run start`
