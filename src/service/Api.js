import axios from "axios";
const commonApiCall = async (endpoint, formData) => {
  debugger;
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJVc2VySWQiOiI1MWJhZjIyNi01M2VlLTQ5NTEtOTI2OS1kNTUxZmU1ODQ4MmEiLCJSb2xlTmFtZSI6IkFETUlOIiwiVXNlck5hbWUiOiJhZG1pbiAiLCJleHAiOjE3MjY1NzQzNzMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAxOCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAxOCJ9.9hn1AKzbjik97nSDMGECjpHgTPiCB_ag8Vj7m-3YIhE";

  // const headers = new Headers({
  //     'Authorization': `Bearer ${accessToken}`,
  // });
  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  });
  // try {
  //     const response = await fetch(`https://localhost:7018${endpoint}`, {
  //         method: 'POST',
  //         body: formData,
  //         headers,
  //     });

  //     if (!response.ok) {
  //         // Handle unauthorized (401) error
  //         if (response.status === 401) {
  //             console.log('Unauthorized access. Redirecting to login page.');
  //             window.location.href = '/login';
  //         }

  //         throw new Error('Failed to Fetch');
  //     }

  //     const responseJson = await response.json();
  //     return responseJson;
  // } catch (error) {
  //     console.error(`Error in ${endpoint}:`, error);
  //     throw error;
  // }
  try {
    const response = await axios.post(
      `https://localhost:7018${endpoint}`,
      formData,
      { headers }
    );
    // Axios automatically parses JSON response
    return response.data;
  } catch (error) {
    // Handle unauthorized (401) error
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access. Redirecting to login page.");
      //   window.location.href = '/login';
    }

    // Log and throw the error
    console.error(`Error in ${endpoint}:`, error);
    throw error;
  }
};

export { commonApiCall };
