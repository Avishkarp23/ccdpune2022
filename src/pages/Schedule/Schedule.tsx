import { useEffect, useRef, useState } from 'react'
import sessionData from './schedule.json'
import soon from '../../Images/soon.svg'

const Sessions = () => {
  const [day, setDay] = useState(1)
  const [containerHeight, setContainerHeight] = useState('auto')
  const dayOneSessionData = sessionData[0]
  const dayTwoSessionData = sessionData[1]

  const day1: any = useRef(null)
  const day2: any = useRef(null)

  const getTime = (_time) => {
    const d = new Date(_time)
    const hour =
      d.getHours() === 0 ? 12 : d.getHours() > 12 ? d.getHours() - 12 : d.getHours()
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const ampm = d.getHours() < 12 ? 'AM' : 'PM'
    const time = hour + ':' + min + ' ' + ampm
    return time
  }

  useEffect(() => {
    if (day === 1) {
      setContainerHeight(day1.current.clientHeight + 'px')
    } else {
      setContainerHeight(day2.current.clientHeight + 'px')
    }
  }, [day])

  return (
    <>
      <div className="w-full max-w-7xl items-center justify-center flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-20 lg:pt-28 lg:pb-[62px] px-4">
        <div className="w-full">
          {/* <div className="text-6xl text-center text-g-gray-8 mb-8 font-light">Schedule</div> */}
          <div className="text-center w-full" >
            <h2>Schedule is comming soon!</h2>
            <img className="m-auto" src={soon} alt="Hourglass" width={140} />
          </div>
          {/* <div className="h-10 lg:h-14 w-full border-b-[1px] border-g-gray-3 flex gap-5 my-5">
            <div
              className={
                'text-xl lg:text-2xl font-light px-8 h-full cursor-pointer' +
                (day === 1 ? ' border-b-[2px] border-g-blue-3' : '')
              }
              onClick={() => {
                setDay(1)
              }}
            >
              Day 1
            </div>
            <div
              className={
                'text-xl lg:text-2xl font-light px-8 h-full cursor-pointer' +
                (day === 2 ? ' border-b-[2px] border-g-blue-3' : '')
              }
              onClick={() => {
                setDay(2)
              }}
            >
              Day 2
            </div>
          </div> */}

          
          <div className="schedule-container d-none" style={{ height: containerHeight }}>
            <div
              ref={day1}
              id="fade-in-1"
              className={'box' + (day === 1 ? '' : ' inactive')}
            >
              {dayOneSessionData.timeSlots.map((slot: any) => {
                const startTime = getTime(slot['rooms'][0].session.startsAt)
                const endTime = getTime(slot['rooms'][0].session.endsAt)
                const rooms = slot['rooms']

                return (
                  <div className="flex w-full lg:w-auto ">
                    <div className="w-3/10 lg:w-1/5 border-b-[1px] lg:border-r-[0px] lg:border-r-[1px] border-g-gray-3 flex flex-col items-end px-3 py-3 text-right lg:text-start">
                      <div className="text-base lg:text-xl"> {startTime}</div>
                      <div className="text-xs lg:text-sm font-light">{endTime}</div>
                      <div className="mt-1 text-[8px] lg:text-xs">GMT (+05:30)</div>
                    </div>
                    <div className="w-7/10 lg:w-4/5 flex flex-col p-3 border-b-[1px] border-g-gray-3 grow">
                      {rooms.map((room, index) => {
                        const info = room['session']
                        const name = info.title
                        const description = info.description

                        const technologies = info.categories.find(
                          (c) => c.name === 'Technology'
                        )?.categoryItems
                        return (
                          <div
                            className={
                              index > 0
                                ? 'mt-4 pt-4 border-t-[1px] border-g-gray-3'
                                : ''
                            }
                          >
                            <div className="text-xs bg-green-100 px-2 py-1 mb-2 w-fit">
                              { name === "Lunch" ? "Cafeteria" : "Workshop Hall" }
                            </div>
                            <div className="text-2xl font-light">{name}</div>
                            {info.speakers && (
                              <div className="flex items-center gap-2">
                                {info.speakers?.map((speaker) => {
                                  const speakerName = speaker.name
                                  const speakerImage = speaker.profilePicture
                                  return (
                                    speakerName && (
                                      <div className="flex items-center my-2 p-1 border-1 border-g-blue-3 w-fit rounded-full bg-g-blue-3 text-white">
                                        <img
                                          className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                          src={speakerImage}
                                          alt=""
                                        />
                                        <span className="text-xs ml-2  ">
                                          {speakerName}
                                        </span>
                                      </div>
                                    )
                                  )
                                })}
                              </div>
                            )}

                            {description && (
                              <div className="text-sm lg:text-base font-light">
                                {description}
                              </div>
                            )}
                            {technologies && (
                              <div className="flex items-center flex-wrap gap-2 my-2">
                                {technologies.map((tech) => {
                                  return (
                                    <div className="text-xs border-1 border-g-gray-5 bg-g-gray-1 rounded-full px-2 py-1 w-fit">
                                      {tech.name}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              ref={day2}
              id="fade-in-2"
              className={'box' + (day === 2 ? ' active' : '')}
            >
              {dayTwoSessionData.timeSlots.map((slot: any) => {
                const startTime = getTime(slot['rooms'][0].session.startsAt)
                const endTime = getTime(slot['rooms'][0].session.endsAt)
                const rooms = slot['rooms']

                return (
                  <div className="flex w-full lg:w-auto ">
                    <div className="w-3/10 lg:w-1/5 border-b-[1px] lg:border-r-[0px] lg:border-r-[1px] border-g-gray-3 flex flex-col items-end px-3 py-3 text-right lg:text-start">
                      <div className="text-base lg:text-xl"> {startTime}</div>
                      <div className="text-xs lg:text-sm font-light">{endTime}</div>
                      <div className="mt-1 text-[8px] lg:text-xs">GMT (+05:30)</div>
                    </div>
                    <div className="w-7/10 lg:w-4/5 flex flex-col p-3 border-b-[1px] border-g-gray-3 grow">
                      {rooms.map((room, index) => {
                        const info = room['session']
                        const name = info.title
                        const description = info.description

                        const technologies = info.categories.find(
                          (c) => c.name === 'Technology'
                        )?.categoryItems
                        return (
                          <div
                            className={
                              index > 0
                                ? 'mt-4 pt-4 border-t-[1px] border-g-gray-3'
                                : ''
                            }
                          >
                            <div className="text-xs bg-green-100 px-2 py-1 mb-2 w-fit">
                              Hall: {info.room}
                            </div>
                            <div className="text-2xl font-light">{name}</div>
                            {info.speakers && (
                              <div className="flex items-center gap-2">
                                {info.speakers?.map((speaker) => {
                                  const speakerName = speaker.name
                                  const speakerImage = speaker.profilePicture
                                  return (
                                    speakerName && (
                                      <div className="flex items-center my-2 p-1 border-1 border-g-blue-3 w-fit rounded-full bg-g-blue-3 text-white">
                                        <img
                                          className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                          src={speakerImage}
                                          alt=""
                                        />
                                        <span className="text-xs ml-2  ">
                                          {speakerName}
                                        </span>
                                      </div>
                                    )
                                  )
                                })}
                              </div>
                            )}

                            {description && (
                              <div className="text-sm lg:text-base font-light">
                                {description}
                              </div>
                            )}
                            {technologies && (
                              <div className="flex items-center flex-wrap gap-2 my-2">
                                {technologies.map((tech) => {
                                  return (
                                    <div className="text-xs border-1 border-g-gray-5 bg-g-gray-1 rounded-full px-2 py-1 w-fit">
                                      {tech.name}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sessions
