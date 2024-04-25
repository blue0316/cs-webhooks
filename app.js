const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "greatblueknight@gmail.com",
    pass: "gqcqngdgldqcojvh",
  },
});

app.post("/api/webhooks", (req, res) => {
  const data = req.body;

  const mailOptions = {
    from: "greatblueknight@gmail.com",
    to: "greatblueknight@gmail.com",
    subject: "New API Request",
    text: `You received a new API request with the following data:\n\n${JSON.stringify(
      data
    )}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully");
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
