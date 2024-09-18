"use client";

import React, { useEffect, useState, useContext } from 'react';
import { UserInputContext } from '../_context/UserInputContext';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from "react-icons/hi2";
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function CreateCourse() {
    const StepperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <HiMiniSquares2X2 />
        },
        {
            id: 2,
            name: 'Topic & Description',
            icon: <HiLightBulb />
        },
        {
            id: 3,
            name: 'Options',
            icon: <HiClipboardDocumentCheck />
        },
    ];
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        console.log(userCourseInput);
    }, [userCourseInput]);

    const checkStatus = () => {
        if (userCourseInput?.length === 0) {
            return true;
        }
        if (activeIndex === 0 && (!userCourseInput?.category || userCourseInput?.category.length === 0)) {
            return true;
        }
        if (activeIndex === 1 && (!userCourseInput?.topic || userCourseInput?.topic.length === 0)) {
            return true;
        }
        if (activeIndex === 2 && (!userCourseInput?.level || !userCourseInput?.duration || !userCourseInput?.displayVideo || !userCourseInput?.noOfChapter)) {
            return true;
        }
        return false;
    };

    const GenerateCourseLayout = async () => {
        setLoading(true);
        const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration:';
        const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOf Chapters: ${userCourseInput?.noOfChapters} in JSON Format`;
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
        console.log(FINAL_PROMPT);
        const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
        const responseText = await result.response.text();
        console.log(responseText);
        const parsedResponse = JSON.parse(responseText);
        setLoading(false);
        SaveCourseLayoutInDb(parsedResponse);
    };

    const SaveCourseLayoutInDb = async (courseLayout) => {
        const id = uuid4();
        setLoading(true);
        await db.insert(CourseList).values({
            courseId: id,
            name: userCourseInput?.topic,
            level: userCourseInput?.level,
            category: userCourseInput?.category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl
        });
        console.log("Finish");
        setLoading(false);
        router.replace(`/create-course/${id}`);
    };

    return (
        <div>
            {/* Stepper */}
            <div className='flex flex-col justify-center items-center mt-10'>
                <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
                <div className='flex mt-10'>
                    {StepperOptions.map((item, index) => (
                        <div key={item.id} className='flex items-center'>
                            <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                <div className={`bg-gray-200 p-3 rounded-full text-black ${activeIndex >= index && 'bg-primary'}`}>
                                    {item.icon}
                                </div>
                                <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                            </div>
                            {index !== StepperOptions.length - 1 && (
                                <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:width-[170px] bg-gray-300 ${activeIndex - 1 >= index && 'bg-purple-500'}`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className='px-10 md:px-20 lg:px-44 mt-10'>
                {/* Component */}
                {activeIndex === 0 ? <SelectCategory /> :
                    activeIndex === 1 ? <TopicDescription /> :
                        <SelectOption />}
                {/* Next Previous Button */}
                <div className='flex justify-between mt-10'>
                    <Button disabled={activeIndex === 0}
                        variant='outline'
                        onClick={() => setActiveIndex(activeIndex - 1)}>Previous</Button>

                    {activeIndex < 2 && <Button onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}

                    {activeIndex === 2 && <Button onClick={() => GenerateCourseLayout()}>Generate Course Layout</Button>}
                </div>
            </div>
            <LoadingDialog loading={loading} />
        </div>
    );
}

export default CreateCourse;