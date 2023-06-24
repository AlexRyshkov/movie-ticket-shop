import React from "react";
import s from "./styles.module.css";
import Image from "next/image";

type ReviewListProps = {
  reviews: ReviewType[];
};

function ReviewList({ reviews }: ReviewListProps) {
  console.log(reviews);
  return (
    <div className={s.list}>
      {reviews.map((review) => (
        <div className={s.review}>
          <div className={s.avatarWrapper}>
            <Image src="/icons/photo.svg" alt="author" width={32} height={32} />
          </div>
          <div className={s.info}>
            <div className={s.authorRow}>
              <span className={s.author}>{review.name}</span>
              <span>
                Оценка:<span className={s.rate}>{review.rating}</span>
              </span>
            </div>
            <div className={s.text}>{review.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
