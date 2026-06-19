---
name: Yashraj Palace Security Audit
description: Durable rules and non-obvious decisions from the full security/logic audit and fix pass
---

## Key architectural decisions

### Payment amount — never trust the client
`paymentsAPI.createOrder()` must NOT include `amount`. Backend computes it from the booking record server-side.
- Frontend: `useRazorpay.js` only sends `{ bookingId, bookingType }`
- Backend: `create-order` controller fetches booking, multiplies `pricing.advancePaid` internally
**Why:** Prevented client-side price manipulation.

### Duplicate `$or` keys in Mongoose queries
JavaScript object literals silently drop duplicate keys — only the last `$or` wins. Use `$and: [ {$or:…}, {$or:…} ]` pattern.
**Where:** promo code validation in `bookingController.js`

### Webhook body — raw Buffer handling
Route `/api/payments/webhook` uses `express.raw({ type: 'application/json' })` before `express.json()`.
In the webhook controller, `req.body` is a Buffer. Must do `JSON.parse(req.body.toString())` to get the payload, and use the raw Buffer for HMAC verification (not JSON.stringify of the parsed object).

### Booking confirmation page — no auth required
`BookingConfirmPage` uses three-tier fallback:
1. sessionStorage (`booking_${bookingId}`) — populated immediately after booking creation in RoomDetailPage/EventBookPage
2. Auth API (`bookingsAPI.getMy()`) — finds booking by `bookingId` in user's list if logged in
3. Guest lookup form — user enters phone, calls `/api/bookings/lookup?bookingId=&phone=` (public route)
**Why:** `GET /api/bookings/:id` uses MongoDB ObjectId and requires auth — confirmation page uses friendly `bookingId` strings like `YPR1A2B3C`.

### Packages endpoint
Frontend `eventsAPI.getPackages()` must call `/packages` (NOT `/events/packages`). Backend serves packages at `app.use('/api/packages', ...)`.

### AuthContext HMR warning
`AuthContext.jsx` exports both `AuthProvider` (component) and `useAuth` (hook) — Vite Fast Refresh warns but correctly full-reloads. This is expected and harmless; do not split the file unless HMR becomes a real problem.

### Cron job IDs
`cron.js` starts two jobs: booking expiry (every 10 min, cancels pending+unpaid room bookings >20 min old) and event quote expiry (midnight, cancels inquiry-stage event bookings >72 hr old). Confirm they appear in startup logs.

### DB indexes added (key ones)
- RoomBooking: `{ room, checkIn, checkOut }` for availability conflict
- EventBooking: `{ eventDetails.eventDate, eventDetails.venue, status }` for date conflict
- Offer: `{ code, isActive }` for fast promo validation
