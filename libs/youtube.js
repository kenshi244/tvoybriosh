// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName(
    'script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

$('#video-modal').on('hidden.bs.modal', function (event) {
    // do something...
    let button = $(event.relatedTarget),
        video = button.data('video');
    console.log(button);
    player = new YT.Player('player', {
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
        }
    });
})

function onPlayerReady(event) {
    event.target.playVideo();
}