function init() {
    $('#login-form').submit(handleLoginSubmitted);
    $('#register-link').click(handleRegisterLink);
    $('#register-form').submit(handleRegister);
    $('#login-link').click(handleLoginLink);
    $('.dropdown-item').click(handleLogoutNavbar);
    $('#edit-form').click(handleUpdate);
}


function changePage(value) {
    if (value === 'login-page') {
        $('#sidebar').hide()
        $('#main').hide()
        $('#home').show()
    } else {
        //Content-Page
        $('#sidebar').show()
        $('#home').hide()
        $('#main').show()
    }
    $('.wrapper').hide()
    $(`#${value}`).show()
}

function handleLoginSubmitted() {

    $('#login-form').submit(function (event) {
        event.preventDefault();
        const email = $('#login-email').val();
        const password = $('#login-password').val();

        $.ajax({
            url: 'http://localhost:3000/login',
            method: 'POST',
            data: { email, password }
        })
            .done(function (response) {
                localStorage.setItem('access_token', response.access_token)
                getMovies()
                changePage('content-page')
            })
            .fail(function ({ responseJSON }) {
                const { messages } = responseJSON;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: messages
                })
            })
            .always(function (response) {
                console.log(response);
            })
        // console.log(email, password);
    });

    changePage('login-page')

}

function handleRegisterLink() {

    $('#register-link').click(function (event) {
        event.preventDefault();
        $('#register-page').show();
        $('#login-page').hide();
    });
}

function handleRegister() {

    $('#register-form').submit(function (event) {
        event.preventDefault();
        const username = $('#register-username').val();
        const email = $('#register-email').val();
        const password = $('#register-password').val();
        const phoneNumber = $('#register-phoneNumber').val();
        const address = $('#register-address').val();

        $.ajax({
            url: 'http://localhost:3000/register',
            method: 'POST',
            data: { username, email, password, phoneNumber, address }
        })
            .done(function (response) {
                console.log(response);
                changePage('login-page')

            })
            .fail(function ({ responseJSON }) {
                const { messages } = responseJSON;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: messages
                })
            })
            .always(function (response) {
                console.log(response);
            })
    })

}

function handleLogoutNavbar() {

    $('.dropdown-item').click(function (event) {
        event.preventDefault();
        localStorage.removeItem('access_token');
        changePage('login-page');
    });
}

function handleLoginLink() {

    $('#login-link').click(function (event) {
        event.preventDefault();
        changePage('login-page');
    })
}

function getMovies() {
    $.ajax({
        url: 'http://localhost:3000/movies',
        method: 'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(function (response) {
            // console.log(response.movie[0]);
            response.movie.forEach((el) => {
                $('#movies-page-data').append(`
                <tr>
                    <td>${el.title}</td>
                    <td>${el.synopsis}</td>
                    <td> <img src="${el.imgUrl}" width="200" height="200"></td>
                    <td> <iframe width="200" height="200"
                    src="${el.trailerUrl}">
                    </iframe>
                    </td>
                    <td>${el.rating}</td>
                    <td>
                    <button onClick="handleEdit(${el.id})" class="btn btn-warning">Edit</button>
                    <button onClick="handleDelete(${el.id})" class="btn btn-danger">Delete</button>
                    </td>
                </tr>
                `)
            })

        })
        .fail(function ({ responseJSON }) {
            const { messages } = responseJSON;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: messages
            })
        })
}

function handleDelete(id) {
        $.ajax({
            url: `http://localhost:3000/movies/${id}`,
            method: "DELETE",
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
            .done(function () {
                changePage("content-page");
            })
            .fail(function ({ responseJSON }) {
                const { messages } = responseJSON;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: messages
                })
            });
}

function handleUpdate(id) {
    $.ajax({
        url: `http://localhost:3000/movies/${id}`,
        method: "PUT",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(function () {
            changePage("edit-page");
        })
        .fail(function ({ responseJSON }) {
            const { messages } = responseJSON;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: messages
            })
        });
}

$(document).ready(function () {
    init();
    if (!localStorage.getItem('access_token')) {
        changePage('login-page');
    } else {
        getMovies()
        changePage('content-page');
    }
});