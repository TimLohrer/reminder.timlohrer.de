let USER_DATA;

setTimeout(async () => {
    // New tokens from discord
    const access_token = (new URLSearchParams(window.location.search)).get('access_token');
    const expires_in = (new URLSearchParams(window.location.search)).get('expires_in');
    const refresh_token = (new URLSearchParams(window.location.search)).get('refresh_token');
    window.history.replaceState({}, document.title, document.location.pathname);

    // Tokens from cookies
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (access_token && expires_in && refresh_token) {
        const now = Date.now();
        document.cookie = `accessToken=${access_token}; expires=${new Date(now + expires_in)}`;
        document.cookie = `refreshToken=${refresh_token}; expires=${new Date(now + 86400000)}`;
        const res = await fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        const user = await res.json();
        document.getElementById('header-user').innerHTML = user_component(getAvatar(user), user);
        USER_DATA = user;
        window.open('/dashboard', '_self');
    } else if (accessToken && refreshToken) {
        const res = await fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const user = await res.json();
        document.getElementById('header-user').innerHTML = user_component(getAvatar(user), user);
        USER_DATA = user;
        dashboard();
    } else {
        document.getElementById('header-user').innerHTML = signInButton_component();
    }
}, 0);

function getAvatar(user) {
    if (!user.avatar) {
        const colors = ["#5865F2", "#a2a3a2", "#EB459E", "#ED4245", "#000"];
        return avatar = defaultAvatar_component(colors[Math.floor(Math.random() * 4)]);
    } else {
        return avatar = `<img class="user-avatar" src="https://cdn.discordapp.com/avatars/${user.id}/a_${user.avatar}.webp" alt="pfp">`;
    }
}

function signIn() {
    window.open('{{ oauthUri }}', '_self');
}

function signOut() {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.location.reload();
}