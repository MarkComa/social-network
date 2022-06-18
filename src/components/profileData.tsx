import { useForm, SubmitHandler } from "react-hook-form";
import { updateUserProfile } from "../redux/reducers/profileReducer";
import { ContactsType, ProfileType } from "../types/types";
import { useAppDispatch } from "../redux/hooks/hooks";

interface Props {
	profile: ProfileType;
}

export const ProfileData = ({ profile }: Props) => {
	const contacts = profile.contacts;
	return (
		<div>
			<div>{profile.fullName}</div>
			<div>
				<h1>Contacts</h1>
				<ul>
					{contacts && Object.keys(contacts).map((key) => (
						<Contact
							key={key}
							contactTitle={key}
							contactValue={contacts[key as keyof ContactsType]}
						/>
					))}
				</ul>
			</div>
			<div>
				{profile.lookingForAJob ? "В поиске работы" : "Работа подождет"}
			</div>
			<div>
				{profile.lookingForAJobDescription}
			</div>
			<div>{profile.aboutMe}</div>
		</div>
	);
};

export const ProfileDataForm = ({ profile }: Props) => {
	const dispatch = useAppDispatch();
	const contacts = profile.contacts;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileType>({ defaultValues: { ...profile } });

	const onSubmit: SubmitHandler<ProfileType> = data => {
		dispatch(updateUserProfile(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				Никнейм:
				<input
					{...register("fullName")}
					type='text'
				/>
			</div>
			<div>
				<h1>Contacts</h1>
				<ul>
					{contacts && Object.keys(contacts).map((key) => {
						return (
							<li key={key}>
								<span>{key} :</span>
								<input
									{...register(`contacts.${key as keyof ContactsType}`)}
								/>
							</li>
						);
					})}
				</ul>
			</div>

			<div>
				Поиск работы:
				<input
					{...register("lookingForAJob")}
					type='checkbox'
				/>
			</div>
			<div>
				Описание работы:
				<textarea
					{...register("lookingForAJobDescription")}
				/>
			</div>
			<div>
				Обо мне:
				<textarea {...register("aboutMe")} />
			</div>
			<input type='submit' value={"сохранить"} />
		</form>
	);
};

type ContactType = {
	contactTitle: string;
	contactValue: string;
};
const Contact = ({ contactTitle, contactValue }: ContactType): JSX.Element => {
	return <li>{contactValue ? contactTitle + ": " + contactValue : ""}</li>;
};
