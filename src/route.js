import {
  getBooks,
  addBooks,
  detailBooks,
  updateBooks,
  deleteBooks,
  MassDeleteBooks,
} from "./handler.js";

const routes = [
  {
    /*list books*/
    method: "GET",
    path: "/books",
    handler: getBooks,
  },
  {
    /*books detail*/
    method: "GET",
    path: "/books/{id}",
    handler: detailBooks,
  },
  {
    /*post books*/
    method: "POST",
    path: "/books",
    handler: addBooks,
  },
  {
    /*update books*/
    method: "PUT",
    path: "/books/{id}",
    handler: updateBooks,
  },
  {
    /*delete books*/
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBooks,
  },
  {
    /*mass delete books*/
    method: "DELETE",
    path: "/books/",
    handler: MassDeleteBooks,
  },
];

export default routes;
