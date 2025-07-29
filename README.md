GreenLoopX 🌱
A Circular Returns & Sustainability Intelligence Platform

GreenLoopX is an innovative full-stack web application. It empowers retailers to manage returned products sustainably by triaging them for resale, donation, recycling, or refurbishment, while providing real-time insights into environmental impact.

📽 Demo Video
Watch working demo- https://youtu.be/PFKPjUbtbk0?si=KIAFT6qSgXzvaTDt

🧠 Project Idea
Retail returns are a major challenge for sustainability — with billions of dollars worth of merchandise returned annually, leading to waste, emissions, and profit loss.

GreenLoopX transforms the return journey into a circular, eco-intelligent flow by enabling:

-Structured return intake and categorization

-Dynamic inventory triaging

-Real-time environmental and operational analytics

-Circular actions: resell, recycle, refurbish, donate


🧩 Features

✅ Secure JWT-based login & role-based dashboard

✅ Return Form with auto-classification logic

✅ Dynamic Inventory Module to track and update returned items

✅ Real-time Dashboard: returns stats, landfill diversion, donation %, carbon savings

✅ Update inventory routes and reflect real-time dashboard metrics

✅ Clean, responsive UI with focus on associate usability

📦 Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS, Recharts
Backend	Spring Boot (Java), REST APIs
Database	PostgreSQL
Auth	JWT Token Auth
State Mgmt	React Hooks, Context API

🔄 Return Lifecycle
-Associate logs in securely
-Navigates to Return Form → enters product details
-Item is classified into return route (Resale / Recycle / Donate / Refurbish)
-Lands into Inventory for tracking
-Team updates inventory status when action is taken
-Dashboard reflects real-time impact metrics (CO₂ saved, landfill reduced, etc.)

📊 Dashboard Metrics
-Total Returns Logged
-Items Diverted from Landfill
-Total Donations Made
-Estimated Carbon Footprint Saved
-Live Inventory Count
-Top Return Categories

🛠️ Setup Instructions
🔧 Prerequisites: Node.js, PostgreSQL, Java 17+

Clone the repo
-git clone https://github.com/JainYatharth/GreenLoop

Frontend Setup
-cd client
-npm install
-npm run dev

Backend Setup
-cd server
-./mvnw spring-boot:run

Create PostgreSQL DB
-Create DB → Update application.properties → Run backend

👥 Team GreenLoop
Yatharth Jain (JainYatharth)
Priyanshu Jha (priyanshujhagithub)
