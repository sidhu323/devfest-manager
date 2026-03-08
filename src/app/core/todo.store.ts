import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface Book {
  id: string;
  price: number;
  title: string;
}

interface BookState {
  books: Book[];
}

//above we made only the interface for bookState

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withState<BookState>({
    books: [],
  }),
  withComputed(({ books }) => {
    return {
      totalBooks: () => books().length,
      freeBooks: () => books().filter((b) => b.price === 0),
    };
  }),
  withMethods((store) => ({
    addBook: (book: Book) => {
      patchState(store, { books: [...store.books(), book] });
    },
  })),
);
