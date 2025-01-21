# Bridal Shower Gift Checklist - Backend

This is the backend service for the Bridal Shower Gift Checklist application. It provides APIs to manage and track gifts for a bridal shower event.

## Features

- Checklists of gifts
- Add gift to the list
- Patch gift to mark as reserved

## Technologies Used

- Node.js
- Express.js
- DynamoDB
- AWS SAM

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- AWS DynamoDB
- Docker
- AWS SAM

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/yourusername/bridal-shower-gift-checklist.git
  ```
2. Navigate to the backend directory:
  ```sh
  cd bridal-shower-gift-checklist/backend
  ```
3. Install dependencies:
  ```sh
  npm install
  ```

### Configuration

1. Create a `.env` file in the root of the backend directory and add the following environment variables:
  ```env
  PORT=5000
  DYNAMODB_TABLE_NAME=your_dynamodb_table_name
  ENVIRONMENT=local
  ```

### Running the Application

1. Start the server:
  ```sh
  npm run dev
  ```
2. The server will be running on `http://localhost:5000`.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any inquiries, please contact [yourname@example.com](mailto:yourname@example.com).

