// fazer o cadastro, editar, editar o rating tudo vinculado ao book-form, e os itens sao add no book-list
// vai usar book-form, book-list,  rating-form, button e o local storage (application)
// Campos do Formulario
const titulo = document.querySelector("#titulo")
const autor = document.querySelector("#autor")
const genero = document.querySelector("#genero")
const ano = document.querySelector("#ano")
const rating = document.querySelector("#rating")
const bookForm = document.querySelector("#book-form")
// Lista
const bookList = document.querySelector("#book-list")

// Funçoes pra pegar e pra salvar os livros no Local Storage
function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || []
    // lembrar q vem como str, converter pra json -> JSON.parse()
}

function setBooks(books) {
    return localStorage.setItem("books", JSON.stringify(books))
}

function displayBooks() {
    bookList.innerHTML = ""
    const books = getBooks()
    for (const book of books) {
        addBookToList(book, books.indexOf(book))
    }
}
displayBooks()

function calcularRatingMedio(ratings) {
    const soma = ratings.reduce((acc,nota) => {
        return acc + nota
    }, 0)

    return (soma / ratings.length).toFixed(2)
}

function updateRating(e,index) {
    e.preventDefault()
    const newRating = document.querySelector(`#new-rating-${index}`).value
    const books = getBooks()
    const book = books[index]
    book.ratings.push(Number(newRating))
    book.rating = calcularRatingMedio(book.ratings)

    setBooks(books)
    bookList.innerHTML = ''
    displayBooks()


}

function showRatingForm(index) {
    const ratingForm = document.querySelector(`#rating-form-${index}`)
    ratingForm.style.display = "block"
}


function addBookToList(book, index) {
    const li = document.createElement("li")
    // alterar o html desse li pra receber os dados
    li.innerHTML = `${book.titulo} por ${book.autor}, Gênero: ${book.genero}, Nota: ${book.rating}
    <button onclick="showRatingForm(${index})">Add rating</button>
    <form class="rating-form" id="rating-form-${index}">
    <input type="number" id="new-rating-${index}" min="1" max="5">
    <button type="submit">Enviar</button>`


    
    bookList.append(li)
    const formRating = document.querySelector(`#rating-form-${index}`)
    formRating.addEventListener("submit", (e) => updateRating(e,index))

}


function addBook(e) {
    e.preventDefault()
    // não deixa redirecionar, impede o comportamento padrao do elemento, e coloca outra ação no lugar
    // console.log("teste")
    const book = {
        "titulo": titulo.value,
        "autor": autor.value,
        "genero": genero.value,
        "ano": ano.value,
        "rating": rating.value,
        "ratings": [] 
    }
    // console.log(book)
    const books = getBooks()
    books.push(book)
    setBooks(books)

    addBookToList(book, books.length - 1)
    // 2 parametros, book e o index

    limparCampos()
}

function limparCampos() {
    titulo.value = ''
    autor.value = ''
    genero.value = ''
    ano.value = ''
    rating.value = ''
    titulo.focus()
}


bookForm.addEventListener("submit", addBook)


// fazer excluir, editar, nao cadastrar repetido, cadastro de generos (selecionar e add generos)