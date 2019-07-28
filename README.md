# FITMATE
P Pradeep & Rishab Patwari
Proposed level of achievement:  Apollo 11

“A gamified fitness application that allows users to send videos of them doing static fitness challenges to friends in their friend list, and encourages a physically active lifestyle.”

## Motivation(s):
In our busy schedules, we often get daunted by physical exercises after a tiring day. Additionally other commitments from school and work often cause us to forget or not give much thought to physical exercises. However to be honest, squeezing in a short push-up session is not something we cannot afford to do however busy our schedule may be. 

## Product Aim:
To come up with an app that gamifies static physical exercise, by utilizing the element of friendly peer to peer competition and bandwagon effect to make our application attractive and addictive, but with a positive physical outcome (their health).

## User Stories:
- As a student busy with work, i want to be able to incorporate exercises into my daily routine and be motivated to keep on doing so.

- As a fitness trainer i want to be able to issue challenges to my clients and see to it that the complete it outside training sessions

- As a fitness freak i want my friends and family to jump in on the healthier lifestyle by doing more exercises  in their day to day life

- As a person who is already exercising on a regular basis, i want incentives for the things i already do and am good at.

## Scope of Project:
Our app allows users to send challenges of short exercises that everyone can do anywhere or anytime. 

Users can give each other and their friends challenges by first completing the challenge themselves first and recording themselves doing it.

Our app then verifies the number of repetitions done, using our video analysis algorithm and allocates points to the user corresponding to the number of reps.
 

## How are we different from other similar apps:
Every Fitness app out there in the market is basically a collection of exercises that can be done with/without equipment to target the different muscle groups for a proper work out session. 

Examples:
- Fitness & bodybuilding
- MyfitnessPal
- Home workout

Other types include fitness tracker which can track your calorie burnt , distance travelled / speed etc. for every run.

Our Application differs from all the other applications in its purpose. The purpose of our app is not for bodybuilding. It is exercise challenges consisting of short exercises that everyone can do anywhere or anytime. Users can challenge one another and give each other and their friends challenges by first completing the challenge themselves first. Points can be accumulated and doing so in such a gamified manner will hopefully motivate users to incorporate exercise in the daily routine and be physically active everyday despite their busy schedule. In future incentives can be incorporated to motivate more people to join in and exercise.


## Scope:
### Technology Stack:
- React-Native used to develop Android and IOS Native Applications
- Firebase for database management and backend
- react-native-camera package for camera integration
- react-native-navigation package for routing between screens
- Open-cv and machine learning to do video analysis to count the number of repetitions of the exercise
- Google Compute Engine: for the purpose of deploying our machine learning algorithm to the cloud to off load the computational intensive processes to the cloud servers.

### Project management:

- Project is hosted on Rishab’s GitHub at the following link. 
- Pradeep forked the repository and cloned the fork locally to do the coding. 
- Features developed by both programmers were to be first pushed to their respective repositories and a pull request was then to be initiated by Pradeep to update the master branch on RIshab’s Repository with features that Pradeep developed. 
- Pradeep will then fetch Rishab’s features using git rebase to merge Rishab’s master branch with his own. 


## Issues Faced:
Several minor issues were faced throughout the development of the project . Most of them took a few hours to fix while some took days. Listed below are the bugs that we faced and took longest to fix due to the unhelpful error messages.

### Version conflicts between packages caused the build to fail
- Problem was solved by ensuring that we install specific versions of every package 
- Firebase cloud firestore could not be written to and read from due to a bug in the latest firebase package for react-native
- Package was uninstalled and a previous version of the package was installed instead


### Videos could not be uploaded successfully to cloud storage 
- Metadata for the video file was missing even though the file appeared on the cloud storage and hence the video was not playable.
- We had followed online guides exactly and could not figure out what was the error.
- We had to stop trying to look for online resources and instead try to debug by tracing the code ourself.
- Tweaked properties tried different approaches that were suggested in online articles and forums, as well as through our own logical chain of thought to result in final working version.

- Lesson Learnt: In development work, we may come across problems where there isnt good documentation, code tracing can become a last resort to try to debug packages.

### Testing code would constantly fail
- We turned our attention to writing testing code only after coming up with our minimum viable product in terms of features.
- We had focused on coming up with an android app and hence had ignored the iOS dependencies and errors throughout our development.
- When attempting to run testing code, the tests would fail before even running on our main code because the iOS dependencies needed to be resolved. 
- There were simply too many dependency errors in the IOS side and due to limited time , we had to abandon our pursuit of writing automated testing code using jest.
- Instead, we decided to do extensive manual testing through friends

- Lesson Learnt: we should write our testing code for each feature as we develop the feature and not at the end of the project


### Other Problems Faced:

Most of the problems faced during the app development mainly revolved around package version conflicts and improper linking of the react native packages to native android and ios packages and libraries. Our emulator in such scenarios would just display a white screen with no helpful error messages which made debugging extra difficult. In such situations the fastest thing to do was then to uninstall and reinstall packages which were last installed and which likely led the the problem. The packages were then manually linked to the build.gradle files instead of using the npm link commands.

## Features Developed:
- Ability to record and send exercise video challenges to friends 
- View the challenges sent by friends and their videos.
- Complete the challenge to earn points
- Leadership scoreboard that maintains your fitness progress and allows comparison with peers (Priority: High)
- View the completion status of the friends you have sent the challenges to. This enables you to see who has and has not completed the challenge. 
- Ability to find and add friends to your Friend list
- Machine Learning Exercise Counter Algorithm (for push ups)
- Google cloud instance started to deploy machine learning counter algorithm. This is done to offload the processing from the mobile devices to a powerful google cloud server instance. 

## Features that were planned but not yet complete
- Machine learning algorithm to count the number of sit-ups and squats performed
- Facebook integration


## User Testing
Due to the lack of time and issues faced in attempting to write testing code(see above) , the attempt was abandoned and manual user testing was performed. The app was deployed to the google play store as soon as basic features such as user authentication and adding friends were completed. This enabled us to easily get customer feedback from friends whom we asked to download and give comments for our app. Officially we had 2 rounds of user testing that was done. During these time periods, we asked friends and family to use our app and give feedback on every aspect of the application. This included bugs that the users faced, app crashes, unintuitiveness of the user interface, user interface design and much more. Based on the feedback received, we added ease of accesibility features such as including a watch video screen for users to review their sent videos or even changing colours of buttons to make them more aesthetically pleasing.


```
