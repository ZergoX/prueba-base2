'use client'

import Card from "@/components/card";
import { DogInfoResponse } from "@/schemas/response";
import axios from "axios";
import { useParams } from "next/navigation";
import useSWR from "swr";


export default function DogDetails() {
  const param = useParams<{id: string}>()

  const getUrl= `/api/dog/${param.id ?? 'no'}`
  const { data } = 
    useSWR<DogInfoResponse>(
      `${getUrl}`, 
      (url) => (axios.get(url).then((res)=> res.data)), {
		    revalidateOnFocus: false,
        keepPreviousData: true
	    }
    )


  if (!data) return ( <p> Loading... </p> )
    
  if (data.error) return (<p>${data.error}</p>)

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <Card
        title={data?.data!.name}
        description={data?.data!.description}
        femaleWight={data?.data!.femaleWeight}
        maleWight={data?.data!.maleWeight}
        life={data?.data!.life}
        />
    </div>
  );
}
