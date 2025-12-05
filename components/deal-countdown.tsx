"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

// ---------- Types ----------
type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// ---------- Config ----------
const TARGET_DATE = new Date("2026-01-01T00:00:00");

// ---------- Helpers ----------
const calculateTimeRemaining = (targetDate: Date): TimeLeft => {
  const currentTime = new Date();
  const diff = Math.max(targetDate.getTime() - currentTime.getTime(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

// ---------- UI Components ----------
const StatBox = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center">
    <div className="text-5xl font-light text-gray-900 mb-2 tracking-tight">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
      {label}
    </div>
  </div>
);

// ---------- Main Component ----------
const DealCountdown = () => {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(interval);
      }
    };

    // run immediately
    tick();

    // then run every second
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  // ---------- Loading Placeholder ----------
  if (!time) {
    return (
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="h-8 w-48 bg-gray-200 animate-pulse" />
            <div className="h-4 w-full bg-gray-100 animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-100 animate-pulse" />
          </div>
          <div className="bg-gray-100 aspect-[4/3] animate-pulse" />
        </div>
      </section>
    );
  }

  // ---------- Deal Ended ----------
  const isEnded =
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0;

  if (isEnded) {
    return (
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h3 className="text-4xl font-light text-gray-900 tracking-tight">
              Deal Has Ended
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              This deal is no longer available. Check out our latest promotions
              and discover new exclusive offers.
            </p>
            <Button asChild className="py-5">
              <Link href="/search">View Products</Link>
            </Button>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="bg-gray-50 aspect-[4/3] w-full max-w-md overflow-hidden relative">
              <Image
                src="/banner-2.jpeg"
                alt="promotion"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Active Countdown ----------
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 border-y border-gray-200 my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-light text-gray-900 tracking-tight leading-tight">
              Deal Of The Month
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Get ready for a shopping experience like never before with our
              Deals of the Month. Enjoy exclusive perks and offers!
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6 py-8 border-y border-gray-200">
            <StatBox label="Days" value={time.days} />
            <StatBox label="Hours" value={time.hours} />
            <StatBox label="Minutes" value={time.minutes} />
            <StatBox label="Seconds" value={time.seconds} />
          </div>

          <Button asChild className="py-5">
            <Link href="/search">View Products</Link>
          </Button>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="bg-gray-50 aspect-[4/3] w-full max-w-md overflow-hidden relative">
            <Image
              src="/banner-1.avif"
              alt="promotion"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealCountdown;
