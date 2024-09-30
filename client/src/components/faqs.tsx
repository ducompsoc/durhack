"use client"

import React, { useEffect } from "react"

import configJson from "@/components/componentInfo"
import { SectionHeader } from "@/components/section-header"

const faqs = configJson.faqs

type Question = {
  question: string
  answers: string[]
}

type QuestionProps = {
  question: Question
  qIndex: number
  isVisible: boolean
  onClick: () => void
}

function QuestionTemplate({ question, qIndex, isVisible, onClick }: QuestionProps) {
  let prefixIcon

  const [shouldRender, setShouldRender] = React.useState(false)

  //play the fade-out animation, then stop rendering
  const fadeOutHandler = () => {
    if (!isVisible) setShouldRender(false)
  }

  //start rendering, then play the fade-in animation
  useEffect(() => {
    if (isVisible) setShouldRender(true)
  }, [isVisible])

  //swap these for icons later
  switch (qIndex % 3) {
    case 0:
      prefixIcon = "i)"
      break

    case 1:
      prefixIcon = "ii)"
      break

    default:
      prefixIcon = "iii)"
      break
  }

  return (
    <li onClick={onClick}>
      <div className="flex cursor-pointer text-xl mt-4 mb-[-4px]">
        {prefixIcon} {question.question}
      </div>

      {shouldRender && (
        <div className="pt-4.5 text-base">
          <div
            className={`container ${isVisible ? "animate-fade-in" : "animate-fade-out"}`}
            onAnimationEnd={fadeOutHandler}
          >
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} dangerouslySetInnerHTML={{ __html: answer }} />
            ))}
          </div>
        </div>
      )}
    </li>
  )
}
export default function Faqs() {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState<number | null>(null)

  const handleQuestionClick = (index: number) => {
    if (selectedQuestionIndex === index) setSelectedQuestionIndex(null)
    else setSelectedQuestionIndex(index)
  }

  return (
    <div>
      <div className="block lg:hidden">
        <SectionHeader>FAQs</SectionHeader>
      </div>

      <div className="hidden lg:block">
        <SectionHeader>FREQUENTLY ASKED QUESTIONS</SectionHeader>
      </div>

      <ul className="list-none mb-5 py-1">
        {faqs.map((question, qIndex) => (
          <QuestionTemplate
            question={question}
            qIndex={qIndex}
            key={qIndex}
            isVisible={selectedQuestionIndex === qIndex}
            onClick={() => handleQuestionClick(qIndex)}
          />
        ))}
      </ul>
    </div>
  )
}
