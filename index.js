import express from "express";
import dotenv from "dotenv";
import sendMail from "./mail.js";
dotenv.config();
const app = express();
app.use(express.json({ limit: "20kb" }));
const PORT = process.env.PORT || 8000;
app.get("/", async (req, res) => {
  const { email, mobileNo, userID } = req.body;
  if (!email || !mobileNo || !userID) {
    res.status(400).send("BAD REQUEST");
    return;
  }

  const a = await sendMail(email);
  if (a?.accepted?.includes(email)) {
    res.status(200).json({
      message: "got the request, check email inbox (spam folder also)",
    });
    return;
  }
  //
  res.send("invalid email provided");
});

app.listen(PORT, (error) => {
  if (error) {
    console.log({ error });
    return;
  }
  console.log(`server is listening on port ${PORT}`);
});
