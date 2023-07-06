import { redirect } from 'next/navigation';
import { PageResults, SearchParams } from '@/typings';
import { getFetchUrl } from '@/lib/getFetchUrl';
import ResultList from '@/components/ResultList';
export const revalidate = 300;
type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};
async function page({ searchParams, params: { term } }: Props) {
  if (!term) {
    redirect('/');
  }
  const response = await fetch(getFetchUrl('api/search'), {
    method: 'POST',
    body: JSON.stringify({ searchTerm: term, ...searchParams }),
  });
  const results = (await response.json()) as PageResults[];

  return (
    <div>
      <ResultList {...{ results, term }} />
    </div>
  );
}

export default page;
