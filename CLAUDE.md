# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Google Apps Script (GAS) project for an attendance tracking system. The application consists of:

- **Code.gs**: Main server-side logic handling POST/GET requests for attendance registration and address resolution using Google Maps API
- **Index.html**: Client-side web form for attendance registration with geolocation support
- Simple time recording system that logs attendance (IN/OUT) with location data to Google Sheets

## Architecture

The system uses Google Apps Script as a web application with the following flow:
1. Client HTML form collects user name and IN/OUT status
2. JavaScript captures user's GPS coordinates using browser geolocation API
3. POST request sent to GAS doPost() function with attendance data
4. Server-side reverse geocoding converts coordinates to readable address using Google Maps API
5. Data written to Google Sheets with timestamp, name, status, coordinates, and address

## Configuration Requirements

The application requires these Script Properties to be configured in Google Apps Script:
- `SpreadSheet_ID`: Target Google Sheets spreadsheet ID
- `Sheet_Name`: Specific sheet name within the spreadsheet
- `Maps_API_KEY`: Google Maps API key for reverse geocoding

## Key Components

### Code.gs Functions
- `doPost()`: Handles attendance registration requests, validates parameters, calls geocoding, writes to sheets
- `doGet()`: Serves the HTML interface for web deployment
- `getAddressFromCoordinates()`: Reverse geocoding using Google Maps Geocoding API
- `include()`: HTML template inclusion helper

### HTML Interface
- Responsive form design with name input and IN/OUT radio buttons
- GPS location capture with error handling for various geolocation failures
- Fetch API for form submission to GAS endpoint
- User feedback for registration status and error messages

## Development Notes

- The HTML contains placeholder 'YOUR_DEPLOYED_WEB_APP_URL' that needs to be replaced with actual GAS web app URL after deployment
- Error handling covers geolocation permission denied, unavailable, timeout scenarios
- Japanese language support for address formatting (`language=ja` in geocoding API call)
- No build process or external dependencies - pure GAS/HTML/JavaScript