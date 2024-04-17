import getAllTracksFromAPlaylist from "./utils/getTracks.js";
import { saveArrayToCSV } from "./utils/helper.js";

const playlistId = "7bJPPlJdcRGhhDykJNSjYT";

getAllTracksFromAPlaylist(playlistId).then((tracks) => {
  // console.log(tracks);
  saveArrayToCSV(tracks);
});
