import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_TOKEN = process.env.SPOTIFY_API_TOKEN;

async function getPlaylistTracks(playlistId, limit = 50, offset = 0) {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        params: {
          limit: limit,
          offset: offset,
        },
      }
    );

    const trackItems = response.data.items;
    return trackItems;
  } catch (error) {
    console.error("Error retrieving playlist tracks:", error);
    return [];
  }
}

const parseTrack = (track) => {
  const trackDetails = track.track;
  const artists = trackDetails.artists.map((artist) => artist.name).join(", ");
  const release_year = trackDetails.album.release_date.split("-")[0];
  return {
    name: trackDetails.name,
    artists,
    album: trackDetails.album.name,
    release_year,
    duration: trackDetails.duration_ms,
    popularity: trackDetails.popularity,
    id: trackDetails.id,
  };
};

const getAllTracksFromAPlaylist = async (playlistId) => {
  let tracks = await getPlaylistTracks(playlistId, 50, 0);

  while (true) {
    const newTracks = await getPlaylistTracks(playlistId, 50, tracks.length);
    if (newTracks.length === 0) {
      break;
    }
    tracks = [...tracks, ...newTracks];
  }

  tracks = tracks.map(parseTrack);

  return tracks;
};

export default getAllTracksFromAPlaylist;
