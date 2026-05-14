#!/bin/bash

# Wedding Invitation System Setup Script
# Installs all dependencies needed for CSV/JSON conversion and sending invitations

echo "🎉 Wedding Invitation System Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo ""

# Install npm packages
echo "📦 Installing npm packages..."
echo ""

npm install nodemailer twilio dotenv csv-parse

if [ $? -ne 0 ]; then
    echo "❌ Failed to install packages"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "==========="
echo ""
echo "1. Edit guests.csv with your guest list"
echo "   - Open in Excel, Google Sheets, or any text editor"
echo ""
echo "2. Convert CSV to JSON:"
echo "   npm run csv-to-json"
echo ""
echo "3. Set up credentials in .env file:"
echo "   - Gmail app password (see INVITATION_SETUP.md)"
echo "   - Twilio account credentials (see INVITATION_SETUP.md)"
echo ""
echo "4. Send invitations:"
echo "   npm run send-invitations"
echo ""
echo "📖 For detailed instructions, see:"
echo "   - INVITATION_SETUP.md (email & WhatsApp setup)"
echo "   - CSV_GUIDE.md (CSV/JSON guide)"
echo ""
