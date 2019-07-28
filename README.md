# Fitmate-Application
```
How to set up:
cd fitmate_test
npm install
react-native run-android

Application Overview:
Every Fitness app out there in the market is basically a collection of exercises that can be done with/without equipment to target the different muscle groups for a proper work out session. Examples:

Fitness & bodybuilding
MyfitnessPal
Home workout

Other types include fitness tracker which can track your calorie burnt , distance travelled / speed etc. for every run.

Our Application differs from all the other applications in its purpose. The purpose of our app is not for bodybuilding. It is exercise challenges consisting of short exercises that everyone can do anywhere or anytime. Users can challenge one another and give each other and their friends challenges by first completing the challenge themselves first. Points can be accumulated and doing so in such a gamified manner will hopefully motivate users to incorporate exercise in the daily routine and be physically active everyday despite their busy schedule. In future, incentives can be incorporated to motivate more people to join in and exercise.

To verfiy that challenges have been complete, users can upload a video of them doing the exercise which will put through opencv algorithms that will verify if the correct number of the exercise was completed. We will be using skelton tracking algorithms to track the joints to do this verification. 


FITMATE
P Pradeep & Rishab Patwari
Proposed level of achievement:  Apollo 11

“A gamified fitness application that allows users to send videos of them doing static fitness challenges to friends in their friend list, and encourages a physically active lifestyle.”

Motivation(s):
In our busy schedules, we often get daunted by physical exercises after a tiring day. Additionally other commitments from school and work often cause us to forget or not give much thought to physical exercises. However to be honest, squeezing in a short push-up session is not something we cannot afford to do however busy our schedule may be. 

Product Aim:
To come up with an app that gamifies static physical exercise, by utilizing the element of friendly peer to peer competition and bandwagon effect to make our application attractive and addictive, but with a positive physical outcome (their health).

Features Developed:
Ability to record and send exercise video challenges to friends (Priority: High)
Look at the challenges sent by friends, their videos and complete the challenge to earn points
Leadership scoreboard that maintains your fitness progress and allows comparison with peers (Priority: High)
View the completion status of the friends you have sent the challenges to. This enables you to see who has and has not completed the challenge. 
Ability to find and add friends to your Friend list
Machine Learning Exercise Counter Algorithm (for push ups)
Google cloud instance started to deploy machine learning counter algorithm. This is done to offload the processing from the mobile devices to a powerful google cloud server instance. 


User Stories:
As a student busy with work, i want to be able to incorporate exercises into my daily routine and be motivated to keep on doing so
As a fitness trainer i want to be able to issue challenges to my clients and see to it that the complete it outside training sessions
As a fitness freak i want my friends and family to jump in on the healthier lifestyle by doing more exercises  in their day to day life
As a person who is already exercising on a regular basis, i want incentives for the things i already do and am good at.

Scope of Project:
Our app allows users to send challenges of short exercises that everyone can do anywhere or anytime. 
Users can give each other and their friends challenges by first completing the challenge themselves first and recording themselves doing it using our app within a timelimit of 1 minute. 
Our app then verifies the number of repetitions done, using our video analysis algorithm and allocates points to the user corresponding to the number of reps.
 

How are we different from other similar apps:
Every Fitness app out there in the market is basically a collection of exercises that can be done with/without equipment to target the different muscle groups for a proper work out session. Examples:

Fitness & bodybuilding
MyfitnessPal
Home workout

Other types include fitness tracker which can track your calorie burnt , distance travelled / speed etc. for every run.

Our Application differs from all the other applications in its purpose. The purpose of our app is not for bodybuilding. It is exercise challenges consisting of short exercises that everyone can do anywhere or anytime. Users can challenge one another and give each other and their friends challenges by first completing the challenge themselves first. Points can be accumulated and doing so in such a gamified manner will hopefully motivate users to incorporate exercise in the daily routine and be physically active everyday despite their busy schedule. In future incentives can be incorporated to motivate more people to join in and exercise.


Scope:
Technology Stack:
React-Native used to develop Android and IOS Native Applications
Firebase for database management and backend
react-native-camera package for camera integration
react-native-navigation package for routing between screens
Open-cv and machine learning to do video analysis to count the number of repetitions of the exercise


Roles:

Rishab:
User Authentication using email and Facebook
Video Recording Function integration into the application
UI
OpenCV algorithm for exercise verification

Pradeep:
Database management
Sending video challenge across to friend in user’s friend list
UI
OpenCV algorithm for exercise verification
Machine Learning Model for Push up counting


Project Planning:
	
	Priority High to Low:
Issuing Challenges to friends
Complete challenges issued by friends
Adding friends and friend group functionality
Video Recording Functionality
Sending Video Functionality
Leaderboard
Open CV video analysis to count our exercise repetition accurately
Facebook Integration

	Feature Deadline:

Issuing Challenges to friends (Deadline 5th June , implemented by Pradeep)
Complete challenges issued by friends (Deadline 5th June , implemented by Pradeep)
Adding friends and friend group functionality (Deadline 5th June , implemented by Rishab)
Video Recording Functionality (Deadline: 8 June, Implemented by: Rishab) 
Sending Video Functionality (Deadline: 18 June, Implemented by: Pradeep)
Creating a leaderboard using firebase database (Deadline: 30 June, Implemented by: Rishab)
Open CV video analysis to count our exercise repetition accurately (Deadline : 15 July , implemented by Pradeep and Rishab)
Facebook Integration (Deadline: 20 July, Implemented by: Pradeep)



Timeline:

Month
Week
Target
July
1
Ensure that the issue video challenge and receive and complete video challenge functionality is completed.
2
Link Open CV Skeleton Tracking Algorithm to Video Uploaded to Cloud Database
3
Create leaderboard and improve count system
4
Add the delete account function & Write Testing Code
August
1
Test and debug all app functionalities
2
Beautify App

Project Log

S/N
Task
Date
Pradeep
Rishab
Remarks
1
Project Idea brainstorming
7 May
6 h
6 h
Brainstorming of ideas for the project as well as the general tech stack to use for the application development
2
Team Meeting and initial planning (without mentor)
20 May
5 h
5 h
Once idea was finalised after liftoff and mentor found, the UI design was discussed and roles were delegated
3
Learning React Native and Firebase
24th May onwards
15h
15h
Went through Udemy, Youtube videos as well as online documentation to learn how to work with these technologies
4
Learning about Google play console App deployment steps
25th May
0h
5h
Learnt how to deploy the app on to the playstore
5
Team Meeting and initial planning (with mentor @Thoughtworks office)


23 May
4 h
4 h
UI design and idea was finalised . Goals were set. Mentor briefly went through concept of test-driven programming 
6
Develop at Home
24-28 May`
15h
15h
Dependencies installed and set-up, Basic UI,Firebase authentication, Firestore set up completed
7
Team Meeting with mentor (@Thoughtworks office)
29 May
3h
3h
Progress updated, next internal milestone and goals set 
8
Develop at Home
30 May - 1 June
9h
9h
Firestore database integrated to user account creation, issuing challenges,  friends and friend group management.

Camera integrated into app
9
Develop at home
2 June - 5 june
12h 
12h
Code refactoring , learn about test driven development and firebase cloud storage


10
Team meeting without mentor to plan and split work
6 june
3h
3h
Work distribution for the next few weeks and setting targets
11
Develop at home
8 June - 10 June
8h
8h
Learning about machine learning and ANN models 
12
Develop at home
11 June - 13 June
5h
5h
Data collection for machine learning model
13
Develop at home
16 June - 20 june
0h
7h
Uploading videos to firebase cloud storage
14
Develop at home
17 June - 21 June
10h
0h
Building and training ANN model
15
Team meeting with mentor at thoughtworks office
 22 june
4h
4h
Updated progress. Greater insight provided into test driven development and why it's necessary. Next area of focus decided
16
Integrating video upload with the rest of the app.
24june - 26 June
8h
8h
New screen created to add video to challenge
17
Debugging problem with firestore and cloud storage working together
28 June -30 June
6h
6h


18
Team meeting without mentor 
7 July
4h
4h
Decide on improved UI design and splitting the work for UI modification
19
Code at home
12 July - 16 July
12h
12h
Work on improving the UI 
20
Creating a google VM instance on google compute engine for deployment of the machine learning algorithm
18 July - 20 July
4 h
0h
Successfully created account and VM instance
21
More Data Collection for further training the machine learning model
21st July
0h
2h
Collected data from friends and family
22
Attempted to Add testing code for automated tests
21st July
0h
6h
Was not successful. Ran into many dependency conflicts and issues
22
Extensive User Testing using basic functionalities and improved UI
20th July - 25th July
10h
10h
Asked Friends to install our app from the playstore to test all of its features and five feedback on usability, Intuitiveness etc.
23
Added Leaderboard Functionality 
22July - 24 July
10h
10h
Successful
24
Port ML algorithms to cloud and expose REST API endpoints to have the algorithm successfully deployed
22nd July - 24th July
7h
 0h
Failed to complete task. 
25
Fix UI inconsistencies
25th July -28th July
0h
5h
UI styling more consistent throughout the pages
26
Wrote python script on the google cloud instance to have it automatically scrape video data from firebase cloud storage to have the machine learning algorithm run on it on an hourly basis
25th July - 26th July
10h
0h
Successful . Machine learning algorithm to count push ups successfully deployed on google cloud to have challenge videos verified
27
Meeting with mentor 
25th July
5h
5h
Received feedback on UI changes
28
Extensive User Testing
25th July - 27th July
7h
7h
Received User feedback about the push counting features, UI, leaderboard features from friends and family members who downloaded the app from the play store. Generally well received with many positive comments from the users.
29
Final UI adjustments
27th july - 28th July
7h
7h
Did the final tweaks to the UI to fix all other minor bugs that were found from the user testing

							    Total Hours: 372 hours

Pradeep
Rishab
189 h
183 h


MILESTONE 3 README:


FITMATE
P Pradeep & Rishab Patwari
Proposed level of achievement:  Apollo 11

“A gamified fitness application that allows users to send videos of them doing static fitness challenges to friends in their friend list, and encourages a physically active lifestyle.”

Motivation(s):
In our busy schedules, we often get daunted by physical exercises after a tiring day. Additionally other commitments from school and work often cause us to forget or not give much thought to physical exercises. However to be honest, squeezing in a short push-up session is not something we cannot afford to do however busy our schedule may be. 

Product Aim:
To come up with an app that gamifies static physical exercise, by utilizing the element of friendly peer to peer competition and bandwagon effect to make our application attractive and addictive, but with a positive physical outcome (their health).


User Stories:
As a student busy with work, i want to be able to incorporate exercises into my daily routine and be motivated to keep on doing so
As a fitness trainer i want to be able to issue challenges to my clients and see to it that the complete it outside training sessions
As a fitness freak i want my friends and family to jump in on the healthier lifestyle by doing more exercises  in their day to day life
As a person who is already exercising on a regular basis, i want incentives for the things i already do and am good at.

Scope of Project:
Our app allows users to send challenges of short exercises that everyone can do anywhere or anytime. 
Users can give each other and their friends challenges by first completing the challenge themselves first and recording themselves doing it using our app within a timelimit of 1 minute. 
Our app then verifies the number of repetitions done, using our video analysis algorithm and allocates points to the user corresponding to the number of reps.
 

How are we different from other similar apps:
Every Fitness app out there in the market is basically a collection of exercises that can be done with/without equipment to target the different muscle groups for a proper work out session. Examples:

Fitness & bodybuilding
MyfitnessPal
Home workout

Other types include fitness tracker which can track your calorie burnt , distance travelled / speed etc. for every run.

Our Application differs from all the other applications in its purpose. The purpose of our app is not for bodybuilding. It is exercise challenges consisting of short exercises that everyone can do anywhere or anytime. Users can challenge one another and give each other and their friends challenges by first completing the challenge themselves first. Points can be accumulated and doing so in such a gamified manner will hopefully motivate users to incorporate exercise in the daily routine and be physically active everyday despite their busy schedule. In future incentives can be incorporated to motivate more people to join in and exercise.


Scope:
Technology Stack:
React-Native used to develop Android and IOS Native Applications
Firebase for database management and backend
react-native-camera package for camera integration
react-native-navigation package for routing between screens
Open-cv and machine learning to do video analysis to count the number of repetitions of the exercise
Google Compute Engine: for the purpose of deploying our machine learning algorithm to the cloud to off load the computational intensive processes to the cloud servers.

Project management:

Project is hosted on Rishab’s GitHub at the following link. Pradeep forked the repository and cloned the fork locally to do the coding. Features developed by both programmers were to be first pushed to their respective repositories and a pull request was then to be initiated by Pradeep to update the master branch on RIshab’s Repository with features that Pradeep developed. Pradeep will then fetch Rishab’s features using git rebase to merge Rishab’s master branch with his own. The was the development flow that was adopted for our project




Issues Faced:
Several minor issues were faced throughout the development of the project . Most of them took a few hours to fix while some took days. Listed below are the bugs that we faced and took longest to fix due to the unhelpful error messages.

Version conflicts between packages caused the build to fail
Problem was solved by ensuring that we install specific versions of every package 
Firebase cloud firestore could not be written to and read from due to a bug in the latest firebase package for react-native
Package was uninstalled and a previous version of the package was installed instead


Videos could not be uploaded successfully to cloud storage 
 Metadata for the video file was missing even though the file appeared on the cloud storage and hence the video was not playable.
Tweaked properties tried different approaches that were suggested in online articles and forums to result in final working version.
 Testing packages could not be installed 
Seriously turned out attention to writing testing code only after coming up with our mvp 
Focused on coming up with an android app and hence had ignored the iOS dependencies and errors throughout our development 
When attempting to run testing code, the tests would fail before even running because the iOS dependencies needed to be resolved. 
Too many dependency errors in the IOS side. Due to limited time , we had to abandon our pursuit of writing automated testing code.
Decided to do extensive manual testing through friends
Lesson Learnt: we should write our testing code for each feature as we develop the feature and not at the end of the project


Problems Faced:

Most of the problems faced during the app development mainly revolved around package version conflicts and improper linking of the react native packages to native android and ios packages and libraries. Our emulator in such scenarios would just display a white screen with no helpful error messages which made debugging extra difficult. In such situations the fastest thing to do was then to uninstall and reinstall packages which were last installed and which likely led the the problem. The packages were then manually linked to the build.gradle files instead of using the npm link commands.

Features Developed:
Ability to record and send exercise video challenges to friends 
View the challenges sent by friends and their videos.
Complete the challenge to earn points
Leadership scoreboard that maintains your fitness progress and allows comparison with peers (Priority: High)
View the completion status of the friends you have sent the challenges to. This enables you to see who has and has not completed the challenge. 
Ability to find and add friends to your Friend list
Machine Learning Exercise Counter Algorithm (for push ups)
Google cloud instance started to deploy machine learning counter algorithm. This is done to offload the processing from the mobile devices to a powerful google cloud server instance. 

Features that were planned but not yet complete
Machine learning algorithm to count the number of sit-ups and squats performed
Facebook integration



User Testing
Due to the lack of time and issues faced in attempting to write testing code(see above) , the attempt was abandoned and manual user testing was performed. The app was deployed to the google play store as soon as basic features such as user authentication and adding friends were completed. This enabled us to easily get customer feedback from friends whom we asked to download and give comments for our app. Officially we had 2 rounds of user testing that was done. During these time periods, we asked friends and family to use our app and give feedback on every aspect of the application. This included bugs that the users faced, app crashes, unintuitiveness of the user interface, user interface design and much more. BAsed on the feedback received, we 


```
