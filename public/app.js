console.log("testtestest");



if (document.getElementsByClassName('form-signin').length > 0) {
    const i_login = document.getElementById('inputEmail');
    const i_pass = document.getElementById('inputPassword');
    const btn_send = document.getElementById('btn_send_form');


    const sendForm = (e) => {
        e.preventDefault();

        // const formData = new FormData(); formData.append('login', i_login.value);
        // formData.append('password', i_pass.value);

        const data = {};
        data.login = i_login.value;
        data.password = i_pass.value;

        let encode_data = [];

        for (let prop in data) {
            let key = encodeURIComponent(prop);
            let val = encodeURIComponent(data[prop]);
            encode_data.push(`${key}=${val}`);
        }

        encode_data = encode_data.join('&');

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        fetch('/authenticate', {
            method: 'POST',
            headers: myHeaders,
            body: encode_data
        }).then((response) => {

            if (response.status !== 200) {

                return response
                    .json()
                    .then((data) => {

                        const head = document.querySelector('#loginForm .form-signin-heading');
                        const html = document.createElement('div');
                        html.innerHTML = `<div class="alert alert-danger" role="alert">
                                             Login incorrect. Please provide right data access.
                                          </div>`;

                        head.parentNode.insertBefore(html, head.nextSibling );

                        console.log('error');
                        console.log('bg data', data);
                    });
            }

            return response
                .json()
                .then((data) => {
                    localStorage.setItem('token', data.token);
                    document.cookie = "token=" + data.token + "; expires=Session; path=/";
                    window.location.href = '/api/';
                });

        }).catch((err) => {
            console.log('Fetch err' + err);
        })

    }

    btn_send.addEventListener('click', sendForm);

}



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}