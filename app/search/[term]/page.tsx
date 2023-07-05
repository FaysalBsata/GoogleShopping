import { redirect } from 'next/navigation';
import { SearchParams } from '@/typings';
type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};
function page({ searchParams, params: { term } }: Props) {
  if (!term) {
    redirect('/');
  }
  return <div>Welcome to the search results page</div>;
}

export default page;
