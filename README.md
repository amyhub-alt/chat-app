# React Native + Expo
# Chat App

This project is a mobile chat application built using React Native and Expo. The app provides users with a chat interface and options to share images and their location. It is designed to work on both Android and iOS devices and leverages Firebase for real-time data storage and authentication.

## Key Features

1. User Authentication – Anonymous sign-in via Firebase Authentication.

2. Real-time Messaging – Send and receive messages instantly.

3. Offline Message Storage – Read previous conversations even when offline.

4. Image Sharing – Send images from the gallery or capture a new photo.

5. Location Sharing – Share real-time location through chat messages.

6. Customizable Chat Screen – Choose a background color before entering the chat.

7. Accessibility Support – Compatible with screen readers for visually impaired users.



## User Stories

### Feature 1: Enter Chat Room
-**As a user**, I want to enter a chat room easily
-**So that**, I can start chatting quickly with my friends and family.

### Feature 2: Send Messages
-**As a user**, I want to send messages to my friends and family
-**So that**, I can communicate with them.

### Feature 3: Send Images
-**As a user**, I want to send images in chat
-**So that**, I can share moments visually.

### Feature 4: Share Location
-**As a user**, I want to share my location in chat
-**So that**, my friends know where I am.

### Feature 5: Read Messages Offline
-**As a user**, I want to read my messages even when offline
-**So tha**t**, I can access my conversation history anytime.

### Feature 6: Accessibility Support
-**As a user**, with visual impairments, I want to use the chat app with a screen reader
-**So that**, I can engage in conversations effortlessly.

## Scenarios in Gherkin Syntax

### Feature 1: Enter Chat Room
```
Given I am on the welcome screen
When I enter my name and select a background color
Then I should be able to join the chat room.
```

### Feature 2: Send Messages
```
Given I am in a chat room
When I type a message and click the send button
Then my message should be displayed in the chat window.
```

### Feature 3: Send Images
```
Given I am in a chat room
When I select an image from my gallery or take a new photo
Then my selected image should be sent in the chat.
```

### Feature 4: Share Location
```
Given I am in a chat room
When I choose to share my location
Then my real-time location should be sent in the chat as a map link.
```

### Feature 5: Read Messages Offline
```
Given I have previously accessed chat messages online
When I open the app without an internet connection
Then I should still see my previously loaded messages.
```

### Feature 6: Accessibility Support
```
Given I am using a screen reader
When I navigate through the app
Then all buttons and messages should be read aloud properly.
```

Will delete later