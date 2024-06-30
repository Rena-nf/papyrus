interface BookObject {
    id: number,
    title: string,
    author: author,
    isbn: number,
    publisher: string,
    category: [string],
    price: number,
    releaseDate: Date,
    rating: number
    imageLink: string,
    edition?: string,
}

type author = {
    id: number,
    name: string,
    bookCount: number,
    rating: number,
}

interface searchObject {
    id?: number,
    title?: string,
    author?: string,
    category?: [string],
    price?: number,
    releaseDate?: Date,
}

type searchResult = searchObject[]

interface customer {
    id: number,
    username: string,
}

interface userObject {

}

export { BookObject, searchObject, searchResult }