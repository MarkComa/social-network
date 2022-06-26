import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { updateUserProfile } from "../redux/reducers/profileReducer";
import { ContactsType, ProfileType } from "../types/types";
import { useAppDispatch } from "../redux/hooks/hooks";
import { Button, Input, Space, Typography } from "antd";
import Title from "antd/lib/skeleton/Title";

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
					{contacts &&
						Object.keys(contacts).map((key) => (
							<Contact
								key={key}
								contactTitle={key}
								contactValue={
									contacts[key as keyof ContactsType]
								}
							/>
						))}
				</ul>
			</div>
			<div>
				{profile.lookingForAJob ? "В поиске работы" : "Работа подождет"}
			</div>
			<div>{profile.lookingForAJobDescription}</div>
			<div>{profile.aboutMe}</div>
		</div>
	);
};

export const ProfileDataForm = ({ profile }: Props) => {
	const { TextArea } = Input;
	const dispatch = useAppDispatch();
	const contacts = profile.contacts;
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ProfileType>({ defaultValues: { ...profile } });

	const onSubmit: SubmitHandler<ProfileType> = (data) => {
		dispatch(updateUserProfile(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<Typography.Title level={5}>Никнейм:</Typography.Title> 
				<Controller
					name={"fullName"}
					control={control}
					render={({field}) => (<Input {...field}/>)}					
				/>
			</div>
			<div>
				<Space direction="vertical" size='small'> <Typography.Title level={4}>Contacts</Typography.Title>
				</Space>
				<ul>
					{contacts &&
						Object.keys(contacts).map((key) => {
							return (
								<li key={key}>
									<span>{key} :</span>
									<Controller
										name={`contacts.${
											key as keyof ContactsType
										}`}
										control={control}
										render={({ field }) => (
											<Input {...field} />
										)}
									/>
								</li>
							);
						})}
				</ul>
			</div>

			<div>
				Поиск работы:
				<input {...register("lookingForAJob")} type='checkbox' />
			</div>
			<div>
				Описание работы:
				<TextArea {...register("lookingForAJobDescription")} />
			</div>
			<div>
				Обо мне:
				<TextArea maxLength={100} {...register("aboutMe")} />
			</div>
			<Button type='default' htmlType='submit'>
				Cохранить
			</Button>
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
