"use strict"

import Swal from 'sweetalert2';

const trucks = document.querySelector('#trucks');
trucks.addEventListener('click', updateTruck);

async function updateTruck(e) {
    e.preventDefault();

    if(e.target.id == 'btnUpdate') {
        // Get token from html head
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const id = e.target.dataset.id;
        let  url = `${window.location.origin}/manage/update-truck/${id}`;
        let truck;

        // Get truck data
        try {
            truck = await fetch(url);
            truck = await truck.json();
            const {brand, model, year, plate} = truck;

            // Modal form
            const  {value: formValues } = await Swal.fire({
                title: 'Update Truck',
                html:
                  `<input type="text" id="brand" class="swal2-input" name="brand" placeholder="Brand" value="${brand}">` +
                  `<input type="text" id="model" class="swal2-input" name="model" placeholder="Model" value="${model}">`+
                  `<input type="number" id="year" class="swal2-input" name="year" placeholder="Year" value="${year}">`+
                  `<input type="text" id="plate" class="swal2-input" name="plate" placeholder="Plate" value="${plate}">`,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                      document.querySelector('#brand').value,
                      document.querySelector('#model').value,
                      document.querySelector('#year').value,
                      document.querySelector('#plate').value
                    ]
                },
                confirmButtonText: 'Save Changes',
                confirmButtonColor: '#0F172A',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancel'
            });

            // Structure data
            const newData = {
                brand: formValues[0],
                model: formValues[1],
                year: formValues[2],
                plate: formValues[3]
            }

            let response = await fetch(url, {
                method:'POST', 
                headers: new Headers({
                    'CSRF-Token': token, 
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(newData)
            });

            const res = await response.json();

            if(response.status === 400) {
                const {msg} = res.errors[0];

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: msg
                });
            } else {
                // Truck upgaded
                Swal.fire(
                    'Updated!',
                    res.msg,
                    'success'
                )
                
                // Redirect to the same location
                setTimeout(() => {
                    window.location.href = window.location;
                }, 2500);
            }
              
        } catch (errors) {
            console.log(errors);
        }
    }
}