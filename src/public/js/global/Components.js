// defaultAvatar
const defaultAvatar_component = (color) => { return `<div class="user-avatar" style="background-color: ${color};"><img class="user-avatar-default" src="../../../assets/discord_logo.png" alt="pfp"></img></div>` };
// noReminders
const noReminders_component = () => { return `<h2 class="noReminders">You currently don't have any active reminders.</h2>` };
// reminder
const reminder_component = (reminder,createdAt,delay) => { return `<div class="reminder" id="reminder-${reminder.id}"><div class="reminder-content">        <h2 class="reminder-content-title">${reminder.title}</h2>        <button class="reminder-buttons-delete" onclick="deleteReminder('${reminder.id}')"><img class="reminder-buttons-delete-icon" src="../../../assets/delete.png" alt="delete"></button></div><p class="reminder-content-description">${reminder.description}</p><div class="reminder-info">        <p class="reminder-info-createdAt">${createdAt}</p>        <p class="reminder-info-spacer">•</p>        <p class="reminder-info-delay">${delay}</p></div></div>` };
// reminders
const reminders_component = (reminders) => { return `<div class="reminders">    ${reminders.join(' ')}</div>` };
// signInButton
const signInButton_component = () => { return `<div class="signInButton">
    <button class="signInButton-button" onclick="signIn()">Sign In</button>
</div>` };
// user
const user_component = (avatar,user) => { return `<div class="user">    ${avatar}    <h2 class="user-name">${user.discriminator != '0' ? user.username + '#' + user.discriminator : user.username}</h2></div><div class="signOutButton" title="Sign Out"><svg class="signOutButton-icon" onclick="signOut()" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg></div>` };
