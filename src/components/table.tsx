'use client'

import axios from 'axios'
import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye } from 'lucide-react'
import { DogTableResponse } from '@/schemas/response'
import Swal from 'sweetalert2'


export const CustomizableTable = () => {
  const getUrl = '/api/dog'
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)

  const { data: info } = useSWR<DogTableResponse>(
    `${getUrl}?pageSize=${size}&pageNumber=${page}`,
    (url) => axios.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      keepPreviousData: true
    }
  )

  if (info && info?.error) {
    Swal.fire({
      title: 'Server Error',
      text: 'An unexpected error has been, please contact with the support service',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

  if (!info?.data?.dogs?.length) {
    return <p className="text-center text-gray-500">No hay datos disponibles</p>
  }

  

  return (
    <div className="flex flex-col gap-6">
      {/* 📋 Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 w-1/4">Nombre</th>
              <th className="px-4 py-3 w-2/4">Descripción</th>
              <th className="px-4 py-3 w-1/4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {info.data.dogs.map((dog) => (
              <tr
                key={dog.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-800 truncate max-w-[150px]">
                  {dog.name}
                </td>

                <td className="px-4 py-3 text-gray-600 truncate max-w-[300px]">
                  {dog.description.length > 50
                    ? dog.description.slice(0, 50) + '...'
                    : dog.description}
                </td>

                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/dog/${dog.id}`}
                    className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    <Eye size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     <div className="flex justify-center items-center gap-2">
        <button
          className="p-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
          disabled={info.data.pagination.current === 1}
          onClick={() => setPage(1)}
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          className="p-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
          disabled={info.data.pagination.current === 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft size={18} />
        </button>

        <span className="px-3 text-sm text-gray-600">
          {info.data.pagination.current} / {info.data.pagination.last ?? info.data.pagination.current}
        </span>

        <button
          className="p-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
          disabled={
            !info.data.pagination.last ||
            page === info.data.pagination.last
          }
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight size={18} />
        </button>

        {/* ⏭️ Ir al final */}
        <button
          className="p-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
          disabled={
            !info.data.pagination.last ||
            page === info.data.pagination.last
          }
          onClick={() => setPage(info?.data?.pagination.last ?? info.data!.pagination.current)}
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  )
}
