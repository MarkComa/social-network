export interface ProfileType {
	userId?: string | null;
	lookingForAJob?: boolean;
	lookingForAJobDescription?: string;
	fullName?: string;
	contacts?: ContactsType;
	aboutMe?: string;
	photos: PhotosType;
};
export type ContactsType = {
	github: string;
	vk: string;
	facebook: string;
	instagram: string;
	twitter: string;
	website: string;
	youtube: string;
	mainLink: string;
};
export type PhotosType = {
	large: string;
	small: string;
}
export type IUser = {
  name:     string;
  id:       string;
  photos:   Photos;
  status:   string | null;
  followed: boolean;
}
export interface Photos {
  small: string | null;
  large: string | null;
}
export type FriendType = {
	id: string;
	fName: string;
	messages: MessageType[];
};
export type MessageType = {
	message: string;
};