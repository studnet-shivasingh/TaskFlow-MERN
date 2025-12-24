const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.get("/test-sms", async (req, res) => {
  let { phone } = req.query;

  if (!phone) {
    return res.status(400).json({
      message: "Phone number required. Use ?phone=+91XXXXXXXXXX"
    });
  }

  // ✅ FORCE E.164 FORMAT
  phone = phone.toString().trim();
  if (!phone.startsWith("+")) {
    phone = `+${phone}`;
  }

  try {
    await client.messages.create({
      body: "✅ TaskFlow Test SMS: Twilio working!",
      from: process.env.TWILIO_PHONE,
      to: phone,
    });

    console.log("SMS sent to", phone);
    res.json({ message: "SMS sent successfully", phone });
  } catch (error) {
    console.error("SMS failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

