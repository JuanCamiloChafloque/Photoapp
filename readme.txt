CS 310 Spring 2023 Final project
--------------------------------------------------------------------------------------------------------------------------------
Group name: Tao Brothers
Juan Camilo Chafloque Mesia
Vedant Apte
Tanay Srivastava

The final project consisted in an extension of project 2. The architecture is very similar as it has a client, a node server 
deployed in AWS EC2, a MySQL AWS RDS database and an object storage in AWS S3.

The additions made to the final project was to change completely the client side of the application. We moved from a console-interactive
Python client to a full React application that was deployed to Netlify. The main features that the React application has are:

- Email/Password authentication to manage profiles and user sessions.
- Discover feed where a logged-in user can see all the photos posted by all the users in the application. For this display,
  we made use of S3 pagination to show only 6 images at a time, with the option of showing more and so on until there are no more
  images to display.
- The discover page also has the main feature of the project. The filtering modal that allows the user to filter by date and/or by location.
  For the location filtering system, to make it more user friendly, we used geocode to translate the actual address typed by the user to
  coordinates, as this is needed because each image information regarding location is in the [latitude, longitude] format. To be less precise
  about the location filtering, there is a 30 mile radius extension from the central point (typed location) for the filtering of images.
- The discover page also has the option to click on any of the images that are in display. When clicked the user is redirected to a more detailed
  page that shows information about the photo selected, the user that posted it, as well as a map with the location which the photo was taken. We used
  the leaflet module for the map view.
- There is a 'My Photos' page, in which the user can see only the photos he/she has uploaded and some additional information like, date posted, description
  and the location it was taken. Since the location is stored as coordinates in the database, we used geocode again to translate from coordinates to an
  actual address.
- There is a 'Update profile' page in which the user can change their information like name and email.
- There is an Upload page, in which the user can select a photo from his/her computer files, enter a name for the image, enter a small description and upload
  the photo to the app. The images are stored in S3 and as well, we used the exifr module to extract the metadata from the image before its uploaded and save it
  in the RDS database. The two metadatas that are extracted are the coordinates in which the photo was taken and the date it was taken.

Backend AWS EC2 endpoint: https://photoapp-camilochafloque.s3.us-east-2.amazonaws.com/