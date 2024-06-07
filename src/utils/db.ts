import Dexie, { Table } from "dexie";


export interface Book {
    id?: number;
    summary?: string;
    name: string;
    numsOfTokens?: number;
    coverImgUrl?: string;
    updatedAt: string;
    createdAt: string;
}

export class LocalDB extends Dexie {
    book!: Table<Book>

    constructor() {
        super('reader-guru')
        this.version(4).stores({
            book: '++id, summary, name, numsOfTokens, coverImgUrl, updateAt, createdAt'
        })
    }
}

let localDB: LocalDB

export const getLocalDB = () => {
    if (!localDB) {
        localDB = new LocalDB()
    }
    return localDB
}