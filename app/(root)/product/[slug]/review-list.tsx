"use client";

import { Review } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewForm from "./review-form";
import { getReviews } from "@/lib/actions/review.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, CalendarIcon, UserIcon } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Rating from "@/components/shared/product/rating";

function ReviewList({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getReviews({
        productId,
      });
      setReviews(res.data);
    };

    loadReviews();
  }, [productId]);

  //reload reviews after created or updated
  const reload = async () => {
    const res = await getReviews({
      productId,
    });
    setReviews([...res.data]);
  };
  return (
    <div className="space-y-4">
      {reviews.length === 0 && (
        <p className="mt-5 font-light">This product has no reviews yet.</p>
      )}

      {userId ? (
        <>
          <ReviewForm
            userId={userId}
            productId={productId}
            onReviewSubmitted={reload}
          />
        </>
      ) : (
        <div className="flex w-full justify-center gap-1">
          To leave a review please{" "}
          <Link
            className="text-light hover:underline text-stone-500"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            {" "}
            sign in{" "}
          </Link>
        </div>
      )}

      <div className="flex flex-col">
        {reviews.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <div className="flex-between">
                <CardTitle className="flex items-center gap-3">
                  {r.title} <Rating value={r.rating} />
                </CardTitle>
              </div>
              <CardDescription>{r.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex text-sm flex-col gap-2 text-muted-foreground">
                <div className="flex items-center gap-3 ">
                  <div className="flex items-center">
                    <UserIcon className="mr-1 h-3 w-3" />
                    {r.user ? r.user.name : "User"}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {formatDateTime(r.createdAt).dateOnly}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
