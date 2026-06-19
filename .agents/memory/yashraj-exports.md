---
name: Yashraj Palace Export Pattern
description: All pages must use only default exports; dual/named exports cause Vite HMR issues
---

## Rule

Every page component must use **only** `export default function PageName()`.

**Never** add a named export like `export function PageName()` alongside the default export.

## Why

Vite Fast Refresh triggers "Could not Fast Refresh (export removed)" and forces a full App.jsx reload when a file transitions from named+default to default-only export. This was repeatedly causing HMR issues.

Files that had this fixed: DiningPage, ReviewsPage, EventPackagesPage, NearbyPage.

## How to Apply

When creating or editing any page file in `frontend/src/pages/`:
1. Use `export default function PageName() { ... }` — single declaration
2. Never add `export function PageName()` as a separate named export
3. Helper components used only within the file should NOT be exported at all (e.g., `RoomCard`, `StaticRooms`, `StarRow` in their respective pages)
