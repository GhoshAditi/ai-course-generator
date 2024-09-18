"use client"

import React, {useState, useContext} from 'react'
import Header from '../dashboard/_components/Header'
import {UserInputContext} from '../_context/UserInputContext'
import { useUserInput } from '../_context/UserInputContext'; 

function CreateCourseLayout({children}) {
  const [userCourseInput,setUserCourseInput]=useState({category:''});
  return (
    <div>
      <UserInputContext.Provider value={{userCourseInput,setUserCourseInput}}>
        <>
        <Header/>
        {children}
        </>
        </UserInputContext.Provider>
        </div>
  )
}

export default CreateCourseLayout