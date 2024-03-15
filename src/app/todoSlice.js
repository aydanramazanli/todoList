import { createSlice, nanoid } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
   //add user
    addUser: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(data) {
        return { payload: { id: nanoid(), ...data } }
      },
    },
    //update user
    updateUser(state,action){
     const {id, name,surname, gender, patronymic} =action.payload
     const existingUser=state.find(user=>user.id===id)
     if(existingUser){
      existingUser.name=name
      existingUser.gender=gender
      existingUser.patronymic=patronymic
      existingUser.surname=surname
     }
     
    },
    //delete user 
    deleteUser(state,action){
     const index= state.findIndex(user=>user.id===action.payload)
     if(index!==-1){
      state.splice(index,1)
     }
    }
  },
})

export const { addUser,  deleteUser, updateUser} = todoSlice.actions
export default todoSlice.reducer

