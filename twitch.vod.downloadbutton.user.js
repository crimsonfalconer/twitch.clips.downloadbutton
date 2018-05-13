// ==UserScript==
// @name        Twitch Clip Downloader
// @author      CrimsonFalconer
// @description Add download button for TwitchVods
// @namespace   https://github.com/crimsonfalconer/twitch.vod.downloadbutton
// @include     https://clips.twitch.tv/embed*
// @include     https://player.twitch.tv/*
// @updateURL       https://github.com/crimsonfalconer/twitch.vod.downloadbutton/raw/master/twitch.vod.downloadbutton.user.js
// @downloadURL     https://github.com/crimsonfalconer/twitch.vod.downloadbutton/raw/master/twitch.vod.downloadbutton.user.js
// @version     10
// @updateVersion   10
// ==/UserScript==

var chk = 0;

// Hook 'd' key for easy download
document.onkeypress = function (e) {
    e = e || window.event;
    if(e.key == 'd'){
        top.window.location.href = document.getElementsByTagName('video')[0].src
    }
};

// Create download button on Twitch Player
function CreateDownloadButton()
{
  var videoLink = document.getElementsByTagName('video')[0].src;
  var panel = document.getElementsByClassName('player-buttons-right')[0];
  var save = document.createElement('button');
  save.classList.add('player-button');
  save.type = 'button';
  save.value = 'Download';
  save.onclick = function(){top.window.location.href = document.getElementsByTagName('video')[0].src};
  var btnSpn = document.createElement('span');
  btnSpn.setAttribute('style', 'color:#ffffff;font-size:20px')
  btnSpn.append('D');
  save.appendChild(btnSpn);
  panel.insertBefore(save, panel.firstChild);
}

// Wait for player to initialise before creating button
var i = setInterval(function() {
    if(document.getElementsByClassName('player-buttons-right').length < 1)
    {
        chk++;
        console.log('Waiting')
        if(chk > 20){clearInterval(i)}
    }
    else{
        console.log('Found.')
        CreateDownloadButton();
        clearInterval(i)
    }
    return
}, 250);
