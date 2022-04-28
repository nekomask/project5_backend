# Project 5
# MyBikeDatabase
My objectives in this Capstone projects were to continue improving my website from Project 3 by creating a better front-end and UI experience detailed below:

This React-powered app is an idea I had before I started coding. Over the years, I've repaired and assembled my own bicycles piece-by-piece. It has always annoyed me when a part needed a replacement that I would have to disassemble my bike to double-check the component's measurements in order to ensure that the new part would be compatible. So that was the whole inspiration behind this app. Why not save myself the time and avoid getting my hands dirty more than once?

# Updates since Project 3

**Splash Page**
A small but important change to the index page are the radio buttons. In Project 3, a user had to click twice on a radio button to render the correct bicycle frame. Some of the code I originally used was redundant, causing that effect, but now a user can display the correct bicycle frame on the very first click.

**Show Pages**
The most crucial feature that did not make it into project 3 would be the Show pages. Having lifted React's State from the child to the parent, I can now return a single object and display its property stats on its respective show page. In my opinion, this is the most important element of the entire app. Beyond just displaying values, I've also added a color property to the object model, and now show pages will now display "customized" images depending on the user's Frame Type and color inputs when creating a bike object. I can take this even further in the future by photoshopping several variations of a particular bike frame with different components like the type of handlebars a user selects-- but that would be incredibly tedious and I'd rather focus on coding for now.

**UX Design**
In project 3, I struggled with a clunky mess of a create page. The list of bike objects were all the way on the left of the page and disappeared to the very bottom of the page when a user opened the form to create a bike. On top of that, I strugged on how to manage displaying so many different model properties without overwhelming the user with so much information. 

I ended up reading through the UX capstone module and borrowed a key idea how eye-tracking data shows a trend in how users typically view content in an F pattern. So now, the list of bikes is looking good displayed at the top of the page above the create-form while also taking up only a fraction of the page space that it used to-- letting users create multiple bikes, if they desire, in an economical way.

Similarly, I applied this concept on the show page, where each model property is categorized in its own box-- looking uniformed under the user's custom bike image. 

**Minimalist Style**
Because of the nature in how I'm rendering "custom" colorized bike images-- a PNG that is transparent where the frame would be-- I think this component of the website would look ugly if I used any other background color than white (because the PNG image around the bike is still white-- I feel the contrast of a different background color would ruin the mystique). I think there might be a technical solution to this problem if I wanted to get rid of the white area in each image but I think it would involve some type of combination of masks and alpha channels that I'd rather explore later while I focus on code for now.

As for the create form, I styled it in a way where all component categories are displayed alongside each other (depending on the user's resolution of course). It's a super minimal design but given there are so many properties, I rather not overwhelm the user with an odd color scheme or background image.

# Stretch Goals
In preparing to publish this site, I feel the last key component is a login session for users to keep track of their own specific bikes. That's a given. I am hoping to complete this component before I present the project but I also still want to pass the class so that's why I'm calling it a stretch goal.

If a vendor, like a bike shop, actually wants to use this app for its clients-- I could refactor this page to only display bikes and make a whole new page specifically for the create form. But for now, this is a consumer-oriented design and I'm not expecting the average person to have more than a dozen bikes (or realistically even a fraction of that).

Other short-term goals would also include more front-end validations, styling, and updating the edit form. It will probably have a similar aesthetic to the create form but at least it currently works.

Front-end heroku: https://mybikedatabase-frontend.herokuapp.com/

Back-end heroku: https://mybikedatabase-backend.herokuapp.com/
