// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/send", async (req, res) => {
//   const { name, email, message } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "tucuenta@gmail.com",
//       pass: "tu_app_password", // No tu contraseña normal
//     },
//   });

//   const mailOptions = {
//     from: email,
//     to: "tucuenta@gmail.com", // A quién llega
//     subject: `Mensaje de ${name}`,
//     text: message,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send("Correo enviado correctamente!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error al enviar el correo.");
//   }
// });

// app.listen(3001, () => {
//   console.log("Servidor corriendo en http://localhost:3001");
// });


import nodemailer from "nodemailer";

export class EmailController{

    send = async (req, res) => {
        console.log(req.body)
        const {email, subject, body} = req.body;

        if(!email || !subject || !body){
            console.log(email, subject, body)
            return res.status(400).json(`Los parámetros ${email? '' :`Email, `}${subject? "" : `Asunto, `}${body? "" : `Cuerpo, `}está/n inválido/s`)
        }
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
                },
            }); // Transporter is the one SENDING and RECIVING 
        
        const mailOptions = {
            from: `"${email} (formulario Dubra)" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: subject,
            html: `<h1> Dubra Transporte. </h1><h2>${email}</h2><p>${body}</p>`
        }

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json("Correo enviado correctamente!")
        } catch(error){
            logger.error.apply('Error Interno', error)
            res.status(500).json({ error: 'Error interno' })
        }
    }

}