# API Documentation

## Endpoints

| Endpoint              | Method    | Description                                       | Expected Body         |
|---------------------- | --------- | ------------------------------------------------- | --------------------- |
| `"/menu"`             | `GET`     | Returns an array of all the pizzas on the menu.   | `N/A`                 |
| `"/menu/:pizzaId"`    | `GET`     | Returns a single pizza based on it's ID.          | `N/A`                 |
| `"/orders"`           | `GET`     | Returns an array of all the orders on the menu.   | `N/A`                 |
| `"/orders/:orderId"`  | `GET`     | Returns a single order based on it's ID.          | `N/A`                 |
| `"/orders"`           | `POST`    | Creates an order and assigns the order an ID.     | `{ order: {...} }`    |
| `"/orders/:orderId"`  | `PATCH`   | Updates an order based on it's ID.                | `{ newOrder: {...} }` |
| `"/orders/:orderId"`  | `PUT`     | Updates an order based on it's ID.                | `{ newOrder: {...} }` |
| `"/orders/:orderId"`  | `DELETE`  | Deletes an order based on it's ID.                | `N/A`                 |

---

## Responses

### Requesting Data Response

Will respond with the status and the requested data.

```js
{
    "status": 200,
    "data": {...}
}
```

### Sending Data Response

Will respond with the status, a message, and the data that was sent.

```js
{
    "status": 200,
    "message": "...",
    "data": {...}
}
```

### Deleting Data Response

Will respond with the status and a message.

```js
{
    "status": 200,
    "message": "...",
}
```

### Error Response

Will respond with the status and a message.

```js
{
    "status": 400,
    "message": "...",
}
```

---

[Back to the README.md](../README.md)