import nodeMailer from 'nodemailer'

const transporter = nodeMailer.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    secure : false, // true for 465, false for other ports
    auth:{
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
})

export default transporter;