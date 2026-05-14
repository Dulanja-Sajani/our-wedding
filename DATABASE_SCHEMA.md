# Database Schema & Examples

This file contains database schemas and example data for future integration with a database.

## 📊 Database Schema

### SQL (MySQL/PostgreSQL)

```sql
-- Guests table
CREATE TABLE guests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  relationship VARCHAR(50),
  dietary_requirements VARCHAR(255),
  plus_ones INT DEFAULT 0,
  language_preference VARCHAR(50) DEFAULT 'English',
  notes TEXT,
  invitationSent BOOLEAN DEFAULT FALSE,
  rsvpReceived BOOLEAN DEFAULT FALSE,
  rsvpStatus ENUM('yes', 'no', 'maybe') DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Responses table (optional - for detailed RSVP data)
CREATE TABLE responses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  guestId INT NOT NULL,
  fullName VARCHAR(255),
  phone VARCHAR(20),
  attending ENUM('yes', 'no', 'maybe'),
  guestCount INT DEFAULT 1,
  dietary VARCHAR(255),
  message TEXT,
  guestToken VARCHAR(255) UNIQUE,
  respondedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (guestId) REFERENCES guests(id)
);

-- Create indexes for faster queries
CREATE INDEX idx_email ON guests(email);
CREATE INDEX idx_rsvpStatus ON guests(rsvpStatus);
CREATE INDEX idx_invitationSent ON guests(invitationSent);
CREATE INDEX idx_guestToken ON responses(guestToken);
```

### MongoDB

```javascript
// Guests collection
db.guests.insertOne({
  _id: ObjectId(),
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  relationship: "Friend",
  dietary_requirements: "",
  plus_ones: 1,
  language_preference: "English",
  notes: "Close friend from college",
  invitationSent: false,
  rsvpReceived: false,
  rsvpStatus: null,
  createdAt: ISODate(),
  updatedAt: ISODate()
});

// Responses collection
db.responses.insertOne({
  _id: ObjectId(),
  guestId: 1,
  fullName: "John Doe",
  phone: "+1234567890",
  attending: "yes",
  guestCount: 2,
  dietary: "Vegetarian",
  message: "Looking forward to it!",
  guestToken: "eyJnZXN0SWQiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSJ9",
  respondedAt: ISODate()
});
```

### Firebase/Firestore

```javascript
// guests/{id}
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  relationship: "Friend",
  dietary_requirements: "",
  plus_ones: 1,
  language_preference: "English",
  notes: "Close friend from college",
  invitationSent: false,
  rsvpReceived: false,
  rsvpStatus: null,
  createdAt: timestamp,
  updatedAt: timestamp
}

// responses/{id}
{
  guestId: 1,
  fullName: "John Doe",
  phone: "+1234567890",
  attending: "yes",
  guestCount: 2,
  dietary: "Vegetarian",
  message: "Looking forward to it!",
  guestToken: "eyJnZXN0SWQiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSJ9",
  respondedAt: timestamp
}
```

---

## 📋 Complete Guest Data Example

### CSV Format

```csv
id,name,email,phone,relationship,plus_ones,notes,invitationSent,rsvpReceived,rsvpStatus
1,John Doe,john@example.com,+1234567890,Friend,1,Close friend from college,FALSE,FALSE,
2,Jane Smith,jane@example.com,+1234567891,Family,2,Sister's best friend,FALSE,FALSE,
3,Bob Johnson,bob@example.com,+1234567892,Colleague,0,Work colleague,FALSE,FALSE,
4,Sarah Williams,sarah@example.com,+1234567893,Family,1,Mom's sister,FALSE,FALSE,
5,Michael Brown,michael@example.com,+1234567894,Friend,1,Childhood friend,FALSE,FALSE,
6,Emma Davis,emma@example.com,+1234567895,Friend,2,College roommate,FALSE,FALSE,
7,David Wilson,david@example.com,+1234567896,Family,1,Dad's brother,FALSE,FALSE,
8,Lisa Anderson,lisa@example.com,+1234567897,Friend,0,Work friend,FALSE,FALSE,
9,James Taylor,james@example.com,+1234567898,Colleague,3,Team lead,FALSE,FALSE,
10,Maria Garcia,maria@example.com,+1234567899,Friend,1,Yoga instructor,FALSE,FALSE,
```

### JSON Format

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "relationship": "Friend",
    "plus_ones": 1,
    "notes": "Close friend from college",
    "invitationSent": false,
    "rsvpReceived": false,
    "rsvpStatus": ""
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567891",
    "relationship": "Family",
    "plus_ones": 2,
    "notes": "Sister's best friend",
    "invitationSent": false,
    "rsvpReceived": false,
    "rsvpStatus": ""
  }
]
```

---

## 📊 RSVP Response Data Example

### After Guest Responds

```json
{
  "id": 1,
  "guestId": 1,
  "fullName": "John Doe",
  "phone": "+1234567890",
  "attending": "yes",
  "guestCount": 2,
  "dietary": "Vegetarian",
  "message": "Looking forward to celebrating with you!",
  "guestToken": "eyJnZXN0SWQiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSJ9",
  "respondedAt": "2026-05-15T10:30:00Z"
}
```

---

## 🗄️ Database Migration Guide

### From CSV/JSON to MySQL

```bash
# 1. Export guests.json
npm run json-to-csv

# 2. Import into MySQL
mysql -u username -p database_name << EOF
LOAD DATA LOCAL INFILE 'guests.csv'
INTO TABLE guests
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, name, email, phone, relationship, dietary_requirements, plus_ones, language_preference, notes, invitationSent, rsvpReceived, rsvpStatus);
EOF
```

### From JSON to MongoDB

```bash
# 1. Import using mongoimport
mongoimport --db wedding --collection guests --file guests.json --jsonArray

# 2. Or use Mongoose (Node.js)
const Guest = require('./models/Guest');
const guests = require('./guests.json');
await Guest.insertMany(guests);
```

### From JSON to Firebase

```javascript
// Using Firebase Admin SDK
const admin = require('firebase-admin');
const guests = require('./guests.json');

const db = admin.firestore();
const batch = db.batch();

guests.forEach((guest) => {
  const docRef = db.collection('guests').doc(String(guest.id));
  batch.set(docRef, guest);
});

await batch.commit();
```

---

## 📈 Useful Database Queries

### SQL Queries

```sql
-- Count guests by relationship
SELECT relationship, COUNT(*) as count 
FROM guests 
GROUP BY relationship;

-- Find guests with dietary requirements
SELECT name, dietary_requirements, plus_ones
FROM guests 
WHERE dietary_requirements != ''
ORDER BY dietary_requirements;

-- Get RSVP statistics
SELECT 
  rsvpStatus,
  COUNT(*) as count,
  SUM(plus_ones) as total_plus_ones
FROM guests 
WHERE rsvpReceived = TRUE
GROUP BY rsvpStatus;

-- Guests who haven't received invitations
SELECT id, name, email, phone
FROM guests 
WHERE invitationSent = FALSE;

-- Find duplicate emails
SELECT email, COUNT(*) 
FROM guests 
GROUP BY email 
HAVING COUNT(*) > 1;
```

### MongoDB Queries

```javascript
// Count guests by relationship
db.guests.aggregate([
  { $group: { _id: "$relationship", count: { $sum: 1 } } }
]);

// Guests with dietary requirements
db.guests.find({ dietary_requirements: { $ne: "" } });

// RSVP statistics
db.guests.aggregate([
  { $match: { rsvpReceived: true } },
  { $group: { 
      _id: "$rsvpStatus", 
      count: { $sum: 1 },
      total_plus_ones: { $sum: "$plus_ones" }
    }
  }
]);

// Guests who haven't received invitations
db.guests.find({ invitationSent: false });
```

---

## 🔄 Data Import/Export Workflows

### Complete Workflow

```
Step 1: Collect Data
   ├─ Create guests.csv in Excel
   └─ Edit with your guest list

Step 2: Prepare for Database
   ├─ npm run csv-to-json
   └─ Review guests.json

Step 3: Send Invitations
   ├─ Configure .env
   └─ npm run send-invitations

Step 4: Track RSVPs
   ├─ Update guests.json as RSVPs come in
   └─ Update rsvpStatus, rsvpReceived fields

Step 5: Migrate to Database
   ├─ Choose database (MySQL, MongoDB, Firebase)
   ├─ Use import tools or scripts
   └─ Sync guest and response data

Step 6: Generate Reports
   ├─ Query database for statistics
   ├─ Export CSV for analysis
   └─ Create visualizations
```

---

## 🛠️ Database Setup Scripts

### MySQL Setup

```bash
# Create database and import data
mysql -u root -p <<EOF
CREATE DATABASE wedding_rsvp;
USE wedding_rsvp;

$(cat database-schema.sql)

LOAD DATA LOCAL INFILE './guests.json'
INTO TABLE guests
...
EOF
```

### MongoDB Setup

```bash
# Create indexes for better performance
db.guests.createIndex({ "email": 1 });
db.guests.createIndex({ "rsvpStatus": 1 });
db.guests.createIndex({ "invitationSent": 1 });

db.responses.createIndex({ "guestId": 1 });
db.responses.createIndex({ "guestToken": 1 });
```

---

## 📚 Recommended Tools

### Database GUIs
- **MySQL**: MySQL Workbench, phpMyAdmin, DBeaver
- **MongoDB**: MongoDB Compass, Robo 3T
- **Firebase**: Firebase Console
- **General**: DataGrip, DBeaver (supports all)

### Import/Export Tools
- **CSV**: Excel, Google Sheets, LibreOffice
- **JSON**: Online converters, custom scripts
- **Database**: Native import tools, ETL tools

### Analytics Tools
- **Tableau**: Professional dashboards
- **Metabase**: Self-hosted analytics
- **Google Data Studio**: Free dashboard tool
- **Excel**: Pivot tables for simple analysis

---

## ✅ Data Validation

Before importing to database:

```javascript
// Check for:
// 1. Duplicate emails
// 2. Invalid phone numbers
// 3. Missing required fields
// 4. Proper data types

const validateGuests = (guests) => {
  const errors = [];
  const emails = new Set();
  
  guests.forEach((guest, index) => {
    // Check required fields
    if (!guest.name || !guest.email || !guest.phone) {
      errors.push(`Row ${index + 1}: Missing required fields`);
    }
    
    // Check email format
    if (!guest.email.includes('@')) {
      errors.push(`Row ${index + 1}: Invalid email format`);
    }
    
    // Check phone format
    if (!guest.phone.startsWith('+')) {
      errors.push(`Row ${index + 1}: Phone must start with +`);
    }
    
    // Check duplicates
    if (emails.has(guest.email)) {
      errors.push(`Row ${index + 1}: Duplicate email`);
    }
    emails.add(guest.email);
  });
  
  return errors;
};
```

---

## 🎯 Next Steps

1. Choose your database (MySQL, MongoDB, Firebase)
2. Set up database infrastructure
3. Use import/export scripts to migrate data
4. Set up automated backups
5. Create monitoring/alerts for important changes
6. Generate reports for wedding planning

For more details, see [GUEST_MANAGEMENT.md](GUEST_MANAGEMENT.md)
