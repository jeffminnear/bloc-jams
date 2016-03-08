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

    var $row = $(template);

    var clickHandler = function clickHandler() {
        var songTrackNumber = $(this).attr('data-track-number');

        if (!currentlyPlayingSong) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songTrackNumber;
        } else if (currentlyPlayingSong === songTrackNumber) {
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        } else if (currentlyPlayingSong !== songTrackNumber) {
            var currentlyPlayingSongElement = $('.song-item-number[data-track-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingSongElement.html(currentlyPlayingSong);
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songTrackNumber;
        }
    };

    var onHover = function onHover(event) {
        var $songItem = $(this).find('.song-item-number');
        var songItemNumber = $songItem.attr('data-track-number');

        if (songItemNumber !== currentlyPlayingSong) {
            $songItem.html(playButtonTemplate);
        }
    };

    var offHover = function offHover(event) {
        var $songItem = $(this).find('.song-item-number');
        var songItemNumber = $songItem.attr('data-track-number');

        if (songItemNumber !== currentlyPlayingSong) {
            $songItem.html(songItemNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);

    return $row;
};

var setCurrentAlbum = function setCurrentAlbum(album) {
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function () {
    setCurrentAlbum(albumPicasso);
});
