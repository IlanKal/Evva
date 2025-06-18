# Evva – Smart Event Planning Platform

Evva is a modern web platform designed for HR teams in organizations to plan and manage events efficiently. Users interact with a guided chatbot that collects all relevant event preferences through a structured, rule-based conversation flow. Once the data is gathered, the system uses a smart algorithm to allocate the budget across different supplier categories and selects the most suitable vendors for each domain. Users can then finalize deals directly on the platform.

> The name *Evva* refers to the assistant persona that guides users through the process – a friendly bot designed with a human-like interface. Note: Evva is not AI-based, but operates via scripted logic.

---

## ✨ Features

- **Interactive chatbot interface** for collecting event details (script-based, not AI)
- **Milestone-based UI** to track event progress (Overview, Guests, Supplier Selection, etc.)
- **Smart supplier matching algorithm** that combines scoring + linear programming (LP)
- **Supplier-client interaction** – Users can choose suppliers and suppliers can approve or reject requests
- **Personal area for users and suppliers** with editable event and profile data
- **Guest list management** with Excel upload support and RSVP tracking
- **Supplier rating system** available post-event for both organizers and guests
- **Role-based access** (`user` / `supplier`) with JWT authentication

---

## 🔧 Tech Stack

- Angular 19
- Angular Material
- RxJS
- TypeScript
- RESTful APIs
- JWT Auth (access & refresh tokens)
- LocalStorage for session persistence

---

## 📁 Environment Setup

Frontend: `http://localhost:4200`  
Backend: `http://localhost:3000`

Make sure Node.js and Angular CLI are installed.

```bash
npm install
ng serve
