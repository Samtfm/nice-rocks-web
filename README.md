# Nice Rocks (web)

**NOTE**
This is a (now abandoned) first iteration of the Nice Rocks project. The new version is being built [here](https://github.com/Samtfm/nice-rocks)

**Why Start Over?  PWA -> React Native**
At the start of this project, i chose to build this as a Progressive Web App for the following reasons.
 - **Ease of development:** No versioning issues or specific native code
 - **Ease of access:** Usable on both desktop and mobile
 - **It's what I know:** Years of working in mobile web development tends to make this my default choice.

However after trying out this prototype for a couple of weeks, a couple things quickly became apparent that are only possible after moving to React Native    .
 - **Push notifications:** Even though instant notifications are the antithesis of this project, it turns out occasional reminders to check the app when there is new content is critically important.
 - **Better native support:** Offline mode availability and mobile friendly ui are more often considered standard for native app libraries. These features are possible to build for web, but each one typically involves adding more complexity.


## Tech Used
- Client: [React](https://reactjs.org/)
- Datastore, Auth: [Firebase](http://firebase.google.com/)
- Local state management: [Redux](https://redux.js.org/)
