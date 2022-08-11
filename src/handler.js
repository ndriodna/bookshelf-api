import { nanoid } from 'nanoid';
import books from './books.js'

/*-----------------------get all books------------------------------*/

const getBooks = (request, h) =>{
  const {name, reading, finished} = request.query

  return h.response({
    status:"success",
    data:{
      books: books.map((v)=>({
        id:v.id,
        name:v.name,
        publisher:v.publisher
      }))
    }
  }).code(200)
}

/*-----------------------add new book------------------------------*/
const addBooks = (request,h) =>{
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload

  if (name === undefined) {
    return h.response({
      status:'fail',
      message:'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400)
  }
  if (readPage > pageCount) {
    return h.response({
      status:'fail',
      message:'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
  }

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = pageCount === readPage ? true : false

  const newBooks = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt
  }

  books.push(newBooks)

  const isFill = books.filter((book)=> book.id === id).length > 0

  if (isFill) {
    return h.response({
      status:'success',
      message:'Buku berhasil ditambahkan',
      data:{
        bookId: id
      }
    }).code(201)
  }

  return h.response({
    status:'fail',
    message:'Buku gagal ditambahkan',
  }).code(500)

}

/*-----------------------get detail book------------------------------*/

const detailBooks = (request,h) =>{
  const {id} = request.params

  const book = books.filter((n) => n.id === id )[0]

  if (book !== undefined) {
    return h.response(
    {
      status:'success',
      data:{
        book
      }
    }).code(200)
  }
  
  return h.response({
    status:"fail",
    message:'Buku tidak ditemukan',
  }).code(404)
}

/*-----------------------update books------------------------------*/

const updateBooks = (request,h) =>{
  const {id} = request.params

  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload

  if (!name) {
    return h.response({
      status:'fail',
      message:'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400)
  } 
  if (readPage > pageCount) {
    return h.response({
      status:'fail',
      message:'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400)
  }

  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book)=> book.id === id)
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
    }
    return h.response({
      status:'success',
      message:'Buku berhasil diperbarui',
    }).code(200)
  }

  return h.response({
    status:'fail',
    message:'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404)
}

/*-----------------------delete book------------------------------*/

const deleteBooks = (request,h) =>{
  const {id} = request.params

  const index = books.findIndex((book)=> book.id === id)

  if (index !== -1) {
    books.splice(index,1)
    return h.response({
      status:'success',
      message:'Buku berhasil dihapus'
    }).code(200)
  }
  return h.response({
    status:'fail',
    message:'Buku gagal dihapus. Id tidak ditemukan'
  }).code(404)
}


const MassDeleteBooks = (request, h) =>{
  if (books.length > 0) {
    books.splice(0,books.length)
    return h.response({
      status:'success',
      message:'deleted all',
      data:{
        books
      }
    }).code(200)
  }
  return h.response({
    status:'fail',
    message:'fail'
  }).code(404)
}

export {getBooks, addBooks, detailBooks, updateBooks, deleteBooks, MassDeleteBooks}