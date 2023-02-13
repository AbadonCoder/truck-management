import Mailjet from 'node-mailjet';

const registerEmail = (data) => {
    const mailjet = Mailjet.apiConnect(process.env.MAIL_KEY, process.env.MAIL_SKEY);
    const {name, email, token} = data;

    const request = mailjet
        .post('send', {version: 'v3.1'})
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": 'adriangpe5666@gmail.com',
                        "Name": 'Truck Management'
                    },
                    "To": [
                        {
                            "Email": `${email}`,
                            "Name": `${name}`
                        }
                    ],
                    "Variables": {
                        "name": `${name}`,
                        "url": `${process.env.BACKEND_URL}:${process.env.PORT ?? 8000}/auth/confirm/${token}`
                    },
                    "TemplateID": 4578601,
                    "TemplateLanguage": true
                }
            ]
        });

        request
            .then(response => console.log(response.body))
            .catch(err => console.log(err.statusCode));
}

export {
    registerEmail
}