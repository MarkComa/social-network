import dialogReducer from './reducers/dialogReducer'

let store = {
   _state: {
    friends: [
    {
      name:'Александр',
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id1'
    },

    {
      name:"Алексей",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id3'
    },

    {
      name:"Дмитрий",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id2'
    },
    {
      name:"Владимир",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id4'
    },
    {
      name:"Сергей",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id5'
    },
    {
      name:"Андрей",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id6'
    },
    {
      name:"Кирилл",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id7'
    },
    {
      name:"Виктор",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id8'
    },
    {
      name:"Максим",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id9'
    },
    {
      name:"Антон",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id10'
    },
    {
      name:"Борис",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id11'
    },
    {
      name:"Имя",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id12'
    },
    {
      name:"Имя",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id13'
    },
    {
      name:"Имя",
      fname:'Фамилия',
      avatar:'https://via.placeholder.com/150',
      id:'id14'
    }
  ],
    message: [
      {message: '1'},
      {message: '2'}
    
    ], 
    newMessageText: ''
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
  console.log('change')
  },
  subscribe(observer){
    this._callSubscriber = observer;
  },

  dispatch(action) {
      this._state = dialogReducer(this._state ,action)
   
      this._callSubscriber(this._state)
    }
  } 

export default store;
