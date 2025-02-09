# Example of environment file (For testing purpose, you guys can have my oauth id and secrets)

# Server configuration
PORT=3001
HOST=localhost

# Frontend Hostname
FRONTEND_HOST="http://localhost:3001"

# Server secret
SESSION_SECRET="sessionSecrettt"
JWT_SECRET="jwtSecrettt"

# Database configuration (Configure with your own db)
DATABASE_URL="postgresql://postgres:somePassword@localhost:5432/fintech_test?schema=public" 

# Google oauth configuration
GOOGLE_CLIENT_ID="1001300138315-9uoebvefjghadqto1tvqa7agqv16gu2g.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"

# Linkedin oauth configuration
LINKEDIN_CLIENT_ID="86ubf590mi26zb"
LINKEDIN_CLIENT_SECRET="WPL_AP1.pLcDrMd0C8JyM71q.STlaMw=="

# NodeMailer configuration
NODEMAILER_SERVICE="gmail"
NODEMAILER_USER="fintechsocietycareers@gmail.com"
NODEMAILER_PASS="jcwumrzyziorybek"
