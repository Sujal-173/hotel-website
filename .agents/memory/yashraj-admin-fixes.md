---
name: Yashraj Palace Admin Fixes
description: Admin functionality bugs fixed and live-update architecture implemented
---

## Key decisions and non-obvious constraints

### cancelBooking accepts both _id and bookingId
The MyBookingsPage was calling `bookingsAPI.cancel(b.bookingId)` (friendly ID like YPR1A2B3C) but `cancelBooking` controller used `findById()` expecting MongoDB ObjectId. Fix: controller now uses `mongoose.Types.ObjectId.isValid(id)` to branch between `findById` and `findOne({ bookingId })`. Also fixed the UI to pass `b._id` for clarity.

**Why:** Friendly bookingId is shown in UI for display; _id is the DB key for lookups.

### Admin rooms endpoint: /api/rooms/admin/all
Public `GET /rooms` always filters `{ isActive: true }`. Admin needs ALL rooms (including deactivated) via `GET /rooms/admin/all` → `getRoomsAdmin`. Route must be declared BEFORE `/:slug` in roomRoutes.js to avoid the slug route swallowing it.

### Admin offers endpoint: /api/offers/admin/all
Public `GET /offers` only returns active, non-expired offers. Admin uses `GET /offers/admin/all` → `getOffersAdmin` (no filters). Route must be declared before `/admin/:id` put route in miscRoutes.js.

### Live website updates via Socket.IO content_updated event
When admin changes rooms/gallery/reviews/packages, backend emits `socket.emit('content_updated', { type, action })` to ALL connected clients (not just admin room). Public pages (RoomsPage, GalleryPage, ReviewsPage) subscribe via `useSocket().subscribe('content_updated', ...)` and call their load function when `data.type` matches.

**Why:** socket.emitToAdmin goes only to admin_room; socket.emit reaches everyone.

### AdminPackages: toggle active + delete
Added `togglePackageActive` and `deletePackage` helpers in AdminPackages component. Backend `DELETE /packages/:id` already existed (soft delete via isActive:false). Frontend now shows Hide/Show and delete buttons.
