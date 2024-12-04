import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const frameToken = (token) => `Bearer ${token}`;

const frameResponse = (
  reqStatus = 0,
  reqPayLoad = "Invalid request. Please try again later."
) => {
  return {
    status: reqStatus,
    payLoad: reqPayLoad,
  };
};

export const registerApi = async (
  username,
  password,
  emailId,
  firstName,
  lastName,
  phone
) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/signup`;
    const apiResponse = await axios.post(url, {
      username,
      password,
      emailId,
      firstName,
      lastName,
      phone,
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const verifyEmailApi = async (token) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/verify/email`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

//func makes an api call to localhost:8080/user/login
export const loginApi = async (username, password) => {
  //setting intial vakut of status to 0 and payload to "valkid request, try again later"
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/login`;
    const apiResponse = await axios.post(url, { username, password });
    if (apiResponse.status === 200) {
      const payLoad = {
        userData: apiResponse.data,
        token: apiResponse.headers.authorization,
      };
      response = frameResponse(1, payLoad);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const forgotPasswordApi = async (email) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/reset/${email}`;
    const apiResponse = await axios.get(url);
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const resetPasswordApi = async (token, password) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/reset`;
    const apiResponse = await axios.post(
      url,
      {
        password,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

//creating new async func that takes a single parameter called token and exports sessionApi
export const sessionApi = async (token) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/get`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const updatePublicProfileApi = async (
  token,
  bio,
  city,
  country,
  headline,
  picture
) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/update/profile`;
    const apiResponse = await axios.post(
      url,
      {
        bio,
        city,
        country,
        headline,
        picture,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

//func to get other users feed
export const getOthersFeedsApi = async (token, pageNumber) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/feeds/other/${pageNumber}/5`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

//func to call the addFeedApi
export const addFeedApi = async (token, content, picture) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/feeds`;
    const apiResponse = await axios.post(
      url,
      {
        content,
        picture,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

//func that uses a post request to the backend to add a new like/comment to a feed
export const addFeedMetaDataApi = async (token, feedId, isLike, comment) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/feeds/meta/${feedId}`;
    const apiResponse = await axios.post(
      url,
      {
        isLike,
        comment,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

//async func that makes a get request to an api endpoint in the backend
export const getMyFeedsApi = async (token, pageNumber) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/feeds/user/${pageNumber}/5`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};
