import { Book, getLocalDB } from "../db";

class BookService {
    private get db() {
        return getLocalDB()
    }

    public async addOrUpdateBook(book: Book): Promise<void|number> {
        let dbBook = await this.db.book.where('name').equals(book.name).first()
        if (!dbBook) {
            console.log('book', book)
            return await this.db.book.put(book)
        } else {
            return await this.db.book.where('name').equals(book.name).modify(book)
        }
    }

    public async deleteBook(name: string): Promise<void> {
        console.log(name)
        await this.db.book.where('name').equals(name).delete()
    }

    public async updateBook(book: Book): Promise<number> {
        return await this.db.book.where('name').equals(book.name).modify(book)
    }

    public async getBook(name: string): Promise<Book | undefined> {
        let dbBook = await this.db.book.where('name').equals(name).first()
        return dbBook
    }

    public async listBooks(): Promise<Book[]> {
        return await this.db.book.toArray()
    }
}

export const bookService = new BookService()