# Cats I Know

*Community cat management and observation*

## Application Overview

I spent many years volunteering and working in animal rescue. Within cat rescue, there is a group called “caretakers.” These are people who take care of outdoor, unowned cats. These cats, who may be strays, abandoned, or feral, are often referred to as community cats.

## Purpose

Cats I Know allows caretakers to easily and efficiently monitor all cats and colonies in their care by allowing them to maintain vital information about each cat; including individual and colony (cat family) profiles, feeding schedules, and health records. In short, this is an app for community cat management and observation.

I initially built this app in two weeks as a final project for client-side coursework.

## Features
* Users can create profiles for each cat and colony in their care.
* Users can update health information and notes about each cat, feeding times for colonies
* Users can add cats to colonies or track them as individual cats.
* Users can create daily journal entries for colonies to track feedings and cats present.
* Users view cats and colonies on a map

## Technologies Used

* React
* Javascript
* JSX
* CSS
* HTML
* Axios
* Cloudinary
* Leaflet
* leaflet-geosearch
* react-collapsible

## Installation

### Please note: 

This application does not currently require a password. Therefore the login and registration code written here is completely insecure and would not be implemented in a professional application of this product.

### Meow, let's Get Started: 

1. Clone the application.

```bash
git clone git@github.com:MaeYoungPhan/cats-I-know.git
```
2. If you’d like to access the data, you can do so [here](https://github.com/MaeYoungPhan/cats-I-know-api).
3. Launch the client
```bash
npm install
npm start
```

## Usage

I've written some basic test cases for the majority of the features of this app so you can make sure it's running properly. Two of the test cases are in this ReadMe, the rest can be found on the [Cats-I-Know-Tests Google Sheet.](https://docs.google.com/spreadsheets/d/1t8xkmpIjSax2Wn_f-KMAi_1d2yVX6Fm0FQsBOnCfxRE/edit?usp=sharing)

If using [Cats-I-Know-API](https://github.com/MaeYoungPhan/cats-I-know-api), catdaddy@catdaddy.com is suggested login for demo.

### View Cat List	
**GIVEN** a user wants to view all of their cats 
**WHEN** the client navigates to /cats 
**THEN** the browser should display a list of all of the current user's cats	

**Assumption:** User has cats added cats to database		

**Test:** 
1. Click "My Cats" either in upper navigation bar or on dashboard to navigate to /cats	

**Expected Result:** A list of all of the current user's cats should load as cards containing an image, name, and found date at /cats. Search bar, add cat button, and "My Cats" title should appear at top of page.

### Add Colony
**GIVEN** the user wants to create a new colony 
**WHEN** the client completes and submits the Add Colony form 
**THEN** the colony should be added to the user's database AND the new colony should appear in the list at /colonies

**Precondition:** Files accepted for image upload are image files only

**Test:** 
1. From /colonies, click the Add Colony button at the top of the page

2. Complete form fields as they apply to the new colony. For location, type in address and click to search location. Check the checkbox to accept the location.

3. Click 'Add Colony'

**Expected Result:** Browser navigates to /colonies and user's colonies list loads. Newly added colony now appears in the list (in alphabetical order.) New colony also appears on the map at /maps. Colony icons are green.

## Planning

[Wire Frame](https://miro.com/app/board/uXjVP-jm5D4=/?share_link_id=884827418866)

[ERD](https://dbdiagram.io/d/6387742ebae3ed7c4543d7f0)

![](https://github.com/MaeYoungPhan/cats-I-know/blob/main/CatsIKnow.png)

## Acknowledgements

📸 Vanessa Spear for walking me through Axios and Cloudinary set up

🌎 Shaina Couch for helping with Leaflet installs

🐐 Sydney Dickson, Caroline Madison, Dakota Lambert and my colleagues in Cohort 60 for encouragement and keepin’ the vibes. 

## Created By

[Maegan Phan](https://www.linkedin.com/in/maeyoungphan/)
