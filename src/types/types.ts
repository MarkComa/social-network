export interface ProfileType {
	userId: number;
	lookingForAJob: boolean;
	lookingForAJobDescription: string;
	fullName: string;
	contacts: ContactsType[];
	aboutMe: string;
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