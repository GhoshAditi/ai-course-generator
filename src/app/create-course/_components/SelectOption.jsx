import React,{useContext} from "react";
import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


function SelectOption() {
  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);

  const handleInputChange=(fieldName,value)=> {
      setUserCourseInput(prev=>({
          ...prev,
          [fieldName]: value
      }))
  }
  return (
    <div className="px:10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-sm">Select Difficulty Level</label>
          <Select onValueChnge={(value)=>handleInputChange('difficultyLevel',value)}
            defaultValue={userCourseInput?.level}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">Select Course Duration</label>
          <Select 
          defaultValue={userCourseInput?.duration}
          onValueChnge={(value)=>handleInputChange('duration',value)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Week">1 Week</SelectItem>
              <SelectItem value="2 Weeks">2 Weeks</SelectItem>
              <SelectItem value="3 Weeks">3 Weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">Add Video?</label>
          <Select 
          defaultValue={userCourseInput?.displayVideo}
          onValueChnge={(value)=>handleInputChange('displayVideo',value)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='text-sm'>No. of Chapters</label>
          <Input type="number" className="h-14 text-lg"
          defaultValue={userCourseInput?.noOfChapter}
          onChange={(event)=>handleInputChange('noOfChapter',event.target.value)}/>
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
