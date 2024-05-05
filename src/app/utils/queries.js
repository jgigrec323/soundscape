export const login = async (username, password) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
export const register = async (username, password) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
export const getAllSongs = async () => {
  try {
    const response = await fetch("/api/songs", {
      method: "GET",
    });
    const body = await response.json();

    return body;
  } catch (error) {
    throw error;
  }
};
export const getArtists = async () => {
  try {
    const response = await fetch("/api/artists", {
      method: "GET",
    });
    const body = await response.json();

    return body;
  } catch (error) {
    throw error;
  }
};
export const getAllGenres = async () => {
  try {
    const response = await fetch("/api/genre", {
      method: "GET",
    });
    const body = await response.json();

    return body;
  } catch (error) {
    throw error;
  }
};
export const getAllAlbums = async () => {
  try {
    const response = await fetch("/api/albums", {
      method: "GET",
    });
    const body = await response.json();

    return body;
  } catch (error) {
    throw error;
  }
};
export const getAllPlaylistByUser = async (userId) => {
  try {
    const response = await fetch(`/api/playlists/${userId}`, {
      method: "GET",
    });
    const body = await response.json();
    console.log(body);
    return body;
  } catch (error) {
    throw error;
  }
};
export const createPlaylist = async (userId, name, description) => {
  try {
    const response = await fetch("/api/playlists/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, name, description }),
    });

    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
export const getSongsByPlaylistId = async (id) => {
  try {
    const response = await fetch(`/api/playlists/getSongByPlaylistId/${id}`, {
      method: "GET",
    });
    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
export const getSongsByGenre = async (genre) => {
  try {
    const response = await fetch(`/api/genre/songsByGenre/${genre}`, {
      method: "GET",
    });
    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
export const getSongsTotalByGenre = async (genre) => {
  try {
    const response = await fetch(
      `/api/genre/songsByGenre/${genre}/numberOfSongs`,
      {
        method: "GET",
      }
    );
    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
export const getSongsAvg = async (genre) => {
  try {
    const response = await fetch(
      `/api/genre/songsByGenre/${genre}/averageTime`,
      {
        method: "GET",
      }
    );
    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
export const deleteInstance = async (entity, id) => {
  try {
    const response = await fetch(`/api/${entity}/${id}`, {
      method: "DELETE",
    });
    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
export const addASongToPlaylist = async (id, playlistId) => {
  try {
    const response = await fetch(`/api/playlists/${playlistId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
export const removeSongFromPlaylist = async (id, playlistId) => {
  try {
    const response = await fetch(`/api/playlists/${playlistId}/remove`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
