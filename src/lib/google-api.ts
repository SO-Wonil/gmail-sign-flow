const googleApi = {
  getUserInfo: async (accessToken: string) => {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("유저 정보를 가져오는 데 실패했습니다.");
    }

    return response.json();
  },

  getSendAs: async (accessToken: string) => {
    const response = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("SendAs 정보를 가져오는 데 실패했습니다.");
    }

    return response.json();
  },

  updateSendAs: async (
    accessToken: string,
    sendAsEmail: string,
    newSignature: string
  ) => {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs/${encodeURIComponent(
        sendAsEmail
      )}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature: newSignature,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("서명 업데이트에 실패했습니다.");
    }

    return response.json();
  },
};

export default googleApi;
