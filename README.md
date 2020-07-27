# Tracking your reading list with React

In this project, you are going to build an application in React to track books you want to read, books you are reading, and books you have read.

You will use [this books API](https://books-api.glitch.me/) for authentication and storing your data. Read the API instructions closely and ask any questions you have about it.

## Requirements

When the word "view" is used below, it means a different way your page looks. You can use multiple URLs in React, but it's still one application, so "page" doesn't make a lot of sense.

- Users can register a new account
- Users can log into their account
- Users stay logged in between page refreshes
    - [Use localStorage to keep the user and password](https://programmingwithmosh.com/react/localstorage-react/) between refreshes
- When logged in
    - Users can see three lists of books: to read, reading, and read
	    - If you would prefer, these lists can be in separate views
    - Users can add books to each list
    - Users can move books between lists
    - Users can remove books

### Stage 2 requirements

Once you've finished the above, try the following:

- Users can edit books to fix spelling and other issues
- Users can add notes to their books, with an optional page number
- Users can click a book to see that book in detail with all of its notes
- Users can click an author to see all books by that author that they have records of

## Other notes

- You may want to use [React Router](https://reacttraining.com/react-router/web/guides/quick-start) to make your application more navigable.