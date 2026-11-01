import Reviews from '@/components/v2/Reviews';
export const metadata = { title: 'Отзывы клиентов — MD' };
export default function ReviewsPage() {
  return (
    <div className="v2-container py-8 sm:py-14">
      <h1 className="v2-h1">Отзывы</h1>
      <p className="mt-3 text-ink-2 max-w-2xl">Публикуем только проверенные отзывы клиентов MD. Если вы уже оформили аренду с выкупом, расскажите, как прошло.</p>
      <div className="mt-8"><Reviews /></div>
    </div>
  );
}
