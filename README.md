" Amrit Ghale - Personal Portfolio Website" 
Website Preview

A fully responsive personal portfolio website with a modern UI, animated components, and a Node.js backend with MongoDB for contact form submissions and visitor analytics.

✨ Features
Frontend
✅ Responsive Design – Works on mobile, tablet, and desktop
✅ Interactive Animations – Smooth scroll, skill bars, hover effects
✅ Dynamic Project Filtering – Filter projects by category (Web, App, Design)
✅ Contact Form – Connected to a Node.js backend
✅ Dark/Light Mode – Toggleable theme (optional)
✅ SEO Optimized – Meta tags, semantic HTML..

Backend
✅ REST API – Handle form submissions and analytics
✅ MongoDB Database – Store contacts and visitor data
✅ Rate Limiting – Prevent spam requests
✅ Error Handling – Proper logging and validation
✅ Email Notifications – Get alerts when someone contacts you

🛠 Tech Stack
Frontend
HTML5, CSS3, JavaScript

Font Awesome (Icons)

Google Fonts (Poppins, Open Sans)

Backend
Node.js (Runtime)

Express.js (Server Framework)

MongoDB (Database)

Mongoose (ODM)

Nodemailer (Email Notifications)

📂 Project Structure
plaintext
Copy
amrit-ghale-website/
├── backend/               # Backend API
│   ├── config/            # DB & rate limit config
│   ├── controllers/       # API logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── server.js          # Main backend entry
│   └── .env               # Environment variables
├── public/                # Frontend files
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript
│   ├── images/            # All images
│   └── index.html         # Main HTML file
└── README.md              # This file
🚀 Installation & Setup
Prerequisites
Node.js (v16+)

MongoDB Atlas (Free cloud DB) or Local MongoDB

Git

Step 1: Clone the Repository
bash
Copy
git clone https://github.com/Amrit-ghale/personal-portfolio.git
cd personal-portfolio
Step 2: Set Up Backend
Navigate to the backend folder:

bash
Copy
cd backend
Install dependencies:

bash
Copy
npm install
Create a .env file (copy from .env.example):

bash
Copy
cp .env.example .env
Edit .env with your MongoDB credentials:

ini
Copy
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolioDB?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key
PORT=3000
Step 3: Set Up Frontend
Go to the public folder:

bash
Copy
cd ../public
No installation needed (static files).

Step 4: Run the Project
Start the backend (in one terminal):

bash
Copy
cd backend
npm start
Start the frontend (in another terminal):

bash
Copy
cd public
npx live-server --port=8080
Open in browser:
🔗 http://localhost:8080

🌐 Deployment (Hosting Online)
Option 1: Vercel (Frontend) + Render (Backend)
Frontend (Vercel):

Push to GitHub

Import in Vercel → Select public as root

Automatic deployment

Backend (Render):

Create a Web Service

Connect GitHub repo

Set environment variables (MONGODB_URI, JWT_SECRET)

Deploy

Option 2: Full-Stack on Heroku
bash
Copy
# In project root:
heroku create
heroku addons:create mongolab
git push heroku main
🔌 API Endpoints
Endpoint	Method	Description
/api/contact	POST	Submit contact form
/api/analytics/visitor	POST	Track visitor data
/api/projects	GET	Fetch all projects
/api/health	GET	Server health check
🐛 Debugging Common Issues
❌ MongoDB Connection Failed
✅ Check .env file & whitelist IP in MongoDB Atlas

❌ CORS Errors
✅ Ensure backend allows frontend origin (http://localhost:8080)

❌ Form Not Submitting
✅ Check browser console (F12 → Console)

📜 License
MIT License - Free to use and modify.

📬 Contact
Email: amritghale9810@gmail.com

GitHub: @Amrit-ghale

LinkedIn: Amrit Ghale

🎯 Next Steps
Add blog functionality

Implement dark/light mode toggle

Add user authentication (optional)

🚀 Happy Coding! 🚀
