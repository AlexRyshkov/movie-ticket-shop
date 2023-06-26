import React from "react";
import s from "./styles.module.css";
import classnames from "classnames";
import ExpandableItem from "@/app/components/ExpandableItem";

const faqData = [
  {
    question: "Что такое Билетопоиск?",
    answer:
      "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.",
  },
  {
    question: "Какой компании принадлежит Билетопоиск?",
    answer: "Lorem ipsum",
  },
  { question: "Как купить билет на Билетопоиск?", answer: "Lorem ipsum" },
  { question: "Как оставить отзыв на Билетопоиск?", answer: "Lorem ipsum" },
];

const faqItems = faqData.map(({ question, answer }, index) => (
  <div key={index.toString()} className="paperBlock">
    <ExpandableItem
      content={<div className={s.question}>{question}</div>}
      expandableContent={<div className={s.answer}>{answer}</div>}
    />
  </div>
));

function Faq() {
  return (
    <>
      <div className={classnames("paperBlock", s.titleBlock)}>
        Вопросы-ответы
      </div>
      <div className={s.list}>{faqItems}</div>
    </>
  );
}

export default Faq;
