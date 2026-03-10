# WhatToDo API

## Building and Running the API

1. Create a `.env` file in the root directory of the project and add the following environment variables:
    ```env
    APP_PORT=3000
    ```

2. Build and start the service:
    ```bash
    docker compose build --no-cache && docker compose up
    ```

The API will be available at `http://localhost:3000`.

## API Endpoints

- GET `/health`: Check the health status of the API.
