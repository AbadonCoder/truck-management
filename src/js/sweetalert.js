import Swal from 'sweetalert2';

const trucks = document.querySelector('#trucks');

trucks.addEventListener('click', (e) => {

    e.preventDefault();

    // If id it's equals to btnDelete delete truck
    if(e.target.id == 'btnDelete') {
        const id = e.target.dataset.id;
        const url = `${window.location.origin}/manage/delete-truck/${id}`;

    
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0F172A',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
    
            if(result.isConfirmed) {
                // Petition api to our server
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        const {msg} = data;
                        if (result.isConfirmed) {
                            console.log('Llego al primero if');
                            Swal.fire(
                                'Deleted!',
                                `${msg}`,
                                'success'
                            )
                        }
        
                        // Redirect user
                        setTimeout(() => {
                            window.location.href = window.location;
                        }, 2500);
                    })
                    .catch(err => {
                        const {msg} = err;
        
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: msg
                        });
                    })
            }
        })
    }
});