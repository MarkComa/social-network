import React from "react";
import style from "./blocks/profileData.module.css";
import { useForm } from "react-hook-form";

export const ProfileData = ({ profile }) => {
	const contacts = profile.contacts;
	return (
		<div>
			<div className={style.contact}>
				<h1>Contacts</h1>
				<div>
					{Object.keys(contacts).map((key) => (
						<Contact
							key={key}
							contactTitle={key}
							contactValue={contacts[key]}
						/>
					))}
				</div>
			</div>
			<div className={style.fName}>{profile.fullName}</div>
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

export const ProfileDataForm = ({ profile, updateUserProfile }) => {
	const contacts = profile.contacts;
	const defaultValues = { ...profile, contacts: { ...contacts } };
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });
	const onSubmit = (data) => {
		updateUserProfile(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={style.contact}>
				<h1>Contacts</h1>
				<div>
					{Object.keys(contacts).map((key) => (
						<div key={key}>
							{key + ":"}
							<input
								
								{...register(`contacts.${key}`)}
								type='text'
							/>
						</div>
					))}
				</div>
			</div>
			<div className={style.fName}>
				Никнейм:
				<input {...register("fullName")} type='text' />
			</div>
			<div className={style.job}>
				Поиск работы:
				<input {...register("lookingForAJob")} type='checkbox' />
			</div>
			<div className={style.jobDescription}>
				Описание работы:
				<textarea
					{...register("lookingForAJobDescription")}
					type='text'
				/>
			</div>
			<div className={style.aboutMe}>
				Обо мне:
				<textarea
					{...register("aboutMe")}
					type='text'
				/>
			</div>
			<input type='submit' value={"сохранить"}/>
		</form>
	);
};

const Contact = ({ contactTitle, contactValue }) => {
	return contactValue ? <p>{contactTitle + ": " + contactValue}</p> : "";
};
