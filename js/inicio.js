
const facebookIcon = document.querySelector('.icon.facebook');

if (facebookIcon) {

    facebookIcon.addEventListener('click', function() {
        window.open('https://www.facebook.com/', '_blank');
    });
}


const twitterIcon = document.querySelector('.icon.whatsapp');

if (twitterIcon) {

    twitterIcon.addEventListener('click', function() {
        window.open('https://wa.me/84347968', '_blank');
    });
}


const instagramIcon = document.querySelector('.icon.instagram');

if (instagramIcon) {

    instagramIcon.addEventListener('click', function() {
        window.open('https://www.instagram.com/', '_blank');
    });
}
