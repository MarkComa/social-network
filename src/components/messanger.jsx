import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../utils/validators/validators";
import style from "./blocks/dialogs.module.css";
import { Textarea } from "./formControls/formsControls";

const MessageList = (props) => {
  return props.messages.map((m) => {
    return <MessageItem message={m.message} />;
  });
};
const MessageItem = (props) => {
  return <div className={style.myMessage}>{props.message}</div>;
};

const maxLengthCreator100 = maxLengthCreator(100);

const MessangerForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        className={style.textarea}
        value={props.newMessageText}
        placeholder="Введите новое сообщение"
        component={Textarea}
        name="newMessageText"
        validate={[required, maxLengthCreator100]}
      />
      <button className={style.btn}>Отправить</button>
    </form>
  );
};

const MessangerReduxForm = reduxForm({ form: "MessangerForm" })(MessangerForm);

const Messanger = (props) => {
  let id = props.friendId;

  const onSubmitMessanger = (value) => {
    props.sendMessageClick(id, value.newMessageText);
  };

  let messageItemEl = props.friend.map((mI) => {
    return <MessageList messages={mI.messages} />;
  });

  return (
    <div className={style.chat}>
      <div className={style.message}>{messageItemEl}</div>
      <div className={style.actionMessage}>
        <MessangerReduxForm onSubmit={onSubmitMessanger} />
      </div>
    </div>
  );
};
export default Messanger;

// Входящим сообщениям присваивается класс className={style.incomingMessage}

/*  <div className={style.incomingMessage}> hey</div>
            <div className={style.myMessage}>yo</div>
            <div className={style.myMessage}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              ducimus numquam, obcaecati earum veniam, aliquam quas perferendis
              velit fuga quo rerum ipsa cum id praesentium quidem quis tenetur
              ullam vero.
            </div>
            <div className={style.incomingMessage}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore,
              ratione?
            </div>
            <div className={style.myMessage}>yo</div>
            <div className={style.myMessage}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              ducimus numquam, obcaecati earum veniam, aliquam quas perferendis
              velit fuga quo rerum ipsa cum id praesentium quidem quis tenetur
              ullam vero.
            </div>
            <div className={style.incomingMessage}>21321</div>
            <div className={style.incomingMessage}>21321</div>
            <div className={style.incomingMessage}>21321</div>
            <div className={style.incomingMessage}>21321</div>
            <div className={style.incomingMessage}>21321</div>
            <div className={style.incomingMessage}>21321</div>
            <div className={style.incomingMessage}>21321</div>
            <div className={style.incomingMessage}>21321</div>
            <div className={style.myMessage}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              ducimus numquam, obcaecati earum veniam, aliquam quas perferendis
              velit fuga quo rerum ipsa cum id praesentium quidem quis tenetur
              ullam vero.
            </div>*/
