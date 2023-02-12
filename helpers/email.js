import Mailjet from 'node-mailjet';

const registerEmail = (data) => {
    const mailjet = Mailjet.apiConnect(process.env.MAIL_KEY, process.env.MAIL_SKEY);
    const {name, email, token} = data;

    const request = mailjet
        .post('send', {version: 'v3.1'})
        .request({
            Messages: [
                {
                    From: {
                        Email: 'adriangpe5666@gmail.com',
                        Name: 'Truck Management'
                    },
                    To: [
                        {
                            Email: `${email}`,
                            Name: `${name}`
                        }
                    ],
                    Subject: 'Confirm your account at truckManagement.com',
                    TextPart: 'Thanks for bealive in us, please confirm your account',
                    HTMLPart: `
                        <p>Hello ${name}, confirm your account at truckManagement.com</p>
                        <p>Your account is alredy, only click the next link 
                            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 8000}/auth/confirm/${token}">Confirm Account</a>
                        </p>

                        <p>If you don't create this account just ignore this email.</p>
                    `
                }
            ]
        });

        request
            .then(response => {
                console.log(response.body);
                console.log('Email sended');
            })
            .catch(err => console.log(err.statusCode));
}

export {
    registerEmail
}