const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

const HEADER = `
  <div style="background:#6B1A2B;padding:24px;text-align:center">
    <h1 style="color:#C9A84C;margin:0;font-size:22px">Yashraj Palace</h1>
    <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">Hotel · Wedding Garden · Events</p>
  </div>`;

const FOOTER = `
  <div style="background:#F2EDE4;padding:16px;text-align:center">
    <p style="margin:0;color:#8A8480;font-size:12px">© 2025 Yashraj Palace · Mandleshwar, Madhya Pradesh</p>
  </div>`;

const sendEmail = async ({ to, subject, html }) => {
  if (!to) return;
  try {
    await transporter.sendMail({ from: process.env.EMAIL_FROM || process.env.EMAIL_USER, to, subject, html });
    console.log(`✉ Email sent to ${to}`);
  } catch (err) {
    console.error('Email error:', err.message);
  }
};

// ─── GUEST EMAILS ──────────────────────────────────────────────────────────────

const sendBookingConfirmation = async (booking) => {
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
    ${HEADER}
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
        <p style="margin:4px 0 0;color:#4A4A4F;font-size:14px">📞 +91 70000 00000 · 💬 <a href="https://wa.me/917000000000" style="color:#6B1A2B">WhatsApp</a></p>
      </div>
      <p style="color:#4A4A4F;font-size:14px">For any queries, please WhatsApp or call us. We look forward to welcoming you!</p>
    </div>
    ${FOOTER}
  </div>`;
  await sendEmail({ to: booking.guestDetails.email, subject: `Booking Confirmed – ${booking.bookingId} | Yashraj Palace`, html });
};

const sendEventInquiryConfirmation = async (booking) => {
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
    ${HEADER}
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
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Token Amount</td><td style="padding:10px">₹10,000 (to confirm)</td></tr>
      </table>
      <div style="background:#FFF9EE;border:1px solid #C9A84C;border-radius:6px;padding:14px;margin:20px 0">
        <p style="margin:0;font-weight:bold;color:#6B1A2B">Our team will reach out on: ${booking.contactDetails.phone}</p>
        <p style="margin:6px 0 0;color:#4A4A4F;font-size:14px">Or WhatsApp us now: <a href="https://wa.me/917000000000" style="color:#6B1A2B">wa.me/917000000000</a></p>
      </div>
    </div>
    ${FOOTER}
  </div>`;
  await sendEmail({ to: booking.contactDetails.email, subject: `Event Inquiry Received – ${booking.bookingId} | Yashraj Palace`, html });
};

// ─── ADMIN ALERTS ─────────────────────────────────────────────────────────────

const sendAdminNewBookingAlert = async (booking) => {
  if (!ADMIN_EMAIL) return;
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
    ${HEADER}
    <div style="padding:28px">
      <h2 style="color:#1C1C1E;margin-top:0">🏨 New Room Booking Received</h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B;width:40%">Booking ID</td><td style="padding:10px">${booking.bookingId}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Guest Name</td><td style="padding:10px">${booking.guestDetails?.name}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Phone</td><td style="padding:10px">${booking.guestDetails?.phone}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Room</td><td style="padding:10px">${booking.room?.name || 'N/A'}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Check-In</td><td style="padding:10px">${new Date(booking.checkIn).toDateString()}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Check-Out</td><td style="padding:10px">${new Date(booking.checkOut).toDateString()}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Total Amount</td><td style="padding:10px;color:#6B1A2B;font-weight:bold">₹${booking.pricing?.totalAmount?.toLocaleString('en-IN')}</td></tr>
      </table>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5000'}/admin/bookings" style="display:inline-block;background:#6B1A2B;color:#C9A84C;padding:12px 24px;text-decoration:none;font-weight:bold;border-radius:4px;margin-top:8px">View in Admin Dashboard</a>
    </div>
    ${FOOTER}
  </div>`;
  await sendEmail({ to: ADMIN_EMAIL, subject: `🏨 New Booking ${booking.bookingId} – ${booking.guestDetails?.name} | Yashraj Palace`, html });
};

const sendAdminNewEventAlert = async (booking) => {
  if (!ADMIN_EMAIL) return;
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
    ${HEADER}
    <div style="padding:28px">
      <h2 style="color:#1C1C1E;margin-top:0">🎊 New Event Inquiry Received</h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B;width:40%">Inquiry ID</td><td style="padding:10px">${booking.bookingId}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Contact Name</td><td style="padding:10px">${booking.contactDetails?.name}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Phone</td><td style="padding:10px">${booking.contactDetails?.phone}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Event Type</td><td style="padding:10px;text-transform:capitalize">${booking.eventType}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Event Date</td><td style="padding:10px">${new Date(booking.eventDetails?.eventDate).toDateString()}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Guest Count</td><td style="padding:10px">${booking.eventDetails?.guestCount}</td></tr>
        ${booking.pricing?.totalEstimate ? `<tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Estimated Value</td><td style="padding:10px;color:#6B1A2B;font-weight:bold">₹${booking.pricing.totalEstimate.toLocaleString('en-IN')}</td></tr>` : ''}
      </table>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5000'}/admin/event-bookings" style="display:inline-block;background:#6B1A2B;color:#C9A84C;padding:12px 24px;text-decoration:none;font-weight:bold;border-radius:4px;margin-top:8px">View in Admin Dashboard</a>
    </div>
    ${FOOTER}
  </div>`;
  await sendEmail({ to: ADMIN_EMAIL, subject: `🎊 New Event Inquiry ${booking.bookingId} – ${booking.contactDetails?.name} | Yashraj Palace`, html });
};

const sendAdminNewInquiryAlert = async (inquiry) => {
  if (!ADMIN_EMAIL) return;
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
    ${HEADER}
    <div style="padding:28px">
      <h2 style="color:#1C1C1E;margin-top:0">📩 New Contact Inquiry</h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B;width:40%">Name</td><td style="padding:10px">${inquiry.name}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Phone</td><td style="padding:10px">${inquiry.phone}</td></tr>
        <tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Email</td><td style="padding:10px">${inquiry.email}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Type</td><td style="padding:10px;text-transform:capitalize">${inquiry.inquiryType || 'general'}</td></tr>
        ${inquiry.subject ? `<tr style="background:#FAF7F2"><td style="padding:10px;font-weight:bold;color:#6B1A2B">Subject</td><td style="padding:10px">${inquiry.subject}</td></tr>` : ''}
        <tr><td style="padding:10px;font-weight:bold;color:#6B1A2B">Message</td><td style="padding:10px">${inquiry.message}</td></tr>
      </table>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5000'}/admin/inquiries" style="display:inline-block;background:#6B1A2B;color:#C9A84C;padding:12px 24px;text-decoration:none;font-weight:bold;border-radius:4px;margin-top:8px">View in Admin Dashboard</a>
    </div>
    ${FOOTER}
  </div>`;
  await sendEmail({ to: ADMIN_EMAIL, subject: `📩 New Inquiry from ${inquiry.name} – ${inquiry.inquiryType || 'General'} | Yashraj Palace`, html });
};

module.exports = {
  sendEmail,
  sendBookingConfirmation,
  sendEventInquiryConfirmation,
  sendAdminNewBookingAlert,
  sendAdminNewEventAlert,
  sendAdminNewInquiryAlert,
};
