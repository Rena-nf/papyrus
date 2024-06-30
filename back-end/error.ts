import { MongoDriverError } from "mongodb"

export default class DbError extends MongoDriverError {
    constructor(message: string, statusCode: number) {
        super (message)
        
        this.code = statusCode
        
    }
}