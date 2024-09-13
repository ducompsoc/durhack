class CustomError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = "CustomError"
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class NullError extends CustomError {
  constructor(message?: string) {
    super(message)
    this.name = "NullError"
  }
}

export class ValueError extends CustomError {
  constructor(message?: string) {
    super(message)
    this.name = "ValueError"
  }
}
