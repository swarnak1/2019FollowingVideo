import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({ direct:true,
    host: '',
    port: 465,
    auth: { 
        user: '', 
        pass: '' },
    secure: true
})

export { transporter }