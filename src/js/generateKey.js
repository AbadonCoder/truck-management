import Swal from "sweetalert2";

const btnKey = document.querySelector("#btnKey");

btnKey.addEventListener("click", generateApiKey);

async function generateApiKey(e) {
    e.preventDefault();

    const url = `${window.origin}/api/generateApiKey`;

    try {
        const response = await fetch(url);
        const {msg, key} = await response.json();

        // Show new api key
        Swal.fire(
            msg,
            `Api Key: ${key}`,
            'success'
        );
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }  
}