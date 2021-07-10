class Book {
  constructor(title, pageSize) {
    this.title = title;
    this.pageSize = pageSize;
  }

  getTitle() {
    return this.title;
  }

  setTitle(value) {
    this.title = value;
  }

  getPageSize() {
    return this.pageSize;
  }

  setPageSize(value) {
    this.pageSize = value;
  }
}

class Bookshelf {
  static valueOf(arrayOfHash) {
    let bookshelf = new this;

    for (let i = 0; i < arrayOfHash.length; i++) {
      let hash = arrayOfHash[i];
      let book = new Book(hash.title, hash.pageSize);
      bookshelf.addBook(book);
    }
    return bookshelf;
  }

  constructor() {
    this.books = [];
  }

  addBook(book) {
    // 自分自身（this）のcanAddBookメソッドを呼び出す
    if (!this.canAddBook(book)) return false;    

    this.books.push(book);
    return true;
  }

  findBookByTitle(title) {
    for(let i = 0; i < this.books.length; i++) {
      if (this.books[i].getTitle() === title) return this.books[i];
    }
    return null;
  }

  sumPageSize() {
    let size = 0;
    for(let i = 0; i < this.books.length; i++) {
      size += this.books[i].getPageSize();
    }
    return size;
  }

  size() {
    return this.books.length;
  }

  // 今この本を追加できますか？」というチェックを行えるメソッド
  canAddBook(book) {
    return true; // デフォルトでは何も制限を行わないのでどんな時も本を追加できる
  }  

  getBooks() { return this.books; }
}

// ちょっと大袈裟ですが、LibraySystemの特性を司るシステムでただ1つのAbstractFactory
class LibrarySystemFactory {
  static #instance

  // 唯一のインスタンスを取り出せる関数。
  static instance() {
    // もしもまだ作成されていなければ作る。
    if(!LibrarySystemFactory.#instance) {
      // ここではやっていませんが、例えばここでインスタンス化される実体を変えたりします。
      LibrarySystemFactory.#instance = new LibrarySystemFactory(); // 唯一のインスタンス
    }
    return LibrarySystemFactory.#instance;
  }

  // どんなBookが作成されるかをシステム上で明確に知っているのはここ。
  // 例えばデバッグ用のデコレーターを被せて作るかもしれない
  createBook() {
    return new Book();
  }

  createBookshelf(data = []) {
    return Bookshelf.valueOf(data);
  }

  // 他の言語の場合には private にする。JSではできない。
  // private constuctor = function(){ }
}


let data = [
  { title: "坊ちゃん", pageSize: 520 },
  { title: "我輩は猫である", pageSize: 454 }
];

let bookshelf = LibrarySystemFactory.instance().createBookshelf(data);

let book = LibrarySystemFactory.instance().createBook();
book.setTitle("こころ");
book.setPageSize(876);

bookshelf.addBook(book)
console.log(bookshelf.getBooks());

//////////////////////////////////////////////////////////////
// Q1. LibrarySystemFactoryの別の実装としてDebugLibrarySystemFactoryを作成しましょう。
// DebugLibrarySystemFactoryのcreateBookshelfは下記のLimitedBookshelfのインスタンスが
// 取得できる仕様とします。

class LimitedBookshelf extends Bookshelf {
  constructor(maxSize = 3) {
    super();
    this.maxSize = maxSize;
  }

  canAddBook(book) {
    return this.books.length < this.maxSize;
  }
}

class DebugLibrarySystemFactory {
  static #instance

  // 唯一のインスタンスを取り出せる関数。
  static instance() {
    if (!DebugLibrarySystemFactory.#instance) {
      DebugLibrarySystemFactory.#instance = new DebugLibrarySystemFactory();
    }
    return DebugLibrarySystemFactory.#instance;
  }

  createBook() {
    return new Book();
  }

  createBookshelf() {
    return new LimitedBookshelf()
  }
}

//////////////////////////////////////////////////////////////
// Q2. DebugLibrarySystemFactoryの動作サンプルを書いてください。
// LimitedBookshelfが作成されている事が確認できれば良いです。

let limitedBookShelf = DebugLibrarySystemFactory.instance().createBookshelf()

let bookForDebug = DebugLibrarySystemFactory.instance().createBook();
bookForDebug.setTitle("こころ");
bookForDebug.setPageSize(876);

// 3冊までしか追加できないことを確認
limitedBookShelf.addBook(bookForDebug)
limitedBookShelf.addBook(bookForDebug)
limitedBookShelf.addBook(bookForDebug)
limitedBookShelf.addBook(bookForDebug)

console.log(limitedBookShelf.getBooks());
