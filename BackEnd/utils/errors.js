// Custom Class Error
export class CustomError extends Error {
  constructor (message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Custom Class Error
export class GenericError extends CustomError {
  constructor (message = 'An error occurred!') {
    super(message, 400);
  }
}

// Error thrown when data already exists
export class ConflictError extends CustomError {
  constructor (message = 'Data already exists!') {
    super(message, 409);
  }
}

// General Error
export class BadRequestError extends CustomError {
  constructor (message = 'Bad Request!') {
    super(message, 400);
  }
}

// Error thrown when request is missing data
export class MissingDataError extends CustomError {
  constructor (message = 'Missing Data!') {
    super(message, 422);
  }
}

// Error thrown when data not found
export class NotFoundError extends CustomError {
  constructor (message = 'Not Found!') {
    super(message, 404);
  }
}

// Error thrown when the user is not authorized
export class UnauthorizedError extends CustomError {
  constructor (message = 'Unauthorized!') {
    super(message, 400);
  }
}

// Error thrown when an action is forbidden
export class ForbiddenError extends CustomError {
  constructor (message = 'Forbidden!') {
    super(message, 403);
  }
}

// Error thrown when an internal error occurred
export class InternalError extends CustomError {
  constructor (message = 'An Error Occurred! Please try again.') {
    super(message, 500);
  }
}

// Error thrown when a validation error occurred
export class ValidationError extends CustomError {
  constructor (message = 'Validation Error') {
    super(message, 400);
  }
}


