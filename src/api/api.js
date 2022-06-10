import axios from "axios";

const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",

  withCredentials: true,
  headers: {
    "API-KEY": "2d1a9782-1c79-4a80-ad06-fb14119baa7e",
  },
});
export const usersAPI = {
  getUsers(pageSize = 1, currentPage = 4) {
    return instanse
      .get(`users?count=${pageSize}&page=${currentPage}`)
      .then((response) => {
        return response.data;
      });
  },

  getUsersProfile(userId) {
    return profileAPI.getUsersProfile(userId);
  },

  follow(userId) {
    return instanse.post(`follow/${userId}`);
  },

  unfollow(userId) {
    return instanse.delete(`follow/${userId}`);
  },
};

export const authAPI = {
  me() {
    return instanse.get(`auth/me`);
  },
  login(email, password, rememberMe = false) {
    return instanse.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return instanse.delete(`auth/login`);
  },
};

export const profileAPI = {
  getUsersProfile(userId) {
    return instanse.get(`profile/${userId}`);
  },

  getUserStatus(userId) {
    return instanse.get(`profile/status/${userId}`);
  },
  saveAvatar(avatarFile) {
    const formData = new FormData();
    formData.append("image", avatarFile)
    return instanse.put(`profile/photo`, formData);
  },

  updateUserStatus(status) {
    return instanse.put(`profile/status`, { status: status });
  },
  updateUserProfile(data) {
    return instanse.put(`profile`, data);
  },

};
