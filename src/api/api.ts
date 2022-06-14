import { ProfileType } from './../types/types';
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

  getUsersProfile(userId:string | null) {
    return profileAPI.getUsersProfile(userId);
  },

  follow(userId:string | null) {
    return instanse.post(`follow/${userId}`);
  },

  unfollow(userId:string | null) {
    return instanse.delete(`follow/${userId}`);
  },
};

export const authAPI = {
  me() {
    return instanse.get(`auth/me`);
  },
  login(email:string, password:string, rememberMe: boolean = false, captcha: string | null) {
    return instanse.post(`auth/login`, { email, password, rememberMe, captcha });
  },
  logout() {
    return instanse.delete(`auth/login`);
  },
  captcha() {
    return instanse.get(`security/get-captcha-url`)
  }
};

export const profileAPI = {
  getUsersProfile(userId:string | null) {
    return instanse.get(`profile/${userId}`);
  },

  getUserStatus(userId:string | null) {
    return instanse.get(`profile/status/${userId}`);
  },
  saveAvatar(avatarFile: File) {
    const formData = new FormData();
    formData.append("image", avatarFile)
    return instanse.put(`profile/photo`, formData);
  },

  updateUserStatus(status: string) {
    return instanse.put(`profile/status`, { status: status });
  },
  updateUserProfile(data: ProfileType) {
    return instanse.put(`profile`, data);
  },

};
