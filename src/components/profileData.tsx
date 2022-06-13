import React from "react";
import style from "./blocks/profileData.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/reducers/profileReducer";
import { ContactsType, ProfileType } from "../types/types";

interface Props {
	profile: ProfileType;
}

type FormData = {
	fullName: string;
	contacts: ContactsType;
	lookingForAJob: string;
	lookingForAJobDescription: string;
	aboutMe: string;
};

export const ProfileData = ({ profile }: Props) => {
	const contacts = profile.contacts;
	return (
		<div>
			<div className={style.fName}>{profile.fullName}</div>
			<div className={style.contact}>
				<h1>Contacts</h1>
				<ul>
					{Object.keys(contacts).map((key) => (
						<Contact
							key={key}
							contactTitle={key}
							contactValue={contacts[key as keyof ContactsType]}
						/>
					))}
				</ul>
			</div>
			<div className={style.job}>
				{profile.lookingForAJob ? "В поиске работы" : "Работа подождет"}
			</div>
			<div className={style.jobDescription}>
				{profile.lookingForAJobDescription}
			</div>
			<div className={style.aboutMe}>{profile.aboutMe}</div>
		</div>
	);
};

export const ProfileDataForm = ({ profile }: Props) => {
	const dispatch = useDispatch();
	const contacts = profile.contacts;
	const defaultValues = { ...profile};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ defaultValues });

	const onSubmit = (data: FormData) => {
		dispatch(updateUserProfile(data));
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={style.fName}>
				Никнейм:
				<input {...register("fullName")} type='text' />
			</div>
			<div className={style.contact}>
				<h1>Contacts</h1>
				<ul>
					{Object.keys(contacts).map((key) => (
						<li key={key}>
							<span>{key} :</span>
							<input {...register(`contacts.${key}`)} />
						</li>
					))}
				</ul>
			</div>

			<div className={style.job}>
				Поиск работы:
				<input {...register("lookingForAJob")} type='checkbox' />
			</div>
			<div className={style.jobDescription}>
				Описание работы:
				<textarea {...register("lookingForAJobDescription")} />
			</div>
			<div className={style.aboutMe}>
				Обо мне:
				<textarea {...register("aboutMe")} />
			</div>
			<input type='submit' value={"сохранить"} />
		</form>
	);
};

type Contact = {
	contactTitle: string;
	contactValue: string;
};
const Contact: React.FC<Contact> = ({
	contactTitle,
	contactValue,
}): JSX.Element => {
	return <li>{contactValue ? contactTitle + ": " + contactValue : ""}</li>;
};
