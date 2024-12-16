'use client';
import React, { useMemo, useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import Modal from './Modal';
import Button from '../Button';
import SpinnerMini from '../Loader';
import Heading from '../Heading';
import Counter from '../inputs/Counter';
import Input from '../inputs/Input';
import CategoryButton from '../inputs/CategoryButton';
import CountrySelect from '../inputs/CountrySelect';
import ImageUpload from '../ImageUpload';

import { categories } from '@/utils/constants';
import { createListing } from '@/services/listing';
import { TbCurrencyTenge } from 'react-icons/tb';

const steps = {
  '0': 'category',
  '1': 'location',
  '2': 'guestCount',
  '3': 'image',
  '4': 'title',
  '5': 'price',
};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = ({ onCloseModal }: { onCloseModal?: () => void }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      category: 'Beach',
      location: null,
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
      image: '',
      price: '',
      title: '',
      description: '',
    },
  });

  const location = watch('location');
  const country = location?.label;

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [country],
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();

    startTransition(async () => {
      try {
        const newListing = await createListing(data);
        toast.success(`${data.title} добавлено успешно!`);
        queryClient.invalidateQueries({
          queryKey: ['listings'],
        });
        reset();
        setStep(STEPS.CATEGORY);
        onCloseModal?.();
        router.refresh();
        router.push(`/listings/${newListing.id}`);
      } catch (error: any) {
        toast.error('Failed to create listing!');
        console.log(error?.message);
      }
    });
  };

  const body = () => {
    console.log(location);
    switch (step) {
      case STEPS.LOCATION:
        return (
          <div className="flex flex-col gap-6">
            <Heading title="Где находится ваше жилье?" subtitle="Help guests find you!" />
            <CountrySelect value={location} onChange={setCustomValue} />
            <div className="h-[240px]">
              <Map
                center={location?.latlng}
                onLocationChange={(newLocation) => setCustomValue('location', newLocation)}
              />
            </div>
          </div>
        );

      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Расскажите немного о своем жилье"
              subtitle="What amenitis do you have?"
            />
            <Counter
              title="Гостинная"
              subtitle="Сколько у вас гостинной?"
              watch={watch}
              onChange={setCustomValue}
              name="guestCount"
            />
            <hr />
            <Counter
              onChange={setCustomValue}
              watch={watch}
              title="Комнаты"
              subtitle="Сколько у вас комнат?"
              name="roomCount"
            />
            <hr />
            <Counter
              onChange={setCustomValue}
              watch={watch}
              title="Санузел"
              subtitle="Сколько у вас есть санузлов?"
              name="bathroomCount"
            />
          </div>
        );

      case STEPS.IMAGES:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Добавьте фотографию вашего дома"
              subtitle="Покажите клиентам, как выглядит ваше жилье!"
            />
            <ImageUpload onChange={setCustomValue} initialImage={getValues('image')} />
          </div>
        );

      case STEPS.DESCRIPTION:
        return (
          <div className="flex flex-col gap-6">
            <Heading title="Опишите вашу недвижимость" subtitle="Коротко и понятно" />
            <Input
              id="title"
              label="Заголовок"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              watch={watch}
              autoFocus
            />
            <hr />
            <Input
              id="description"
              label="Описание"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              watch={watch}
            />
          </div>
        );

      case STEPS.PRICE:
        return (
          <div className="flex flex-col gap-6">
            <Heading
              title="Теперь установите свою цену"
              subtitle="На сколько вы оцениваете вашу недвижимость?"
            />
            <Input
              key="price"
              id="price"
              label="Цена"
              icon={TbCurrencyTenge}
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              watch={watch}
              autoFocus
            />
          </div>
        );

      default:
        return (
          <div className="flex flex-col gap-2">
            <Heading
              title="Что из перечисленного лучше всего описывает ваше место жительства?"
              subtitle="Pick a category"
            />
            <div className="flex-1 grid grid-cols-2  gap-3 max-h-[60vh] lg:max-h-[260px] overflow-y-scroll scroll-smooth">
              {categories.map((item) => (
                <CategoryButton
                  onClick={setCustomValue}
                  watch={watch}
                  label={item.label}
                  icon={item.icon}
                  key={item.label}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  const isFieldFilled = !!getValues(steps[step]);

  return (
    <div className="w-full h-full flex flex-col">
      <Modal.WindowHeader title="Подать объявление" />
      <form
        className="flex-1  md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none "
        onSubmit={handleSubmit(onSubmit)}>
        <div className="relative p-6">{body()}</div>
        <div className="flex flex-col gap-2 px-6 pb-6 pt-3">
          <div className="flex flex-row items-center gap-4 w-full">
            {step !== STEPS.CATEGORY ? (
              <Button
                type="button"
                className="flex items-center gap-2 justify-center"
                onClick={onBack}
                outline>
                Назад
              </Button>
            ) : null}
            <Button
              type="submit"
              className="flex items-center gap-2 justify-center"
              disabled={isLoading || !isFieldFilled}>
              {isLoading ? <SpinnerMini /> : step === STEPS.PRICE ? 'Создать' : 'Далее'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RentModal;
