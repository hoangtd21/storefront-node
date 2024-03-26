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
