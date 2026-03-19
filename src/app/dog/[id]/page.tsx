'use client'

import Card from "@/components/card";
import { DogInfoResponse } from "@/schemas/response";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "@/helpers/fetcher";


export default function DogDetails() {
  const param = useParams<{id: string}>()

  const getUrl= `/api/dog/${param.id}`
  const { data } = 
    useSWR<DogInfoResponse>(
      `${getUrl}`, 
      fetcher
    )
  
  useEffect(() => {
    if (data?.error) {
      Swal.fire({
        title: 'An error has occurred',
        text: 'Please contact with the support service', 
        icon: 'warning',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = ('/')
        }
      })
    }
  }, [data])
    
  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      {
        data?.data ? 
          <Card
          title={data?.data!.name}
          description={data?.data!.description}
          femaleWight={data?.data!.femaleWeight}
          maleWight={data?.data!.maleWeight}
          life={data?.data!.life}
          />
        : 
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
      }
    </div>
  );
}
