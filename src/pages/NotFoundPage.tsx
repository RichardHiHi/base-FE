import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center'>
      <h1 className='text-9xl font-bold text-primary'>404</h1>
      <p className='text-2xl mt-4 font-semibold'>Trang không tồn tại</p>
      <p className='mt-2 text-muted-foreground'>
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại.
      </p>
      <Link
        to='/'
        className='mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90'
      >
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;
