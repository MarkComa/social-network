import React from "react";
import style from "./blocks/profileData.module.css";
import {useForm} from 'react-hook-form'

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

export const ProfileDataForm = ({ profile }) => {
  const {register, handleSubmit} = useForm()
  const contacts = profile.contacts;
return <form onSubmit={handleSubmit}>
  <div className={style.contact}>
				<h1>Contacts</h1>
				<div>
					{Object.keys(contacts).map((key) => (
            <div>
              {key + ":"}
						<input key={key} {...register(`contacts.${key}`)} type="text"/>
            </div>
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
</form>
}

const Contact = ({ contactTitle, contactValue }) => {
	return contactValue ? <p>{contactTitle + ": " + contactValue}</p> : "";
};
