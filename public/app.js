console.log("testtestest");

if (document.getElementsByClassName('form-signin').length > 0) {
    const i_login = document.getElementById('inputEmail');
    const i_pass = document.getElementById('inputPassword');
    const btn_send = document.getElementById('btn_send_form');

    console.log(btn_send);
    
    const sendForm = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append('login', i_login.value);
        // formData.append('password', i_pass.value); 

        const data = {};
        data.login = i_login.value;
        data.password = i_pass.value;

        let encode_data = [];

        for(let prop in data) {
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
            return response.json();
        }).then((data) => {

            //response
            console.log('bg data', data);
        })

    }


    btn_send.addEventListener('click', sendForm);
    

}