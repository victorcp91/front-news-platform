import {useState, createContext, ReactNode } from "react";

export interface IBookmarkData {
  id: string;
  title: string;
  smallDescription: string;
  image?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface IBookmarkContextData {
  bookmarks: IBookmarkData[];
  addBookmark: (bookmark: IBookmarkData) => void;
  removeBookmark: (bookmarkId: string) => void;
  loadBookmarks: (bookmarks: IBookmarkData[]) => void;
}

interface IBookmarkProvider {
  children: ReactNode;
}

export const BookmarkContext = createContext({} as IBookmarkContextData);

export function BookmarkProvider({children}: IBookmarkProvider) {
  const [bookmarks, setBookmarks] = useState<IBookmarkData[]>([]);

  function addBookmark(bookmark: IBookmarkData){
    setBookmarks(current => [...current, bookmark]);
  }

  function removeBookmark(id: string){
    setBookmarks(current => current.filter(b => b.id !== id));
  }

  function loadBookmarks(items: IBookmarkData[]){
    setBookmarks(items);
  }

  return (
    <BookmarkContext.Provider value={{bookmarks, addBookmark, removeBookmark, loadBookmarks}}>
      {children}
    </BookmarkContext.Provider>
  )
}