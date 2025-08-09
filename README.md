# time_recorder

Attendance Management System - Location-based time tracking application using Google Apps Script

## Overview

This project is a web application that automatically records employee attendance with location information. It captures GPS coordinates using browser geolocation, converts them to readable addresses via Google Maps API, and stores the data in Google Sheets.

## Deployment Instructions

### 1. Prerequisites

#### Google Sheets Setup
1. Create a new Google Sheets spreadsheet
2. Get the spreadsheet ID from the URL (`https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`)
3. Create two sheets:
   - **Attendance Records Sheet**: For storing attendance data (e.g., "Attendance Records")
   - **Members Sheet**: For managing user names (e.g., "Members")
4. In the Members sheet, add employee names in column A (one name per row)

#### Google Maps API Key
1. Access [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable Maps JavaScript API and Geocoding API
4. Create an API key in Credentials
5. Set appropriate API key restrictions

### 2. Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New project"
3. Rename the project to "time_recorder"

### 3. Deploy Code

1. Copy `Code.gs` content into the Apps Script editor's `Code.gs`
2. Click `+` button and select "HTML" to create an HTML file named `Index`
3. Copy `Index.html` content into the HTML file

### 4. Configure Script Properties

1. In Apps Script editor, go to "Project Settings" → "Script properties"
2. Add the following properties:
   - `SpreadSheet_ID`: Your Google Sheets ID
   - `Sheet_Name`: Your attendance records sheet name (e.g., "Attendance Records")
   - `Members_Sheet_Name`: Your members sheet name (e.g., "Members") - Optional, defaults to "Members"
   - `Maps_API_KEY`: Your Google Maps API key

### 5. Initial Deployment

1. In Apps Script editor, click "Deploy" → "New deployment"
2. Click the gear icon next to "Type" and select "Web app"
3. Configure:
   - Description: Optional
   - Execute as: Me
   - Who has access: Anyone (adjust based on your organization)
4. Click "Deploy"
5. **Copy and save the deployed web app URL**

### 6. Update HTML File

1. Replace `YOUR_DEPLOYED_WEB_APP_URL` on line 204 of `Index.html` with the web app URL from step 5
2. Copy the updated HTML back into the Apps Script Index file

### 7. Final Deployment

1. Click "Deploy" → "Manage deployments"
2. Click the pencil icon to edit
3. Change "Version" to "New version"
4. Click "Deploy"

### 8. Testing

1. Access the deployed web app URL
2. Allow location access when prompted
3. Enter a name, select IN/OUT, and click "Register"
4. Verify data is correctly recorded in Google Sheets

## Usage

1. Access the web app URL
2. Select your name from the dropdown (names are loaded from the Members sheet)
3. Select "IN" for clock-in or "OUT" for clock-out
4. Click "Register" button
5. Location capture and registration will be processed automatically

**Managing Members:**
- Add new employee names to column A of the Members sheet
- Names will automatically appear in the dropdown when the page loads
- Duplicate names are automatically removed
- Names are sorted alphabetically in the dropdown

## Troubleshooting

- **Location not captured**: Check browser location permission settings
- **Address not retrieved**: Verify Google Maps API key and Geocoding API activation
- **Cannot write to spreadsheet**: Check SpreadSheet_ID and Sheet_Name configuration
- **Names not loading**: Verify Members_Sheet_Name exists and contains names in column A
- **"Members sheet not found" error**: Create a sheet named "Members" or set Members_Sheet_Name property
- **Access permission error**: Review deployment access settings