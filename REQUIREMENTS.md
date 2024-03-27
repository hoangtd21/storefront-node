# API Endpoints

### Products

| Method   | URL               | Description                                     |
| -------- | ----------------- | ----------------------------------------------- |
| `GET`    | `/api/products`   | Retrieve all products                           |
| `POST`   | `/api/products`   | Create a new product (Need token before create) |
| `DELETE` | `/api/products/1` | Delete product by id (Need token before delete) |
| `GET`    | `/api/products/1` | Retrieve product by id                          |
| `PUT`    | `/api/products/1` | Update product by id (Need token before create) |

## Users

| Method   | URL            | Description                                  |
| -------- | -------------- | -------------------------------------------- |
| `GET`    | `/api/users`   | Retrieve all users                           |
| `POST`   | `/api/users`   | Create a new user                            |
| `DELETE` | `/api/users/1` | Delete user by id (Need token before delete) |
| `GET`    | `/api/users/1` | Retrieve user by id (Need token before get)  |
| `PUT`    | `/api/users/1` | Update user by id (Need token before create) |

## Orders

| Method   | URL             | Description                                   |
| -------- | --------------- | --------------------------------------------- |
| `GET`    | `/api/orders`   | Retrieve all orders                           |
| `POST`   | `/api/orders`   | Create a new order (Need token before create) |
| `DELETE` | `/api/orders/1` | Delete order by id (Need token before delete) |
| `GET`    | `/api/orders/1` | Retrieve order by id                          |
| `PUT`    | `/api/orders/1` | Update order by id (Need token before create) |

# Database schema

### products

| Column | Type                   | Collation | Nullable |
| ------ | ---------------------- | --------- | -------- |
| id     | integer                |           | not null |
| name   | character varying(250) |           | not null |
| price  | integer                |           | not null |

### users

| Column          | Type                   | Collation | Nullable |
| --------------- | ---------------------- | --------- | -------- |
| id              | integer                |           | not null |
| username        | character varying(250) |           | not null |
| firstname       | character varying(250) |           | not null |
| lastname        | character varying(250) |           | not null |
| password_digest | character varying(250) |           | not null |

### orders

| Column  | Type    | Collation | Nullable |
| ------- | ------- | --------- | -------- |
| id      | integer |           | not null |
| user_id | integer |           | not null |
| status  | boolean |           | not null |

### order_products

| Column     | Type    | Collation | Nullable |
| ---------- | ------- | --------- | -------- |
| id         | integer |           | not null |
| order_id   | integer |           | not null |
| product_id | integer |           | not null |
| quantity   | integer |           | not null |
