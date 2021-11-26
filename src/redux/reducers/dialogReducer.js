let ADD_MESSAGE = "ADD-MESSAGE";

let initialState = {
  friends: [
    {
      id: "1",
      fName: "sadsad",
      messages: [{ message: "1" }, { message: "2" }],
    },

    {
      id: "2",
      fName: "ыфвфыв",
      messages: [{ message: "Тв" }, { message: "фывфыв" }],
    },
  ],
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      if (state.newMessageText !== "") {
        let newMessage = { message: action.newMessageText };
        return {
          ...state,

          friends: [
            ...state.friends.map((f) => {
              if (f.id === action.id) {
                f.messages.push(newMessage);
                return { ...f };
              }
              return f;
            }),
          ],
        };
      } else {
        return state;
      }

    default:
      return state;
  } //switch
};
export const sendMessageClick = (id, newMessageText) => {
  return {
    type: "ADD-MESSAGE",
    id,
    newMessageText,
  };
};

export default dialogReducer;

/*debugger;
        let newMessage = { message: state.newMessageText };
        let stateCopy = { ...state };
        stateCopy.friends = [...state.friends];
        stateCopy.friends.map((f) => {
          if (f.id === action.id) {
            f.messages.push(newMessage);
          }
        });

        stateCopy.newMessageText = "";
        return stateCopy;*/
/* ...state.friends.map((f) => {
              if (f.id === action.id) {
                f.messages.push(newMessage);
                return { ...f };
              }
              return f;
            }),
          },
          newMessageText: "",*/
