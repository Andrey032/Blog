import { ConfigProvider, Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  articlesCountSelector,
  currentPageSelector,
  setPage,
} from '../../features/blogs/blogsSlice';

export default function PaginationComponent() {
  const dispatch = useDispatch();
  const articlesCount = useSelector(articlesCountSelector);
  const currentPage = useSelector(currentPageSelector);

  const handleChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFFFFF',
          fontSize: 12,
        },
        components: {
          Pagination: {
            itemActiveBg: '#1677ff',
          },
        },
      }}
    >
      <Pagination
        style={{ gap: '8px' }}
        align='center'
        size='small'
        current={currentPage}
        total={articlesCount}
        onChange={handleChange}
        defaultPageSize={5}
        pageSizeOptions={[5, 10, 20]}
      />
    </ConfigProvider>
  );
}
