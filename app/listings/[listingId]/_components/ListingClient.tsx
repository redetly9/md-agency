'use client';
import React, { ReactNode, useEffect, useMemo, useState, useTransition } from 'react';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import ListingReservation from './ListingReservation';
import ListingAuthor from './ListingAuthor';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: {
    startDate: Date;
    endDate: Date;
  }[];
  children: ReactNode;
  id: string;
  title: string;
  price: number;
  user?: {
    id: string;
  };
  owner: {
    name: string;
    phone: string;
    image: string;
  };
}

const ListingClient: React.FC<ListingClientProps> = ({
  price,
  reservations = [],
  children,
  user,
  id,
  title,
  owner,
}) => {
  const [totalPrice, setTotalPrice] = useState(price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && price) {
        setTotalPrice((dayCount + 1) * price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, price]);

  // const onCreateReservation = () => {
  //   if (!user) return toast.error('Please log in to reserve listing.');
  //   startTransition(async () => {
  //     try {
  //       const { endDate, startDate } = dateRange;
  //       const res = await createPaymentSession({
  //         listingId: id,
  //         endDate,
  //         startDate,
  //         totalPrice,
  //       });

  //       if (res?.url) {
  //         router.push(res.url);
  //       }
  //     } catch (error: any) {
  //       toast.error(error?.message);
  //     }
  //   });
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
      {children}

      <div className="order-first mb-10 md:order-last md:col-span-3">
        <ListingReservation price={price} totalPrice={totalPrice} />
        <ListingAuthor name={owner.name} phone={owner.phone} image={owner.image} />
      </div>
    </div>
  );
};

export default ListingClient;
