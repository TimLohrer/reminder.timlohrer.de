setTimeout(async () => {
    document.getElementById('nav-dashboard').classList.add('active');
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    if (!accessToken || !refreshToken) {
        window.open('{{ oauthUri }}', '_self');
    }
}, 0);

async function dashboard() {
    let reminders = await fetch(`{{api}}/reminders/${USER_DATA.id}`);
    reminders = await reminders.json();
    let _reminders = [];
    reminders.reminders.forEach(reminder => {
        const days = Math.floor(reminder.delay / (1000 * 60 * 60 * 24));
        reminder.delay %= 1000 * 60 * 60 * 24;

        const hours = Math.floor(reminder.delay / (1000 * 60 * 60));
        reminder.delay %= 1000 * 60 * 60;

        const minutes = Math.floor(reminder.delay / (1000 * 60));
        reminder.delay %= 1000 * 60;

        const seconds = Math.floor(reminder.delay / 1000);

        let formattedTime = '';
        if (days > 0) {
            formattedTime = `${days}d`;
        } else if (hours > 0) {
            formattedTime = `${hours}h`;
        } else if (minutes > 0) {
            formattedTime = `${minutes}m`;
        } else {
            formattedTime = `${seconds}s`;
        }
        _reminders.push(reminder_component(reminder, (new Date(reminder.createdAt)).toString().split(' ').slice(0, 5).join(' ').split(':').slice(0, 2).join(':'), formattedTime));
    });
    if (document.getElementById('ROOT').innerHTML.length < 1) {
        _reminders.push(noReminders_component());
    }
    document.getElementById('ROOT').innerHTML = reminders_component(_reminders);
}

async function deleteReminder(reminderId) {
    const res = await fetch(`{{api}}/reminders/${reminderId}/delete`, { method: 'DELETE' });
    if (!res.status == 200) {
        return;
    }
    document.getElementById(`reminder-${reminderId}`).remove();
    if (document.getElementById('ROOT').innerHTML.length < 1) {
        document.getElementById('ROOT').innerHTML += noReminders_component();
    }
}