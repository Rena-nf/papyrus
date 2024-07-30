import { Schema } from "mongoose"

interface book_object {
    author_id?: number,
    book_id: string,
    edition?: string,
    genre: Array<{genre: string}>,
    image_link?: String
    isbn?: number,
    language: string,
    price: number,
    publisher?: String,
    quantity?: number,
    release_year: Number,
    title: string,
}

const bookSchema = new Schema<book_object>({
    author_id: Number,
    book_id: { type: String, required: true },
    edition: String,
    genre: [{genre: {type: String, required: true}}],
    image_link: String,
    isbn: Number,
    language: { type: String, required: true },
    price: { type: Number, required: true},
    publisher: String,
    quantity: Number,
    release_year: { type: Number, required: true },
    title: { type: String, required: true },
})

export { bookSchema }