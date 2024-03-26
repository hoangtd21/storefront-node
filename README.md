# Storefront API

## Description

App is designed to handle CRUD requests in an Express.js application.

## Usage

Install library: `npm install`

Run docker to connect postgres database: `docker run --name storefront -p 5432:5432 -e POSTGRES_PASSWORD=12345 - d postgres`

Run migrate to create database: `npm run migrate`

Start app: `npm run start`
