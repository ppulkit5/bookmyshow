 require("dotenv").config();
 //Framework
 const express = require('express');
 const mongoose = require('mongoose');

 //Database
 const database=require("./database/index");

 // Models
  const BookModel = require("./database/book");
  const AuthorModel = require("./database/author");
  const PublicationModel = require("./database/publication");

 // initialize express
 const app=express();

 // Configurations
 app.use(express.json());

 // Establish database connection
 mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log("Connection established!!!"));
 
 /*
 Route                /
 Description          get all books
 Access               Public
 Parameters           none  
 Method               GET
 */
 app.get('/', async (req, res) => {
     const getAllBooks = await BookModel.find();
     return  res.json(getAllBooks);
 });

 
 /*
 Route                /is
 Description          get specific book based on isbn
 Access               Public
 Parameters           isbn 
 Method               GET
 */
 app.get('/is/:isbn', async (req, res) => {
    const getSpecificBook =await BookModel.findOne({ISBN: req.params.isbn});

    // const getSpecificBook=database.books.filter(
    //      (book)=>book.ISBN===req.params.isbn
    //      );
     
     if(!getSpecificBook){
      return  res.json({
          error:`No book found for ISBN of ${req.params.isbn}`
        }); 
     }

     return  res.json({book: getSpecificBook});
});


 /*
 Route                /c
 Description          get specific books based on category
 Access               Public
 Parameters           category  
 Method               GET
 */
app.get('/c/:category', async (req, res) => {

    const getSpecificBooks= await BookModel.findOne({category : req.params.category});

    // const getSpecificBooks=database.books.filter(
    //     (book)=>book.category.includes(req.params.category)
    //     );
    
    if(!getSpecificBooks){
     return  res.json({
         error:`No book found for cateogry of ${req.params.category}`
       }); 
    }

    return  res.json({book: getSpecificBooks});
});


 /*
 Route                /a
 Description          get specific books based on author
 Access               Public
 Parameters           author  
 Method               GET
 */

 app.get('/a/:author',async (req, res) => {
     
    const getSpecificBooks= AuthorModel.findOne({name : req.params.author });
  
    // const getSpecificBooks=database.authors.filter(
    //     (author)=>author.name===req.params.author
    //     );
    
    if(!getSpecificBooks){
     return  res.json({
         error:`No book found for author of ${req.params.author}`
       }); 
    }

    return  res.json({book: getSpecificBooks});
 });


 /*
 Route                /author
 Description          get all authors
 Access               Public
 Parameters           None  
 Method               GET
 */

app.get('/author', async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return  res.json({authors: getAllAuthors});
});


 /*
 Route                /author/id
 Description          get specific author based on id
 Access               Public
 Parameters           id
 Method               GET
 */
app.get('/author/id/:id', async (req, res) => {
    const getSpecificauthor = await AuthorModel.findOne({id : parseInt(req.params.id)});
  
    // const getSpecificauthor=database.authors.filter(
    //     (author)=>author.id===parseInt(req.params.id)
    //     );
    
    if(!getSpecificauthor){
     return  res.json({
         error:`No book found for author of ${req.params.id}`
       }); 
    }

    return  res.json({book: getSpecificauthor});
});


 /*
 Route                /author
 Description          get a list of author based on book's ISBN
 Access               Public
 Parameters           isbn
 Method               GET
 */
app.get('/author/:isbn', async (req, res) => {
    
    const getSpecificAuthors = await AuthorModel.findOne({books : req.params.isbn});
  
//     const getSpecificAuthors= database.authors.filter((author)=>
//    author.books.includes(req.params.isbn)
//     );   

  if(!getSpecificAuthors){
      return  res.json({
          error: `No author found for the book ${req.params.isbn}`
      });
  }

  return  res.json({authors: getSpecificAuthors });
});




 /*
 Route                /publications
 Description          get all publications 
 Access               Public
 Parameters           
 Method               GET
 */
 app.get('/publications', async (req, res) => {
     const getAllPublications = await PublicationModel.find();
     return  res.json({
        publications: getAllPublications    
     });
 });


 
 /*
 Route                /publications/i
 Description          get specific publication based on id 
 Access               Public
 Parameters           id
 Method               GET
 */

 app.get('/publications/i/:id', async (req, res) => {
  
    const getSpecificpublication =await PublicationModel.findOne({id : parseInt(req.params.id)});

    // const getSpecificpublication= database.publications.filter((publication)=>
    // publication.id===parseInt(req.params.id)
    //  );   
 
   if(!getSpecificpublication){
       return  res.json({
           error: `No publication found for the id ${req.params.id}`
       });
   }
 
   return  res.json({publication: getSpecificpublication });
 });
 
 /*
 Route                /publications/is
 Description          get a list of publication based on book's ISBN
 Access               Public
 Parameters           isbn
 Method               GET
 */
 app.get('/publications/is/:isbn', async (req, res) => {
    
    const getSpecificpublications = PublicationModel.findOne({books: req.params.isbn});
    
    // const getSpecificpublications= database.publications.filter((publication)=>
    //  publication.books.includes(req.params.isbn)
    //   );   
  
    if(!getSpecificpublications){
        return  res.json({
            error: `No publication found for the book ${req.params.isbn}`
        });
    }
  
    return  res.json({authors: getSpecificpublications });
  });

  
/*
 Route                /book/new
 Description          add new books
 Access               Public
 Parameters           None
 Method               POST
 */
app.post('/book/new', async (req, res) => {
    const {newBook} = req.body;
     BookModel.create(newBook);
    
    return  res.json({ message: "book was added"});
});



/*
 Route                /author/new
 Description          add new author
 Access               Public
 Parameters           None
 Method               POST
 */
 app.post('/author/new', (req, res) => {
    const {newAuthor} = req.body;

    AuthorModel.create(newAuthor);

    return  res.json({ message: "author was added"});
});

/*
 Route                /publication/new
 Description          add new publication
 Access               Public
 Parameters           None
 Method               POST
 */
 app.post('/publication/new',async (req, res) => {
    const {newPublication} = req.body;
     
    PublicationModel.create(newPublication);

    return  res.json({ message: "publication was added"});
});


/*
 Route                /book/update
 Description          update title of a book
 Access               Public
 Parameters           isbn
 Method               PUT
 */
 app.put('/book/update/:isbn', (req, res) => {
     database.books.forEach((book)=>{
         if(book.ISBN===req.params.isbn){
             book.title=req.body.bookTitle;
             return;
         }
     });
     return  res.json({books: database.books});
 });


/*
 Route                /book/author/update
 Description          update/add new author
 Access               Public
 Parameters           isbn
 Method               PUT
 */
 app.put('/book/author/update/:isbn', (req, res) => {
     
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){   
            return book.authors.push(req.body.newAuthor);
        }
    });

    // update the author database
    database.authors.forEach((author)=>{
        if(author.id===req.body.newAuthor){
            return author.books.push(req.params.isbn);
        }
    });
    return  res.json({
        books:database.books, 
        authors: database.authors, 
        message: "new author was added"});
});



/*
 Route                /author/update
 Description          update author name using id
 Access               Public
 Parameters           id
 Method               PUT
 */
 app.put('/author/update/:id', (req, res) => {
    database.authors.forEach((author)=>{
        if(author.id===parseInt(req.params.id)){
            author.name=req.body.authorName;
            return;
        }
    });
    return  res.json({authors: database.authors});
});



/*
 Route                /publication/update
 Description          update publication name using id
 Access               Public
 Parameters           id
 Method               PUT
 */
 app.put('/publication/update/:id', (req, res) => {
    database.publications.forEach((publication)=>{
        if(publication.id===parseInt(req.params.id)){
            publication.name=req.body.publicationName;
            return;
        }
    });
    return  res.json({publications: database.publications});
});


/*
 Route                /publication/update/book
 Description          update/add new book to a publication
 Access               Public
 Parameters           isbn
 Method               PUT
 */

app.put('/publication/update/book/:isbn', (req, res) => {
    // update the publication database
    database.publications.forEach((publication)=>{
     if(publication.id===req.body.pubId)
      return publication.books.push(req.params.isbn);
    });
    //update the book database
    database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn){
        book.publication=req.body.pubId;
        return;
    }
    });

    return  res.json({
        books: database.books, 
        publications: database.publications,
        message: "Successfully updated publication"
    });

});


/*
 Route                /book/delete
 Description          delete a book
 Access               Public
 Parameters           isbn
 Method               DELETE
 */
app.delete('/book/delete/:isbn', (req, res) => {
    const updatedBookDatabase=database.books.filter(
        (book)=> book.ISBN !== req.params.isbn
    );
    database.books=updatedBookDatabase;
  return  res.json({books: database.books});  
});


/*
 Route                /book/delete/author
 Description          delete a author from a book 
 Access               Public
 Parameters           isbn, authorId
 Method               DELETE
 */

app.delete('/book/delete/author/:isbn/:authorId', (req, res) => {
   //update book dataabase
   database.books.forEach((book)=>{
       if(book.ISBN===req.params.isbn){
           const newAuthorList=book.authors.filter(
               (author)=> author !== parseInt(req.params.authorId)
           ); 
           book.authors=newAuthorList;
           return;
       }
   }); 

   //update the author database
   database.authors.forEach((author)=>{
    if(author.id === parseInt(req.params.authorId)){
        const newBookList= author.books.filter(
            (book) => book !== req.params.isbn
        );
        author.books=newBookList;
       return;
    }
   });
   return  res.json({
       book: database.books, 
       author: database.authors,
       message: "Author was deleted"
    });
});

/*
 Route                /author/delete
 Description          delete an author 
 Access               Public
 Parameters           id
 Method               DELETE
 */
app.delete('/author/delete/:id', (req, res) => {
    const updatedAuthorDatabase=database.authors.filter(
        (author)=> author.id !== parseInt(req.params.id)
    );
    database.authors=updatedAuthorDatabase;
  return  res.json({authors: database.authors});  
});



/*
 Route                /publiction/delete/book
 Description          delete a book from publication 
 Access               Public
 Parameters           isbn,pubId
 Method               DELETE
 */
app.delete('/publiction/delete/book/:isbn/:pubId', (req, res) => {
    
    // update publication database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)){
            const newBookList= publication.books.filter(
                (book) => book !== req.params.isbn
            );
            publication.books=newBookList;
           return;
        }
    });
    
    //update book database
    database.books.forEach((book) => {
     if(book.ISBN === req.params.isbn){
         book.publication=0;  // no book available
         return;
     }
    });
    return  res.json({books: database.books, publications: database.publications});
});


/*
 Route                /publication/delete
 Description          delete a publication 
 Access               Public
 Parameters           pubId
 Method               DELETE
 */
 app.delete('/publication/delete/:pubId', (req, res) => {
    const updatedPublicationDatabase=database.publications.filter(
        (publication)=> publication.id !== parseInt(req.params.pubId)
    );
    database.publications=updatedPublicationDatabase;
  return  res.json({publication: database.publications});  
});


 app.listen(3000, () => {
     console.log(`Server is running`);
 });  