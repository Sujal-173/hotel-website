const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
    console.log(`✉ Email sent to ${to}`);
  } catch (err) {
    console.error('Email error:', err.message);
  }
};

const sendBookingConfirmation = async (booking) => {
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
    <div style="background:#6B1A2B;padding:24px;text-align:center">
      <h1 style="color:#C9A84C;margin:0;font-size:22px">Yashraj Palace</h1>
      <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">Hotel · Wedding Garden · Events</p>
    </div>
    <div style="padding:28px">
      <h2 style="color:#1C1C1E;margin-top:0">Booking Confirmed ✅</h2>
      <p style="color:#4A4A4F">Dear <strong>${booking.guestDetails.name}</strong>,</p>
      <p style="color:#4A4A4F">Your room booking at Yashraj Palace has been received. Here are your details:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B;width:40%">Booking ID</td><td style="padding:10px">${booking.bookingId}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Room</td><td style="padding:10px">${booking.room?.name || 'N/A'}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Check-In</td><td style="padding:10px">${new Date(booking.checkIn).toDateString()}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Check-Out</td><td style="padding:10px">${new Date(booking.checkOut).toDateString()}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Total Amount</td><td style="padding:10px">₹${booking.pricing.totalAmount.toLocaleString('en-IN')}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Advance Paid</td><td style="padding:10px">₹${booking.pricing.advancePaid.toLocaleString('en-IN')}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Balance Due</td><td style="padding:10px">₹${booking.pricing.balanceDue.toLocaleString('en-IN')} (at check-in)</td></tr>
      </table>
      <div style="background:#FFF9EE;border:1px solid #C9A84C;border-radius:6px;padding:14px;margin:20px 0">
        <p style="margin:0;color:#6B1A2B;font-weight:bold">📍 Yashraj Palace</p>
        <p style="margin:4px 0 0;color:#4A4A4F;font-size:14px">Near Mandleshwar, Khargone District, Madhya Pradesh</p>
        <p style="margin:4px 0 0;color:#4A4A4F;font-size:14px">📞 +91 70000 00000 · 💬 WhatsApp: wa.me/917000000000</p>
      </div>
      <p style="color:#4A4A4F;font-size:14px">For any queries, please WhatsApp or call us. We look forward to welcoming you!</p>
    </div>
    <div style="background:#F2EDE4;padding:16px;text-align:center">
      <p style="margin:0;color:#8A8480;font-size:12px">© 2025 Yashraj Palace · Mandleshwar, Madhya Pradesh</p>
    </div>
  </div>`;
  await sendEmail({ to: booking.guestDetails.email, subject: `Booking Confirmed – ${booking.bookingId} | Yashraj Palace`, html });
};

const sendEventInquiryConfirmation = async (booking) => {
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
    <div style="background:#6B1A2B;padding:24px;text-align:center">
      <h1 style="color:#C9A84C;margin:0;font-size:22px">Yashraj Palace</h1>
      <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">Hotel · Wedding Garden · Events</p>
    </div>
    <div style="padding:28px">
      <h2 style="color:#1C1C1E;margin-top:0">Event Inquiry Received 🎊</h2>
      <p style="color:#4A4A4F">Dear <strong>${booking.contactDetails.name}</strong>,</p>
      <p style="color:#4A4A4F">Thank you for your event inquiry at Yashraj Palace. Our team will call you within 2 hours to discuss your requirements and share a custom quote.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B;width:40%">Inquiry ID</td><td style="padding:10px">${booking.bookingId}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Event Type</td><td style="padding:10px">${booking.eventType.charAt(0).toUpperCase() + booking.eventType.slice(1)}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Event Date</td><td style="padding:10px">${new Date(booking.eventDetails.eventDate).toDateString()}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Guest Count</td><td style="padding:10px">${booking.eventDetails.guestCount}</td></tr>
        ${booking.pricing.totalEstimate ? `<tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Estimated Cost</td><td style="padding:10px">₹${booking.pricing.totalEstimate.toLocaleString('en-IN')}</td></tr>` : ''}
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Token Amount</td><td style="padding:10px">₹${(10000).toLocaleString('en-IN')} (to confirm)</td></tr>
      </table>
      <div style="background:#FFF9EE;border:1px solid #C9A84C;border-radius:6px;padding:14px;margin:20px 0">
        <p style="margin:0;font-weight:bold;color:#6B1A2B">Our team will reach out on: ${booking.contactDetails.phone}</p>
        <p style="margin:6px 0 0;color:#4A4A4F;font-size:14px">Or WhatsApp us now: <a href="https://wa.me/917000000000" style="color:#6B1A2B">wa.me/917000000000</a></p>
      </div>
    </div>
    <div style="background:#F2EDE4;padding:16px;text-align:center">
      <p style="margin:0;color:#8A8480;font-size:12px">© 2025 Yashraj Palace · Mandleshwar, Madhya Pradesh</p>
    </div>
  </div>`;
  await sendEmail({ to: booking.contactDetails.email, subject: `Event Inquiry Received – ${booking.bookingId} | Yashraj Palace`, html });
};

module.exports = { sendEmail, sendBookingConfirmation, sendEventInquiryConfirmation };
