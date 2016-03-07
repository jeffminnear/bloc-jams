// Example Album
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' }
    ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, Ring, Ring', duration: '5:01' },
        { title: 'Fits In Your Pocket', duration: '3:21' },
        { title: 'Can You Hear Me Now?', duration: '3:14' },
        { title: 'Wrong Number', duration: '2:15' }
    ]
};

var createSongRow = function createSongRow(trackNumber, title, duration) {
    var template =
        '<tr class="album-view-song-item">'
      + '   <td class="song-item-number" data-track-number="' + trackNumber + '">' + trackNumber + '</td>'
      + '   <td class="song-item-title">' + title + '</td>'
      + '   <td class="song-item-duration">' + duration + '</td>'
      + '</tr>'
    ;

    return template;
};

var setCurrentAlbum = function setCurrentAlbum(album) {
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    albumSongList.innerHTML = '';

    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

var findParentByClassName = function findParentByClassName(child, parentClassName) {
    var parentWithClass = null;
    var html = document.getElementsByTagName('html')[0];

    // Allows searching by a single class
    var hasClass = function hasClass(classNameString, className) {
        var classes = classNameString.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === className) {
                return true;
            }
        }
        return false;
    };

    while (!parentWithClass) {
        var parent = child.parentElement;

        if (!parent) {
            alert('No parent element found');
        }

        if (child === html) {
            alert('No element with ' + '"' + parentClassName + '"' + ' class was found');
            break;
        }

        if (parent.className &&
           (hasClass(parent.className, parentClassName) ||
           parent.className === parentClassName)) {
            parentWithClass = parent;
            //console.log('parent is ' + parent);
            return parent;
        } else {
            child = parent;
            //console.log('child = ' + child);
        }
    }
};

var getSongItem = function getSongItem(element) {
    switch (element.className) {
        case 'song-item-number':
            return element;
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'ion-play':
        case 'ion-pause':
        case 'album-song-button':
            return findParentByClassName(element, 'song-item-number');
        default:
            return;
    }
};

var clickHandler = function clickHandler(targetElement) {
    var songItem = getSongItem(targetElement);

    if (!currentlyPlayingSong) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.dataset.trackNumber;
    } else if (currentlyPlayingSong === songItem.dataset.trackNumber) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.dataset.trackNumber) {
        var currentlyPlayingSongElement = document.querySelector('[data-track-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.dataset.trackNumber;
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.dataset.trackNumber;
    }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function () {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function (event) {
        var songItem = getSongItem(event.target);
        var songItemNumber = songItem.dataset.trackNumber;

        // Only target individual song rows
        if (event.target.parentElement.className === 'album-view-song-item') {
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });

    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function (event) {
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.dataset.trackNumber;

            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        });
        songRows[i].addEventListener('click', function (event) {
            clickHandler(event.target);
        });
    }
};
