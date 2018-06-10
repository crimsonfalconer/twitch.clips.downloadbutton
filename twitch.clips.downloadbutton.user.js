// ==UserScript==
// @name        Twitch Clips Downloader
// @author      CrimsonFalconer
// @description Add download button for TwitchVods
// @namespace   https://github.com/crimsonfalconer/twitch.clips.downloadbutton
// @include     https://clips.twitch.tv/embed*
// @include     https://clips.twitch.tv/*
// @include     https://player.twitch.tv/*
// @updateURL       https://github.com/crimsonfalconer/twitch.clips.downloadbutton/raw/master/twitch.clips.downloadbutton.user.js
// @downloadURL     https://github.com/crimsonfalconer/twitch.clips.downloadbutton/raw/master/twitch.clips.downloadbutton.user.js
// @version     11
// @updateVersion   11
// ==/UserScript==

var chk = 0;

// Hook 'd' key for easy download
document.onkeypress = function (e) {
    e = e || window.event;
    if(e.key == 'd' && event.altKey && event.shiftKey){
        top.window.location.href = document.getElementsByTagName('video')[0].src
    }
};

// Create download button on Twitch Player
function CreateDownloadButton()
{
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
