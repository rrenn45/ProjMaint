'use client'

import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function WorkOrderSearch({className}:{className:string}){
    const searchParams = useSearchParams();
    const pathname = usePathname();
  const { replace } = useRouter();
    function handleSearch(term:string){
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
          } else {
            params.delete('query');
          }
        replace(`${pathname}?${params.toString()}`);
        console.log(term)
    }
    
    return(<div>
        <Input type="text" placeholder="Search..." className={className} onChange={(e) => {
          handleSearch(e.target.value);
        }}   defaultValue={searchParams.get('query')?.toString()} />
    </div>)
}