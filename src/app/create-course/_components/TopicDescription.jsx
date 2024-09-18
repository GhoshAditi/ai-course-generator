
import React, {useContext} from 'react'
import { UserInputContext } from '@/app/_context/UserInputContext';
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'

function TopicDescription() {
    const {userCourseInput,setUserCourseInput}=useContext(UserInputContext);

    const handleInputChange=(fieldName,value)=> {
        setUserCourseInput(prev=>({
            ...prev,
            [fieldName]: value
        }))
    }
  return (
    <div>
        {/* Input topic */}
        <div className='mx-20 lg:mx-44'>
            <label>
                Write the topic for which you want to generate course.(eg. python, meditation, oration, etc.)
                <Input placeholder={'Topic'} className='h-14 text-xl'
                defaultValue={userCourseInput?.topic}
                onChange={(e)=>handleInputChange('topic', e.target.value)} />
            </label>
        </div>
        <div className='mt-5 max-20 lg:mx-44'>
            <label>
                Tell us more about your course,about what you want to include in your course. (Optional)
            </label>
           <Textarea placeholder="About Course" className='h-24 text-xl'
           defaultValue={userCourseInput?.description}
           onChange={(e)=>handleInputChange('description', e.target.value)}/>
        </div>
        {/* text area desc */}

    </div>
  )
}

export default TopicDescription